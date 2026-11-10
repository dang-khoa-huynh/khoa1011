import { Link } from "react-router-dom";
import { Heart, ShoppingBag, ArrowUpRight } from "lucide-react";
import {
    CATEGORY_LABEL,
    formatPrice,
    getDiscountPercent
} from "../../Data/Products";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";

import "./ProductCard.css";

export default function ProductCard({ product }) {
    const { isInWishlist, toggleWishlist } = useWishlist();
    const { addToCart } = useCart();

    const liked = isInWishlist(product.id);
    const discountPercent = getDiscountPercent(product);

    // Hiển thị dải size tương ứng theo danh mục ngay trên Card
    const sizePreview =
        product.category === "shoes"
            ? "Size 38 – 43"
            : product.category === "bags"
            ? "Freesize"
            : "S · M · L · XL";

    const defaultSize =
        product.category === "shoes"
            ? "40"
            : product.category === "bags"
            ? "Freesize"
            : "M";

    const handleQuickAdd = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product, defaultSize, 1, true);
    };

    return (
        <article className="vybe-card">

            {/* NÚT TRÁI TIM YÊU THÍCH */}
            <button
                type="button"
                className={`vybe-wishlist-btn ${liked ? "is-active" : ""}`}
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleWishlist(product);
                }}
                aria-label={liked ? `Bỏ thích ${product.name}` : `Yêu thích ${product.name}`}
                title={liked ? "Bỏ khỏi Yêu thích" : "Lưu vào Yêu thích"}
            >
                <Heart size={16} fill={liked ? "currentColor" : "none"} />
            </button>

            {/* KHUNG HÌNH ẢNH STUDIO */}
            <Link
                className="vybe-card-media"
                to={`/products/${product.id}`}
            >
                <img
                    src={product.img}
                    alt={product.alt || product.name}
                    loading="lazy"
                />

                {/* NHÃN SẢN PHẨM & % GIẢM GIÁ */}
                <div className="vybe-badge-group">
                    {discountPercent > 0 && (
                        <span className="vybe-badge tone-sale">
                            -{discountPercent}%
                        </span>
                    )}
                    {product.badge && product.badge !== "SALE" && (
                        <span
                            className={`vybe-badge tone-${product.badge.toLowerCase()}`}
                        >
                            {product.badge}
                        </span>
                    )}
                </div>

                {/* THANH TƯƠNG TÁC NHANH KHI HOVER */}
                <div className="vybe-card-action">
                    <span className="vybe-action-text">XEM CHI TIẾT</span>
                    <button
                        type="button"
                        className="vybe-quick-add-btn"
                        onClick={handleQuickAdd}
                        title={`Thêm nhanh vào giỏ (Size ${defaultSize})`}
                        aria-label={`Thêm nhanh ${product.name} vào giỏ`}
                    >
                        <ShoppingBag size={14} />
                        <span>+ Giỏ</span>
                    </button>
                </div>
            </Link>

            {/* THÔNG TIN SẢN PHẨM CAO CẤP */}
            <div className="vybe-card-body">

                <div className="vybe-card-meta">
                    <span className="vybe-meta-cat">
                        {CATEGORY_LABEL[product.category] || "VYBE"}
                    </span>
                    <span className="vybe-meta-sizes">
                        {sizePreview}
                    </span>
                </div>

                <h3 className="vybe-card-title">
                    <Link to={`/products/${product.id}`}>
                        {product.name}
                    </Link>
                </h3>

                {product.description && (
                    <p className="vybe-card-description">
                        {product.description}
                    </p>
                )}

                <div className="vybe-card-footer">
                    <div className="vybe-price-group">
                        <p className={`vybe-card-price ${discountPercent > 0 ? "is-sale" : ""}`}>
                            {formatPrice(product.price)}
                        </p>
                        {discountPercent > 0 && (
                            <span className="vybe-card-old-price">
                                {formatPrice(product.originalPrice)}
                            </span>
                        )}
                    </div>

                    <Link
                        className="vybe-card-btn"
                        to={`/products/${product.id}`}
                        aria-label={`Xem chi tiết ${product.name}`}
                    >
                        <ArrowUpRight size={16} />
                    </Link>
                </div>

            </div>

        </article>
    );
}
