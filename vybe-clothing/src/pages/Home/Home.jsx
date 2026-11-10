import { Link } from "react-router-dom";
import { RefreshCcw, ShieldCheck, Truck, Flame, Sparkles } from "lucide-react";
import products from "../../Data/Products";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./Home.css";

// =====================================
// CATEGORY DATA
// =====================================

const categories = [
    {
        title: "TOPS",
        to: "/products?category=tops",
        image: "https://i.pinimg.com/736x/cb/34/10/cb34109d2bfbae145b560ccb622380f6.jpg",
        alt: "T-shirt Collection"
    },
    {
        title: "BOTTOMS",
        to: "/products?category=bottoms",
        image: "https://i.pinimg.com/1200x/e7/ed/85/e7ed85de3e276345445ba1db77250e15.jpg",
        alt: "Pants Collection"
    },
    {
        title: "FOOTWEAR",
        to: "/products?category=shoes",
        image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80",
        alt: "Sneakers Collection"
    },
    {
        title: "BAGS",
        to: "/products?category=bags",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
        alt: "Bags Collection"
    }
];

// Lấy 4 sản phẩm nổi bật cho khu vực New Arrivals (đồng bộ trực tiếp từ Data/Products)
const arrivalProductIds = [201, 202, 301, 401];
const arrivalProducts = arrivalProductIds
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean);

// =====================================
// HOME PAGE
// =====================================

export default function Home() {
    return (
        <div className="home-page">

            {/* HERO BANNER — FULL-BLEED DARK STREETWEAR CAMPAIGN */}
            <section className="hero">
                <div className="hero-inner">
                    <div className="hero-content">
                        <div className="hero-badge">
                            <Sparkles size={13} />
                            <span>NEW COLLECTION 2026 // DROP 01</span>
                        </div>

                        <h1>
                            DEFINE YOUR
                            <span>STREETWEAR VYBE.</span>
                        </h1>

                        <p>
                            Ngôn ngữ thời trang đường phố thế hệ mới dành cho giới trẻ.
                            Phom dáng Boxy Oversized phóng khoáng, chất liệu Cotton 250GSM &
                            Heavy Fleece cao cấp cùng ưu đãi mở bán lên tới <strong>25%</strong>.
                        </p>

                        <div className="hero-cta-group">
                            <Link className="home-btn" to="/products">
                                Khám phá ngay
                            </Link>
                            <Link className="home-btn-secondary" to="/promotion">
                                <Flame size={16} />
                                Săn Deal Giảm 25%
                            </Link>
                        </div>

                        <div className="hero-stats-bar">
                            <div>
                                <strong>29+</strong>
                                <span>Thiết kế Streetwear</span>
                            </div>
                            <div>
                                <strong>250 GSM</strong>
                                <span>Heavyweight Cotton</span>
                            </div>
                            <div>
                                <strong>GIẢM 25%</strong>
                                <span>Ưu đãi mùa mới</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PERKS */}
            <section className="perks">
                <div>
                    <Truck size={22} />

                    <div>
                        <strong>Giao hàng toàn quốc</strong>
                        <span>
                            Đơn từ 499.000₫ được miễn phí ship nội thành.
                        </span>
                    </div>
                </div>

                <div>
                    <RefreshCcw size={22} />

                    <div>
                        <strong>Đổi size trong 7 ngày</strong>
                        <span>
                            Giữ tag và hóa đơn để đổi size tại shop.
                        </span>
                    </div>
                </div>

                <div>
                    <ShieldCheck size={22} />

                    <div>
                        <strong>Hàng mới, kiểm tra trước</strong>
                        <span>
                            Xem sản phẩm khi nhận, lỗi được đổi ngay.
                        </span>
                    </div>
                </div>
            </section>

            {/* CATEGORIES */}
            <section className="category-section">
                <div className="category-header">
                    <p>EXPLORE VYBE</p>
                    <h2>SHOP BY CATEGORY</h2>
                </div>

                <div className="category-grid">
                    {categories.map((category) => (
                        <Link
                            className="category-card"
                            key={category.title}
                            to={category.to}
                        >
                            <img
                                className="category-img"
                                src={category.image}
                                alt={category.alt}
                                loading="lazy"
                            />

                            <h3>{category.title}</h3>
                        </Link>
                    ))}
                </div>
            </section>

            {/* NEW ARRIVALS (ĐỒNG BỘ PRODUCT CARD CÓ NÚT TRÁI TIM & GIÁ SALE) */}
            <section className="new-arrivals">
                <div className="product-header">
                    <p>FRESH FROM VYBE</p>

                    <h2>NEW ARRIVALS</h2>

                    <span>
                        Khám phá những thiết kế mới nhất — nhấn biểu tượng trái tim để lưu vào Yêu thích.
                    </span>
                </div>

                <div className="products-grid">
                    {arrivalProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ))}
                </div>

                <div className="arrivals-more">
                    <Link className="home-btn" to="/products">
                        Xem tất cả sản phẩm
                    </Link>
                </div>
            </section>

            {/* LOOKBOOK BANNER */}
            <section className="lookbook">
                <div>
                    <p className="lookbook-label">SEASONAL LOOKBOOK 2026</p>

                    <h2>
                        Áo thun, cargo, sneaker và balo
                        <span> cho outfit đường phố chuẩn VYBE.</span>
                    </h2>

                    <p className="lookbook-desc">
                        Trẻ trung <span>•</span> Cá tính <span>•</span> Dễ phối đồ
                    </p>

                    <div className="lookbook-actions">
                        <Link className="lookbook-primary-btn" to="/collection">
                            Xem Bộ Sưu Tập
                        </Link>
                        <Link className="lookbook-secondary-btn" to="/promotion">
                            Săn Khuyến Mãi -25%
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    );
}
