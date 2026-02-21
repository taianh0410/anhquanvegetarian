const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { sendTelegramNotification } = require('../utils/telegram');
// const { sendEmailNotification } = require('../utils/email'); // Bỏ comment nếu muốn dùng email

// Tạo đơn hàng mới
router.post('/', async (req, res) => {
  try {
    const { customerName, phoneNumber, items, combos, totalAmount } = req.body;

    const order = new Order({
      customerName,
      phoneNumber,
      items,
      combos,
      totalAmount
    });

    await order.save();

    // Gửi thông báo Telegram (nếu có cấu hình)
    await sendTelegramNotification(order);
    
    // Gửi thông báo Email (bỏ comment nếu muốn dùng)
    // await sendEmailNotification(order);

    res.status(201).json({ 
      message: 'Đặt hàng thành công!',
      orderId: order._id 
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
