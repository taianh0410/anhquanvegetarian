const axios = require('axios');

// ============================================
// PHƯƠNG ÁN 1: ESMS.VN (Phổ biến nhất)
// ============================================
async function sendSMS_ESMS(phoneNumber, message) {
  const apiKey = process.env.ESMS_API_KEY;
  const secretKey = process.env.ESMS_SECRET_KEY;
  const brandName = process.env.ESMS_BRAND_NAME || 'BEPCHAY';

  if (!apiKey || !secretKey) {
    console.log('⚠️ Chưa cấu hình ESMS');
    return;
  }

  try {
    const response = await axios.get('http://rest.esms.vn/MainService.svc/json/SendMultipleMessage_V4_get', {
      params: {
        ApiKey: apiKey,
        SecretKey: secretKey,
        Phone: phoneNumber,
        Content: message,
        Brandname: brandName,
        SmsType: 2 // 2 = Brandname, 4 = Quảng cáo
      }
    });

    if (response.data.CodeResult === '100') {
      console.log('✅ Đã gửi SMS qua ESMS');
    } else {
      console.error('❌ Lỗi gửi SMS:', response.data.ErrorMessage);
    }
  } catch (error) {
    console.error('❌ Lỗi gửi SMS:', error.message);
  }
}

// ============================================
// PHƯƠNG ÁN 2: TWILIO (Quốc tế)
// ============================================
async function sendSMS_Twilio(phoneNumber, message) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_PHONE_NUMBER;

  if (!accountSid || !authToken || !fromNumber) {
    console.log('⚠️ Chưa cấu hình Twilio');
    return;
  }

  try {
    const auth = Buffer.from(`${accountSid}:${authToken}`).toString('base64');
    
    const response = await axios.post(
      `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
      new URLSearchParams({
        To: phoneNumber,
        From: fromNumber,
        Body: message
      }),
      {
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    console.log('✅ Đã gửi SMS qua Twilio');
  } catch (error) {
    console.error('❌ Lỗi gửi SMS:', error.message);
  }
}

// ============================================
// PHƯƠNG ÁN 3: VIETGUYS (Việt Nam)
// ============================================
async function sendSMS_VietGuys(phoneNumber, message) {
  const username = process.env.VIETGUYS_USERNAME;
  const password = process.env.VIETGUYS_PASSWORD;
  const brandName = process.env.VIETGUYS_BRAND_NAME || 'BEPCHAY';

  if (!username || !password) {
    console.log('⚠️ Chưa cấu hình VietGuys');
    return;
  }

  try {
    const response = await axios.post('http://cloudsms4.vietguys.biz:4438/api/index.php', {
      u: username,
      pwd: password,
      from: brandName,
      phone: phoneNumber,
      sms: message,
      bid: '0',
      type: '1',
      json: '1'
    });

    if (response.data.result === 1) {
      console.log('✅ Đã gửi SMS qua VietGuys');
    } else {
      console.error('❌ Lỗi gửi SMS:', response.data.message);
    }
  } catch (error) {
    console.error('❌ Lỗi gửi SMS:', error.message);
  }
}

// ============================================
// HÀM CHÍNH - Gửi thông báo đơn hàng mới
// ============================================
async function sendNewOrderSMS(order) {
  const adminPhone = process.env.ADMIN_PHONE_NUMBER;
  
  if (!adminPhone) {
    console.log('⚠️ Chưa cấu hình số điện thoại admin');
    return;
  }

  // Tạo nội dung SMS (tối đa 160 ký tự cho 1 tin)
  const message = `[BEP CHAY] Don hang moi!\nKH: ${order.customerName}\nSDT: ${order.phoneNumber}\nTien: ${order.totalAmount.toLocaleString('vi-VN')}d`;

  // Chọn nhà cung cấp SMS (ưu tiên ESMS)
  const smsProvider = process.env.SMS_PROVIDER || 'esms';

  switch (smsProvider.toLowerCase()) {
    case 'esms':
      await sendSMS_ESMS(adminPhone, message);
      break;
    case 'twilio':
      await sendSMS_Twilio(adminPhone, message);
      break;
    case 'vietguys':
      await sendSMS_VietGuys(adminPhone, message);
      break;
    default:
      console.log('⚠️ Nhà cung cấp SMS không hợp lệ');
  }
}

// ============================================
// Gửi SMS xác nhận cho khách hàng
// ============================================
async function sendCustomerConfirmationSMS(order) {
  if (!order.phoneNumber) return;

  const message = `[BEP CHAY] Cam on ban da dat hang! Ma don: #${order._id.toString().slice(-6)}. Tong: ${order.totalAmount.toLocaleString('vi-VN')}d. Chung toi se lien he som nhat!`;

  const smsProvider = process.env.SMS_PROVIDER || 'esms';

  switch (smsProvider.toLowerCase()) {
    case 'esms':
      await sendSMS_ESMS(order.phoneNumber, message);
      break;
    case 'twilio':
      await sendSMS_Twilio(order.phoneNumber, message);
      break;
    case 'vietguys':
      await sendSMS_VietGuys(order.phoneNumber, message);
      break;
    default:
      console.log('⚠️ Nhà cung cấp SMS không hợp lệ');
  }
}

// ============================================
// Gửi SMS khi hoàn thành đơn
// ============================================
async function sendCompletionSMS(order) {
  if (!order.phoneNumber) return;

  const message = `[BEP CHAY] Don hang #${order._id.toString().slice(-6)} da giao thanh cong! Cam on ban da tin tuong. Hen gap lai!`;

  const smsProvider = process.env.SMS_PROVIDER || 'esms';

  switch (smsProvider.toLowerCase()) {
    case 'esms':
      await sendSMS_ESMS(order.phoneNumber, message);
      break;
    case 'twilio':
      await sendSMS_Twilio(order.phoneNumber, message);
      break;
    case 'vietguys':
      await sendSMS_VietGuys(order.phoneNumber, message);
      break;
  }
}

// ============================================
// Gửi SMS khi hủy đơn
// ============================================
async function sendCancellationSMS(order) {
  if (!order.phoneNumber) return;

  const message = `[BEP CHAY] Xin loi, don hang #${order._id.toString().slice(-6)} da bi huy. Vui long lien he: ${process.env.ADMIN_PHONE_NUMBER || '0123456789'} de biet them chi tiet.`;

  const smsProvider = process.env.SMS_PROVIDER || 'esms';

  switch (smsProvider.toLowerCase()) {
    case 'esms':
      await sendSMS_ESMS(order.phoneNumber, message);
      break;
    case 'twilio':
      await sendSMS_Twilio(order.phoneNumber, message);
      break;
    case 'vietguys':
      await sendSMS_VietGuys(order.phoneNumber, message);
      break;
  }
}

module.exports = {
  sendNewOrderSMS,
  sendCustomerConfirmationSMS,
  sendCompletionSMS,
  sendCancellationSMS
};
