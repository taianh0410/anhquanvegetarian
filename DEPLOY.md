# 🚀 HƯỚNG DẪN DEPLOY MIỄN PHÍ

## Phương án 1: RENDER (Khuyến nghị - Dễ nhất)

### Bước 1: Tạo tài khoản MongoDB Atlas (Database miễn phí)

1. Truy cập: https://www.mongodb.com/cloud/atlas/register
2. Đăng ký tài khoản miễn phí
3. Tạo Cluster mới (chọn FREE tier)
4. Chọn region gần Việt Nam (Singapore)
5. Tạo Database User:
   - Username: admin
   - Password: (tạo password mạnh)
6. Whitelist IP: Chọn "Allow Access from Anywhere" (0.0.0.0/0)
7. Click "Connect" → "Connect your application"
8. Copy connection string, ví dụ:
   ```
   mongodb+srv://admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
9. Thay `<password>` bằng password bạn vừa tạo

### Bước 2: Push code lên GitHub

1. Tạo repository mới trên GitHub: https://github.com/new
2. Trong terminal, chạy:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### Bước 3: Deploy lên Render

1. Truy cập: https://render.com
2. Đăng ký/Đăng nhập (có thể dùng GitHub)
3. Click "New +" → "Web Service"
4. Connect GitHub repository của bạn
5. Cấu hình:
   - **Name**: vegetarian-shop (hoặc tên bạn muốn)
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

6. Thêm Environment Variables (click "Advanced"):
   ```
   PORT=3000
   MONGODB_URI=mongodb+srv://admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/vegetarian-shop?retryWrites=true&w=majority
   SESSION_SECRET=your-random-secret-key-change-this-123456
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=admin123
   TELEGRAM_BOT_TOKEN=your-telegram-bot-token (nếu có)
   TELEGRAM_CHAT_ID=your-telegram-chat-id (nếu có)
   ```

7. Click "Create Web Service"
8. Đợi 3-5 phút để deploy
9. Render sẽ cung cấp URL: `https://your-app-name.onrender.com`

### Bước 4: Truy cập website

- Trang chủ: `https://your-app-name.onrender.com`
- Admin: `https://your-app-name.onrender.com/admin`

---

## Phương án 2: RAILWAY (Thay thế)

1. Truy cập: https://railway.app
2. Đăng nhập bằng GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Chọn repository
5. Thêm MongoDB Plugin (Railway cung cấp MongoDB miễn phí)
6. Thêm Environment Variables tương tự như Render
7. Deploy tự động

---

## Phương án 3: VERCEL + MongoDB Atlas

### Cần chỉnh sửa code một chút để tương thích Vercel (serverless)

1. MongoDB Atlas: Làm theo Bước 1 ở trên
2. Truy cập: https://vercel.com
3. Import GitHub repository
4. Thêm Environment Variables
5. Deploy

**Lưu ý**: Vercel phù hợp hơn cho frontend, backend cần chỉnh sửa để chạy serverless.

---

## ⚠️ LƯU Ý QUAN TRỌNG

### 1. Bảo mật
- Đổi `ADMIN_PASSWORD` thành mật khẩu mạnh
- Đổi `SESSION_SECRET` thành chuỗi ngẫu nhiên dài

### 2. Free Tier Limitations
- **Render Free**: 
  - App sleep sau 15 phút không hoạt động
  - Khởi động lại mất 30-60 giây khi có request đầu tiên
  - 750 giờ/tháng miễn phí
  
- **MongoDB Atlas Free**:
  - 512MB storage
  - Đủ cho hàng nghìn đơn hàng

### 3. Giữ app luôn active (tùy chọn)
Dùng service như UptimeRobot để ping app mỗi 5 phút:
- https://uptimerobot.com (miễn phí)
- Thêm monitor với URL của bạn

---

## 🎯 KHUYẾN NGHỊ

**Dùng RENDER** - Đơn giản nhất, phù hợp cho người mới bắt đầu!

Các bước tóm tắt:
1. ✅ Tạo MongoDB Atlas (5 phút)
2. ✅ Push code lên GitHub (2 phút)
3. ✅ Deploy trên Render (5 phút)
4. ✅ Hoàn thành! 🎉

---

## 🆘 HỖ TRỢ

Nếu gặp lỗi:
1. Kiểm tra logs trên Render Dashboard
2. Đảm bảo MongoDB connection string đúng
3. Kiểm tra Environment Variables đã thêm đầy đủ
4. Đảm bảo file .gitignore không push .env lên GitHub
