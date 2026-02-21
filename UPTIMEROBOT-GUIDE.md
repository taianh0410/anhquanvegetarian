# 🤖 HƯỚNG DẪN SỬ DỤNG UPTIMEROBOT

## Tại sao cần UptimeRobot?

Render Free tier có nhược điểm:
- App "ngủ" sau 15 phút không hoạt động
- Lần truy cập đầu tiên sau khi ngủ mất 30-60 giây để "thức dậy"

**UptimeRobot** sẽ ping website của bạn mỗi 5 phút để giữ app luôn "thức" → Khách truy cập không phải đợi!

---

## 📝 HƯỚNG DẪN CHI TIẾT

### BƯỚC 1: Đăng ký UptimeRobot

1. Truy cập: https://uptimerobot.com
2. Click **"Sign Up Free"** (góc trên bên phải)
3. Điền thông tin:
   - Email của bạn
   - Password
   - Hoặc đăng ký bằng Google
4. Xác nhận email (check hộp thư)

---

### BƯỚC 2: Tạo Monitor mới

1. **Đăng nhập vào UptimeRobot**
   - Vào: https://uptimerobot.com/dashboard

2. **Click nút "+ Add New Monitor"** (màu xanh lá)

3. **Điền thông tin Monitor:**

   ```
   Monitor Type: HTTP(s)
   
   Friendly Name: Vegetarian Shop
   (Hoặc tên bạn muốn)
   
   URL (or IP): https://your-app-name.onrender.com
   (Thay bằng URL Render của bạn)
   
   Monitoring Interval: Every 5 minutes
   (Gói Free cho phép ping mỗi 5 phút)
   ```

4. **Các tùy chọn khác (để mặc định):**
   - Monitor Timeout: 30 seconds
   - Monitor Type: HTTP(s)
   - Keyword: (để trống)

5. **Click "Create Monitor"**

---

### BƯỚC 3: Xác nhận hoạt động

1. Sau khi tạo, bạn sẽ thấy monitor trong Dashboard
2. Status sẽ hiển thị:
   - 🟢 **Up** - Website đang hoạt động tốt
   - 🔴 **Down** - Website gặp sự cố
   - 🟡 **Paused** - Monitor tạm dừng

3. UptimeRobot sẽ:
   - Ping website mỗi 5 phút
   - Gửi email cảnh báo nếu website down
   - Hiển thị uptime % (mục tiêu: 99%+)

---

### BƯỚC 4: Cấu hình thông báo (Tùy chọn)

1. Click vào tên Monitor
2. Chọn tab **"Alert Contacts"**
3. Thêm email hoặc số điện thoại để nhận cảnh báo
4. Có thể tích hợp:
   - Email
   - SMS (có phí)
   - Telegram
   - Slack
   - Discord
   - Webhook

---

## 📊 DASHBOARD UPTIMEROBOT

Sau khi setup, bạn sẽ thấy:

```
┌─────────────────────────────────────────┐
│ Vegetarian Shop                         │
│ https://your-app.onrender.com          │
│                                         │
│ Status: 🟢 Up                           │
│ Uptime: 99.98%                         │
│ Response Time: 245ms                   │
│                                         │
│ Last Check: 2 minutes ago              │
│ Next Check: in 3 minutes               │
└─────────────────────────────────────────┘
```

---

## ⚙️ CÀI ĐẶT NÂNG CAO

### 1. Tăng tần suất ping (Gói Pro)
- Free: Mỗi 5 phút
- Pro: Mỗi 1 phút (tốn $7/tháng)

### 2. Thêm nhiều Monitor
- Free: Tối đa 50 monitors
- Đủ cho nhiều dự án!

### 3. Status Page (Trang trạng thái công khai)
- Tạo trang hiển thị uptime cho khách hàng
- Ví dụ: https://stats.uptimerobot.com/xxxxx

---

## 🎯 KIỂM TRA HOẠT ĐỘNG

### Cách 1: Xem logs trên Render
1. Vào Render Dashboard
2. Chọn Web Service của bạn
3. Click tab "Logs"
4. Bạn sẽ thấy request từ UptimeRobot mỗi 5 phút:
   ```
   GET / 200 - 45ms
   User-Agent: UptimeRobot/2.0
   ```

### Cách 2: Test thủ công
1. Đợi 20 phút không truy cập website
2. Vào website → Sẽ load nhanh (không phải đợi 30-60s)
3. Chứng tỏ UptimeRobot đã giữ app "thức"

---

## 💡 MẸO HAY

### 1. Ping trang nào?
- **Khuyến nghị**: Ping trang chủ `/`
- Hoặc ping endpoint nhẹ: `/api/health` (nếu có)

### 2. Tạo endpoint health check
Thêm vào `server.js`:

```javascript
// Health check endpoint cho UptimeRobot
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date() });
});
```

Sau đó ping: `https://your-app.onrender.com/health`

### 3. Xem thống kê
- UptimeRobot lưu lịch sử 60 ngày (Free)
- Xem response time trung bình
- Xem downtime history

---

## ⚠️ LƯU Ý

### 1. Giới hạn Free Tier
- 50 monitors
- Ping mỗi 5 phút
- Lưu lịch sử 60 ngày
- **Hoàn toàn đủ dùng!**

### 2. Render Free Tier
- Dù có UptimeRobot, Render vẫn giới hạn:
  - 750 giờ/tháng (31 ngày = 744 giờ)
  - Bandwidth giới hạn
  - Nếu vượt quá, app sẽ bị tạm dừng

### 3. Không lạm dụng
- Không ping quá nhiều website không cần thiết
- Không dùng để spam/attack website khác

---

## 🆘 XỬ LÝ SỰ CỐ

### Nếu nhận email "Website Down"

1. **Kiểm tra Render Dashboard**
   - App có bị crash không?
   - Xem logs có lỗi gì không?

2. **Kiểm tra MongoDB Atlas**
   - Database có kết nối được không?
   - Có vượt quá giới hạn storage không?

3. **Restart app trên Render**
   - Click "Manual Deploy" → "Deploy latest commit"
   - Hoặc push commit mới lên GitHub

4. **Kiểm tra Environment Variables**
   - Đảm bảo tất cả biến môi trường đã cấu hình đúng

---

## 📈 THEO DÕI HIỆU SUẤT

UptimeRobot cung cấp:

1. **Uptime %**
   - Mục tiêu: 99%+
   - 99.9% = Chỉ down 43 phút/tháng

2. **Response Time**
   - Render Singapore: 200-500ms (bình thường)
   - Nếu > 1000ms: Cần tối ưu

3. **Downtime History**
   - Xem khi nào app bị down
   - Phân tích nguyên nhân

---

## 🎁 BONUS: TÍCH HỢP TELEGRAM

Nhận thông báo qua Telegram khi website down:

1. Trong UptimeRobot, click Monitor
2. Tab "Alert Contacts"
3. Click "Add Alert Contact"
4. Chọn "Telegram"
5. Làm theo hướng dẫn để kết nối bot

---

## ✅ CHECKLIST HOÀN THÀNH

- [ ] Đăng ký UptimeRobot
- [ ] Tạo Monitor cho website
- [ ] Cấu hình ping mỗi 5 phút
- [ ] Thêm email nhận cảnh báo
- [ ] Kiểm tra logs trên Render
- [ ] Xác nhận website không bị "ngủ"

---

## 🔗 LINKS HỮU ÍCH

- UptimeRobot: https://uptimerobot.com
- Render Dashboard: https://dashboard.render.com
- MongoDB Atlas: https://cloud.mongodb.com
- Docs UptimeRobot: https://uptimerobot.com/api/

---

**Chúc bạn thành công!** 🚀

Nếu có thắc mắc, hãy hỏi tôi nhé!
