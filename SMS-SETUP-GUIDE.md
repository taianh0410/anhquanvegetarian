# 📱 HƯỚNG DẪN TÍCH HỢP SMS

## 🎯 Tính năng

Khi có đơn hàng mới, hệ thống sẽ:
1. Gửi SMS cho **Admin** (bạn) - Thông báo có đơn mới
2. Gửi SMS cho **Khách hàng** - Xác nhận đơn hàng
3. Gửi SMS khi **Hoàn thành** đơn - Cảm ơn khách
4. Gửi SMS khi **Hủy đơn** - Xin lỗi khách

---

## 🇻🇳 PHƯƠNG ÁN 1: ESMS.VN (Khuyến nghị cho VN)

### Ưu điểm:
- ✅ Nhà cung cấp SMS lớn nhất VN
- ✅ Giá rẻ: 450-650đ/tin
- ✅ Hỗ trợ Brandname (tên công ty)
- ✅ API đơn giản
- ✅ Có app quản lý

### Đăng ký:

1. **Truy cập:** https://esms.vn
2. **Đăng ký tài khoản** (miễn phí)
3. **Nạp tiền:** Tối thiểu 200,000đ
4. **Đăng ký Brandname:**
   - Vào "Quản lý Brandname"
   - Đăng ký tên: `BEPCHAY` (hoặc tên bạn muốn)
   - Chờ duyệt 1-2 ngày

5. **Lấy API Key:**
   - Vào "Cài đặt" → "API"
   - Copy **API Key** và **Secret Key**

### Cấu hình .env:

```env
# SMS Configuration - ESMS
SMS_PROVIDER=esms
ESMS_API_KEY=your-api-key-here
ESMS_SECRET_KEY=your-secret-key-here
ESMS_BRAND_NAME=BEPCHAY
ADMIN_PHONE_NUMBER=0912345678
```

### Giá cước:

| Loại tin | Giá |
|----------|-----|
| Brandname (quảng cáo) | 450đ/tin |
| Brandname (chăm sóc KH) | 550đ/tin |
| Đầu số 8755 | 650đ/tin |

**Ví dụ:** 100 đơn hàng/tháng = 100 tin × 550đ = 55,000đ/tháng

---

## 🌍 PHƯƠNG ÁN 2: TWILIO (Quốc tế)

### Ưu điểm:
- ✅ Uy tín toàn cầu
- ✅ API mạnh mẽ
- ✅ Hỗ trợ nhiều quốc gia
- ✅ Có trial miễn phí

### Nhược điểm:
- ❌ Đắt hơn ESMS (1,000-2,000đ/tin)
- ❌ Cần thẻ tín dụng quốc tế
- ❌ Giao diện tiếng Anh

### Đăng ký:

1. **Truy cập:** https://www.twilio.com/try-twilio
2. **Đăng ký tài khoản**
3. **Verify số điện thoại**
4. **Lấy thông tin:**
   - Account SID
   - Auth Token
   - Phone Number (số gửi)

### Cấu hình .env:

```env
# SMS Configuration - Twilio
SMS_PROVIDER=twilio
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your-auth-token
TWILIO_PHONE_NUMBER=+84912345678
ADMIN_PHONE_NUMBER=0912345678
```

### Giá cước:

- SMS Việt Nam: ~$0.08/tin (~2,000đ)
- Trial: $15 miễn phí (test)

---

## 🇻🇳 PHƯƠNG ÁN 3: VIETGUYS (Việt Nam)

### Ưu điểm:
- ✅ Giá rẻ
- ✅ Hỗ trợ tiếng Việt
- ✅ Không cần duyệt Brandname

### Nhược điểm:
- ❌ Ít phổ biến hơn ESMS
- ❌ Giao diện cũ

### Đăng ký:

1. **Truy cập:** http://vietguys.biz
2. **Đăng ký tài khoản**
3. **Nạp tiền**
4. **Lấy thông tin đăng nhập**

### Cấu hình .env:

```env
# SMS Configuration - VietGuys
SMS_PROVIDER=vietguys
VIETGUYS_USERNAME=your-username
VIETGUYS_PASSWORD=your-password
VIETGUYS_BRAND_NAME=BEPCHAY
ADMIN_PHONE_NUMBER=0912345678
```

---

## ⚙️ CÀI ĐẶT

### Bước 1: Cập nhật code

Code đã được tích hợp sẵn trong `utils/smsService.js`

### Bước 2: Cấu hình .env

Chọn 1 trong 3 phương án trên và cấu hình .env

### Bước 3: Test

```bash
npm start
```

Đặt hàng thử → Kiểm tra SMS!

---

## 📋 NỘI DUNG SMS

### SMS cho Admin (khi có đơn mới):
```
[BEP CHAY] Don hang moi!
KH: Nguyen Van A
SDT: 0912345678
Tien: 500,000d
```

### SMS cho Khách (xác nhận đơn):
```
[BEP CHAY] Cam on ban da dat hang! 
Ma don: #abc123. 
Tong: 500,000d. 
Chung toi se lien he som nhat!
```

### SMS hoàn thành:
```
[BEP CHAY] Don hang #abc123 da giao 
thanh cong! Cam on ban da tin tuong. 
Hen gap lai!
```

### SMS hủy đơn:
```
[BEP CHAY] Xin loi, don hang #abc123 
da bi huy. Vui long lien he: 
0912345678 de biet them chi tiet.
```

---

## 💰 SO SÁNH GIÁ

| Dịch vụ | Giá/tin | Brandname | Khuyến nghị |
|---------|---------|-----------|-------------|
| **ESMS** | 450-650đ | ✅ Có | ⭐⭐⭐⭐⭐ Tốt nhất VN |
| **Twilio** | ~2,000đ | ❌ Không | ⭐⭐⭐ Quốc tế |
| **VietGuys** | 400-600đ | ✅ Có | ⭐⭐⭐⭐ Giá rẻ |

---

## 🎯 KHUYẾN NGHỊ

### Cho người mới:
**Dùng ESMS** - Dễ dùng, giá rẻ, hỗ trợ tốt

### Chi phí ước tính:
- 50 đơn/tháng: ~30,000đ
- 100 đơn/tháng: ~55,000đ
- 500 đơn/tháng: ~275,000đ

### Lưu ý:
- Mỗi tin tối đa 160 ký tự (có dấu: 70 ký tự)
- Vượt quá sẽ tính 2 tin
- Brandname cần đăng ký và duyệt

---

## 🧪 TEST SMS

### Test ESMS:

1. Đăng ký tài khoản ESMS
2. Nạp 50,000đ (test)
3. Cấu hình .env
4. Chạy server và đặt hàng thử
5. Kiểm tra điện thoại

### Test Twilio (Free trial):

1. Đăng ký Twilio
2. Verify số điện thoại
3. Dùng $15 miễn phí
4. Test ngay không cần nạp tiền

---

## ⚠️ LƯU Ý

### 1. Định dạng số điện thoại:

**ESMS & VietGuys:**
- `0912345678` ✅
- `84912345678` ✅
- `+84912345678` ✅

**Twilio:**
- `+84912345678` ✅ (Bắt buộc có +)

### 2. Nội dung SMS:

- Không spam
- Không nội dung nhạy cảm
- Có tên công ty/brand
- Rõ ràng, ngắn gọn

### 3. Giới hạn:

- ESMS: Không giới hạn (có tiền)
- Twilio Trial: Chỉ gửi đến số đã verify
- Twilio Paid: Không giới hạn

---

## 🔗 LINKS HỮU ÍCH

- ESMS: https://esms.vn
- Twilio: https://www.twilio.com
- VietGuys: http://vietguys.biz
- ESMS API Docs: https://esms.vn/blog/esms-api

---

## 📞 HỖ TRỢ

### ESMS:
- Hotline: 1900 2132
- Email: support@esms.vn

### Twilio:
- Support: https://support.twilio.com
- Docs: https://www.twilio.com/docs

---

**Khuyến nghị: Dùng ESMS cho dự án tại Việt Nam!** 🇻🇳
