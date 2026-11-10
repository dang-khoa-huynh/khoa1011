import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../Data/Products";
import {
    ArrowLeft,
    ArrowRight,
    Minus,
    Plus,
    RefreshCcw,
    ShieldCheck,
    ShoppingBag,
    Tag,
    Trash2,
    Truck
} from "lucide-react";
import "./Cart.css";

export default function Cart() {
    const navigate = useNavigate();
    const {
        cartItems,
        totalItems,
        subtotal,
        updateQuantity,
        removeFromCart,
        clearCart,
        appliedCoupon,
        setAppliedCoupon,
        discountAmount,
        shippingFee,
        finalTotal,
        vipEmail
    } = useCart();

    // State mã giảm giá
    const [couponInput, setCouponInput] = useState(appliedCoupon?.code || "");
    const [couponMessage, setCouponMessage] = useState({ text: "", isError: false });

    // Giá trị hiển thị trong ô input mã giảm giá (đồng bộ tự động khi VIP15 kích hoạt)
    const displayCouponValue = appliedCoupon ? appliedCoupon.code : couponInput;

    // Tính toán tiến độ Freeship (499.000₫)
    const freeshipThreshold = 499000;
    const freeshipProgress = Math.min(100, Math.round((subtotal / freeshipThreshold) * 100));

    // Xử lý áp dụng mã giảm giá
    const handleApplyCoupon = (e) => {
        e.preventDefault();
        const code = couponInput.trim().toUpperCase();

        if (!code) {
            setCouponMessage({ text: "Vui lòng nhập mã giảm giá.", isError: true });
            return;
        }

        if (code === "VIP15") {
            if (!vipEmail) {
                setCouponMessage({
                    text: "Mã VIP15 (-15%) chỉ dành cho đơn đầu tiên của thành viên đang kích hoạt Gmail VIP ở dưới chân trang (Footer).",
                    isError: true
                });
                return;
            }
            setAppliedCoupon({ code: "VIP15", type: "percent", value: 15, label: "Giảm 15% đơn đầu tiên (VIP Club)" });
            setCouponMessage({ text: "🎉 Áp dụng thành công mã đặc quyền VIP15 (-15% đơn đầu tiên)!", isError: false });
        } else if (code === "VYBE10") {
            setAppliedCoupon({ code: "VYBE10", type: "percent", value: 10, label: "Giảm 10% đơn hàng" });
            setCouponMessage({ text: "🎉 Áp dụng thành công mã giảm 10%!", isError: false });
        } else if (code === "FREESHIP") {
            setAppliedCoupon({ code: "FREESHIP", type: "freeship", value: 0, label: "Miễn phí vận chuyển" });
            setCouponMessage({ text: "🎉 Áp dụng thành công mã Miễn phí vận chuyển!", isError: false });
        } else if (code === "VYBE50K") {
            if (subtotal < 500000) {
                setCouponMessage({
                    text: "Mã VYBE50K áp dụng cho đơn hàng từ 500.000đ trở lên.",
                    isError: true
                });
                return;
            }
            setAppliedCoupon({ code: "VYBE50K", type: "fixed", value: 50000, label: "Giảm 50.000₫" });
            setCouponMessage({ text: "🎉 Áp dụng thành công mã giảm 50.000₫!", isError: false });
        } else {
            setCouponMessage({ text: "Mã giảm giá không hợp lệ hoặc đã hết hạn.", isError: true });
        }
    };

    // Xóa mã giảm giá đang áp dụng
    const handleRemoveCoupon = () => {
        setAppliedCoupon(null);
        setCouponInput("");
        setCouponMessage({ text: "", isError: false });
    };

    // ==========================================
    // MÀN HÌNH 1: GIỎ HÀNG TRỐNG
    // ==========================================
    if (cartItems.length === 0) {
        return (
            <div className="cart-page">
                <div className="cart-empty-view">
                    <div className="cart-empty-icon">
                        <ShoppingBag size={52} />
                    </div>
                    <h1>Giỏ hàng của bạn đang trống</h1>
                    <p>
                        Chưa có sản phẩm nào trong giỏ hàng. Hãy khám phá các thiết kế
                        Streetwear mới nhất của VYBE để chọn cho mình outfit phù hợp nhé.
                    </p>
                    <Link to="/products" className="cart-btn cart-btn-primary">
                        <ArrowLeft size={18} />
                        Khám phá sản phẩm ngay
                    </Link>
                </div>
            </div>
        );
    }

    // ==========================================
    // MÀN HÌNH 2: TRANG GIỎ HÀNG ĐẦY ĐỦ
    // ==========================================
    return (
        <div className="cart-page">
            <div className="cart-container">

                {/* BREADCRUMB */}
                <nav className="cart-breadcrumb">
                    <Link to="/">Trang chủ</Link>
                    <span>/</span>
                    <span className="cart-breadcrumb-current">Giỏ hàng</span>
                </nav>

                <div className="cart-heading-wrap">
                    <h1>Giỏ hàng của bạn</h1>
                    <span className="cart-heading-count">({totalItems} sản phẩm)</span>
                </div>

                {/* THANH TIẾN ĐỘ FREESHIP */}
                <div className="cart-freeship-banner">
                    <div className="freeship-info">
                        <Truck size={20} className="freeship-icon" />
                        <p>
                            {subtotal >= freeshipThreshold ? (
                                <span>🎉 Đơn hàng của bạn đã được <strong>MIỄN PHÍ VẬN CHUYỂN</strong>!</span>
                            ) : (
                                <span>
                                    Mua thêm <strong>{formatPrice(freeshipThreshold - subtotal)}</strong> để được <strong>MIỄN PHÍ SHIP</strong> toàn quốc!
                                </span>
                            )}
                        </p>
                    </div>
                    <div className="freeship-track">
                        <div
                            className="freeship-fill"
                            style={{ width: `${freeshipProgress}%` }}
                        />
                    </div>
                </div>

                {/* BỐ CỤC 2 CỘT */}
                <div className="cart-layout">

                    {/* CỘT TRÁI: DANH SÁCH MÓN HÀNG & MÃ GIẢM GIÁ */}
                    <div className="cart-main">

                        <div className="cart-items-card">
                            <div className="cart-table-head">
                                <span>Sản phẩm</span>
                                <span>Số lượng</span>
                                <span>Thành tiền</span>
                                <span />
                            </div>

                            <div className="cart-items-list">
                                {cartItems.map((item) => (
                                    <div key={item.cartItemId} className="cart-item-row">
                                        {/* HÌNH ẢNH & THÔNG TIN */}
                                        <div className="cart-item-info">
                                            <Link to={`/products/${item.id}`} className="cart-item-thumb">
                                                <img src={item.img} alt={item.name} />
                                            </Link>
                                            <div className="cart-item-meta">
                                                <h3>
                                                    <Link to={`/products/${item.id}`}>{item.name}</Link>
                                                </h3>
                                                <p className="cart-item-size">
                                                    Kích cỡ: <strong>{item.selectedSize}</strong>
                                                </p>
                                                <p className="cart-item-unit-price">
                                                    Đơn giá: {formatPrice(item.price)}
                                                </p>
                                            </div>
                                        </div>

                                        {/* BỘ ĐẾM SỐ LƯỢNG */}
                                        <div className="cart-item-stepper">
                                            <div className="stepper-box">
                                                <button
                                                    type="button"
                                                    onClick={() => updateQuantity(item.cartItemId, -1)}
                                                    aria-label="Giảm"
                                                >
                                                    <Minus size={15} />
                                                </button>
                                                <span>{item.quantity}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => updateQuantity(item.cartItemId, 1)}
                                                    aria-label="Tăng"
                                                >
                                                    <Plus size={15} />
                                                </button>
                                            </div>
                                        </div>

                                        {/* THÀNH TIỀN */}
                                        <div className="cart-item-total">
                                            <strong>{formatPrice(item.price * item.quantity)}</strong>
                                        </div>

                                        {/* NÚT XÓA */}
                                        <div className="cart-item-delete">
                                            <button
                                                type="button"
                                                onClick={() => removeFromCart(item.cartItemId)}
                                                aria-label={`Xóa ${item.name}`}
                                                title="Xóa sản phẩm này"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* DÒNG HÀNH ĐỘNG DƯỚI BẢNG */}
                            <div className="cart-actions-bar">
                                <Link to="/products" className="cart-back-btn">
                                    <ArrowLeft size={16} />
                                    Tiếp tục xem sản phẩm
                                </Link>

                                <button
                                    type="button"
                                    onClick={clearCart}
                                    className="cart-clear-btn"
                                >
                                    <Trash2 size={16} />
                                    Xóa tất cả
                                </button>
                            </div>
                        </div>

                        {/* KHỐI NHẬP MÃ GIẢM GIÁ */}
                        <div className="cart-coupon-card">
                            <div className="coupon-header">
                                <Tag size={18} />
                                <h3>Mã ưu đãi / Khuyến mãi</h3>
                            </div>

                            <form onSubmit={handleApplyCoupon} className="coupon-form">
                                <input
                                    type="text"
                                    value={displayCouponValue}
                                    onChange={(e) => setCouponInput(e.target.value)}
                                    placeholder="Nhập mã (ví dụ: VYBE10, FREESHIP)"
                                    disabled={!!appliedCoupon}
                                />
                                {appliedCoupon ? (
                                    <button
                                        type="button"
                                        onClick={handleRemoveCoupon}
                                        className="coupon-remove-btn"
                                    >
                                        Đổi / Hủy mã
                                    </button>
                                ) : (
                                    <button type="submit" className="coupon-apply-btn">
                                        Áp dụng
                                    </button>
                                )}
                            </form>

                            {appliedCoupon?.code === "VIP15" && !couponMessage.text && (
                                <p className="coupon-msg success">
                                    ✨ Đã tự động kích hoạt mã <b>VIP15 (-15% đơn đầu)</b> cho Gmail <b>{vipEmail}</b>. (Mỗi đơn hàng chỉ áp dụng 1 mã duy nhất, không cộng dồn thêm mã khác).
                                </p>
                            )}

                            {couponMessage.text && (
                                <p className={`coupon-msg ${couponMessage.isError ? "error" : "success"}`}>
                                    {couponMessage.text}
                                </p>
                            )}

                            <div className="coupon-hints">
                                <span>Gợi ý mã:</span>
                                {vipEmail && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setAppliedCoupon({
                                                code: "VIP15",
                                                type: "percent",
                                                value: 15,
                                                label: "Giảm 15% đặc quyền VIP Club"
                                            });
                                            setCouponMessage({
                                                text: "🎉 Đã kích hoạt mã đặc quyền VIP15 (-15%)!",
                                                isError: false
                                            });
                                        }}
                                    >
                                        VIP15 (-15% VIP)
                                    </button>
                                )}
                                <button type="button" onClick={() => setCouponInput("VYBE10")}>VYBE10 (-10%)</button>
                                <button type="button" onClick={() => setCouponInput("FREESHIP")}>FREESHIP</button>
                                <button type="button" onClick={() => setCouponInput("VYBE50K")}>VYBE50K (-50K đơn ≥ 500K)</button>
                            </div>
                        </div>

                    </div>

                    {/* CỘT PHẢI: TÓM TẮT ĐƠN HÀNG (ORDER SUMMARY) */}
                    <div className="cart-summary">
                        <div className="summary-card">
                            <h2>Tóm tắt đơn hàng</h2>

                            <div className="summary-rows">
                                <div className="summary-row">
                                    <span>Tạm tính</span>
                                    <strong>{formatPrice(subtotal)}</strong>
                                </div>

                                {appliedCoupon && (
                                    <div className="summary-row discount-row">
                                        <span>Khuyến mãi ({appliedCoupon.code})</span>
                                        <strong>-{formatPrice(discountAmount)}</strong>
                                    </div>
                                )}

                                <div className="summary-row">
                                    <span>Phí vận chuyển</span>
                                    <span>
                                        {shippingFee === 0 ? (
                                            <strong className="free-text">Miễn phí</strong>
                                        ) : (
                                            formatPrice(shippingFee)
                                        )}
                                    </span>
                                </div>
                            </div>

                            <div className="summary-separator" />

                            <div className="summary-total-row">
                                <span>Tổng thanh toán</span>
                                <strong>{formatPrice(finalTotal)}</strong>
                            </div>

                            <button
                                type="button"
                                onClick={() => navigate("/checkout")}
                                className="cart-btn cart-btn-checkout"
                            >
                                TIẾN HÀNH THANH TOÁN
                                <ArrowRight size={18} />
                            </button>

                            <div className="summary-perks">
                                <p><Truck size={16} /> Giao hàng toàn quốc từ 2 - 4 ngày</p>
                                <p><RefreshCcw size={16} /> Đổi size miễn phí trong 7 ngày</p>
                                <p><ShieldCheck size={16} /> Kiểm tra hàng trước khi thanh toán COD</p>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
