import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../Data/Products";
import { VIETNAM_PROVINCES, FALLBACK_DISTRICTS } from "../../Data/VietnamProvinces";
import {
    ArrowLeft,
    CheckCircle2,
    ChevronDown,
    CreditCard,
    LocateFixed,
    QrCode,
    Search,
    ShieldCheck,
    Truck
} from "lucide-react";
import "./Checkout.css";

// Component Dropdown tùy chỉnh có ô tìm kiếm (thay thế <select> mặc định thô kệch của trình duyệt)
function CustomSelect({
    label,
    required,
    placeholder,
    searchPlaceholder,
    options,
    value,
    onChange,
    disabled,
    loading,
    error
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const wrapRef = useRef(null);

    const selectedOption = options.find((opt) => opt.id === value);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (wrapRef.current && !wrapRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filteredOptions = options.filter((opt) =>
        opt.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
    );

    const handleSelect = (opt) => {
        onChange(opt);
        setIsOpen(false);
        setSearchTerm("");
    };

    return (
        <div className="form-group" ref={wrapRef}>
            <label>
                {label} {required && "*"}
            </label>
            <div className="custom-select-container">
                <button
                    type="button"
                    disabled={disabled}
                    className={`custom-select-trigger ${isOpen ? "is-open" : ""} ${
                        error ? "input-error" : ""
                    } ${!selectedOption ? "is-placeholder" : ""}`}
                    onClick={() => {
                        if (!disabled) setIsOpen((prev) => !prev);
                    }}
                >
                    <span className="custom-select-value">
                        {loading
                            ? "Đang tải danh sách..."
                            : selectedOption
                            ? selectedOption.name
                            : placeholder}
                    </span>
                    <ChevronDown size={16} className="custom-select-arrow" />
                </button>

                {isOpen && !disabled && (
                    <div className="custom-select-dropdown">
                        <div className="custom-select-search">
                            <Search size={14} />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder={searchPlaceholder || "Gõ để tìm nhanh..."}
                                autoFocus
                            />
                        </div>
                        <ul className="custom-select-list">
                            {filteredOptions.length > 0 ? (
                                filteredOptions.map((opt) => (
                                    <li key={opt.id}>
                                        <button
                                            type="button"
                                            className={`custom-select-option ${
                                                opt.id === value ? "selected" : ""
                                            }`}
                                            onClick={() => handleSelect(opt)}
                                        >
                                            {opt.name}
                                        </button>
                                    </li>
                                ))
                            ) : (
                                <li className="custom-select-empty">Không tìm thấy kết quả phù hợp</li>
                            )}
                        </ul>
                    </div>
                )}
            </div>
            {error && <span className="field-error">{error}</span>}
        </div>
    );
}

export default function Checkout() {
    const navigate = useNavigate();
    const {
        cartItems,
        subtotal,
        clearCart,
        appliedCoupon,
        discountAmount,
        shippingFee,
        finalTotal,
        vipEmail,
        consumeVipDiscount
    } = useCart();

    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        email: vipEmail || "",
        provinceId: "79",
        city: "TP. Hồ Chí Minh",
        districtId: "",
        district: "",
        wardId: "",
        ward: "",
        address: "",
        note: "",
        paymentMethod: "cod"
    });

    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [loadingDistricts, setLoadingDistricts] = useState(false);
    const [loadingWards, setLoadingWards] = useState(false);

    const [debouncedStreet, setDebouncedStreet] = useState("");
    const [gpsCoords, setGpsCoords] = useState(null);
    const [locatingGps, setLocatingGps] = useState(false);

    const [completedOrder, setCompletedOrder] = useState(null);
    const [errors, setErrors] = useState({});

    // Debounce ô nhập số nhà/tên đường để bản đồ không bị nháy khi đang gõ
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedStreet(formData.address.trim());
        }, 550);
        return () => clearTimeout(timer);
    }, [formData.address]);

    // Tải Quận/Huyện theo Tỉnh/Thành phố
    useEffect(() => {
        if (!formData.provinceId) return;

        let isMounted = true;
        const loadDistricts = async () => {
            try {
                const res = await fetch(`https://esgoo.net/api-tinhthanh/2/${formData.provinceId}.htm`);
                const data = await res.json();
                if (!isMounted) return;
                if (data && data.error === 0 && Array.isArray(data.data) && data.data.length > 0) {
                    setDistricts(
                        data.data.map((d) => ({
                            id: String(d.id),
                            name: d.full_name
                        }))
                    );
                } else {
                    setDistricts(
                        (FALLBACK_DISTRICTS[formData.provinceId] || []).map((d) => ({
                            id: String(d.id),
                            name: d.full_name
                        }))
                    );
                }
            } catch {
                if (isMounted) {
                    setDistricts(
                        (FALLBACK_DISTRICTS[formData.provinceId] || []).map((d) => ({
                            id: String(d.id),
                            name: d.full_name
                        }))
                    );
                }
            } finally {
                if (isMounted) {
                    setLoadingDistricts(false);
                }
            }
        };

        loadDistricts();
        return () => {
            isMounted = false;
        };
    }, [formData.provinceId]);

    // Tải Phường/Xã theo Quận/Huyện
    useEffect(() => {
        if (!formData.districtId) return;

        let isMounted = true;
        const loadWards = async () => {
            try {
                const res = await fetch(`https://esgoo.net/api-tinhthanh/3/${formData.districtId}.htm`);
                const data = await res.json();
                if (!isMounted) return;
                if (data && data.error === 0 && Array.isArray(data.data)) {
                    setWards(
                        data.data.map((w) => ({
                            id: String(w.id),
                            name: w.full_name
                        }))
                    );
                } else {
                    setWards([]);
                }
            } catch {
                if (isMounted) {
                    setWards([]);
                }
            } finally {
                if (isMounted) {
                    setLoadingWards(false);
                }
            }
        };

        loadWards();
        return () => {
            isMounted = false;
        };
    }, [formData.districtId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (name === "address") {
            setGpsCoords(null);
        }
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const handleProvinceSelect = (prov) => {
        setGpsCoords(null);
        setLoadingDistricts(true);
        setWards([]);
        setFormData((prev) => ({
            ...prev,
            provinceId: prov.id,
            city: prov.name,
            districtId: "",
            district: "",
            wardId: "",
            ward: ""
        }));
        setErrors((prev) => ({ ...prev, city: "", district: "" }));
    };

    const handleDistrictSelect = (dist) => {
        setGpsCoords(null);
        setWards([]);
        setLoadingWards(true);
        setFormData((prev) => ({
            ...prev,
            districtId: dist.id,
            district: dist.name,
            wardId: "",
            ward: ""
        }));
        if (errors.district) {
            setErrors((prev) => ({ ...prev, district: "" }));
        }
    };

    const handleWardSelect = (wardObj) => {
        setGpsCoords(null);
        setFormData((prev) => ({
            ...prev,
            wardId: wardObj.id,
            ward: wardObj.name
        }));
    };

    // Định vị GPS hiện tại
    const handleLocateMe = () => {
        if (!navigator.geolocation) return;

        setLocatingGps(true);
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                setGpsCoords({ lat: latitude, lng: longitude });

                try {
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=vi`
                    );
                    const data = await response.json();

                    if (data && data.address) {
                        const addr = data.address;
                        const stateOrCity = (addr.city || addr.state || addr.province || "").toLowerCase();

                        const matchedProvince = VIETNAM_PROVINCES.find((p) => {
                            const cleanName = p.name.replace("TP. ", "").toLowerCase();
                            return (
                                stateOrCity.includes(cleanName) ||
                                (data.display_name || "").toLowerCase().includes(cleanName)
                            );
                        });

                        const roadPart = [addr.house_number, addr.road || addr.suburb]
                            .filter(Boolean)
                            .join(" ");

                        setFormData((prev) => ({
                            ...prev,
                            provinceId: matchedProvince ? matchedProvince.id : prev.provinceId,
                            city: matchedProvince ? matchedProvince.name : prev.city,
                            district: addr.city_district || addr.county || addr.town || prev.district,
                            ward: addr.suburb || addr.quarter || addr.village || prev.ward,
                            address: roadPart || prev.address
                        }));
                    }
                } catch {
                    // Giữ nguyên tọa độ GPS trên bản đồ
                } finally {
                    setLocatingGps(false);
                }
            },
            () => {
                setLocatingGps(false);
            },
            { enableHighAccuracy: true, timeout: 8000 }
        );
    };

    const fullFormattedAddress = [
        formData.address.trim(),
        formData.ward,
        formData.district,
        formData.city
    ]
        .filter(Boolean)
        .join(", ");

    const mapSearchQuery = gpsCoords
        ? `${gpsCoords.lat},${gpsCoords.lng}`
        : [debouncedStreet, formData.ward, formData.district, formData.city, "Việt Nam"]
              .filter(Boolean)
              .join(", ");

    const mapZoomLevel = gpsCoords
        ? 17
        : debouncedStreet
        ? 16
        : formData.ward
        ? 15
        : formData.district
        ? 13
        : 11;

    const googleMapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
        mapSearchQuery
    )}&t=&z=${mapZoomLevel}&ie=UTF8&iwloc=&output=embed`;

    const validateForm = () => {
        const newErrors = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = "Vui lòng nhập họ và tên của bạn.";
        }

        const phoneRegex = /^(0|\+84)[3|5|7|8|9][0-9]{8}$/;
        if (!formData.phone.trim()) {
            newErrors.phone = "Vui lòng nhập số điện thoại nhận hàng.";
        } else if (!phoneRegex.test(formData.phone.trim())) {
            newErrors.phone = "Số điện thoại không đúng định dạng.";
        }

        if (!formData.city.trim()) {
            newErrors.city = "Vui lòng chọn Tỉnh / Thành phố.";
        }

        if (!formData.district.trim()) {
            newErrors.district = "Vui lòng chọn Quận / Huyện.";
        }

        if (!formData.address.trim()) {
            newErrors.address = "Vui lòng nhập số nhà, tên đường.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmitOrder = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const orderId = `VYBE-${Date.now().toString().slice(-6)}`;

        const orderInfo = {
            orderId,
            items: [...cartItems],
            subtotal,
            discountAmount,
            couponCode: appliedCoupon?.code || null,
            shippingFee,
            finalTotal,
            customer: {
                ...formData,
                fullAddress: fullFormattedAddress
            },
            createdAt: new Date().toLocaleString("vi-VN")
        };

        // kết nối front-end với back-end
        try {
            await
            fetch("http://localhost:5000/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(orderInfo)
            });
        } catch (err) {
            console.error("Lỗi kết nối Back-end:", err);
        }

        try {
            const existingOrders = JSON.parse(localStorage.getItem("vybe_orders") || "[]");
            localStorage.setItem("vybe_orders", JSON.stringify([orderInfo, ...existingOrders]));
        } catch (err) {
            console.error("Không thể lưu lịch sử đơn hàng:", err);
        }

        setCompletedOrder(orderInfo);
        clearCart();
        if (appliedCoupon?.code === "VIP15" || vipEmail) {
            consumeVipDiscount(formData.email);
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Tự động cuộn lên đầu trang khi chuyển sang màn hình Đặt hàng thành công / Quét mã VietQR
    useEffect(() => {
        if (completedOrder) {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, [completedOrder]);

    // ==========================================
    // MÀN HÌNH 1: ĐẶT HÀNG THÀNH CÔNG (SUCCESS)
    // ==========================================
    if (completedOrder) {
        return (
            <div className="checkout-page">
                <div className="checkout-success-container">
                    <div className="success-icon-wrap">
                        <CheckCircle2 size={56} className="success-icon" />
                    </div>

                    <p className="success-badge">ĐẶT HÀNG THÀNH CÔNG</p>
                    <h1>Cảm ơn bạn đã tin chọn VYBE!</h1>
                    <p className="success-subtitle">
                        Mã đơn hàng của bạn là <strong>#{completedOrder.orderId}</strong>.
                        Chúng tôi đã ghi nhận đơn hàng và sẽ liên hệ giao hàng sớm nhất.
                    </p>

                    {completedOrder.customer.paymentMethod === "qr" && (
                        <div className="vietqr-box">
                            <div className="vietqr-header">
                                <QrCode size={22} />
                                <h3>Quét mã VietQR để thanh toán</h3>
                            </div>
                            <p className="vietqr-desc">
                                Mở ứng dụng ngân hàng hoặc ví điện tử bất kỳ để quét mã thanh toán số tiền:
                                <strong> {formatPrice(completedOrder.finalTotal)}</strong>
                            </p>
                            <div className="vietqr-image-wrapper">
                                <img
                                    src={`https://img.vietqr.io/image/VPB-86868610117979-compact2.png?amount=${completedOrder.finalTotal}&addInfo=VYBE%20${completedOrder.orderId}&accountName=VYBE%20CLOTHING`}
                                    alt="Mã QR chuyển khoản đơn hàng VYBE"
                                    className="vietqr-code-img"
                                />
                            </div>
                            <div className="vietqr-bank-details">
                                <p>Ngân hàng: <strong>VPBank</strong></p>
                                <p>Số tài khoản: <strong>86868610117979</strong></p>
                                <p>Chủ tài khoản: <strong>Huỳnh Đăng Khoa</strong></p>
                                <p>Nội dung chuyển khoản: <strong>VYBE {completedOrder.orderId}</strong></p>
                            </div>
                        </div>
                    )}

                    <div className="success-order-summary">
                        <h3>Thông tin nhận hàng</h3>
                        <div className="summary-info-grid">
                            <p><span>Người nhận:</span> <strong>{completedOrder.customer.fullName}</strong></p>
                            <p><span>Số điện thoại:</span> <strong>{completedOrder.customer.phone}</strong></p>
                            <p>
                                <span>Địa chỉ:</span>{" "}
                                <strong>
                                    {completedOrder.customer.fullAddress ||
                                        `${completedOrder.customer.address}, ${completedOrder.customer.city}`}
                                </strong>
                            </p>
                            <p><span>Phương thức:</span> <strong>{completedOrder.customer.paymentMethod === "cod" ? "Thanh toán khi nhận hàng (COD)" : "Chuyển khoản VietQR"}</strong></p>
                            <p><span>Tổng thanh toán:</span> <strong className="highlight-price">{formatPrice(completedOrder.finalTotal)}</strong></p>
                        </div>
                    </div>

                    <div className="success-actions">
                        <Link to="/products" className="checkout-btn checkout-btn-primary">
                            Tiếp tục mua sắm
                        </Link>
                        <Link to="/" className="checkout-btn checkout-btn-outline">
                            Về trang chủ
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // ==========================================
    // MÀN HÌNH 2: GIỎ HÀNG ĐANG TRỐNG
    // ==========================================
    if (cartItems.length === 0) {
        return (
            <div className="checkout-page">
                <div className="checkout-empty-container">
                    <h2>Giỏ hàng của bạn đang trống</h2>
                    <p>Hãy chọn những mẫu trang phục Streetwear yêu thích trước khi tiến hành thanh toán nhé.</p>
                    <Link to="/products" className="checkout-btn checkout-btn-primary">
                        <ArrowLeft size={18} />
                        Khám phá sản phẩm VYBE
                    </Link>
                </div>
            </div>
        );
    }

    // ==========================================
    // MÀN HÌNH 3: FORM THANH TOÁN (2 CỘT)
    // ==========================================
    return (
        <div className="checkout-page">
            <div className="checkout-container">

                <div className="checkout-nav">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="checkout-back-link"
                    >
                        <ArrowLeft size={16} /> Quay lại
                    </button>
                    <h1>Thanh toán đơn hàng</h1>
                </div>

                <form onSubmit={handleSubmitOrder} className="checkout-grid" noValidate>

                    {/* CỘT TRÁI: FORM THÔNG TIN GIAO HÀNG */}
                    <div className="checkout-left">

                        <div className="checkout-card">
                            <h2>1. Thông tin giao hàng</h2>

                            <div className="form-group">
                                <label htmlFor="fullName">Họ và tên *</label>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    placeholder="Ví dụ: Nguyễn Văn A"
                                    className={errors.fullName ? "input-error" : ""}
                                />
                                {errors.fullName && <span className="field-error">{errors.fullName}</span>}
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="phone">Số điện thoại *</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="Ví dụ: 0912345678"
                                        className={errors.phone ? "input-error" : ""}
                                    />
                                    {errors.phone && <span className="field-error">{errors.phone}</span>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email (tùy chọn)</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Để nhận hóa đơn điện tử"
                                    />
                                </div>
                            </div>

                            {/* HÀNG ĐỊA CHỈ 1: TỈNH/THÀNH PHỐ & QUẬN/HUYỆN */}
                            <div className="form-row">
                                <CustomSelect
                                    label="Tỉnh / Thành phố"
                                    required
                                    placeholder="Chọn Tỉnh / Thành phố"
                                    searchPlaceholder="Tìm Tỉnh / Thành phố..."
                                    options={VIETNAM_PROVINCES}
                                    value={formData.provinceId}
                                    onChange={handleProvinceSelect}
                                    error={errors.city}
                                />

                                <CustomSelect
                                    label="Quận / Huyện"
                                    required
                                    placeholder="Chọn Quận / Huyện"
                                    searchPlaceholder="Tìm Quận / Huyện..."
                                    options={districts}
                                    value={formData.districtId}
                                    onChange={handleDistrictSelect}
                                    loading={loadingDistricts}
                                    disabled={!formData.provinceId}
                                    error={errors.district}
                                />
                            </div>

                            {/* HÀNG ĐỊA CHỈ 2: PHƯỜNG/XÃ & SỐ NHÀ, TÊN ĐƯỜNG */}
                            <div className="form-row">
                                {wards.length > 0 || !formData.districtId ? (
                                    <CustomSelect
                                        label="Phường / Xã"
                                        placeholder={
                                            formData.districtId
                                                ? "Chọn Phường / Xã"
                                                : "Chọn Quận / Huyện trước"
                                        }
                                        searchPlaceholder="Tìm Phường / Xã..."
                                        options={wards}
                                        value={formData.wardId}
                                        onChange={handleWardSelect}
                                        loading={loadingWards}
                                        disabled={!formData.districtId}
                                    />
                                ) : (
                                    <div className="form-group">
                                        <label htmlFor="wardInput">Phường / Xã</label>
                                        <input
                                            type="text"
                                            id="wardInput"
                                            name="ward"
                                            value={formData.ward}
                                            onChange={handleChange}
                                            placeholder="Nhập Phường / Xã"
                                        />
                                    </div>
                                )}

                                <div className="form-group">
                                    <label htmlFor="address">Địa chỉ cụ thể *</label>
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        placeholder="Số nhà, tên đường"
                                        className={errors.address ? "input-error" : ""}
                                    />
                                    {errors.address && <span className="field-error">{errors.address}</span>}
                                </div>
                            </div>

                            {/* BẢN ĐỒ VỊ TRÍ NHẬN HÀNG (TỐI GIẢN, TỰ NHIÊN) */}
                            <div className="form-group map-field-group">
                                <div className="map-label-row">
                                    <label>Vị trí trên bản đồ</label>
                                    <button
                                        type="button"
                                        className="map-gps-link"
                                        onClick={handleLocateMe}
                                        disabled={locatingGps}
                                    >
                                        <LocateFixed size={13} />
                                        <span>
                                            {locatingGps ? "Đang xác định vị trí..." : "Lấy vị trí hiện tại"}
                                        </span>
                                    </button>
                                </div>

                                <div className="clean-map-box">
                                    <iframe
                                        title="Bản đồ giao hàng"
                                        src={googleMapEmbedUrl}
                                        className="clean-map-iframe"
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    />
                                </div>

                                <p className="map-caption-text">
                                    Địa chỉ giao hàng: <strong>{fullFormattedAddress}</strong>
                                </p>
                            </div>

                            <div className="form-group">
                                <label htmlFor="note">Ghi chú giao hàng</label>
                                <textarea
                                    id="note"
                                    name="note"
                                    rows="2"
                                    value={formData.note}
                                    onChange={handleChange}
                                    placeholder="Ví dụ: Giao giờ hành chính, gọi trước khi giao..."
                                />
                            </div>
                        </div>

                        {/* PHƯƠNG THỨC THANH TOÁN */}
                        <div className="checkout-card">
                            <h2>2. Phương thức thanh toán</h2>

                            <div className="payment-options">
                                <label className={`payment-option-card ${formData.paymentMethod === "cod" ? "active" : ""}`}>
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="cod"
                                        checked={formData.paymentMethod === "cod"}
                                        onChange={handleChange}
                                    />
                                    <div className="payment-option-content">
                                        <div className="payment-option-title">
                                            <CreditCard size={18} />
                                            <strong>Thanh toán tiền mặt khi nhận hàng (COD)</strong>
                                        </div>
                                        <p>Kiểm tra trang phục thoải mái trước khi thanh toán tiền cho shipper.</p>
                                    </div>
                                </label>

                                <label className={`payment-option-card ${formData.paymentMethod === "qr" ? "active" : ""}`}>
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="qr"
                                        checked={formData.paymentMethod === "qr"}
                                        onChange={handleChange}
                                    />
                                    <div className="payment-option-content">
                                        <div className="payment-option-title">
                                            <QrCode size={18} />
                                            <strong>Chuyển khoản ngân hàng qua mã VietQR</strong>
                                            <span className="fast-badge">Khuyên dùng</span>
                                        </div>
                                        <p>Quét mã QR bằng mọi app ngân hàng, tiền chuyển tức thì, bảo mật 100%.</p>
                                    </div>
                                </label>
                            </div>
                        </div>

                    </div>

                    {/* CỘT PHẢI: TÓM TẮT ĐƠN HÀNG */}
                    <div className="checkout-right">
                        <div className="checkout-summary-card">
                            <h2>Đơn hàng của bạn ({cartItems.length} món)</h2>

                            <div className="summary-item-list">
                                {cartItems.map((item) => (
                                    <div key={item.cartItemId} className="summary-item">
                                        <div className="summary-item-img-wrap">
                                            <img src={item.img} alt={item.name} />
                                            <span className="summary-item-qty">{item.quantity}</span>
                                        </div>
                                        <div className="summary-item-info">
                                            <h4>{item.name}</h4>
                                            <p className="summary-item-meta">Size: <strong>{item.selectedSize}</strong></p>
                                        </div>
                                        <span className="summary-item-price">
                                            {formatPrice(item.price * item.quantity)}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="summary-divider" />

                            <div className="summary-calc">
                                <div className="calc-row">
                                    <span>Tạm tính</span>
                                    <span>{formatPrice(subtotal)}</span>
                                </div>
                                {appliedCoupon && (discountAmount > 0 || appliedCoupon.type === "freeship") && (
                                    <div className="calc-row">
                                        <span>Mã giảm giá ({appliedCoupon.code})</span>
                                        <strong className="text-free">
                                            {appliedCoupon.type === "freeship"
                                                ? "Miễn phí ship (-30.000đ)"
                                                : `-${formatPrice(discountAmount)}`}
                                        </strong>
                                    </div>
                                )}
                                <div className="calc-row">
                                    <span>Phí vận chuyển</span>
                                    <span>
                                        {shippingFee === 0 ? (
                                            <strong className="text-free">Miễn phí</strong>
                                        ) : (
                                            formatPrice(shippingFee)
                                        )}
                                    </span>
                                </div>
                                {shippingFee > 0 && (
                                    <p className="freeship-notice">
                                        Mua thêm {formatPrice(499000 - subtotal)} để được MIỄN PHÍ vận chuyển.
                                    </p>
                                )}
                            </div>

                            <div className="summary-divider" />

                            <div className="calc-total">
                                <span>Tổng thanh toán</span>
                                <strong>{formatPrice(finalTotal)}</strong>
                            </div>

                            <button
                                type="submit"
                                className="checkout-btn checkout-btn-submit"
                            >
                                ĐẶT HÀNG NGAY ({formatPrice(finalTotal)})
                            </button>

                            <div className="checkout-guarantees">
                                <p><Truck size={16} /> Giao hàng toàn quốc từ 2 - 4 ngày làm việc</p>
                                <p><ShieldCheck size={16} /> Bảo mật thông tin đơn hàng 100%</p>
                            </div>
                        </div>
                    </div>

                </form>

            </div>
        </div>
    );
}
