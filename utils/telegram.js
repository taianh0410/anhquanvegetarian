const axios = require('axios');

async function sendTelegramNotification(order) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.log('⚠️ Chưa cấu hình Telegram Bot');
    return;
  }

  let message = `🔔 ĐỚN HÀNG MỚI\n\n`;
  message += `👤 Khách hàng: ${order.customerName}\n`;
  message += `📞 SĐT: ${order.phoneNumber}\n`;
  message += `💰 Tổng tiền: ${order.totalAmount.toLocaleString('vi-VN')}đ\n\n`;
  
  if (order.items && order.items.length > 0) {
    message += `📋 Món lẻ:\n`;
    order.items.forEach(item => {
      message += `  • ${item.name} x${item.quantity} - ${item.price.toLocaleString('vi-VN')}đ\n`;
    });
  }

  if (order.combos && order.combos.length > 0) {
    message += `\n🎁 Mâm cúng:\n`;
    order.combos.forEach((combo, index) => {
      message += `  Mâm ${combo.comboPrice.toLocaleString('vi-VN')}đ:\n`;
      combo.selectedItems.forEach(item => {
        message += `    ✓ ${item}\n`;
      });
    });
  }

  message += `\n⏰ ${new Date().toLocaleString('vi-VN')}`;

  try {
    await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      chat_id: chatId,
      text: message,
      parse_mode: 'HTML'
    });
    console.log('✅ Đã gửi thông báo Telegram');
  } catch (error) {
    console.error('❌ Lỗi gửi Telegram:', error.message);
  }
}

module.exports = { sendTelegramNotification };
