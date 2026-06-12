# CHƯƠNG 1: GIỚI THIỆU DỰ ÁN

## 1.1 Tổng Quan Dự Án

L'Artisan Boulangerie là một ứng dụng thương mại điện tử (e-commerce) toàn diện dành cho cửa hàng bánh mì và bánh ngọt thủ công. Dự án được xây dựng với kiến trúc hiện đại, sử dụng công nghệ backend Spring Boot và frontend React để tạo ra một nền tảng bán hàng trực tuyến chuyên nghiệp, cho phép khách hàng khám phá, lựa chọn và mua các sản phẩm bánh ngọt chất lượng cao.

Hệ thống được thiết kế theo mô hình kiến trúc ba lớp (Three-Tier Architecture), gồm:
- **Tầng Trình Bày (Presentation Layer)**: Frontend React cung cấp giao diện người dùng thân thiện
- **Tầng Ứng Dụng (Application Layer)**: Các service xử lý logic kinh doanh và xác thực dữ liệu
- **Tầng Dữ Liệu (Data Layer)**: Cơ sở dữ liệu PostgreSQL lưu trữ thông tin sản phẩm, đơn hàng, và khách hàng

Ngoài ra, dự án đã được containerized bằng Docker để dễ dàng triển khai và quản lý môi trường.

## 1.2 Mục Đích Dự Án

Dự án L'Artisan Boulangerie được phát triển với các mục đích chính sau:

1. **Tạo nền tảng bán hàng trực tuyến**: Cung cấp một công cụ để cửa hàng bánh mì có thể bán sản phẩm của mình trên internet, mở rộng phạm vi tiếp cận khách hàng từ địa phương sang toàn quốc.

2. **Xây dựng trải nghiệm người dùng tối ưu**: Thiết kế giao diện đẹp, dễ sử dụng, và đáp ứng (responsive) trên mọi thiết bị (máy tính để bàn, máy tính bảng, điện thoại di động).

3. **Triển khai hệ thống quản lý sản phẩm**: Cung cấp API REST hoàn chỉnh để quản lý sản phẩm, thể loại bánh, tùy chọn sản phẩm, giá cả, và mô tả chi tiết.

4. **Phát triển chức năng giỏ hàng và thanh toán**: Cho phép khách hàng thêm sản phẩm vào giỏ, quản lý số lượng, tính toán tổng tiền và chuẩn bị cho quá trình thanh toán.

5. **Xây dựng hệ thống quản lý đơn hàng**: Ghi lại toàn bộ quá trình từ khi khách hàng đặt hàng cho đến khi thanh toán, bao gồm trạng thái đơn hàng (đang chờ xử lý, đã gửi, đã hủy).

6. **Phát triển hệ thống đánh giá và bình luận**: Cho phép khách hàng để lại nhận xét, đánh giá sản phẩm theo thang điểm từ 1 đến 5 sao.

## 1.3 Phạm Vi Dự Án

### 1.3.1 Các Thành Phần Chính

**Backend (Spring Boot)**
- 7 lớp Entity (Thực thể): Customer, Product, OptionCake, CustomerOrder, OrderDetail, Review, Payment
- 5 Controller REST API: ProductController, CustomerOrderController, ReviewController, PaymentController, OptionCakeController
- 7 Service xử lý logic: ProductService, CustomerOrderService, ReviewService, PaymentService, OptionCakeService, CustomerService, OrderDetailService
- 7 Repository truy cập dữ liệu từ cơ sở dữ liệu PostgreSQL
- Hơn 40 API endpoints hỗ trợ các thao tác CRUD (Create, Read, Update, Delete)

**Frontend (React + TypeScript)**
- 4 trang chính: Home, Collections, ProductDetail, Cart
- 4 thành phần tái sử dụng: Header, Footer, ProductCard, ReviewCard
- Hệ thống lọc sản phẩm theo thể loại, vị vị, khoảng giá
- Hệ thống sắp xếp sản phẩm theo độ phổ biến, giá, và đánh giá
- Giao diện giỏ hàng với chức năng cập nhật số lượng và xóa sản phẩm
- Trang chi tiết sản phẩm với hình ảnh, mô tả, và bình luận khách hàng

### 1.3.2 Các Chức Năng Hiện Có

Dự án hiện đã triển khai thành công các chức năng sau:

**Quản Lý Sản Phẩm**
- Hiển thị tất cả sản phẩm dưới dạng lưới (grid)
- Xem chi tiết sản phẩm kèm hình ảnh, mô tả, và nguyên liệu
- Lọc sản phẩm theo thể loại (Bánh ngọt, Bánh nướng, Bánh quy, Bánh mì)
- Lọc sản phẩm theo vị (Vani, Socola, Dâu tây, Matcha)
- Lọc sản phẩm theo khoảng giá
- Sắp xếp sản phẩm theo độ phổ biến, giá thấp đến cao, giá cao đến thấp, và đánh giá

**Quản Lý Giỏ Hàng**
- Thêm sản phẩm vào giỏ hàng
- Cập nhật số lượng sản phẩm trong giỏ
- Xóa sản phẩm khỏi giỏ
- Hiển thị tổng tiền (bao gồm tiền hàng, tiền thuế, tiền vận chuyển)
- Hiển thị số lượng sản phẩm trong giỏ trên thanh điều hướng

**Xem Đánh Giá Sản Phẩm**
- Hiển thị điểm đánh giá trung bình (từ 1 đến 5 sao)
- Hiển thị danh sách bình luận của khách hàng
- Hiển thị tên tác giả, ngày đánh giá, nội dung nhận xét

**API Backend**
- GET /api/products - Lấy tất cả sản phẩm
- GET /api/products/{id} - Lấy sản phẩm theo ID
- POST /api/products - Tạo sản phẩm mới
- PUT /api/products/{id} - Cập nhật sản phẩm
- DELETE /api/products/{id} - Xóa sản phẩm
- Các API tương tự cho Orders, Reviews, Payments, Options

### 1.3.3 Các Chức Năng Chưa Hoàn Thành

Mặc dù dự án đã đạt được nhiều thành tựu đáng kể, một số chức năng vẫn còn chưa được triển khai hoặc hoàn thiện:

**Backend**
- Hệ thống xác thực (Authentication) và phân quyền (Authorization)
- Ghi nhật ký chi tiết (Logging) cho các hoạt động quan trọng
- Xử lý lỗi toàn diện với các mã lỗi HTTP thích hợp
- Phân trang (Pagination) cho các danh sách dài
- Chức năng tìm kiếm (Search) sản phẩm
- Các bài kiểm tra đơn vị (Unit Tests) và bài kiểm tra tích hợp (Integration Tests)
- Sử dụng Dependency Injection của Spring (@Service, @Repository) thay vì khởi tạo thủ công

**Frontend**
- Trang đăng nhập và đăng ký người dùng
- Trang tài khoản người dùng với lịch sử đơn hàng
- Trang thanh toán với biểu mẫu nhập liệu
- Tích hợp cổng thanh toán (Stripe, PayPal)
- Chức năng danh sách yêu thích (Wishlist)
- Chức năng tìm kiếm sản phẩm
- Lưu trữ giỏ hàng trên máy chủ và cơ sở dữ liệu

**Chung**
- Bộ kiểm tra end-to-end (E2E Tests)
- Hệ thống tích hợp liên tục (CI/CD Pipeline)
- Tài liệu API bằng Swagger/OpenAPI
- Giới hạn số lần truy cập API (Rate Limiting)
- Quản lý phiên bản cơ sở dữ liệu (Database Migrations)

## 1.4 Ý Nghĩa Dự Án

### 1.4.1 Ý Nghĩa Kinh Tế

Dự án L'Artisan Boulangerie mang lại giá trị kinh tế đáng kể:

- **Mở rộng thị trường**: Cho phép cửa hàng bánh truyền thống tiếp cận khách hàng trực tuyến, tăng doanh thu
- **Giảm chi phí vận hành**: Tự động hóa các quy trình quản lý sản phẩm, đơn hàng giúp tiết kiệm chi phí nhân công
- **Tăng hiệu suất bán hàng**: Hệ thống giỏ hàng và thanh toán trực tuyến giúp tăng tốc độ giao dịch

### 1.4.2 Ý Nghĩa Công Nghệ

Về mặt công nghệ, dự án thể hiện:

- **Kiến trúc hiện đại**: Áp dụng mô hình three-tier architecture theo tiêu chuẩn ngành công nghiệp
- **Công nghệ frontend tiên tiến**: Sử dụng React 18, TypeScript, Vite để xây dựng giao diện hiệu suất cao
- **Backend mạnh mẽ**: Sử dụng Spring Boot 4.0 với PostgreSQL để xây dựng API RESTful an toàn và có thể mở rộng
- **Containerization**: Sử dụng Docker để đảm bảo tính nhất quán giữa các môi trường phát triển và sản xuất
- **Responsive Design**: Ứng dụng web tự động thích ứng với mọi kích thước màn hình

### 1.4.3 Ý Nghĩa Giáo Dục

Dự án này là một ứng dụng thực tiễn tuyệt vời để:

- Học tập và áp dụng các nguyên tắc thiết kế phần mềm SOLID
- Hiểu rõ hơn về kiến trúc phần mềm, đặc biệt là mô hình ba tầng
- Nắm vững công nghệ Spring Boot, React, PostgreSQL thông qua dự án thực tế
- Phát triển kỹ năng làm việc với API REST và quản lý dữ liệu

## 1.5 Cấu Trúc Báo Cáo

Báo cáo này được tổ chức thành các chương chính:

- **Chương 1**: Giới thiệu dự án, mục đích, phạm vi và ý nghĩa
- **Chương 2**: Phân tích kiến trúc hệ thống, các thành phần chính và cách chúng tương tác
- **Chương 3**: Mô tả chi tiết các thực thể dữ liệu và mối quan hệ giữa chúng
- **Chương 4**: Triển khai backend, các controller, service, và repository
- **Chương 5**: Triển khai frontend, các trang và thành phần React
- **Chương 6**: Kết quả đạt được, những thách thức gặp phải, và những cải thiện trong tương lai

---

**Tổng cộng**: Dự án L'Artisan Boulangerie là một ứng dụng e-commerce đầy đủ, kết hợp các công nghệ hiện đại để tạo ra một nền tảng bán hàng trực tuyến chuyên nghiệp. Mặc dù vẫn có những chức năng cần hoàn thiện, dự án đã đạt được mục tiêu cơ bản và có tiềm năng phát triển cao trong tương lai.
