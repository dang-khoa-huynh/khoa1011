import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import products, {
    getProductById,
    formatPrice,
    getDiscountPercent,
    CATEGORY_LABEL,
    GENDER_LABEL
} from "../Data/Products";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import ProductCard from "../components/ProductCard/ProductCard";
import {
    ArrowLeft,
    Check,
    Heart,
    Minus,
    Plus,
    RefreshCcw,
    ShieldCheck,
    Truck,
    Zap,
    ZoomIn,
    Sparkles,
    Layers,
    Award
} from "lucide-react";
import "./ProductDetail.css";

export default function ProductDetail() {
    // 1. Lấy id từ URL thông qua useParams
    const { id } = useParams();
    const navigate = useNavigate();

    // 2. Tìm sản phẩm tương ứng trong dữ liệu
    const product = getProductById(id);

    // 3. Kết nối với Giỏ hàng (CartContext) & Yêu thích (WishlistContext)
    const { addToCart, vipEmail } = useCart();
    const { isInWishlist, toggleWishlist } = useWishlist();

    const liked = product ? isInWishlist(product.id) : false;
    const discountPercent = getDiscountPercent(product);

    // Xác định danh sách size phù hợp theo từng loại sản phẩm
    const availableSizes =
        product?.category === "shoes"
            ? ["38", "39", "40", "41", "42", "43"]
            : product?.category === "bags"
            ? ["Freesize"]
            : ["S", "M", "L", "XL"];

    const sizeHint =
        product?.category === "shoes"
            ? "Bảng size giày chuẩn Châu Á"
            : product?.category === "bags"
            ? "Kích thước tiêu chuẩn đa năng"
            : "Form Oversized rộng thoải mái";

    const defaultSize =
        product?.category === "shoes"
            ? "40"
            : product?.category === "bags"
            ? "Freesize"
            : "M";

    // 4. State quản lý size, số lượng và góc xem ảnh Studio
    const [selectedSize, setSelectedSize] = useState(defaultSize);
    const [quantity, setQuantity] = useState(1);
    const [addedNotice, setAddedNotice] = useState(false);
    const [activeView, setActiveView] = useState("full"); // "full" | "detail" | "texture"
    const [prevId, setPrevId] = useState(id);

    // Đồng bộ lại size, số lượng và góc xem khi chuyển sang xem sản phẩm khác
    if (prevId !== id) {
        setPrevId(id);
        setSelectedSize(defaultSize);
        setQuantity(1);
        setActiveView("full");
    }

    // Xử lý tăng giảm số lượng
    const handleQuantityChange = (delta) => {
        setQuantity((prev) => Math.max(1, Math.min(99, prev + delta)));
    };

    // Xử lý thêm vào giỏ hàng
    const handleAddToCart = () => {
        if (!product) return;
        addToCart(product, selectedSize, quantity, true);
        setAddedNotice(true);
        setTimeout(() => {
            setAddedNotice(false);
        }, 2000);
    };

    // Xử lý Mua ngay (Thêm vào giỏ và chuyển thẳng tới trang Thanh toán)
    const handleBuyNow = () => {
        if (!product) return;
        addToCart(product, selectedSize, quantity, false);
        navigate("/checkout");
    };

    // Trường hợp không tìm thấy sản phẩm với id tương ứng
    if (!product) {
        return (
            <div className="product-not-found">
                <div className="not-found-content">
                    <p className="not-found-code">404</p>
                    <h2>Không tìm thấy sản phẩm</h2>
                    <p className="not-found-desc">
                        Sản phẩm này có thể đã hết hàng hoặc không tồn tại trên hệ thống VYBE.
                    </p>
                    <Link to="/products" className="detail-btn detail-btn-dark">
                        <ArrowLeft size={18} />
                        Quay lại danh sách sản phẩm
                    </Link>
                </div>
            </div>
        );
    }

    // Lấy 4 sản phẩm tương tự cùng danh mục (loại trừ sản phẩm đang xem)
    const relatedProducts = products
        .filter((item) => item.category === product.category && item.id !== product.id)
        .slice(0, 4);

    return (
        <div className="product-detail-page">
            <div className="detail-container">

                {/* BREADCRUMB NAVIGATION */}
                <nav className="detail-breadcrumb" aria-label="Breadcrumb">
                    <Link to="/">Trang chủ</Link>
                    <span className="breadcrumb-separator">/</span>
                    <Link to="/products">Sản phẩm</Link>
                    <span className="breadcrumb-separator">/</span>
                    <Link to={`/products?category=${product.category}`}>
                        {CATEGORY_LABEL[product.category] || "Danh mục"}
                    </Link>
                    <span className="breadcrumb-separator">/</span>
                    <span className="breadcrumb-current">{product.name}</span>
                </nav>

                {/* MAIN DETAIL GRID: 2 CỘT */}
                <div className="detail-layout">

                    {/* CỘT TRÁI: GALLERY HÌNH ẢNH STUDIO CHUYÊN NGHIỆP */}
                    <div className="detail-media">
                        <div className="detail-image-box">
                            {/* Ánh sáng nền và bóng đổ sàn Studio */}
                            <div className="detail-studio-floor" aria-hidden="true" />

                            {/* Cụm nhãn góc trên trái */}
                            <div className="detail-badge-group">
                                {discountPercent > 0 && (
                                    <span className="detail-badge tone-sale">
                                        GIẢM {discountPercent}%
                                    </span>
                                )}
                                {product.badge && product.badge !== "SALE" && (
                                    <span className={`detail-badge tone-${product.badge.toLowerCase()}`}>
                                        {product.badge}
                                    </span>
                                )}
                                <span className="detail-sku-pill">
                                    SKU: VYBE-0{product.id}
                                </span>
                            </div>

                            {/* Nút chuyển nhanh chế độ Zoom cận cảnh góc trên phải */}
                            <button
                                type="button"
                                className={`detail-zoom-toggle ${activeView !== "full" ? "is-active" : ""}`}
                                onClick={() => setActiveView(activeView === "full" ? "detail" : "full")}
                                title="Chuyển chế độ xem cận cảnh"
                            >
                                <ZoomIn size={16} />
                                <span>{activeView === "full" ? "Soi cận cảnh" : "Thu nhỏ"}</span>
                            </button>

                            {/* Khung trung gian xử lý phóng to mượt mà (Tách riêng khỏi mix-blend-mode để chống lỗi cắt ảnh trên Chrome) */}
                            <div className={`detail-img-stage is-view-${activeView}`}>
                                <img
                                    src={product.img}
                                    alt={product.alt || product.name}
                                    className="detail-main-img"
                                />
                            </div>
                        </div>

                        {/* THANH CHỌN 3 MỨC PHÓNG TO TRỰC QUAN (THUMBNAIL GALLERY) */}
                        <div className="detail-thumbs-row">
                            <button
                                type="button"
                                className={`detail-thumb-card ${activeView === "full" ? "active" : ""}`}
                                onClick={() => setActiveView("full")}
                            >
                                <div className="detail-thumb-preview is-full">
                                    <img src={product.img} alt="Xem toàn bộ" />
                                </div>
                                <div className="detail-thumb-meta">
                                    <strong>Xem toàn bộ</strong>
                                    <span>Tổng thể sản phẩm</span>
                                </div>
                            </button>

                            <button
                                type="button"
                                className={`detail-thumb-card ${activeView === "detail" ? "active" : ""}`}
                                onClick={() => setActiveView("detail")}
                            >
                                <div className="detail-thumb-preview is-detail">
                                    <img src={product.img} alt="Xem gần họa tiết" />
                                </div>
                                <div className="detail-thumb-meta">
                                    <strong>Xem gần (1.4x)</strong>
                                    <span>Họa tiết & Thiết kế</span>
                                </div>
                            </button>

                            <button
                                type="button"
                                className={`detail-thumb-card ${activeView === "texture" ? "active" : ""}`}
                                onClick={() => setActiveView("texture")}
                            >
                                <div className="detail-thumb-preview is-texture">
                                    <img src={product.img} alt="Soi rõ chất vải" />
                                </div>
                                <div className="detail-thumb-meta">
                                    <strong>Soi chất vải (1.6x)</strong>
                                    <span>Phóng to chi tiết</span>
                                </div>
                            </button>
                        </div>

                        {/* THÔNG SỐ KỸ THUẬT SẢN PHẨM DƯỚI KHUNG ẢNH */}
                        <div className="detail-studio-specs">
                            <div className="studio-spec-box">
                                <Layers size={16} />
                                <div>
                                    <span>CHẤT LIỆU CAO CẤP</span>
                                    <strong>
                                        {product.category === "shoes"
                                            ? "Da Microfiber & Đế Cao Su"
                                            : product.category === "bags"
                                            ? "Vải Cordura Chống Thấm"
                                            : "Cotton 250GSM / Nỉ Dày Dặn"}
                                    </strong>
                                </div>
                            </div>
                            <div className="studio-spec-box">
                                <Sparkles size={16} />
                                <div>
                                    <span>KIỂU DÁNG CHUẨN</span>
                                    <strong>{sizeHint}</strong>
                                </div>
                            </div>
                            <div className="studio-spec-box">
                                <Award size={16} />
                                <div>
                                    <span>CAM KẾT CHẤT LƯỢNG</span>
                                    <strong>Đổi Mới Ngay Nếu Có Lỗi</strong>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CỘT PHẢI: THÔNG TIN VÀ TÙY CHỌN MUA HÀNG */}
                    <div className="detail-info">

                        {/* META (DANH MỤC & GIỚI TÍNH) */}
                        <div className="detail-meta">
                            <span>{CATEGORY_LABEL[product.category] || "Thời trang"}</span>
                            <span>•</span>
                            <span>{GENDER_LABEL[product.gender] || "Unisex"}</span>
                            <span>•</span>
                            <span>VYBE / 2026</span>
                        </div>

                        {/* TÊN SẢN PHẨM */}
                        <h1 className="detail-title">{product.name}</h1>

                        {/* GIÁ TIỀN (HỖ TRỢ GIÁ KHUYẾN MÃI & GIÁ GỐC) */}
                        <div className="detail-price-wrap">
                            <p className={`detail-price ${discountPercent > 0 ? "is-sale" : ""}`}>
                                {formatPrice(product.price)}
                            </p>
                            {discountPercent > 0 && (
                                <>
                                    <span className="detail-old-price">
                                        {formatPrice(product.originalPrice)}
                                    </span>
                                    <span className="detail-save-pill">
                                        Tiết kiệm {formatPrice(product.originalPrice - product.price)}
                                    </span>
                                </>
                            )}
                            <span className="detail-vat">Đã bao gồm thuế VAT</span>
                        </div>

                        {/* THÔNG BÁO KÍCH HOẠT TỰ ĐỘNG GIÁ VIP -15% KHI ĐÃ NHẬP GMAIL */}
                        {vipEmail && (
                            <div className="detail-vip-active-box">
                                <span className="detail-vip-tag">VIP15 ACTIVE (-15%)</span>
                                <p>
                                    Đặc quyền Gmail <b>{vipEmail}</b>: Tự động giảm thêm <b>15%</b> khi mua — chỉ còn{" "}
                                    <strong>{formatPrice(Math.round(product.price * 0.85))}</strong> / sản phẩm!
                                </p>
                            </div>
                        )}

                        {/* MÔ TẢ NGẮN */}
                        {product.description && (
                            <p className="detail-desc">{product.description}</p>
                        )}

                        <div className="detail-divider" />

                        {/* BỘ CHỌN KÍCH CỠ (SIZE) */}
                        <div className="detail-option-group">
                            <div className="option-header">
                                <label className="option-label">
                                    Kích cỡ: <strong>{selectedSize}</strong>
                                </label>
                                <span className="size-guide-hint">{sizeHint}</span>
                            </div>

                            <div className="size-selector">
                                {availableSizes.map((size) => (
                                    <button
                                        key={size}
                                        type="button"
                                        className={`size-btn ${selectedSize === size ? "active" : ""}`}
                                        onClick={() => setSelectedSize(size)}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* BỘ CHỌN SỐ LƯỢNG */}
                        <div className="detail-option-group detail-qty-group">
                            <div className="option-header">
                                <label className="option-label">Số lượng</label>
                            </div>
                            <div className="quantity-stepper">
                                <button
                                    type="button"
                                    onClick={() => handleQuantityChange(-1)}
                                    disabled={quantity <= 1}
                                    aria-label="Giảm số lượng"
                                >
                                    <Minus size={16} />
                                </button>
                                <span className="quantity-value">{quantity}</span>
                                <button
                                    type="button"
                                    onClick={() => handleQuantityChange(1)}
                                    aria-label="Tăng số lượng"
                                >
                                    <Plus size={16} />
                                </button>
                            </div>
                        </div>

                        {/* NÚT THÊM VÀO GIỎ, MUA NGAY, YÊU THÍCH */}
                        <div className="detail-actions">
                            <div className="detail-primary-row">
                                <button
                                    type="button"
                                    className="detail-btn detail-btn-primary"
                                    onClick={handleAddToCart}
                                >
                                    {addedNotice ? (
                                        <>
                                            <Check size={18} />
                                            Đã thêm vào giỏ hàng
                                        </>
                                    ) : (
                                        "Thêm vào giỏ hàng"
                                    )}
                                </button>

                                <button
                                    type="button"
                                    className="detail-btn detail-btn-buynow"
                                    onClick={handleBuyNow}
                                >
                                    <Zap size={17} />
                                    Mua ngay
                                </button>

                                <button
                                    type="button"
                                    className={`detail-wishlist-btn ${liked ? "is-active" : ""}`}
                                    onClick={() => toggleWishlist(product)}
                                    aria-label={liked ? "Bỏ yêu thích" : "Thêm vào yêu thích"}
                                    title={liked ? "Đã lưu trong Yêu thích" : "Lưu vào Yêu thích"}
                                >
                                    <Heart size={20} fill={liked ? "currentColor" : "none"} />
                                </button>
                            </div>

                            <Link
                                to="/products"
                                className="detail-btn detail-btn-outline"
                            >
                                <ArrowLeft size={16} />
                                Xem thêm sản phẩm khác
                            </Link>
                        </div>

                        {/* CHÍNH SÁCH ĐẢM BẢO TỪ VYBE */}
                        <div className="detail-perks">
                            <div className="detail-perk-item">
                                <Truck size={20} />
                                <div>
                                    <strong>Giao hàng toàn quốc</strong>
                                    <p>Miễn phí vận chuyển cho đơn từ 499.000₫.</p>
                                </div>
                            </div>

                            <div className="detail-perk-item">
                                <RefreshCcw size={20} />
                                <div>
                                    <strong>Đổi size trong 7 ngày</strong>
                                    <p>Hỗ trợ đổi size tận nơi nếu không vừa vặn.</p>
                                </div>
                            </div>

                            <div className="detail-perk-item">
                                <ShieldCheck size={20} />
                                <div>
                                    <strong>Kiểm tra trước khi nhận</strong>
                                    <p>Xem hàng và thử đồ trước khi thanh toán COD.</p>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

                {/* SẢN PHẨM TƯƠNG TỰ (GỢI Ý PHỐI ĐỒ) */}
                {relatedProducts.length > 0 && (
                    <section className="detail-related-section">
                        <div className="detail-related-head">
                            <div>
                                <span>RECOMMENDED FOR YOU</span>
                                <h2>SẢN PHẨM TƯƠNG TỰ</h2>
                            </div>
                            <Link to={`/products?category=${product.category}`} className="detail-related-more">
                                Xem toàn bộ {CATEGORY_LABEL[product.category]} →
                            </Link>
                        </div>

                        <div className="products-grid">
                            {relatedProducts.map((rel) => (
                                <ProductCard key={rel.id} product={rel} />
                            ))}
                        </div>
                    </section>
                )}

            </div>
        </div>
    );
}
