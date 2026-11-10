import { useState } from "react";
import { Flame, Tag, Copy, Check, Sparkles } from "lucide-react";
import products, {
    formatPrice,
    getDiscountPercent,
    CATEGORY_LABEL
} from "../../Data/Products";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./Promotion.css";

const VOUCHERS = [
    {
        code: "VYBE10",
        title: "GIẢM THÊM 10%",
        desc: "Áp dụng cho mọi đơn hàng tại trang Giỏ hàng",
        tag: "HOT VOUCHER"
    },
    {
        code: "VYBE50K",
        title: "GIẢM NGAY 50.000Đ",
        desc: "Áp dụng cho đơn hàng từ 500.000đ trở lên",
        tag: "ĐƠN TỪ 500K"
    },
    {
        code: "FREESHIP",
        title: "MIỄN PHÍ VẬN CHUYỂN",
        desc: "Tặng 100% phí giao hàng toàn quốc (30.000đ)",
        tag: "FREE DELIVERY"
    }
];

export default function Promotion() {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [sortBy, setSortBy] = useState("discount");
    const [copiedCode, setCopiedCode] = useState("");

    // Lấy toàn bộ sản phẩm có giá khuyến mãi (originalPrice > price)
    const saleProducts = products.filter(
        (item) => item.originalPrice && item.originalPrice > item.price
    );

    // Tự động tính mức giá thấp nhất và mức % giảm cao nhất trong danh sách Sale
    const minSalePrice =
        saleProducts.length > 0
            ? Math.min(...saleProducts.map((item) => item.price))
            : 315000;

    const maxDiscountPercent =
        saleProducts.length > 0
            ? Math.max(...saleProducts.map((item) => getDiscountPercent(item)))
            : 25;

    // Lọc theo danh mục
    const filteredSaleProducts = saleProducts.filter((item) =>
        selectedCategory === "all" ? true : item.category === selectedCategory
    );

    // Sắp xếp sản phẩm khuyến mãi
    const sortedSaleProducts = [...filteredSaleProducts].sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        // Mặc định: ưu tiên phần trăm giảm nhiều nhất; nếu cùng % giảm thì xếp giá từ thấp đến cao để món "Giá từ..." đứng ngay vị trí đầu tiên
        const discountDiff = getDiscountPercent(b) - getDiscountPercent(a);
        return discountDiff !== 0 ? discountDiff : a.price - b.price;
    });

    const handleCopyVoucher = (code) => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(code);
        }
        setCopiedCode(code);
        setTimeout(() => setCopiedCode(""), 2000);
    };

    return (
        <div className="promotion-page">

            {/* HERO BANNER KHUYẾN MÃI */}
            <section className="promo-banner">
                <div className="promo-banner-inner">
                    <div className="promo-badge">
                        <Flame size={15} />
                        <span>SPECIAL SEASON SALE • GIẢM ĐẾN {maxDiscountPercent}%</span>
                    </div>

                    <h1>
                        DEAL CỰC CHÁY <span>GIÁ TỪ {formatPrice(minSalePrice).toUpperCase()}</span>
                    </h1>

                    <p>
                        Săn ngay các thiết kế Áo thun, Hoodie, Jacket, Quần Cargo và Phụ kiện
                        Best-Seller với mức giảm trực tiếp đến {maxDiscountPercent}%. Lưu thêm mã
                        Voucher bên dưới để nhận ưu đãi khi thanh toán!
                    </p>

                    <div className="promo-highlights">
                        <span>✓ Giá gốc & Giá giảm minh bạch</span>
                        <span>✓ Áp dụng cộng dồn Voucher</span>
                        <span>✓ Đổi size trong 7 ngày</span>
                    </div>
                </div>
            </section>

            {/* KHU VỰC MÃ GIẢM GIÁ (VOUCHER) */}
            <section className="promo-vouchers-section">
                <div className="promo-vouchers-head">
                    <div className="voucher-head-title">
                        <Tag size={20} />
                        <div>
                            <h2>MÃ GIẢM GIÁ ĐỘC QUYỀN</h2>
                            <p>Sao chép mã và nhập tại trang Giỏ hàng để được giảm thêm</p>
                        </div>
                    </div>
                </div>

                <div className="promo-vouchers-grid">
                    {VOUCHERS.map((voucher) => {
                        const isCopied = copiedCode === voucher.code;
                        return (
                            <div key={voucher.code} className="voucher-card">
                                <div className="voucher-left">
                                    <span className="voucher-tag">{voucher.tag}</span>
                                    <h3>{voucher.title}</h3>
                                    <p>{voucher.desc}</p>
                                </div>

                                <div className="voucher-right">
                                    <code className="voucher-code">{voucher.code}</code>
                                    <button
                                        type="button"
                                        className={`voucher-copy-btn ${isCopied ? "copied" : ""}`}
                                        onClick={() => handleCopyVoucher(voucher.code)}
                                    >
                                        {isCopied ? (
                                            <>
                                                <Check size={14} />
                                                Đã chép
                                            </>
                                        ) : (
                                            <>
                                                <Copy size={14} />
                                                Sao chép
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* DANH SÁCH SẢN PHẨM ĐANG GIẢM GIÁ */}
            <section className="promo-catalog-section">
                <div className="promo-toolbar">
                    <div className="promo-filter-pills">
                        <button
                            type="button"
                            className={`promo-pill ${selectedCategory === "all" ? "active" : ""}`}
                            onClick={() => setSelectedCategory("all")}
                        >
                            Tất cả Deal ({saleProducts.length})
                        </button>
                        {Object.entries(CATEGORY_LABEL).map(([key, label]) => (
                            <button
                                key={key}
                                type="button"
                                className={`promo-pill ${selectedCategory === key ? "active" : ""}`}
                                onClick={() => setSelectedCategory(key)}
                            >
                                {label}
                            </button>
                        ))}
                    </div>

                    <div className="promo-sort-box">
                        <label htmlFor="promo-sort">Sắp xếp:</label>
                        <select
                            id="promo-sort"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="discount">Giảm giá nhiều nhất</option>
                            <option value="price-asc">Giá: Thấp đến Cao</option>
                            <option value="price-desc">Giá: Cao đến Thấp</option>
                        </select>
                    </div>
                </div>

                <div className="products-grid">
                    {sortedSaleProducts.map((product) => {
                        const savedAmount = product.originalPrice - product.price;
                        return (
                            <div key={product.id} className="promo-card-wrapper">
                                <ProductCard product={product} />
                                <div className="promo-saving-note">
                                    <Sparkles size={13} />
                                    <span>
                                        Tiết kiệm ngay <strong>{formatPrice(savedAmount)}</strong> so với giá gốc {formatPrice(product.originalPrice)}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

        </div>
    );
}
