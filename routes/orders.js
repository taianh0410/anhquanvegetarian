const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { sendTelegramNotification } = require('../utils/telegram');
const { sendOrderConfirmationEmail } = require('../utils/emailService');
const { sendNewOrderSMS, sendCustomerConfirmationSMS } = require('../utils/smsService');

// Tạo đơn hàng mới
router.post('/', async (req, res) => {
  try {
    const { customerName, phoneNumber, email, deliveryDate, deliveryTime, items, combos, totalAmount } = req.body;

    const order = new Order({
      customerName,
      phoneNumber,
      email: email || '',
      deliveryDate: deliveryDate || null,
      deliveryTime: deliveryTime || '',
      items,
      combos,
      totalAmount
    });

    await order.save();

    // Gửi thông báo Telegram
    await sendTelegramNotification(order);
    
    // Gửi SMS cho admin (thông báo đơn mới)
    await sendNewOrderSMS(order);
    
    // Gửi SMS cho khách (xác nhận đơn)
    await sendCustomerConfirmationSMS(order);
    
    // Gửi email xác nhận (nếu có email)
    if (email) {
      await sendOrderConfirmationEmail(order);
    }

    res.status(201).json({ 
      message: 'Đặt hàng thành công!',
      orderId: order._id 
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
