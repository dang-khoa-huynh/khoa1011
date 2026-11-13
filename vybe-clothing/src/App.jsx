import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import ProductDetail from "./pages/ProductDetail";
import Collection from "./pages/Collection/Collection";
import Promotion from "./pages/Promotion/Promotion";
import Wishlist from "./pages/Wishlist/Wishlist";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import ScrollToTop from "./components/ScrollToTop";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";

import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <CartProvider>
                <WishlistProvider>
                    <ScrollToTop />
                    <Header /> 
                    <main className="main-content">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/products" element={<Products />} />
                            <Route path="/products/:id" element={<ProductDetail />} />
                            <Route path="/collection" element={<Collection />} />
                            <Route path="/promotion" element={<Promotion />} />
                            <Route path="/wishlist" element={<Wishlist />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/checkout" element={<Checkout />} />
                            {/* Bắt các đường dẫn không tồn tại và chuyển hướng về trang sản phẩm */}
                            <Route path="*" element={<Navigate to="/products" replace />} />
                        </Routes>
                    </main>
                    <Footer />
                </WishlistProvider>
            </CartProvider>
        </BrowserRouter>
    );
}

export default App;
