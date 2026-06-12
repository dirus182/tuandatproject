# CHƯƠNG 2: PHÂN TÍCH YÊU CẦU HỆ THỐNG

## 2.1 Bài Toán Đặt Ra

Hệ thống L'Artisan Boulangerie được phát triển để giải quyết một số bài toán cụ thể trong lĩnh vực kinh doanh bán hàng bánh mì và bánh ngọt thủ công trực tuyến:

### 2.1.1 Vấn Đề Kinh Doanh

Cửa hàng bánh mì truyền thống thường gặp những khó khăn sau:

1. **Giới hạn thị trường**: Khách hàng chỉ có thể mua hàng trực tiếp tại cửa hàng, không thể tiếp cận được với khách hàng ở các khu vực xa.

2. **Quản lý sản phẩm thủ công**: Việc lưu giữ thông tin sản phẩm (tên, giá, mô tả, hình ảnh) bằng phương pháp truyền thống (sổ, giấy) khó quản lý và dễ bị lỗi.

3. **Thiếu thông tin chi tiết**: Khách hàng không có cách nào để tìm hiểu kỹ lưỡng về sản phẩm trước khi quyết định mua, như xem hình ảnh chi tiết, danh sách nguyên liệu, hoặc ý kiến của khách hàng khác.

4. **Quản lý đơn hàng phức tạp**: Việc theo dõi, cập nhật trạng thái đơn hàng, thanh toán từng đơn lẻ dẫn đến rất dễ nhầm lẫn và mất hiệu suất.

### 2.1.2 Giải Pháp Đề Xuất

Hệ thống L'Artisan Boulangerie cung cấp một nền tảng e-commerce toàn diện với các tính năng chính sau:

1. **Giỏ hàng trực tuyến**: Khách hàng có thể duyệt sản phẩm, thêm vào giỏ, quản lý số lượng, và xem tổng tiền.

2. **Quản lý sản phẩm tập trung**: Toàn bộ thông tin sản phẩm được lưu trong cơ sở dữ liệu, dễ dàng cập nhật và truy vấn.

3. **Hiển thị thông tin chi tiết**: Khách hàng có thể xem hình ảnh sản phẩm, mô tả chi tiết, nguyên liệu, và đánh giá từ khách hàng khác.

4. **Quản lý đơn hàng tự động**: Hệ thống ghi lại toàn bộ thông tin đơn hàng, từ sản phẩm được chọn cho đến giá tiền và trạng thái.

5. **Hệ thống đánh giá và bình luận**: Khách hàng có thể để lại đánh giá sản phẩm, giúp khách hàng khác đưa ra quyết định mua sắm tốt hơn.

---

## 2.2 Đối Tượng Sử Dụng

Hệ thống L'Artisan Boulangerie được thiết kế để phục vụ hai đối tượng chính:

### 2.2.1 Khách Hàng (Customer)

**Định nghĩa**: Khách hàng là những người dùng truy cập vào ứng dụng web, tìm kiếm, xem và mua các sản phẩm bánh mì, bánh ngọt.

**Đặc điểm**:
- Có thể truy cập từ bất kỳ thiết bị nào có kết nối internet (máy tính, máy tính bảng, điện thoại)
- Không cần có kiến thức kỹ thuật chuyên sâu
- Mong muốn tìm kiếm sản phẩm nhanh chóng, so sánh giá, xem bình luận của người khác
- Có nhu cầu quản lý giỏ hàng của mình

**Hành động chính**:
- Duyệt danh sách sản phẩm
- Xem chi tiết từng sản phẩm
- Lọc và sắp xếp sản phẩm theo tiêu chí
- Thêm sản phẩm vào giỏ hàng
- Quản lý giỏ hàng (xem, sửa số lượng, xóa sản phẩm)
- Xem bình luận và đánh giá sản phẩm
- Xem tổng hóa đơn trước khi thanh toán

### 2.2.2 Quản Trị Viên (Administrator)

**Định nghĩa**: Quản trị viên là những nhân viên của cửa hàng bánh mì có quyền quản lý toàn bộ hệ thống, bao gồm sản phẩm, đơn hàng, bình luận, và thông tin thanh toán.

**Đặc điểm**:
- Là nhân viên được phép truy cập vào các chức năng quản lý
- Có trách nhiệm duy trì tính chính xác của dữ liệu trong hệ thống
- Cần hiểu biết cơ bản về công nghệ thông tin
- Hoạt động thường xuyên trong giờ hành chính để quản lý hệ thống

**Hành động chính**:
- Tạo mới sản phẩm
- Cập nhật thông tin sản phẩm (giá, mô tả, hình ảnh)
- Xóa sản phẩm khỏi hệ thống
- Tạo đơn hàng mới
- Cập nhật trạng thái đơn hàng
- Xóa đơn hàng
- Tạo bình luận/đánh giá sản phẩm
- Cập nhật bình luận/đánh giá
- Xóa bình luận/đánh giá không phù hợp
- Quản lý thông tin thanh toán
- Quản lý danh sách thể loại sản phẩm

---

## 2.3 Yêu Cầu Chức Năng

Yêu cầu chức năng mô tả những gì mà hệ thống phải làm được, tức là các tính năng cụ thể mà ứng dụng cần cung cấp. Các yêu cầu chức năng được chia thành hai nhóm: dành cho Khách hàng và dành cho Quản trị viên.

### 2.3.1 Yêu Cầu Chức Năng Dành Cho Khách Hàng

#### RF.C.1: Xem Danh Sách Sản Phẩm
- **Mô tả**: Khách hàng có thể xem toàn bộ danh sách sản phẩm được cửa hàng cung cấp.
- **Dữ liệu đầu vào**: Không có
- **Dữ liệu đầu ra**: Danh sách sản phẩm với thông tin: tên, giá, hình ảnh, đánh giá
- **API liên quan**: GET /api/products
- **Điều kiện tiên quyết**: Khách hàng truy cập vào trang Collections
- **Kết quả mong đợi**: Hiển thị tất cả sản phẩm dưới dạng lưới (grid)

#### RF.C.2: Xem Chi Tiết Sản Phẩm
- **Mô tả**: Khách hàng có thể xem thông tin chi tiết về một sản phẩm cụ thể.
- **Dữ liệu đầu vào**: ID sản phẩm
- **Dữ liệu đầu ra**: Tên, giá, hình ảnh, mô tả, danh sách nguyên liệu, đánh giá, số bình luận
- **API liên quan**: GET /api/products/{id}
- **Điều kiện tiên quyết**: Khách hàng click vào một sản phẩm từ danh sách
- **Kết quả mong đợi**: Mở trang chi tiết sản phẩm với đầy đủ thông tin

#### RF.C.3: Lọc Sản Phẩm Theo Thể Loại
- **Mô tả**: Khách hàng có thể lọc danh sách sản phẩm theo thể loại (Bánh ngọt, Bánh nướng, Bánh quy, Bánh mì).
- **Dữ liệu đầu vào**: Thể loại sản phẩm được chọn
- **Dữ liệu đầu ra**: Danh sách sản phẩm thuộc thể loại được chọn
- **Điều kiện tiên quyết**: Khách hàng ở trang Collections
- **Kết quả mong đợi**: Danh sách sản phẩm được cập nhật theo lựa chọn

#### RF.C.4: Lọc Sản Phẩm Theo Vị (Flavor)
- **Mô tả**: Khách hàng có thể lọc sản phẩm theo vị (Vani, Socola, Dâu tây, Matcha).
- **Dữ liệu đầu vào**: Các vị được chọn
- **Dữ liệu đầu ra**: Danh sách sản phẩm có vị được chọn
- **Điều kiện tiên quyết**: Khách hàng ở trang Collections
- **Kết quả mong đợi**: Danh sách sản phẩm được cập nhật; có thể chọn nhiều vị cùng lúc

#### RF.C.5: Lọc Sản Phẩm Theo Khoảng Giá
- **Mô tả**: Khách hàng có thể lọc sản phẩm trong một khoảng giá cụ thể.
- **Dữ liệu đầu vào**: Khoảng giá được chọn
- **Dữ liệu đầu ra**: Danh sách sản phẩm trong khoảng giá
- **Điều kiện tiên quyết**: Khách hàng ở trang Collections
- **Kết quả mong đợi**: Danh sách sản phẩm được cập nhật theo khoảng giá

#### RF.C.6: Sắp Xếp Sản Phẩm
- **Mô tả**: Khách hàng có thể sắp xếp danh sách sản phẩm theo: độ phổ biến, giá (thấp đến cao), giá (cao đến thấp), hoặc đánh giá.
- **Dữ liệu đầu vào**: Tiêu chí sắp xếp được chọn
- **Dữ liệu đầu ra**: Danh sách sản phẩm được sắp xếp
- **Điều kiện tiên quyết**: Khách hàng ở trang Collections hoặc trang Home
- **Kết quả mong đợi**: Danh sách sản phẩm được sắp xếp theo tiêu chí

#### RF.C.7: Thêm Sản Phẩm Vào Giỏ Hàng
- **Mô tả**: Khách hàng có thể thêm sản phẩm vào giỏ hàng với số lượng tùy chọn.
- **Dữ liệu đầu vào**: ID sản phẩm, số lượng
- **Dữ liệu đầu ra**: Cập nhật giỏ hàng, hiển thị số lượng sản phẩm trên biểu tượng giỏ
- **Điều kiện tiên quyết**: Khách hàng ở trang chi tiết sản phẩm hoặc danh sách sản phẩm
- **Kết quả mong đợi**: Sản phẩm được thêm vào giỏ; số lượng trên giỏ được cập nhật

#### RF.C.8: Xem Giỏ Hàng
- **Mô tả**: Khách hàng có thể xem tất cả sản phẩm trong giỏ hàng của mình.
- **Dữ liệu đầu vào**: Không có
- **Dữ liệu đầu ra**: Danh sách sản phẩm trong giỏ, đơn giá, số lượng, tổng tiền từng sản phẩm
- **Điều kiện tiên quyết**: Giỏ hàng có ít nhất 1 sản phẩm
- **Kết quả mong đợi**: Hiển thị trang Cart với toàn bộ thông tin sản phẩm

#### RF.C.9: Cập Nhật Số Lượng Sản Phẩm Trong Giỏ
- **Mô tả**: Khách hàng có thể tăng hoặc giảm số lượng của từng sản phẩm trong giỏ.
- **Dữ liệu đầu vào**: ID sản phẩm, số lượng mới
- **Dữ liệu đầu ra**: Giỏ hàng được cập nhật, tổng tiền được tính toán lại
- **Điều kiện tiên quyết**: Khách hàng ở trang Cart
- **Kết quả mong đợi**: Số lượng sản phẩm được thay đổi; tổng tiền được cập nhật

#### RF.C.10: Xóa Sản Phẩm Khỏi Giỏ Hàng
- **Mô tả**: Khách hàng có thể xóa sản phẩm khỏi giỏ hàng.
- **Dữ liệu đầu vào**: ID sản phẩm cần xóa
- **Dữ liệu đầu ra**: Giỏ hàng được cập nhật (sản phẩm bị xóa)
- **Điều kiện tiên quyết**: Sản phẩm có trong giỏ hàng
- **Kết quả mong đợi**: Sản phẩm bị xóa; giỏ được cập nhật; tổng tiền được tính toán lại

#### RF.C.11: Xem Đánh Giá Sản Phẩm
- **Mô tả**: Khách hàng có thể xem các bình luận, đánh giá sao, và ý kiến từ những khách hàng khác về sản phẩm.
- **Dữ liệu đầu vào**: ID sản phẩm
- **Dữ liệu đầu ra**: Danh sách bình luận với tên tác giả, số sao, nội dung, ngày đánh giá
- **API liên quan**: GET /api/reviews
- **Điều kiện tiên quyết**: Khách hàng ở trang chi tiết sản phẩm
- **Kết quả mong đợi**: Hiển thị tất cả bình luận và điểm đánh giá trung bình

#### RF.C.12: Xem Hóa Đơn
- **Mô tả**: Khách hàng có thể xem chi tiết hóa đơn bao gồm: tiền hàng, tiền thuế, phí vận chuyển, và tổng tiền.
- **Dữ liệu đầu vào**: Không có
- **Dữ liệu đầu ra**: Chi tiết hóa đơn gồm subtotal, tax, shipping, total
- **Điều kiện tiên quyết**: Khách hàng ở trang Cart và giỏ hàng không trống
- **Kết quả mong đợi**: Hiển thị chi tiết tính toán giá tiền

### 2.3.2 Yêu Cầu Chức Năng Dành Cho Quản Trị Viên

#### RF.A.1: Tạo Sản Phẩm Mới
- **Mô tả**: Quản trị viên có thể tạo một sản phẩm mới và thêm vào hệ thống.
- **Dữ liệu đầu vào**: Tên sản phẩm, ID thể loại, số lượng, giá, mô tả, ngày tạo
- **Dữ liệu đầu ra**: Sản phẩm được lưu trong cơ sở dữ liệu
- **API liên quan**: POST /api/products
- **Điều kiện tiên quyết**: Quản trị viên có quyền truy cập vào chức năng quản lý sản phẩm
- **Kết quả mong đợi**: Sản phẩm được tạo thành công; ID sản phẩm được gán tự động
- **Xác thực**: Tất cả dữ liệu bắt buộc phải hợp lệ (giá > 0, tên không được trống, ID thể loại hợp lệ)

#### RF.A.2: Cập Nhật Thông Tin Sản Phẩm
- **Mô tả**: Quản trị viên có thể cập nhật thông tin của sản phẩm đã tồn tại.
- **Dữ liệu đầu vào**: ID sản phẩm, các trường cần cập nhật (tên, giá, mô tả, v.v.)
- **Dữ liệu đầu ra**: Sản phẩm được cập nhật trong cơ sở dữ liệu
- **API liên quan**: PUT /api/products/{id}
- **Điều kiện tiên quyết**: Sản phẩm tồn tại trong hệ thống
- **Kết quả mong đợi**: Thông tin sản phẩm được thay đổi; khách hàng thấy thông tin mới khi xem
- **Xác thực**: Dữ liệu phải hợp lệ (giá > 0, tên không được trống)

#### RF.A.3: Xóa Sản Phẩm
- **Mô tả**: Quản trị viên có thể xóa sản phẩm khỏi hệ thống.
- **Dữ liệu đầu vào**: ID sản phẩm cần xóa
- **Dữ liệu đầu ra**: Sản phẩm bị xóa khỏi cơ sở dữ liệu
- **API liên quan**: DELETE /api/products/{id}
- **Điều kiện tiên quyết**: Sản phẩm tồn tại trong hệ thống
- **Kết quả mong đợi**: Sản phẩm không còn xuất hiện trong danh sách khách hàng
- **Cảnh báo**: Nếu sản phẩm có trong đơn hàng, cần cân nhắc trước khi xóa

#### RF.A.4: Xem Tất Cả Sản Phẩm
- **Mô tả**: Quản trị viên có thể xem danh sách tất cả sản phẩm trong hệ thống.
- **Dữ liệu đầu vào**: Không có
- **Dữ liệu đầu ra**: Danh sách đầy đủ của tất cả sản phẩm
- **API liên quan**: GET /api/products
- **Kết quả mong đợi**: Hiển thị danh sách tất cả sản phẩm

#### RF.A.5: Tạo Đơn Hàng
- **Mô tả**: Quản trị viên có thể tạo một đơn hàng mới trong hệ thống.
- **Dữ liệu đầu vào**: ID khách hàng, trạng thái, ngày đặt hàng, tổng giá tiền
- **Dữ liệu đầu ra**: Đơn hàng được tạo và lưu trong cơ sở dữ liệu
- **API liên quan**: POST /api/orders
- **Điều kiện tiên quyết**: Khách hàng tồn tại trong hệ thống
- **Kết quả mong đợi**: Đơn hàng được tạo; ID đơn hàng được gán tự động
- **Xác thực**: Trạng thái phải hợp lệ (pending, shipped, hoặc canceled); tổng giá ≥ 0

#### RF.A.6: Cập Nhật Trạng Thái Đơn Hàng
- **Mô tả**: Quản trị viên có thể cập nhật trạng thái của đơn hàng (ví dụ: từ pending sang shipped).
- **Dữ liệu đầu vào**: ID đơn hàng, trạng thái mới
- **Dữ liệu đầu ra**: Đơn hàng được cập nhật
- **API liên quan**: PUT /api/orders/{id}
- **Điều kiện tiên quyết**: Đơn hàng tồn tại trong hệ thống
- **Kết quả mong đợi**: Trạng thái đơn hàng thay đổi thành công
- **Xác thực**: Trạng thái phải hợp lệ

#### RF.A.7: Xóa Đơn Hàng
- **Mô tả**: Quản trị viên có thể xóa đơn hàng. Khi xóa đơn hàng, các bản ghi liên quan (OrderDetail, Review, Payment) cũng bị xóa theo.
- **Dữ liệu đầu vào**: ID đơn hàng
- **Dữ liệu đầu ra**: Đơn hàng và các bản ghi liên quan bị xóa khỏi cơ sở dữ liệu
- **API liên quan**: DELETE /api/orders/{id}
- **Điều kiện tiên quyết**: Đơn hàng tồn tại trong hệ thống
- **Kết quả mong đợi**: Đơn hàng và tất cả dữ liệu liên quan bị xóa hoàn toàn
- **Ghi chú**: Quá trình xóa theo thứ tự: Review → OrderDetail → Payment → Order

#### RF.A.8: Quản Lý Bình Luận/Đánh Giá
- **Mô tả**: Quản trị viên có thể tạo, cập nhật, hoặc xóa bình luận/đánh giá sản phẩm.
- **Dữ liệu đầu vào**: ID đánh giá, nội dung bình luận, số sao (1-5), ID OrderDetail
- **Dữ liệu đầu ra**: Bình luận được lưu/cập nhật/xóa
- **API liên quan**: POST /api/reviews, PUT /api/reviews/{id}, DELETE /api/reviews/{id}
- **Điều kiện tiên quyết**: OrderDetail tồn tại (để tạo review mới)
- **Kết quả mong đợi**: Bình luận được quản lý thành công
- **Xác thực**: Đánh giá phải từ 1-5 sao; nội dung bình luận không được trống

#### RF.A.9: Quản Lý Thông Tin Thanh Toán
- **Mô tả**: Quản trị viên có thể tạo, cập nhật, hoặc xóa thông tin thanh toán.
- **Dữ liệu đầu vào**: ID thanh toán, ID đơn hàng, phương thức (paypal/cash/credit_card), trạng thái (pending/completed), ngày thanh toán
- **Dữ liệu đầu ra**: Thông tin thanh toán được lưu/cập nhật/xóa
- **API liên quan**: POST /api/payments, PUT /api/payments/{id}, DELETE /api/payments/{id}
- **Xác thực**: Phương thức thanh toán phải hợp lệ; trạng thái phải hợp lệ

#### RF.A.10: Quản Lý Danh Sách Thể Loại Sản Phẩm
- **Mô tả**: Quản trị viên có thể tạo, cập nhật, hoặc xóa danh sách thể loại sản phẩm (OptionCake).
- **Dữ liệu đầu vào**: ID thể loại, tên thể loại
- **Dữ liệu đầu ra**: Thể loại được lưu/cập nhật/xóa
- **API liên quan**: POST /api/options, PUT /api/options/{id}, DELETE /api/options/{id}
- **Xác thực**: Tên thể loại không được trống

---

## 2.4 Yêu Cầu Phi Chức Năng

Yêu cầu phi chức năng mô tả các đặc tính chất lượng của hệ thống, bao gồm hiệu suất, bảo mật, khả năng sử dụng, và tính sẵn sàng.

### 2.4.1 Yêu Cầu Hiệu Suất

**NFR.1.1 - Thời Gian Phản Hồi**
- Các API phải trả về kết quả trong vòng 2 giây đối với các yêu cầu bình thường
- Thời gian tải trang web phải dưới 3 giây trên kết nối Internet tiêu chuẩn
- Giao diện phải phản hồi ngay lập tức khi người dùng thực hiện thao tác (thêm vào giỏ, lọc sản phẩm)

**NFR.1.2 - Khả Năng Xử Lý Tải (Scalability)**
- Hệ thống phải có thể xử lý đồng thời ít nhất 100 người dùng trên cùng một lúc
- Cơ sở dữ liệu phải có thể lưu trữ ít nhất 10,000 sản phẩm mà không ảnh hưởng đến hiệu suất

**NFR.1.3 - Tối Ưu Hóa Kích Thước Dữ Liệu**
- Hình ảnh sản phẩm phải được nén tối ưu để giảm thời gian tải
- API chỉ trả về dữ liệu cần thiết, tránh tải dữ liệu thừa

### 2.4.2 Yêu Cầu Bảo Mật

**NFR.2.1 - Xác Thực Dữ Liệu**
- Tất cả dữ liệu đầu vào từ người dùng phải được xác thực (kiểm tra dữ liệu có hợp lệ hay không)
- Giá tiền phải là số dương; tên sản phẩm không được trống; số lượng phải ≥ 0

**NFR.2.2 - Bảo Vệ Dữ Liệu**
- Kết nối giữa client và server phải được bảo vệ bằng HTTPS/SSL
- Dữ liệu trong cơ sở dữ liệu phải được bảo vệ bằng các biện pháp kiểm soát truy cập

**NFR.2.3 - Bảo Vệ Chống Lỗi**
- Hệ thống phải xử lý các lỗi một cách an toàn, không để lộ thông tin nhạy cảm
- Các thông báo lỗi phải rõ ràng nhưng không cung cấp thông tin có thể khai thác được

### 2.4.3 Yêu Cầu Khả Năng Sử Dụng

**NFR.3.1 - Giao Diện Thân Thiện**
- Giao diện phải dễ hiểu, không có những thành phần phức tạp không cần thiết
- Các nút bấm phải rõ ràng và dễ tìm thấy
- Lỗi người dùng phải được thông báo rõ ràng

**NFR.3.2 - Thiết Kế Responsive**
- Ứng dụng web phải hoạt động tốt trên tất cả các kích thước màn hình: máy tính để bàn (1920x1080), máy tính bảng (768x1024), và điện thoại di động (375x667)
- Bố cục phải tự động điều chỉnh theo kích thước màn hình
- Các nút bấm phải có kích thước đủ lớn để dễ nhấn trên thiết bị di động

**NFR.3.3 - Hỗ Trợ Nhiều Trình Duyệt**
- Ứng dụng phải hoạt động trên các trình duyệt hiện đại: Chrome, Firefox, Safari, Edge
- Không cần hỗ trợ các trình duyệt cũ (IE 11 trở lên)

### 2.4.4 Yêu Cầu Tính Sẵn Sàng

**NFR.4.1 - Tính Tin Cậy**
- Hệ thống phải có thời gian hoạt động ≥ 99% trong tháng (tối đa 7 giờ ngừng hoạt động)
- Dữ liệu phải được lưu trữ an toàn; không được mất dữ liệu

**NFR.4.2 - Khôi Phục Sau Sự Cố**
- Nếu hệ thống gặp sự cố, phải có cơ chế backup dữ liệu
- Thời gian khôi phục sau lỗi phải dưới 1 giờ

**NFR.4.3 - Bảo Trì Không Ảnh Hưởng**
- Các bản cập nhật hệ thống phải được thực hiện vào giờ vàng (thường là ngoài giờ kinh doanh)
- Khách hàng không nên bị ảnh hưởng quá lâu

### 2.4.5 Yêu Cầu Kỹ Thuật

**NFR.5.1 - Công Nghệ Sử Dụng**
- Backend: Spring Boot 4.0.6, Java 17, PostgreSQL
- Frontend: React 18+, TypeScript, Vite
- Containerization: Docker

**NFR.5.2 - Khả Năng Bảo Trì**
- Mã nguồn phải tuân theo các tiêu chuẩn mã hóa
- Tài liệu phải được cập nhật cùng với mã
- Các chút lỗi phải được sửa chữa nhanh chóng

---

## 2.5 Biểu Đồ Use Case Mô Tả Bằng Văn Bản

Biểu đồ Use Case mô tả các tương tác chính giữa các diễn viên (Khách hàng, Quản trị viên) và hệ thống. Dưới đây là mô tả chi tiết các kịch bản sử dụng:

### 2.5.1 Use Case: Khách Hàng Mua Sắm (UC.C.1)

**Tên Use Case**: Mua Sắm Sản Phẩm

**Diễn Viên**: Khách Hàng

**Mục Đích**: Khách hàng duyệt sản phẩm, lọc, sắp xếp, thêm vào giỏ hàng

**Điều Kiện Tiên Quyết**: Khách hàng truy cập vào ứng dụng

**Quy Trình Chính**:
1. Khách hàng truy cập trang Home
2. Khách hàng chọn "Browse Collections" hoặc truy cập trang Collections
3. Hệ thống hiển thị danh sách sản phẩm
4. Khách hàng có thể:
   - Lọc theo thể loại bằng cách chọn từ danh sách bên trái
   - Lọc theo vị bằng cách tích vào checkbox
   - Lọc theo khoảng giá bằng cách chọn một trong các tùy chọn
   - Sắp xếp bằng cách chọn từ dropdown
5. Hệ thống cập nhật danh sách sản phẩm theo các lựa chọn
6. Khách hàng click vào một sản phẩm để xem chi tiết
7. Hệ thống hiển thị trang ProductDetail với thông tin đầy đủ
8. Khách hàng thay đổi số lượng (tuỳ chọn)
9. Khách hàng click "ADD TO CART"
10. Hệ thống thêm sản phẩm vào giỏ; cập nhật số lượng trên icon giỏ
11. Khách hàng có thể tiếp tục mua sắm hoặc đi tới trang Cart

**Quy Trình Phụ**: Xóa Bộ Lọc
1. Khách hàng click nút "Clear Filters"
2. Hệ thống xóa tất cả lựa chọn lọc
3. Danh sách sản phẩm quay trở lại trạng thái ban đầu

**Kết Quả Mong Đợi**: Sản phẩm được thêm vào giỏ hàng; số lượng trong giỏ được cập nhật

### 2.5.2 Use Case: Quản Lý Giỏ Hàng (UC.C.2)

**Tên Use Case**: Quản Lý Giỏ Hàng

**Diễn Viên**: Khách Hàng

**Mục Đích**: Khách hàng xem, sửa số lượng, hoặc xóa sản phẩm khỏi giỏ

**Điều Kiện Tiên Quyết**: Giỏ hàng có ít nhất 1 sản phẩm

**Quy Trình Chính**:
1. Khách hàng click vào icon giỏ hàng ở thanh điều hướng
2. Hệ thống chuyển hướng đến trang Cart
3. Hệ thống hiển thị danh sách các sản phẩm trong giỏ
4. Khách hàng có thể:
   - Tăng số lượng bằng cách click nút "+"
   - Giảm số lượng bằng cách click nút "−" (nếu số lượng > 1)
   - Xóa sản phẩm bằng cách click biểu tượng xóa (thùng rác)
5. Hệ thống cập nhật tổng tiền (subtotal + tax + shipping = total)
6. Khách hàng có thể:
   - Click "Continue Shopping" để quay lại mua sắm
   - Click "Proceed to Checkout" để chuẩn bị thanh toán

**Kết Quả Mong Đợi**: Giỏ hàng được cập nhật; tổng tiền được tính toán chính xác

### 2.5.3 Use Case: Xem Bình Luận Sản Phẩm (UC.C.3)

**Tên Use Case**: Xem Đánh Giá và Bình Luận

**Diễn Viên**: Khách Hàng

**Mục Đích**: Khách hàng xem điểm đánh giá và ý kiến của khách hàng khác

**Điều Kiện Tiên Quyết**: Khách hàng ở trang ProductDetail

**Quy Trình Chính**:
1. Khách hàng cuộn xuống trang ProductDetail
2. Hệ thống hiển thị phần "Reviews Section"
3. Khách hàng thấy:
   - Điểm đánh giá trung bình (ví dụ: 4.5 sao)
   - Biểu đồ phân bố đánh giá (% khách hàng đánh giá 5 sao, 4 sao, v.v.)
   - Danh sách các bình luận từ khách hàng khác
4. Mỗi bình luận hiển thị: tên tác giả, số sao, tiêu đề, nội dung, ngày đánh giá
5. Khách hàng có thể click "Load More Reviews" để xem thêm bình luận

**Kết Quả Mong Đợi**: Khách hàng thấy được ý kiến của những người khác; có thể đưa ra quyết định mua sắm tốt hơn

### 2.5.4 Use Case: Quản Trị Viên Quản Lý Sản Phẩm (UC.A.1)

**Tên Use Case**: Quản Lý Sản Phẩm

**Diễn Viên**: Quản Trị Viên

**Mục Đích**: Quản trị viên tạo, sửa, xóa thông tin sản phẩm

**Điều Kiện Tiên Quyết**: Quản trị viên có quyền truy cập vào chức năng quản lý

**Quy Trình Chính - Tạo Sản Phẩm**:
1. Quản trị viên gọi API POST /api/products
2. Quản trị viên cung cấp dữ liệu: tên sản phẩm, ID thể loại, số lượng, giá, mô tả
3. Hệ thống xác thực dữ liệu (giá > 0, tên không trống)
4. Hệ thống lưu sản phẩm vào cơ sở dữ liệu
5. Hệ thống trả về mã thành công (status 200)

**Quy Trình Chính - Cập Nhật Sản Phẩm**:
1. Quản trị viên gọi API PUT /api/products/{id}
2. Quản trị viên cung cấp ID sản phẩm và dữ liệu mới
3. Hệ thống xác nhận sản phẩm tồn tại
4. Hệ thống xác thực dữ liệu mới
5. Hệ thống cập nhật sản phẩm trong cơ sở dữ liệu
6. Khách hàng sẽ thấy thông tin mới khi xem sản phẩm

**Quy Trình Chính - Xóa Sản Phẩm**:
1. Quản trị viên gọi API DELETE /api/products/{id}
2. Hệ thống xác nhận sản phẩm tồn tại
3. Hệ thống xóa sản phẩm khỏi cơ sở dữ liệu
4. Sản phẩm không còn xuất hiện trong danh sách khách hàng

**Kết Quả Mong Đợi**: Sản phẩm được tạo, sửa, hoặc xóa thành công

### 2.5.5 Use Case: Quản Trị Viên Quản Lý Đơn Hàng (UC.A.2)

**Tên Use Case**: Quản Lý Đơn Hàng

**Diễn Viên**: Quản Trị Viên

**Mục Đích**: Quản trị viên tạo, cập nhật, hoặc xóa đơn hàng

**Điều Kiện Tiên Quyết**: Khách hàng tồn tại trong hệ thống

**Quy Trình Chính - Tạo Đơn Hàng**:
1. Quản trị viên gọi API POST /api/orders
2. Quản trị viên cung cấp: ID khách hàng, trạng thái, ngày đặt hàng, tổng giá tiền
3. Hệ thống xác thực trạng thái (pending, shipped, hoặc canceled)
4. Hệ thống lưu đơn hàng vào cơ sở dữ liệu
5. ID đơn hàng được gán tự động

**Quy Trình Chính - Cập Nhật Trạng Thái**:
1. Quản trị viên gọi API PUT /api/orders/{id}
2. Quản trị viên cung cấp trạng thái mới (ví dụ: từ pending sang shipped)
3. Hệ thống cập nhật trạng thái đơn hàng
4. Quản trị viên có thể theo dõi quy trình xử lý đơn hàng

**Quy Trình Chính - Xóa Đơn Hàng**:
1. Quản trị viên gọi API DELETE /api/orders/{id}
2. Hệ thống xóa theo thứ tự: Review → OrderDetail → Payment → Order
3. Tất cả dữ liệu liên quan được xóa hoàn toàn

**Kết Quả Mong Đợi**: Đơn hàng được quản lý thành công

### 2.5.6 Use Case: Quản Trị Viên Quản Lý Bình Luận (UC.A.3)

**Tên Use Case**: Quản Lý Bình Luận/Đánh Giá

**Diễn Viên**: Quản Trị Viên

**Mục Đích**: Quản trị viên quản lý bình luận: tạo, sửa, xóa

**Quy Trình Chính - Tạo Bình Luận**:
1. Quản trị viên gọi API POST /api/reviews
2. Quản trị viên cung cấp: ID OrderDetail, nội dung bình luận, số sao (1-5), ngày tạo
3. Hệ thống xác thực dữ liệu (sao từ 1-5, nội dung không trống)
4. Hệ thống lưu bình luận vào cơ sở dữ liệu

**Quy Trình Chính - Cập Nhật/Xóa**:
1. Quản trị viên gọi API PUT hoặc DELETE /api/reviews/{id}
2. Hệ thống cập nhật hoặc xóa bình luận

**Kết Quả Mong Đợi**: Bình luận được quản lý; khách hàng thấy những bình luận phù hợp

---

**Kết Luận Chương 2**: Phân tích yêu cầu hệ thống cho thấy L'Artisan Boulangerie là một ứng dụng e-commerce hoàn chỉnh với 12 chức năng chính dành cho khách hàng và 10 chức năng dành cho quản trị viên. Các yêu cầu phi chức năng đảm bảo hệ thống có hiệu suất cao, an toàn, dễ sử dụng, và tin cậy. Các use case mô tả chi tiết cách các diễn viên tương tác với hệ thống để hoàn thành các mục đích của họ.
