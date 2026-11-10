import { useState } from "react";
import { Link } from "react-router-dom";
import {
    MapPin,
    Phone,
    Mail,
    Clock,
    ArrowUp,
    Send,
    CheckCircle2,
    ShieldCheck,
    CreditCard,
    QrCode,
    Truck
} from "lucide-react";
import { useCart } from "../../context/CartContext";
import "./Footer.css";

export default function Footer() {
    const [email, setEmail] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const { vipEmail, registerVipEmail, clearVipEmail } = useCart();

    const handleSubscribe = (e) => {
        e.preventDefault();
        const cleanEmail = email.trim();
        if (!cleanEmail) return;

        const result = registerVipEmail(cleanEmail);
        if (!result.success) {
            setErrorMsg(result.message);
            return;
        }

        setErrorMsg("");
        setEmail("");
    };

    const handleChangeEmail = () => {
        setErrorMsg("");
        clearVipEmail();
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="footer">
            {/* KHU VỰC ĐĂNG KÝ NHẬN TIN & VOUCHER VIP ĐỘC QUYỀN 15% */}
            <div className="footer-newsletter">
                <div className="footer-newsletter-text">
                    <span className="footer-newsletter-tag">JOIN THE VYBE CLUB // EXCLUSIVE -15%</span>
                    <h3>Đặc quyền VIP: Giảm ngay 15% khi đăng ký Gmail</h3>
                    <p>
                        Khác với mã giảm 10% công khai, thành viên đăng ký Gmail vào VYBE Club sẽ được
                        mở khóa mã độc quyền <b>VIP15 (Giảm 15% tổng đơn)</b> và nhận thông báo sớm các đợt Limited Drop.
                    </p>
                </div>

                <div className="footer-newsletter-action">
                    {vipEmail ? (
                        <div className="footer-subscribe-success">
                            <CheckCircle2 size={20} />
                            <div className="footer-subscribe-content">
                                <strong>Đã mở khóa & kích hoạt mã độc quyền VIP15 (-15%)!</strong>
                                <span>
                                    Gmail <b>{vipEmail}</b> đã được áp sẵn mức giảm 15% tự động khi mua hàng trong{" "}
                                    <Link to="/cart" style={{ color: "#b4f13c", fontWeight: 700 }}>
                                        Giỏ hàng & Thanh toán →
                                    </Link>
                                </span>
                                <button
                                    type="button"
                                    className="footer-change-email-btn"
                                    onClick={handleChangeEmail}
                                >
                                    Đổi email khác
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <form className="footer-newsletter-form" onSubmit={handleSubscribe}>
                                <input
                                    type="email"
                                    placeholder="Nhập địa chỉ email của bạn..."
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        if (errorMsg) setErrorMsg("");
                                    }}
                                    required
                                />
                                <button type="submit">
                                    <span>Đăng ký</span>
                                    <Send size={15} />
                                </button>
                            </form>
                            {errorMsg && (
                                <p className="footer-subscribe-error">{errorMsg}</p>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* LƯỚI NỘI DUNG CHÍNH 4 CỘT */}
            <div className="footer-container">
                {/* CỘT 1: THƯƠNG HIỆU & LIÊN HỆ */}
                <div className="footer-brand">
                    <div className="footer-logo-group">
                        <h2 className="footer-logo">
                            VYBE<span>.</span>
                        </h2>
                        <span className="footer-est">STREETWEAR STUDIO // EST. 2026</span>
                    </div>

                    <p>
                        Thương hiệu thời trang đường phố thế hệ mới dành cho giới trẻ Việt.
                        Tập trung vào phom dáng Boxy Oversized chuẩn mực, chất liệu Cotton 250GSM
                        nặng đô và tinh thần tự do cá tính.
                    </p>

                    <div className="footer-contact-list">
                        <div className="footer-contact-item">
                            <MapPin size={15} />
                            <span>Flagship Store: Nguyễn Trãi, Quận 1, TP. Hồ Chí Minh</span>
                        </div>
                        <div className="footer-contact-item">
                            <Phone size={15} />
                            <span>Hotline CSKH: 0909 888 999</span>
                        </div>
                        <div className="footer-contact-item">
                            <Mail size={15} />
                            <span>Email: support@vybestudio.vn</span>
                        </div>
                        <div className="footer-contact-item">
                            <Clock size={15} />
                            <span>Giờ mở cửa: 09:00 – 22:00 (Tất cả các ngày)</span>
                        </div>
                    </div>

                    <div className="footer-socials">
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noreferrer"
                            className="footer-social-pill"
                        >
                            Instagram
                        </a>
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noreferrer"
                            className="footer-social-pill"
                        >
                            Facebook
                        </a>
                        <a
                            href="https://tiktok.com"
                            target="_blank"
                            rel="noreferrer"
                            className="footer-social-pill"
                        >
                            TikTok
                        </a>
                        <a
                            href="https://youtube.com"
                            target="_blank"
                            rel="noreferrer"
                            className="footer-social-pill"
                        >
                            Lookbook TV
                        </a>
                    </div>
                </div>

                {/* CỘT 2: ĐIỀU HƯỚNG KHÁM PHÁ */}
                <div className="footer-col">
                    <h3>Khám phá</h3>
                    <Link to="/">Trang chủ</Link>
                    <Link to="/products">Tất cả sản phẩm</Link>
                    <Link to="/collection">Bộ sưu tập 2026</Link>
                    <Link to="/promotion">Săn Deal Khuyến mãi</Link>
                    <Link to="/wishlist">Sản phẩm yêu thích</Link>
                    <Link to="/cart">Giỏ hàng của bạn</Link>
                </div>

                {/* CỘT 3: DANH MỤC SẢN PHẨM */}
                <div className="footer-col">
                    <h3>Danh mục</h3>
                    <Link to="/products?category=tops">Áo Thun & Washed Hoodie</Link>
                    <Link to="/products?category=bottoms">Quần Cargo & Baggy Jeans</Link>
                    <Link to="/products?category=outerwear">Áo Khoác Varsity & Bomber</Link>
                    <Link to="/products?category=shoes">Giày Sneaker Streetwear</Link>
                    <Link to="/products?category=bags">Balo Tactical & Túi Đeo</Link>
                </div>

                {/* CỘT 4: CHÍNH SÁCH & CAM KẾT */}
                <div className="footer-col">
                    <h3>Dịch vụ khách hàng</h3>
                    <p className="footer-policy-item">Đổi size miễn phí trong 7 ngày</p>
                    <p className="footer-policy-item">Kiểm tra hàng trước khi thanh toán</p>
                    <p className="footer-policy-item">Freeship toàn quốc đơn từ 499K</p>
                    <p className="footer-policy-item">Bảo hành hình in & đường may 90 ngày</p>
                    <Link to="/promotion" className="footer-promo-cta">
                        Săn Voucher công khai tại trang Khuyến mãi →
                    </Link>
                </div>
            </div>

            {/* THANH ĐÁY: BẢN QUYỀN + PHƯƠNG THỨC THANH TOÁN + NÚT LÊN ĐẦU TRANG */}
            <div className="footer-bottom">
                <p>© 2026 VYBE Streetwear Studio. All rights reserved.</p>

                <div className="footer-payments">
                    <span className="payment-badge">
                        <Truck size={14} />
                        COD Toàn Quốc
                    </span>
                    <span className="payment-badge">
                        <QrCode size={14} />
                        VietQR 24/7
                    </span>
                    <span className="payment-badge">
                        <CreditCard size={14} />
                        Visa / Master
                    </span>
                    <span className="payment-badge">
                        <ShieldCheck size={14} />
                        100% Authentic
                    </span>
                </div>

                <button
                    type="button"
                    className="footer-scroll-top"
                    onClick={scrollToTop}
                    aria-label="Cuộn lên đầu trang"
                >
                    <span>Lên đầu trang</span>
                    <ArrowUp size={15} />
                </button>
            </div>
        </footer>
    );
}
