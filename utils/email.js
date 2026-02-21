const nodemailer = require('nodemailer');

async function sendEmailNotification(order) {
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;
  const emailTo = process.env.EMAIL_TO;

  if (!emailUser || !emailPass || !emailTo) {
    console.log('⚠️ Chưa cấu hình Email');
    return;
  }

  // Tạo transporter (dùng Gmail)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: emailUser,
      pass: emailPass // App Password, không phải mật khẩu Gmail thường
    }
  });

  // Tạo nội dung email
  let itemsHTML = '';
  if (order.items && order.items.length > 0) {
    itemsHTML = '<h3>Món lẻ:</h3><ul>';
    order.items.forEach(item => {
      itemsHTML += `<li>${item.name} x${item.quantity} - ${item.price.toLocaleString('vi-VN')}đ</li>`;
    });
    itemsHTML += '</ul>';
  }

  let combosHTML = '';
  if (order.combos && order.combos.length > 0) {
    combosHTML = '<h3>Mâm cúng:</h3>';
    order.combos.forEach(combo => {
      combosHTML += `<p><strong>Mâm ${combo.comboPrice.toLocaleString('vi-VN')}đ:</strong></p><ul>`;
      combo.selectedItems.forEach(item => {
        combosHTML += `<li>${item}</li>`;
      });
      combosHTML += '</ul>';
    });
  }

  const mailOptions = {
    from: emailUser,
    to: emailTo,
    subject: `🔔 Đơn hàng mới - ${order.customerName}`,
    html: `
      <h2>🔔 ĐƠN HÀNG MỚI</h2>
      <p><strong>👤 Khách hàng:</strong> ${order.customerName}</p>
      <p><strong>📞 SĐT:</strong> ${order.phoneNumber}</p>
      <p><strong>💰 Tổng tiền:</strong> ${order.totalAmount.toLocaleString('vi-VN')}đ</p>
      ${itemsHTML}
      ${combosHTML}
      <p><strong>⏰ Thời gian:</strong> ${new Date().toLocaleString('vi-VN')}</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Đã gửi email thông báo');
  } catch (error) {
    console.error('❌ Lỗi gửi email:', error.message);
  }
}

module.exports = { sendEmailNotification };
