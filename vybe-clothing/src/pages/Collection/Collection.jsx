import { useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, Layers, ArrowUpRight } from "lucide-react";
import products, { COLLECTIONS } from "../../Data/Products";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./Collection.css";

export default function Collection() {
    const [activeCollection, setActiveCollection] = useState("all");

    const filteredProducts =
        activeCollection === "all"
            ? products
            : products.filter((item) => item.collection === activeCollection);

    const currentDrop = COLLECTIONS.find((col) => col.id === activeCollection);

    return (
        <div className="collection-page">

            {/* HERO BANNER BỘ SƯU TẬP */}
            <section className="collection-banner">
                <div className="collection-banner-inner">
                    <div className="collection-banner-badge">
                        <Sparkles size={14} />
                        <span>SEASONAL ARCHIVE / 2026</span>
                    </div>

                    <h1>CURATED STREETWEAR DROPS</h1>

                    <p>
                        Khám phá 3 bộ sưu tập chủ đạo của VYBE năm 2026 — kết hợp phom dáng
                        Oversized phóng khoáng, chất liệu bền bỉ và tinh thần đường phố hiện đại.
                    </p>

                    <div className="collection-banner-stats">
                        <div>
                            <strong>03</strong>
                            <span>Bộ sưu tập</span>
                        </div>
                        <div>
                            <strong>{products.length}+</strong>
                            <span>Thiết kế độc quyền</span>
                        </div>
                        <div>
                            <strong>100%</strong>
                            <span>Streetwear DNA</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3 LOOKBOOK DROPS */}
            <section className="collection-drops-section">
                <div className="collection-section-head">
                    <div>
                        <span className="section-eyebrow">LOOKBOOK SERIES</span>
                        <h2>CHỌN BỘ SƯU TẬP CỦA BẠN</h2>
                    </div>
                    <Link to="/promotion" className="collection-promo-link">
                        Xem thêm Ưu đãi Khuyến mãi
                        <ArrowUpRight size={16} />
                    </Link>
                </div>

                <div className="collection-drops-grid">
                    {COLLECTIONS.map((col) => {
                        const count = products.filter((p) => p.collection === col.id).length;
                        const isSelected = activeCollection === col.id;

                        return (
                            <article
                                key={col.id}
                                className={`drop-card ${isSelected ? "is-selected" : ""}`}
                                onClick={() =>
                                    setActiveCollection(isSelected ? "all" : col.id)
                                }
                            >
                                <img
                                    src={col.image}
                                    alt={col.title}
                                    className="drop-card-img"
                                    loading="lazy"
                                />
                                <div className="drop-card-overlay" />

                                <div className="drop-card-top">
                                    <span className="drop-tag">{col.tag}</span>
                                    <span className="drop-count">{count} sản phẩm</span>
                                </div>

                                <div className="drop-card-bottom">
                                    <h3>{col.title}</h3>
                                    <p className="drop-subtitle">{col.subtitle}</p>
                                    <p className="drop-desc">{col.description}</p>
                                    <button type="button" className="drop-btn">
                                        {isSelected ? "Đang xem bộ sưu tập này ✓" : "Khám phá Drop này →"}
                                    </button>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </section>

            {/* DANH SÁCH SẢN PHẨM TRONG BỘ SƯU TẬP */}
            <section className="collection-catalog">
                <div className="collection-catalog-bar">
                    <div className="catalog-title-group">
                        <Layers size={20} />
                        <div>
                            <h3>
                                {currentDrop ? currentDrop.title : "TẤT CẢ BỘ SƯU TẬP 2026"}
                            </h3>
                            <p>
                                Hiển thị {filteredProducts.length} thiết kế trong bộ sưu tập
                            </p>
                        </div>
                    </div>

                    <div className="collection-tabs">
                        <button
                            type="button"
                            className={`collection-tab ${activeCollection === "all" ? "active" : ""}`}
                            onClick={() => setActiveCollection("all")}
                        >
                            Tất cả ({products.length})
                        </button>
                        {COLLECTIONS.map((col) => (
                            <button
                                key={col.id}
                                type="button"
                                className={`collection-tab ${activeCollection === col.id ? "active" : ""}`}
                                onClick={() => setActiveCollection(col.id)}
                            >
                                {col.title}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="products-grid">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>

        </div>
    );
}
