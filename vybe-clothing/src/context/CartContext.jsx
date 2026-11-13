/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";

// 1. Khởi tạo Context cho giỏ hàng
const CartContext = createContext();

// Khóa lưu trữ trong localStorage
const CART_STORAGE_KEY = "vybe_cart_items";
const VIP_EMAIL_KEY = "vybe_vip_email";
const USED_VIP_EMAILS_KEY = "vybe_used_vip_emails";
const COUPON_STORAGE_KEY = "vybe_applied_coupon";

const VIP15_COUPON = {
    code: "VIP15",
    type: "percent",
    value: 15,
    label: "Giảm 15% đơn đầu tiên (VIP Club)"
};

// Đọc danh sách tất cả các email đã từng nhập nhận ưu đãi VIP15
const getUsedVipEmails = () => {
    try {
        const raw = localStorage.getItem(USED_VIP_EMAILS_KEY);
        const list = raw ? JSON.parse(raw) : [];
        const currentActive = (localStorage.getItem(VIP_EMAIL_KEY) || "").trim().toLowerCase();
        if (currentActive && !list.includes(currentActive)) {
            const merged = [...list, currentActive];
            localStorage.setItem(USED_VIP_EMAILS_KEY, JSON.stringify(merged));
            return merged;
        }
        return list;
    } catch {
        return [];
    }
};

export function CartProvider({ children }) {
    // 2. Khởi tạo state giỏ hàng từ localStorage (nếu có)
    const [cartItems, setCartItems] = useState(() => {
        try {
            const saved = localStorage.getItem(CART_STORAGE_KEY);
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error("Lỗi khi đọc giỏ hàng từ localStorage:", error);
            return [];
        }
    });

    // 3. Danh sách các email đã từng được nhập để nhận mã giảm 15% (không được nhập lại lần 2)
    const [usedVipEmails, setUsedVipEmails] = useState(() => getUsedVipEmails());

    // 4. State Email VIP đang kích hoạt cho đơn hàng đầu tiên hiện tại
    const [vipEmail, setVipEmail] = useState(() => {
        return (localStorage.getItem(VIP_EMAIL_KEY) || "").trim().toLowerCase();
    });

    // 5. State điều khiển đóng / mở Cart Drawer và Mã giảm giá toàn cục (Chỉ áp dụng 1 mã / đơn, không cộng dồn)
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [appliedCoupon, setAppliedCoupon] = useState(() => {
        try {
            const savedVip = (localStorage.getItem(VIP_EMAIL_KEY) || "").trim().toLowerCase();
            const savedCouponRaw = localStorage.getItem(COUPON_STORAGE_KEY);
            const savedCoupon = savedCouponRaw ? JSON.parse(savedCouponRaw) : null;

            if (savedCoupon?.code === "VIP15" && !savedVip) {
                localStorage.removeItem(COUPON_STORAGE_KEY);
                return null;
            }

            if (savedVip && (!savedCoupon || savedCoupon.code === "VYBE10")) {
                return VIP15_COUPON;
            }

            return savedCoupon;
        } catch {
            return null;
        }
    });

    // Đồng bộ giỏ hàng vào localStorage
    useEffect(() => {
        try {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
        } catch (error) {
            console.error("Lỗi khi lưu giỏ hàng vào localStorage:", error);
        }
    }, [cartItems]);

    // Đồng bộ mã giảm giá vào localStorage
    useEffect(() => {
        try {
            if (appliedCoupon) {
                localStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify(appliedCoupon));
            } else {
                localStorage.removeItem(COUPON_STORAGE_KEY);
            }
        } catch (error) {
            console.error("Lỗi khi lưu mã giảm giá:", error);
        }
    }, [appliedCoupon]);

    // Hàm đăng ký Email VIP -> Chặn tuyệt đối nếu email đã từng được nhập trước đó
    const registerVipEmail = (email) => {
        const cleanEmail = (email || "").trim().toLowerCase();
        if (!cleanEmail) {
            return { success: false, message: "Vui lòng nhập địa chỉ email hợp lệ." };
        }

        const currentUsed = getUsedVipEmails();
        if (currentUsed.includes(cleanEmail)) {
            return {
                success: false,
                message: `Email "${cleanEmail}" đã được sử dụng để nhận mã giảm 15% rồi và không thể nhập lại lần 2! Vui lòng nhập email mới hoặc dùng các Voucher công khai (VYBE10, VYBE50K, FREESHIP).`
            };
        }

        // Lưu vào danh sách email đã nhận ưu đãi để không thể nhập lại lần nữa
        const updatedUsed = [...currentUsed, cleanEmail];
        localStorage.setItem(USED_VIP_EMAILS_KEY, JSON.stringify(updatedUsed));
        setUsedVipEmails(updatedUsed);

        // Kích hoạt trực tiếp mã VIP15 (-15%) cho đơn hàng hiện tại
        localStorage.setItem(VIP_EMAIL_KEY, cleanEmail);
        setVipEmail(cleanEmail);
        setAppliedCoupon(VIP15_COUPON);

        return {
            success: true,
            message: `Đã mở khóa & kích hoạt trực tiếp mã VIP15 (-15%) cho đơn đầu tiên của ${cleanEmail}!`
        };
    };

    // Thu hồi quyền lợi VIP15 sau khi khách đã hoàn tất đặt đơn đầu tiên
    const consumeVipDiscount = (checkoutEmail = "") => {
        const cleanCheckout = (checkoutEmail || "").trim().toLowerCase();
        if (cleanCheckout) {
            const updatedUsed = Array.from(new Set([...getUsedVipEmails(), cleanCheckout]));
            localStorage.setItem(USED_VIP_EMAILS_KEY, JSON.stringify(updatedUsed));
            setUsedVipEmails(updatedUsed);
        }

        localStorage.removeItem(VIP_EMAIL_KEY);
        localStorage.removeItem(COUPON_STORAGE_KEY);
        setVipEmail("");
        setAppliedCoupon(null);
    };

    // Hàm đổi sang nhập email khác (Email cũ vẫn nằm trong danh sách đã nhận nên không thể nhập lại)
    const clearVipEmail = () => {
        localStorage.removeItem(VIP_EMAIL_KEY);
        setVipEmail("");
        if (appliedCoupon?.code === "VIP15") {
            setAppliedCoupon(null);
        }
    };

    // 6. Hàm thêm sản phẩm vào giỏ hàng
    const addToCart = (product, selectedSize = "M", quantity = 1, openDrawer = true) => {
        const cartItemId = `${product.id}-${selectedSize}`;

        setCartItems((prevItems) => {
            const existingIndex = prevItems.findIndex(
                (item) => item.cartItemId === cartItemId
            );

            if (existingIndex > -1) {
                const updated = [...prevItems];
                updated[existingIndex] = {
                    ...updated[existingIndex],
                    quantity: updated[existingIndex].quantity + quantity
                };
                return updated;
            } else {
                return [
                    {
                        cartItemId,
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        img: product.img,
                        selectedSize,
                        quantity
                    },
                    ...prevItems
                ];
            }
        });

        // Nếu khách đang có Email VIP kích hoạt cho đơn đầu tiên, tự động bật VIP15 (-15%)
        const activeVip = vipEmail || localStorage.getItem(VIP_EMAIL_KEY);
        if (activeVip && !appliedCoupon) {
            setAppliedCoupon(VIP15_COUPON);
        }

        if (openDrawer) {
            setIsCartOpen(true);
        }
    };

    // 7. Hàm tăng / giảm số lượng của một món trong giỏ
    const updateQuantity = (cartItemId, delta) => {
        setCartItems((prevItems) =>
            prevItems
                .map((item) => {
                    if (item.cartItemId === cartItemId) {
                        const newQty = item.quantity + delta;
                        return newQty > 0 ? { ...item, quantity: newQty } : null;
                    }
                    return item;
                })
                .filter(Boolean)
        );
    };

    // 8. Hàm xóa hẳn một món khỏi giỏ
    const removeFromCart = (cartItemId) => {
        setCartItems((prevItems) =>
            prevItems.filter((item) => item.cartItemId !== cartItemId)
        );
    };

    // 9. Hàm xóa toàn bộ giỏ hàng
    const clearCart = () => {
        setCartItems([]);
        if (vipEmail) {
            setAppliedCoupon(VIP15_COUPON);
        } else {
            setAppliedCoupon(null);
        }
    };

    // 10. Tính toán các giá trị tự động (Mỗi đơn chỉ áp dụng 1 mã duy nhất, KHÔNG cộng dồn nhiều mã)
    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    const freeShippingThreshold = 499000;
    const isFreeShipping = subtotal >= freeShippingThreshold;

    // Nếu đơn hàng đạt từ 499.000đ trở lên (đã được Freeship mặc định), tự động bỏ qua mã FREESHIP (nếu đang áp)
    const effectiveCoupon =
        isFreeShipping && appliedCoupon?.code === "FREESHIP"
            ? vipEmail
                ? VIP15_COUPON
                : null
            : appliedCoupon;

    const baseShippingFee = subtotal === 0 ? 0 : isFreeShipping ? 0 : 30000;
    const shippingFee = effectiveCoupon?.type === "freeship" ? 0 : baseShippingFee;

    let discountAmount = 0;
    if (effectiveCoupon?.type === "percent") {
        discountAmount = Math.round(subtotal * (effectiveCoupon.value / 100));
    } else if (effectiveCoupon?.type === "fixed") {
        discountAmount = Math.min(subtotal, effectiveCoupon.value);
    }

    const finalTotal = Math.max(0, subtotal - discountAmount + shippingFee);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                isCartOpen,
                setIsCartOpen,
                addToCart,
                updateQuantity,
                removeFromCart,
                clearCart,
                totalItems,
                subtotal,
                isFreeShipping,
                freeShippingThreshold,
                appliedCoupon: effectiveCoupon,
                setAppliedCoupon,
                discountAmount,
                shippingFee,
                finalTotal,
                vipEmail,
                usedVipEmails,
                registerVipEmail,
                clearVipEmail,
                consumeVipDiscount
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

// 11. Custom Hook useCart
export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart phải được sử dụng bên trong CartProvider");
    }
    return context;
}
