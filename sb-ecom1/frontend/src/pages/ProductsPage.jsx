import React, { useEffect, useMemo, useState } from "react";
import {
  fetchCategories,
  fetchProducts,
  fetchProductsByCategory,
  PLACEHOLDER_IMAGE,
  resolveImageUrl,
  searchProducts
} from "../api/catalog";
import { addToCart } from "../api/cart";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { normalizeError } from "../utils/errorHelpers";

export default function ProductsPage() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("all");
  const [error, setError] = useState(null);
  const [info, setInfo] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories({ pageNumber: 0, pageSize: 50 })
      .then((data) => setCategories(data.content || []))
        .catch((err) => setError(normalizeError(err)));
  }, []);

  useEffect(() => {
    setError(null);
    setInfo("");

    const load = async () => {
      if (search.trim().length > 0) {
        const data = await searchProducts(search.trim(), { pageNumber: 0, pageSize: 20 });
        setProducts(data.content || []);
        return;
      }
      if (categoryId !== "all") {
        const data = await fetchProductsByCategory(categoryId, { pageNumber: 0, pageSize: 20 });
        setProducts(data.content || []);
        return;
      }
      const data = await fetchProducts({ pageNumber: 0, pageSize: 20 });
      setProducts(data.content || []);
    };

    load().catch((err) => setError(normalizeError(err)));
  }, [search, categoryId]);

  async function handleAddToCart(productId) {
    if (!user) {
      navigate("/login");
      return;
    }
    try {
      await addToCart(productId, 1);
      setInfo("Added to cart.");
    } catch (err) {
      setError(normalizeError(err));
    }
  }

  const categoryOptions = useMemo(
    () => [{ categoryId: "all", categoryName: "All categories" }, ...categories],
    [categories]
  );

  const productImages = useMemo(
    () => ({
      "smartphone x": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80",
      "denim jacket": "https://img.freepik.com/free-photo/medium-shot-woman-posing-outdoors_23-2149870211.jpg?semt=ais_hybrid&w=740&q=80",
      "kitchen blender": "https://images-cdn.ubuy.co.in/693b255263e16e0e1b09fcd8-professional-blender-for-kitchen-2200.jpg",
      "home kitchen": "https://images-cdn.ubuy.co.in/693b255263e16e0e1b09fcd8-professional-blender-for-kitchen-2200.jpg",
      "girls fashion": "https://i.pinimg.com/736x/5d/ae/0d/5dae0d6633e91bdb9e728be265c8637f.jpg"
    }),
    []
  );

  const categoryImages = useMemo(
    () => ({
      Electronics: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80",
      Fashion: "https://picsum.photos/id/1062/900/900",
      "Home & Kitchen": "https://images-cdn.ubuy.co.in/693b255263e16e0e1b09fcd8-professional-blender-for-kitchen-2200.jpg",
      "Girls Fashion": "https://i.pinimg.com/736x/5d/ae/0d/5dae0d6633e91bdb9e728be265c8637f.jpg",
      "Beauty & Personal Care": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80",
      "Sports & Fitness": "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80",
      "Books & Stationery": "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80",
      Groceries: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80",
      "Toys & Baby Products": "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=900&q=80"
    }),
    []
  );

  const defaultImage = productImages["denim jacket"];
  const placeholderImage = PLACEHOLDER_IMAGE;

  function getProductImage(product) {
    const key = product.productName?.toLowerCase() || "";
    const matchKey = Object.keys(productImages).find((name) => key.includes(name));
    const resolvedImage = (
      product.imageUrl ||
      productImages[matchKey] ||
      resolveImageUrl(product.image || "") ||
      categoryImages[selectedCategoryName] ||
      defaultImage
    );
    return resolvedImage || placeholderImage;
  }

  const selectedCategoryName = categoryOptions.find(
    (category) => String(category.categoryId) === String(categoryId)
  )?.categoryName;

  const displayProducts = products;

  return (
    <section>
      <div className="storefront">
        <aside className="sidebar">
          <div className="sidebar-card">
            <details className="sidebar-dropdown">
              <summary className="sidebar-title">Exclusive</summary>
              <div className="sidebar-list">
                {categoryOptions.map((category) => (
                  <button
                    key={category.categoryId}
                    className={`sidebar-item ${
                      String(categoryId) === String(category.categoryId) ? "active" : ""
                    }`}
                    onClick={() => setCategoryId(category.categoryId)}
                    type="button"
                  >
                    {category.categoryName}
                  </button>
                ))}
              </div>
            </details>
          </div>
        </aside>

        <div className="main">
          <div className="hero banner">
            <div className="hero-content">
              <span className="hero-kicker">Limited Offer</span>
              <h1>Up to 10% off Voucher</h1>
              <p className="muted">
                Shop curated electronics, fashion, and home essentials.
              </p>
              <div className="hero-search">
                <input
                  className="input search"
                  placeholder="Search products by keyword"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
                <select
                  className="input select"
                  value={categoryId}
                  onChange={(event) => setCategoryId(event.target.value)}
                >
                  {categoryOptions.map((category) => (
                    <option key={category.categoryId} value={category.categoryId}>
                      {category.categoryName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="hero-visual" />
          </div>

          <div className="filters">
            <div className="chips">
              {categoryOptions.map((category) => (
                <button
                  key={category.categoryId}
                  className={`chip ${
                    String(categoryId) === String(category.categoryId) ? "active" : ""
                  }`}
                  onClick={() => setCategoryId(category.categoryId)}
                  type="button"
                >
                  {category.categoryName}
                </button>
              ))}
            </div>
            <div className="filter-actions">
              <span className="muted">Popular</span>
              <span className="dot" />
              <span className="muted">Newest</span>
            </div>
          </div>

      {error && (
        <div className="error section">
          {error.message}
          <div className="error-details">{error.suggestion}</div>
        </div>
      )}
      {info && <div className="success section">{info}</div>}

          <div className="section-header">
            <div>
              <span className="section-kicker">Today’s</span>
              <h2>Flash Sales</h2>
            </div>
            <button className="btn pill outline">View all products</button>
          </div>

          <div className="grid section">
            {displayProducts.map((product) => (
              <div
                key={product.productId}
                className="card product-card"
                role="button"
                tabIndex={0}
                onClick={() => setSelectedProduct(product)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    setSelectedProduct(product);
                  }
                }}
              >
                <div className="product-image">
                  <img
                    src={getProductImage(product)}
                    alt={product.productName}
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = placeholderImage;
                    }}
                  />
                </div>
                <div className="product-body">
                  <div className="row">
                    <strong>{product.productName}</strong>
                    <span className="badge pill">{product.quantity} left</span>
                  </div>
                  <div className="price-row">
                    <span className="price">₹{product.specialPrice}</span>
                    <span className="muted">₹{product.price}</span>
                    <span className="badge outline">{product.discount}% off</span>
                  </div>
                  <div className="row">
                    <button className="btn pill" onClick={() => handleAddToCart(product.productId)}>
                    Add to cart
                    </button>
                    <button
                      className="btn outline pill"
                      onClick={(event) => {
                        event.stopPropagation();
                        navigate(`/products/${product.productId}`);
                      }}
                    >
                      View details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal" onClick={(event) => event.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProduct(null)}>
              ×
            </button>
            <div className="modal-content">
              <div className="modal-image">
                <img
                  src={getProductImage(selectedProduct)}
                  alt={selectedProduct.productName}
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = defaultImage;
                  }}
                />
              </div>
              <div className="modal-details">
                <h3>{selectedProduct.productName}</h3>
                <div className="price-row">
                  <span className="price">₹{selectedProduct.specialPrice}</span>
                  <span className="muted">₹{selectedProduct.price}</span>
                  <span className="badge outline">{selectedProduct.discount}% off</span>
                </div>
                <p className="muted">Stock: {selectedProduct.quantity}</p>
                <button
                  className="btn pill"
                  onClick={() => handleAddToCart(selectedProduct.productId)}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
