const nodemailer = require('nodemailer');

// Tạo transporter
function createTransporter() {
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;

  if (!emailUser || !emailPass) {
    console.log('⚠️ Chưa cấu hình Email');
    return null;
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: emailUser,
      pass: emailPass // App Password, không phải mật khẩu Gmail thường
    }
  });
}

// Gửi email xác nhận đơn hàng
async function sendOrderConfirmationEmail(order) {
  const transporter = createTransporter();
  if (!transporter || !order.email) return;

  const deliveryInfo = order.deliveryDate 
    ? `<p><strong>📅 Ngày nhận món:</strong> ${new Date(order.deliveryDate).toLocaleDateString('vi-VN')}${order.deliveryTime ? ' - ' + order.deliveryTime : ''}</p>`
    : '';

  let itemsHTML = '';
  if (order.items && order.items.length > 0) {
    itemsHTML = '<h3 style="color: #667eea;">Món lẻ:</h3><ul>';
    order.items.forEach(item => {
      itemsHTML += `<li>${item.name} x${item.quantity} - ${item.price.toLocaleString('vi-VN')}đ</li>`;
    });
    itemsHTML += '</ul>';
  }

  let combosHTML = '';
  if (order.combos && order.combos.length > 0) {
    combosHTML = '<h3 style="color: #667eea;">Mâm cúng:</h3>';
    order.combos.forEach(combo => {
      combosHTML += `<p><strong>Mâm ${combo.comboPrice.toLocaleString('vi-VN')}đ:</strong></p><ul>`;
      combo.selectedItems.forEach(item => {
        combosHTML += `<li>${item}</li>`;
      });
      combosHTML += '</ul>';
    });
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: order.email,
    subject: '✅ Xác nhận đơn hàng - Bếp Chay Tâm Linh',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f5f7fa;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0;">🙏 Bếp Chay Tâm Linh</h1>
          <p style="color: white; margin: 10px 0 0 0;">Thanh tịnh - An lạc - Từ bi</p>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #667eea;">Xin chào ${order.customerName}!</h2>
          <p>Cảm ơn bạn đã đặt hàng tại <strong>Bếp Chay Tâm Linh</strong>.</p>
          <p>Chúng tôi đã nhận được đơn hàng của bạn và sẽ liên hệ sớm nhất.</p>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #667eea; margin-top: 0;">Thông tin đơn hàng</h3>
            <p><strong>Mã đơn:</strong> #${order._id.toString().slice(-6)}</p>
            <p><strong>Họ tên:</strong> ${order.customerName}</p>
            <p><strong>Số điện thoại:</strong> ${order.phoneNumber}</p>
            ${deliveryInfo}
            <p><strong>Thời gian đặt:</strong> ${new Date(order.createdAt).toLocaleString('vi-VN')}</p>
          </div>

          ${itemsHTML}
          ${combosHTML}

          <div style="background: #667eea; color: white; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
            <h3 style="margin: 0;">Tổng cộng</h3>
            <p style="font-size: 24px; font-weight: bold; margin: 10px 0 0 0;">
              ${order.totalAmount.toLocaleString('vi-VN')}đ
            </p>
          </div>

          <p style="color: #666; font-size: 14px; margin-top: 30px;">
            Nếu có thắc mắc, vui lòng liên hệ với chúng tôi qua số điện thoại hoặc Zalo/Facebook.
          </p>
          
          <p style="color: #666; font-size: 14px;">
            Trân trọng,<br>
            <strong>Đội ngũ Bếp Chay Tâm Linh</strong>
          </p>
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Đã gửi email xác nhận đơn hàng');
  } catch (error) {
    console.error('❌ Lỗi gửi email:', error.message);
  }
}

// Gửi email cảm ơn khi hoàn thành đơn
async function sendCompletionEmail(order) {
  const transporter = createTransporter();
  if (!transporter || !order.email) return;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: order.email,
    subject: '🎉 Cảm ơn bạn - Bếp Chay Tâm Linh',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f5f7fa;">
        <div style="background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0;">🎉 Cảm ơn bạn!</h1>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #2ecc71;">Xin chào ${order.customerName}!</h2>
          
          <p>Đơn hàng <strong>#${order._id.toString().slice(-6)}</strong> của bạn đã được giao thành công!</p>
          
          <p>Cảm ơn bạn đã tin tưởng và lựa chọn <strong>Bếp Chay Tâm Linh</strong>. 
          Chúng tôi hy vọng món ăn đã mang đến sự hài lòng cho bạn và gia đình.</p>

          <div style="background: #d4edda; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2ecc71;">
            <p style="margin: 0; color: #155724;">
              💚 Mong được phục vụ bạn trong những lần tiếp theo!
            </p>
          </div>

          <p>Nếu bạn hài lòng với dịch vụ, đừng ngần ngại giới thiệu chúng tôi đến bạn bè và người thân nhé!</p>

          <div style="text-align: center; margin: 30px 0;">
            <p style="color: #666; font-size: 14px; margin: 0;">Liên hệ với chúng tôi:</p>
            <p style="margin: 10px 0;">
              <a href="https://zalo.me/${process.env.ZALO_NUMBER || '0123456789'}" style="color: #667eea; text-decoration: none; margin: 0 10px;">💬 Zalo</a>
              <a href="https://facebook.com/${process.env.FACEBOOK_PAGE || 'yourpage'}" style="color: #667eea; text-decoration: none; margin: 0 10px;">📘 Facebook</a>
            </p>
          </div>

          <p style="color: #666; font-size: 14px; margin-top: 30px;">
            Trân trọng,<br>
            <strong>Đội ngũ Bếp Chay Tâm Linh</strong><br>
            <em>Thanh tịnh - An lạc - Từ bi</em>
          </p>
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Đã gửi email cảm ơn');
  } catch (error) {
    console.error('❌ Lỗi gửi email:', error.message);
  }
}

// Gửi email xin lỗi khi hủy đơn
async function sendCancellationEmail(order) {
  const transporter = createTransporter();
  if (!transporter || !order.email) return;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: order.email,
    subject: '😔 Thông báo hủy đơn hàng - Bếp Chay Tâm Linh',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f5f7fa;">
        <div style="background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0;">😔 Thông báo hủy đơn</h1>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #e74c3c;">Xin chào ${order.customerName}!</h2>
          
          <p>Chúng tôi rất tiếc phải thông báo rằng đơn hàng <strong>#${order._id.toString().slice(-6)}</strong> của bạn đã bị hủy.</p>

          <div style="background: #f8d7da; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #e74c3c;">
            <p style="margin: 0; color: #721c24;">
              <strong>Lý do có thể:</strong><br>
              • Không liên hệ được với bạn<br>
              • Thông tin đơn hàng không chính xác<br>
              • Món ăn tạm thời hết hàng<br>
              • Hoặc theo yêu cầu của bạn
            </p>
          </div>

          <p>Chúng tôi chân thành xin lỗi vì sự bất tiện này. Nếu đây là nhầm lẫn hoặc bạn muốn đặt lại đơn hàng, vui lòng liên hệ với chúng tôi.</p>

          <div style="text-align: center; margin: 30px 0; background: #667eea; padding: 20px; border-radius: 8px;">
            <p style="color: white; margin: 0 0 15px 0; font-size: 16px;">
              <strong>Liên hệ ngay với chúng tôi:</strong>
            </p>
            <p style="margin: 0;">
              <a href="https://zalo.me/${process.env.ZALO_NUMBER || '0123456789'}" style="background: white; color: #667eea; text-decoration: none; padding: 10px 20px; border-radius: 5px; display: inline-block; margin: 5px;">💬 Zalo</a>
              <a href="https://facebook.com/${process.env.FACEBOOK_PAGE || 'yourpage'}" style="background: white; color: #667eea; text-decoration: none; padding: 10px 20px; border-radius: 5px; display: inline-block; margin: 5px;">📘 Facebook</a>
            </p>
          </div>

          <p>Chúng tôi rất mong được phục vụ bạn trong những lần tiếp theo!</p>

          <p style="color: #666; font-size: 14px; margin-top: 30px;">
            Trân trọng,<br>
            <strong>Đội ngũ Bếp Chay Tâm Linh</strong><br>
            <em>Thanh tịnh - An lạc - Từ bi</em>
          </p>
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Đã gửi email xin lỗi');
  } catch (error) {
    console.error('❌ Lỗi gửi email:', error.message);
  }
}

module.exports = {
  sendOrderConfirmationEmail,
  sendCompletionEmail,
  sendCancellationEmail
};
