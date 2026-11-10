import { useSearchParams } from "react-router-dom";
import { Search, ArrowLeft } from "lucide-react";
import products, {
    getDiscountPercent,
    CATEGORY_LABEL
} from "../../Data/Products";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./Products.css";

export default function Products() {

    // 1. Đọc và cập nhật URL
    const [searchParams, setSearchParams] = useSearchParams();

    // 2. Lấy các query parameter từ URL
    const selectedGender = searchParams.get("gender") || "all";
    const selectedCategory = searchParams.get("category") || "all";
    const selectedSort = searchParams.get("sort") || "default";
    const searchQuery = (searchParams.get("q") || "").trim();

    // 3. Xử lý khi thay đổi giới tính
    const handleGenderChange = (gender) => {
        const newParams = new URLSearchParams(searchParams);

        if (gender === "all") {
            newParams.delete("gender");
        } else {
            newParams.set("gender", gender);
        }

        setSearchParams(newParams);
    };

    // 4. Xử lý khi nhấn tab danh mục
    const handleCategoryChange = (category) => {
        const newParams = new URLSearchParams(searchParams);

        if (category === "all") {
            newParams.delete("category");
            newParams.delete("q");
        } else {
            newParams.set("category", category);
        }

        setSearchParams(newParams);
    };

    // 5. Xử lý khi thay đổi Sắp xếp
    const handleSortChange = (sortValue) => {
        const newParams = new URLSearchParams(searchParams);

        if (sortValue === "default") {
            newParams.delete("sort");
        } else {
            newParams.set("sort", sortValue);
        }

        setSearchParams(newParams);
    };

    // 6. Xóa riêng từ khóa tìm kiếm q
    const handleClearSearch = () => {
        const newParams = new URLSearchParams(searchParams);
        newParams.delete("q");
        setSearchParams(newParams);
    };

    // 7. Xóa toàn bộ bộ lọc
    const handleResetAll = () => {
        setSearchParams({});
    };

    // 8. Hàm hỗ trợ chuẩn hóa chuỗi tiếng Việt
    const normalizeText = (text) =>
        text
            ? text
                  .toLowerCase()
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
                  .trim()
            : "";

    // 9. Lọc sản phẩm kết hợp đồng thời: gender, category/sale, sort và q
    const filteredProducts = products.filter((item) => {
        const matchGender =
            selectedGender === "all" || item.gender === selectedGender;

        const isOnSale = Boolean(item.originalPrice && item.originalPrice > item.price);
        const matchCategory =
            selectedCategory === "all"
                ? true
                : selectedCategory === "sale"
                ? isOnSale
                : item.category === selectedCategory;

        const matchSaleSort =
            selectedSort === "sale" ? isOnSale : true;

        const queryLower = searchQuery.toLowerCase();
        const queryNormalized = normalizeText(searchQuery);
        const categoryLabel = CATEGORY_LABEL[item.category] || "";

        const matchSearch =
            !searchQuery ||
            item.name.toLowerCase().includes(queryLower) ||
            (item.description && item.description.toLowerCase().includes(queryLower)) ||
            (item.alt && item.alt.toLowerCase().includes(queryLower)) ||
            categoryLabel.toLowerCase().includes(queryLower) ||
            normalizeText(item.name).includes(queryNormalized) ||
            normalizeText(item.description).includes(queryNormalized) ||
            normalizeText(item.alt).includes(queryNormalized) ||
            normalizeText(categoryLabel).includes(queryNormalized);

        return matchGender && matchCategory && matchSaleSort && matchSearch;
    });

    // 10. Sắp xếp danh sách sản phẩm
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (selectedSort === "price-asc") {
            return a.price - b.price;
        }
        if (selectedSort === "price-desc") {
            return b.price - a.price;
        }
        if (selectedSort === "sale") {
            return getDiscountPercent(b) - getDiscountPercent(a);
        }
        return 0;
    });

    return (
        <div className="products-page">

            {/* BANNER EDITORIAL */}
            <section className="products-banner">
                <div className="banner-content">
                    <span>ARCHIVE / 2026</span>
                    <h1>ALL PRODUCTS</h1>
                    <p>
                        Thiết kế tối giản, phom dáng rộng chuẩn Streetwear đương đại.
                    </p>
                </div>
            </section>

            {/* DANH SÁCH SẢN PHẨM */}
            <section className="products-body">

                {/* THANH ĐIỀU HƯỚNG DANH MỤC & SẮP XẾP CHUẨN FASHION BRAND */}
                <div className="fashion-filter-bar">

                    {/* TABS DANH MỤC BÊN TRÁI */}
                    <div className="fashion-cat-tabs">
                        <button
                            type="button"
                            className={`fashion-tab ${selectedCategory === "all" ? "active" : ""}`}
                            onClick={() => handleCategoryChange("all")}
                        >
                            Tất cả
                        </button>

                        <button
                            type="button"
                            className={`fashion-tab ${selectedCategory === "tops" ? "active" : ""}`}
                            onClick={() => handleCategoryChange("tops")}
                        >
                            Áo
                        </button>

                        <button
                            type="button"
                            className={`fashion-tab ${selectedCategory === "bottoms" ? "active" : ""}`}
                            onClick={() => handleCategoryChange("bottoms")}
                        >
                            Quần
                        </button>

                        <button
                            type="button"
                            className={`fashion-tab ${selectedCategory === "outerwear" ? "active" : ""}`}
                            onClick={() => handleCategoryChange("outerwear")}
                        >
                            Áo khoác
                        </button>

                        <button
                            type="button"
                            className={`fashion-tab ${selectedCategory === "shoes" ? "active" : ""}`}
                            onClick={() => handleCategoryChange("shoes")}
                        >
                            Giày
                        </button>

                        <button
                            type="button"
                            className={`fashion-tab ${selectedCategory === "bags" ? "active" : ""}`}
                            onClick={() => handleCategoryChange("bags")}
                        >
                            Balo & Túi
                        </button>

                        <button
                            type="button"
                            className={`fashion-tab fashion-tab-sale ${selectedCategory === "sale" ? "active" : ""}`}
                            onClick={() => handleCategoryChange("sale")}
                        >
                            Sale
                        </button>
                    </div>

                    {/* CỤM LỌC GIỚI TÍNH & SẮP XẾP BÊN PHẢI */}
                    <div className="fashion-controls">
                        <div className="fashion-select-group">
                            <label htmlFor="gender-select">Giới tính:</label>
                            <select
                                id="gender-select"
                                value={selectedGender}
                                onChange={(e) => handleGenderChange(e.target.value)}
                            >
                                <option value="all">Tất cả</option>
                                <option value="unisex">Unisex</option>
                                <option value="men">Nam</option>
                                <option value="women">Nữ</option>
                            </select>
                        </div>

                        <div className="fashion-select-group">
                            <label htmlFor="products-sort">Sắp xếp:</label>
                            <select
                                id="products-sort"
                                value={selectedSort}
                                onChange={(e) => handleSortChange(e.target.value)}
                            >
                                <option value="default">Mới nhất</option>
                                <option value="price-asc">Giá: Thấp → Cao</option>
                                <option value="price-desc">Giá: Cao → Thấp</option>
                                <option value="sale">Đang giảm giá</option>
                            </select>
                        </div>
                    </div>

                </div>

                {/* THANH TRẠNG THÁI TÌM KIẾM HIỆN ĐẠI HOẶC SỐ LƯỢNG SẢN PHẨM */}
                {searchQuery ? (
                    <div className="search-result-bar">
                        <div className="search-result-info">
                            <span className="search-result-icon">
                                <Search size={16} />
                            </span>
                            <div className="search-result-text">
                                <span className="search-result-label">Kết quả tìm kiếm cho</span>
                                <strong className="search-result-keyword">"{searchQuery}"</strong>
                                <span className="search-result-badge">
                                    {sortedProducts.length} sản phẩm
                                </span>
                            </div>
                        </div>

                        <button
                            type="button"
                            className="search-back-btn"
                            onClick={handleClearSearch}
                        >
                            <ArrowLeft size={15} />
                            <span>Quay lại tất cả sản phẩm</span>
                        </button>
                    </div>
                ) : (
                    <div className="fashion-meta-row">
                        <span className="products-count">
                            Hiển thị <strong>{sortedProducts.length}</strong> thiết kế
                        </span>
                    </div>
                )}

                {/* GRID SẢN PHẨM */}
                <div className="products-grid">

                    {sortedProducts.length > 0 ? (

                        sortedProducts.map((product) => (

                            <ProductCard
                                key={product.id}
                                product={product}
                            />

                        ))

                    ) : (

                        <div className="products-empty">
                            <h3>Không tìm thấy sản phẩm</h3>
                            <p>
                                {searchQuery
                                    ? `Không có kết quả cho "${searchQuery}".`
                                    : "Chưa có sản phẩm phù hợp với tiêu chí lọc của bạn."}
                            </p>

                            <button
                                type="button"
                                onClick={handleResetAll}
                            >
                                Xem tất cả sản phẩm
                            </button>
                        </div>

                    )}

                </div>

            </section>

        </div>
    );
}
