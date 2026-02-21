# 🚀 HƯỚNG DẪN PUSH CODE LÊN GITHUB & AUTO DEPLOY

## 📌 Cách hoạt động

1. Bạn push code lên GitHub
2. Render tự động phát hiện có code mới
3. Render tự động build và deploy
4. Website cập nhật sau 2-3 phút

**Code mới sẽ GHI ĐÈ code cũ**, nhưng Git lưu lịch sử nên có thể quay lại nếu cần.

---

## 🆕 LẦN ĐẦU TIÊN (Chưa có Git)

### Bước 1: Khởi tạo Git

Mở Command Prompt trong thư mục dự án và chạy:

```bash
git init
```

### Bước 2: Thêm tất cả file

```bash
git add .
```

### Bước 3: Commit lần đầu

```bash
git commit -m "Initial commit - Vegetarian shop"
```

### Bước 4: Tạo repository trên GitHub

1. Vào: https://github.com/new
2. Điền:
   - Repository name: `vegetarian-shop` (hoặc tên bạn muốn)
   - Description: Website bán đồ chay
   - Chọn: **Public** hoặc **Private**
   - **KHÔNG** tick "Initialize with README"
3. Click "Create repository"

### Bước 5: Kết nối với GitHub

GitHub sẽ hiển thị các lệnh, copy và chạy:

```bash
git remote add origin https://github.com/YOUR_USERNAME/vegetarian-shop.git
git branch -M main
git push -u origin main
```

**Thay `YOUR_USERNAME` bằng username GitHub của bạn!**

### Bước 6: Nhập thông tin đăng nhập

- Username: username GitHub của bạn
- Password: **Personal Access Token** (không phải password thường)

**Cách tạo Personal Access Token:**
1. Vào: https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Điền:
   - Note: `Vegetarian Shop`
   - Expiration: `No expiration` (hoặc 90 days)
   - Tick: `repo` (tất cả các ô trong repo)
4. Click "Generate token"
5. **Copy token** (chỉ hiện 1 lần, lưu lại!)
6. Dùng token này làm password khi push

---

## 🔄 LẦN SAU (Đã có Git)

Mỗi khi sửa code, chạy 3 lệnh này:

### Bước 1: Thêm tất cả thay đổi

```bash
git add .
```

### Bước 2: Commit với message mô tả

```bash
git commit -m "Mô tả thay đổi của bạn"
```

Ví dụ:
```bash
git commit -m "Thêm trang loading"
git commit -m "Sửa lỗi giỏ hàng"
git commit -m "Cập nhật giao diện admin"
```

### Bước 3: Push lên GitHub

```bash
git push
```

**Xong!** Render sẽ tự động deploy sau 2-3 phút.

---

## 🎯 QUY TRÌNH HOÀN CHỈNH

```
Sửa code
   ↓
git add .
   ↓
git commit -m "Mô tả"
   ↓
git push
   ↓
GitHub nhận code mới
   ↓
Render tự động deploy
   ↓
Website cập nhật (2-3 phút)
```

---

## 📋 CHECKLIST TRƯỚC KHI PUSH

- [ ] Đã test code trên local (npm start)
- [ ] Đã kiểm tra không có lỗi
- [ ] File .env KHÔNG được push (đã có trong .gitignore)
- [ ] Đã sửa thông tin nhạy cảm (nếu có)

---

## ⚠️ LƯU Ý QUAN TRỌNG

### 1. File .env không được push

File `.gitignore` đã cấu hình để không push file `.env` lên GitHub.
Thông tin nhạy cảm (password, token) phải cấu hình trên Render Dashboard.

### 2. Kiểm tra trước khi push

```bash
# Xem file nào sẽ được push
git status

# Xem thay đổi chi tiết
git diff
```

### 3. Nếu push nhầm

```bash
# Quay lại commit trước
git reset --hard HEAD~1

# Hoặc quay lại commit cụ thể
git log  # Xem danh sách commit
git reset --hard COMMIT_ID
```

---

## 🔍 KIỂM TRA DEPLOY TRÊN RENDER

### Cách 1: Xem Render Dashboard

1. Vào: https://dashboard.render.com
2. Click vào Web Service của bạn
3. Tab "Events" - Xem trạng thái deploy
4. Tab "Logs" - Xem logs chi tiết

### Cách 2: Nhận email

Render sẽ gửi email khi:
- Deploy thành công ✅
- Deploy thất bại ❌

---

## 🐛 XỬ LÝ LỖI

### Lỗi: "fatal: not a git repository"

```bash
git init
```

### Lỗi: "remote origin already exists"

```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/repo.git
```

### Lỗi: "failed to push some refs"

```bash
# Pull code mới nhất trước
git pull origin main --rebase

# Rồi push lại
git push
```

### Lỗi: "Authentication failed"

- Đảm bảo dùng Personal Access Token, không phải password
- Tạo token mới tại: https://github.com/settings/tokens

---

## 💡 MẸO HAY

### 1. Xem lịch sử commit

```bash
git log
```

### 2. Xem thay đổi trước khi commit

```bash
git diff
```

### 3. Commit nhanh (add + commit)

```bash
git commit -am "Message"
```

### 4. Push và theo dõi

```bash
git push && echo "Đã push xong! Kiểm tra Render Dashboard"
```

### 5. Tạo branch mới để test

```bash
# Tạo branch mới
git checkout -b test-feature

# Sửa code và test

# Nếu OK, merge vào main
git checkout main
git merge test-feature
git push
```

---

## 📊 WORKFLOW KHUYẾN NGHỊ

### Development (Phát triển)

```bash
# Sửa code
# Test local: npm start

git add .
git commit -m "Thêm tính năng X"
git push
```

### Hotfix (Sửa lỗi khẩn cấp)

```bash
# Sửa lỗi
# Test nhanh

git add .
git commit -m "Hotfix: Sửa lỗi Y"
git push
```

### Feature (Tính năng mới lớn)

```bash
# Tạo branch riêng
git checkout -b feature-new-payment

# Phát triển tính năng
# Test kỹ

# Merge vào main
git checkout main
git merge feature-new-payment
git push
```

---

## 🎓 GIT COMMANDS THƯỜNG DÙNG

| Lệnh | Mô tả |
|------|-------|
| `git status` | Xem trạng thái hiện tại |
| `git add .` | Thêm tất cả thay đổi |
| `git add file.js` | Thêm file cụ thể |
| `git commit -m "msg"` | Commit với message |
| `git push` | Push lên GitHub |
| `git pull` | Pull code mới từ GitHub |
| `git log` | Xem lịch sử commit |
| `git diff` | Xem thay đổi |
| `git branch` | Xem danh sách branch |
| `git checkout -b name` | Tạo branch mới |

---

## 🔗 LINKS HỮU ÍCH

- GitHub: https://github.com
- Render Dashboard: https://dashboard.render.com
- Git Documentation: https://git-scm.com/doc
- GitHub Tokens: https://github.com/settings/tokens

---

## ✅ TÓM TẮT NHANH

**Lần đầu:**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/USERNAME/repo.git
git push -u origin main
```

**Lần sau:**
```bash
git add .
git commit -m "Mô tả thay đổi"
git push
```

**Render tự động deploy sau 2-3 phút!** 🚀

---

Chúc bạn thành công! Nếu gặp lỗi, hãy hỏi tôi nhé!
