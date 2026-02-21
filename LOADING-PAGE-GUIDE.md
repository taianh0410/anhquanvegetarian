# 🔥 HƯỚNG DẪN TRANG LOADING

## Tính năng

Khi Render app "ngủ dậy" (mất 30-60 giây), khách hàng sẽ thấy màn hình loading đẹp với:
- 🔥 Icon lửa đang cháy (animation)
- 💬 Chữ "Bếp chay đang đốt lò, bạn chờ xíu nha"
- 📱 Link Zalo và Facebook để liên hệ
- ⏳ Tự động chuyển về trang chủ khi server sẵn sàng

---

## 📁 Files đã tạo

1. **public/loading.html** - Trang loading chính
2. **public/config-contact.html** - Trang cấu hình thông tin liên hệ
3. **public/check-server.html** - Trang kiểm tra server (không dùng nữa)

---

## ⚙️ CẤU HÌNH THÔNG TIN LIÊN HỆ

### Cách 1: Dùng trang cấu hình (Dễ nhất)

1. Chạy server local: `npm start`
2. Truy cập: http://localhost:3000/config-contact.html
3. Điền thông tin:
   - **Số Zalo**: 0912345678
   - **Facebook Page**: bepchayhanoi (phần sau facebook.com/)
4. Click "Lưu cấu hình"
5. Xong! Thông tin đã được lưu vào trình duyệt

### Cách 2: Sửa trực tiếp trong code

Mở file `public/loading.html`, tìm dòng:

```javascript
const zaloNumber = localStorage.getItem('zaloNumber') || '0123456789';
const facebookPage = localStorage.getItem('facebookPage') || 'yourpage';
```

Thay đổi thành:

```javascript
const zaloNumber = localStorage.getItem('zaloNumber') || '0912345678';
const facebookPage = localStorage.getItem('facebookPage') || 'bepchayhanoi';
```

---

## 🎨 TÙY CHỈNH GIAO DIỆN

### Thay đổi màu nền

Trong `public/loading.html`, tìm:

```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

Thay bằng màu bạn muốn:
- Xanh lá: `#11998e 0%, #38ef7d 100%`
- Cam: `#f46b45 0%, #eea849 100%`
- Hồng: `#ee9ca7 0%, #ffdde1 100%`

### Thay đổi icon lửa

Tìm dòng:
```html
<div class="fire-icon">🔥</div>
```

Thay bằng emoji khác:
- 🍜 (bát phở)
- 🥗 (salad)
- 🙏 (cầu nguyện)
- 🌿 (lá cây)

### Thay đổi text

Tìm:
```html
<h1>Bếp Chay Đang Đốt Lò</h1>
<p class="subtitle">Bạn chờ xíu nha</p>
```

Thay bằng text bạn muốn!

---

## 🚀 CÁCH HOẠT ĐỘNG

### Khi deploy lên Render:

1. **Lần đầu truy cập** (app đang ngủ):
   - Render mất 30-60 giây để khởi động
   - Khách hàng thấy trang loading
   - Trang tự động kiểm tra server mỗi 2 giây
   - Khi server sẵn sàng → Tự động chuyển về trang chủ

2. **Lần sau** (app đã thức):
   - Load ngay lập tức
   - Không thấy trang loading

---

## 🧪 TEST TRANG LOADING

### Test local:

1. Chạy server: `npm start`
2. Truy cập: http://localhost:3000/loading
3. Xem giao diện và test các link

### Test trên Render:

1. Deploy lên Render
2. Đợi 20 phút để app "ngủ"
3. Truy cập website
4. Bạn sẽ thấy trang loading trong khi app "thức dậy"

---

## 📱 LINK ZALO VÀ FACEBOOK

### Format link Zalo:

```
https://zalo.me/0912345678
```

Thay `0912345678` bằng số Zalo của bạn.

### Format link Facebook:

```
https://facebook.com/bepchayhanoi
```

Thay `bepchayhanoi` bằng tên page của bạn.

**Cách lấy tên Facebook Page:**
1. Vào trang Facebook của bạn
2. Xem URL: `https://facebook.com/TENPAGEOBAY`
3. Copy phần `TENPAGEOBAY`

---

## 🎯 NÂNG CAO

### Thêm số điện thoại

Thêm vào phần social-links trong `loading.html`:

```html
<a href="tel:0912345678" class="social-link">
  <div class="social-icon">📞</div>
  <div class="social-name">Điện thoại</div>
</a>
```

### Thêm email

```html
<a href="mailto:contact@bepchay.com" class="social-link">
  <div class="social-icon">✉️</div>
  <div class="social-name">Email</div>
</a>
```

### Thêm địa chỉ Google Maps

```html
<a href="https://maps.google.com/?q=Dia+Chi+Cua+Ban" target="_blank" class="social-link">
  <div class="social-icon">📍</div>
  <div class="social-name">Địa chỉ</div>
</a>
```

---

## ⚠️ LƯU Ý

1. **localStorage chỉ lưu trên trình duyệt**
   - Mỗi trình duyệt/thiết bị cần cấu hình riêng
   - Hoặc sửa trực tiếp trong code để áp dụng cho tất cả

2. **Không cần UptimeRobot**
   - Trang loading giải quyết vấn đề UX khi app ngủ
   - Khách hàng biết phải đợi và có cách liên hệ

3. **Tự động chuyển hướng**
   - Trang loading tự động kiểm tra server
   - Không cần khách hàng làm gì cả

---

## 🎨 DEMO

Khi khách truy cập và app đang ngủ, họ sẽ thấy:

```
        🔥
   (đang nhảy múa)

Bếp Chay Đang Đốt Lò
  Bạn chờ xíu nha...

    (spinner quay)

Nếu có vấn đề, liên hệ qua:

  💬          📘
 Zalo      Facebook
```

---

## ✅ CHECKLIST

- [ ] Cấu hình số Zalo
- [ ] Cấu hình Facebook Page
- [ ] Test trang loading local
- [ ] Deploy lên Render
- [ ] Test trang loading trên Render
- [ ] Tùy chỉnh màu sắc (nếu muốn)
- [ ] Thêm thông tin liên hệ khác (nếu muốn)

---

**Hoàn thành!** 🎉

Giờ khách hàng sẽ có trải nghiệm tốt hơn khi app đang khởi động!
