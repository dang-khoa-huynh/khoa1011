import { Link } from "react-router-dom";
import { Heart, Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import { useWishlist } from "../../context/WishlistContext";
import { getProductById } from "../../Data/Products";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./Wishlist.css";

export default function Wishlist() {
    const { wishlist, clearWishlist } = useWishlist();

    // Đồng bộ dữ liệu mới nhất từ Data/Products (để luôn hiển thị đúng giá giảm nếu có)
    const wishlistProducts = wishlist.map(
        (saved) => getProductById(saved.id) || saved
    );

    return (
        <div className="wishlist-page">

            {/* WISHLIST BANNER */}
            <section className="wishlist-banner">
                <div className="wishlist-banner-inner">
                    <span className="wishlist-badge">
                        <Heart size={13} fill="currentColor" />
                        MY FAVORITES
                    </span>
                    <h1>DANH SÁCH YÊU THÍCH</h1>
                    <p>
                        Lưu giữ những món đồ Streetwear bạn tâm đắc nhất để dễ dàng so sánh
                        và chốt đơn bất cứ lúc nào.
                    </p>
                </div>
            </section>

            {/* NỘI DUNG DANH SÁCH YÊU THÍCH */}
            <section className="wishlist-body">
                {wishlistProducts.length > 0 ? (
                    <>
                        <div className="wishlist-toolbar">
                            <p className="wishlist-count-text">
                                Đang lưu <strong>{wishlistProducts.length}</strong> sản phẩm trong danh sách yêu thích
                            </p>

                            <button
                                type="button"
                                className="wishlist-clear-btn"
                                onClick={clearWishlist}
                            >
                                <Trash2 size={15} />
                                Xóa tất cả
                            </button>
                        </div>

                        <div className="products-grid">
                            {wishlistProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="wishlist-empty">
                        <div className="wishlist-empty-icon">
                            <Heart size={36} />
                        </div>
                        <h2>Danh sách yêu thích đang trống</h2>
                        <p>
                            Hãy nhấn vào biểu tượng trái tim trên bất kỳ thẻ sản phẩm nào để lưu
                            vào bộ sưu tập cá nhân của bạn nhé!
                        </p>
                        <div className="wishlist-empty-actions">
                            <Link to="/products" className="wishlist-btn-primary">
                                <ShoppingBag size={17} />
                                Khám phá sản phẩm
                            </Link>
                            <Link to="/promotion" className="wishlist-btn-secondary">
                                Săn Deal Khuyến mãi
                                <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>
                )}
            </section>

        </div>
    );
}
