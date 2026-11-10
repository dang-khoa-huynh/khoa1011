import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, Search, X, ShoppingBag, Trash2, Heart } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { formatPrice } from "../../Data/Products";
import "./Header.css";

export default function Header() {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    // Lấy state và hàm điều khiển giỏ hàng từ CartContext
    const {
        cartItems,
        totalItems,
        subtotal,
        isCartOpen,
        setIsCartOpen,
        updateQuantity,
        removeFromCart
    } = useCart();

    // Lấy số lượng sản phẩm yêu thích từ WishlistContext
    const { totalWishlist } = useWishlist();

    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [query, setQuery] = useState("");

    // Khóa cuộn trang khi mở Giỏ hàng trượt để tránh bị cuộn trang nền
    useEffect(() => {
        if (isCartOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isCartOpen]);

    // Tính phần trăm tiến độ đạt Freeship (499.000₫)
    const freeshipProgress = Math.min(100, Math.round((subtotal / 499000) * 100));

    // Xử lý tìm kiếm
    function handleSearch(event) {
        event.preventDefault();

        const keyword = query.trim();

        if (keyword) {
            navigate(`/products?q=${encodeURIComponent(keyword)}`);
            // Xóa chữ vừa tìm trên thanh tìm kiếm để lần sau người dùng nhập từ khóa mới ngay
            setQuery("");
        }

        setSearchOpen(false);
    }

    // Đóng menu mobile
    function closeMenu() {
        setMenuOpen(false);
    }

    return (
        <header className="header">

            {/* HEADER MAIN */}
            <div className="header-bar">

                {/* MOBILE MENU BUTTON */}
                <button
                    className="header-menu"
                    type="button"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Menu"
                >
                    {menuOpen ? <X size={22} /> : <Menu size={22} />}
                </button>

                {/* LOGO */}
                <Link className="header-logo" to="/">
                    VYBE
                </Link>

                {/* NAVIGATION */}
                <nav className="header-nav">
                    <Link
                        className={`nav-link ${pathname === "/" ? "active" : ""}`}
                        to="/"
                    >
                        Trang chủ
                    </Link>

                    <Link
                        className={`nav-link ${pathname === "/products" ? "active" : ""}`}
                        to="/products"
                    >
                        Tất cả sản phẩm
                    </Link>

                    <Link
                        className={`nav-link ${pathname === "/collection" ? "active" : ""}`}
                        to="/collection"
                    >
                        Bộ sưu tập
                    </Link>

                    <Link
                        className={`nav-link nav-link-promo ${pathname === "/promotion" ? "active" : ""}`}
                        to="/promotion"
                    >
                        Khuyến mãi
                    </Link>
                </nav>

                {/* HEADER ACTIONS */}
                <div className="header-actions">

                    {/* NÚT TÌM KIẾM */}
                    <button
                        className="header-action"
                        type="button"
                        onClick={() => setSearchOpen(!searchOpen)}
                        aria-label="Tìm kiếm"
                    >
                        <Search size={20} />
                        <span>Tìm kiếm</span>
                    </button>

                    {/* NÚT YÊU THÍCH (WISHLIST) */}
                    <Link
                        className={`header-action ${pathname === "/wishlist" ? "is-active-action" : ""}`}
                        to="/wishlist"
                        aria-label="Sản phẩm yêu thích"
                    >
                        <Heart size={20} fill={totalWishlist > 0 ? "#ff2e4c" : "none"} color={totalWishlist > 0 ? "#ff2e4c" : "currentColor"} />
                        <span>Yêu thích</span>
                        {totalWishlist > 0 && (
                            <span className="cart-count wishlist-count">{totalWishlist}</span>
                        )}
                    </Link>

                    {/* NÚT GIỎ HÀNG */}
                    <button
                        className="header-action"
                        type="button"
                        onClick={() => setIsCartOpen(true)}
                        aria-label="Xem giỏ hàng"
                    >
                        <ShoppingBag size={20} />
                        <span>Giỏ hàng</span>
                        {totalItems > 0 && (
                            <span className="cart-count">{totalItems}</span>
                        )}
                    </button>

                </div>

            </div>

            {/* SEARCH FORM */}
            {searchOpen && (
                <form
                    className="header-search"
                    onSubmit={handleSearch}
                >
                    <input
                        type="text"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Tìm áo, quần, giày, balo..."
                    />

                    <button type="submit">
                        Tìm kiếm
                    </button>
                </form>
            )}

            {/* MOBILE NAVIGATION */}
            {menuOpen && (
                <nav className="mobile-nav">

                    <Link to="/" onClick={closeMenu}>
                        Trang chủ
                    </Link>

                    <Link to="/products" onClick={closeMenu}>
                        Tất cả sản phẩm
                    </Link>

                    <Link to="/collection" onClick={closeMenu}>
                        Bộ sưu tập
                    </Link>

                    <Link to="/promotion" onClick={closeMenu}>
                        Khuyến mãi
                    </Link>

                    <Link to="/wishlist" onClick={closeMenu}>
                        Yêu thích ({totalWishlist})
                    </Link>

                </nav>
            )}

            {/* CART DRAWER - Sử dụng createPortal để gắn trực tiếp vào document.body */}
            {isCartOpen && typeof document !== "undefined" && createPortal(
                <div className="cart-layer">
                    <button
                        className="cart-backdrop"
                        type="button"
                        onClick={() => setIsCartOpen(false)}
                        aria-label="Đóng giỏ hàng"
                    />

                    <aside className="cart-drawer">
                        <div className="cart-head">
                            <h3>Giỏ hàng ({totalItems})</h3>
                            <button
                                type="button"
                                onClick={() => setIsCartOpen(false)}
                                aria-label="Đóng"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* THANH TIẾN ĐỘ FREESHIP */}
                        {cartItems.length > 0 && (
                            <div className="cart-freeship-bar">
                                <div className="cart-freeship-text">
                                    {subtotal >= 499000 ? (
                                        <span>🎉 Bạn đã được <strong>MIỄN PHÍ vận chuyển</strong>!</span>
                                    ) : (
                                        <span>Mua thêm <strong>{formatPrice(499000 - subtotal)}</strong> để được Freeship</span>
                                    )}
                                </div>
                                <div className="cart-progress-track">
                                    <div
                                        className="cart-progress-fill"
                                        style={{ width: `${freeshipProgress}%` }}
                                    />
                                </div>
                            </div>
                        )}

                        {cartItems.length > 0 ? (
                            <>
                                <ul className="cart-list">
                                    {cartItems.map((item) => (
                                        <li key={item.cartItemId}>
                                            <img
                                                src={item.img}
                                                alt={item.name}
                                            />
                                            <div className="cart-item-detail">
                                                <div className="cart-item-top">
                                                    <h4>{item.name}</h4>
                                                    <button
                                                        type="button"
                                                        className="cart-item-del"
                                                        onClick={() => removeFromCart(item.cartItemId)}
                                                        aria-label={`Xóa ${item.name}`}
                                                        title="Xóa món này"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>

                                                <p>
                                                    Size: {item.selectedSize} • {formatPrice(item.price)}
                                                </p>

                                                <div className="cart-qty">
                                                    <button
                                                        type="button"
                                                        onClick={() => updateQuantity(item.cartItemId, -1)}
                                                        aria-label="Giảm"
                                                    >
                                                        -
                                                    </button>
                                                    <span>{item.quantity}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => updateQuantity(item.cartItemId, 1)}
                                                        aria-label="Tăng"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>

                                <div className="cart-foot">
                                    <p>
                                        <span>Tạm tính</span>
                                        <strong>{formatPrice(subtotal)}</strong>
                                    </p>

                                    {/* NÚT TIẾN HÀNH THANH TOÁN */}
                                    <button
                                        type="button"
                                        className="cart-checkout-btn"
                                        onClick={() => {
                                            setIsCartOpen(false);
                                            navigate("/checkout");
                                        }}
                                    >
                                        TIẾN HÀNH THANH TOÁN
                                    </button>

                                    {/* LINK XEM TRANG GIỎ HÀNG TOÀN DIỆN */}
                                    <Link
                                        to="/cart"
                                        className="cart-view-link"
                                        onClick={() => setIsCartOpen(false)}
                                    >
                                        Xem giỏ hàng chi tiết ({totalItems})
                                    </Link>
                                </div>
                            </>
                        ) : (
                            <div className="cart-empty">
                                <p>Giỏ hàng của bạn đang trống.</p>
                            </div>
                        )}
                    </aside>
                </div>,
                document.body
            )}

        </header>
    );
}
