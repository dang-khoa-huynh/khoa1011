/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";

/**
 * WishlistContext cung cấp trạng thái toàn cục cho danh sách sản phẩm yêu thích.
 * Dữ liệu được lưu vào localStorage ("vybe_wishlist") nên vẫn giữ nguyên khi tải lại trang.
 */
const WishlistContext = createContext();

const WISHLIST_STORAGE_KEY = "vybe_wishlist";

export function WishlistProvider({ children }) {
    const [wishlist, setWishlist] = useState(() => {
        try {
            const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error("Không thể đọc danh sách yêu thích từ localStorage:", error);
            return [];
        }
    });

    // Đồng bộ lại localStorage mỗi khi wishlist thay đổi
    useEffect(() => {
        try {
            localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
        } catch (error) {
            console.error("Không thể lưu danh sách yêu thích vào localStorage:", error);
        }
    }, [wishlist]);

    const addToWishlist = (product) => {
        if (!product) return;
        setWishlist((prev) => {
            if (prev.some((item) => item.id === product.id)) return prev;
            return [...prev, product];
        });
    };

    const removeFromWishlist = (productId) => {
        setWishlist((prev) => prev.filter((item) => item.id !== productId));
    };

    const toggleWishlist = (product) => {
        if (!product) return;
        setWishlist((prev) => {
            const exists = prev.some((item) => item.id === product.id);
            if (exists) {
                return prev.filter((item) => item.id !== product.id);
            }
            return [...prev, product];
        });
    };

    const clearWishlist = () => {
        setWishlist([]);
    };

    const isInWishlist = (productId) => {
        return wishlist.some((item) => item.id === Number(productId));
    };

    const totalWishlist = wishlist.length;

    return (
        <WishlistContext.Provider
            value={{
                wishlist,
                totalWishlist,
                addToWishlist,
                removeFromWishlist,
                toggleWishlist,
                clearWishlist,
                isInWishlist
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
}

export function useWishlist() {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error("useWishlist phải được sử dụng bên trong WishlistProvider");
    }
    return context;
}
