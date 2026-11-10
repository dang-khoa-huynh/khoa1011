import express from "express";
import cors from "cors";

//1. khởi tạo ứng dụng Server
const app = express();

//2. Cấu hình Middleware (Bộ lọc trung gian)
app.use(cors()); //cho phép Front-end (cổng 5173) gọi sang Back-end
app.use(express.json()); //Giúp Server đọc được dữ liệu JSON gửi lên trong req.body

//3. Tạo API đầu tiên: GET /api/health
app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server VYBE Clothing đã hoạt động thành công!"
    });
});

const sampleProducts = [
    {
        id: 101,
        name: "Vintage Graphic Oversized Tee",
        price: 399000, 
        category: "tops"
    },
    {
        id: 102,
        name: "Rage Oversized T-Shirt",
        price: 345000,
        category: "tops"
    },
    {
        id: 104,
        name: "Multi-Pocket Wide Leg Jeans",
        price: 550000,
        category: "bottoms"
    }
];

// API 1: Lấy tất cả sản phẩm (hoặc lọc theo ? category=...)
app.get("/api/products", (req, res) => {
    const {category} = req.query;
    if (category) {
        const filtered = sampleProducts.filter((item) => item.category === category);
        return res.status(200).json(filtered);
    }
    res.status(200).json(sampleProducts);
});

// API 2: Lấy chi tiết 1 sản phẩm theo ID (:id)
app.get("/api/products/:id", (req, res) => {
    const productId = Number(req.params.id);
    const product = sampleProducts.find((item) => item.id === productId);

    if(!product) {
        return res.status(404).json({
            success: false,
            message: "không tìm thấy sản phẩm này!"
        });
    }
    res.status(200).json(product);
});
// Mảng lưu danh sách các đơn hàng khách đã đặt
const orders = [];

// API 3: Nhận đơn hàng mới từ Front-end gửi lên (POST /api/orders)
app.post("/api/orders", (req, res) => {
    const orderData = req.body; // Lấy toàn bộ thông tin đơn hàng khách gửi lên

    // Kiểm tra nếu thiếu tên khách hàng hoặc số điện thoại thì báo lỗi 400 (Bad Request)
    if(!orderData.customer || !orderData.customer.fullName || !orderData.customer.phone) {
        return res.status(400).json({
            success: false,
            message: "vui lòng cung cấp đầy đủ Họ tên và Số điện thoại!"
        });
    }
    // Lưu đơn hàng vào mảng orders
    orders.unshift(orderData);

    // Trả về mã 201 (Created - Tạo mới thành công)
    res.status(201).json({
        success: true,
        message: "Back-end đã nhận và lưu đơn hàng thành công!",
        data: orderData
    });
});

//API 4: Xem toàn bộ đơn hàng đã đặt (GET/api/orders)
app.get("/api/orders", (req, res) => {
    res.status(200).json(orders);
});

// 4. Mở cổng 5000 cho Server chạy
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});