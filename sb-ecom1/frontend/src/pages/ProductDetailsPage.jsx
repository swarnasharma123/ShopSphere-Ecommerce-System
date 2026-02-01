import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProducts, PLACEHOLDER_IMAGE, resolveImageUrl } from "../api/catalog";
import { addToCart } from "../api/cart";
import { normalizeError } from "../utils/errorHelpers";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [error, setError] = useState(null);

  const productImages = useMemo(
    () => ({
      "smartphone x": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
      "denim jacket": "https://images.unsplash.com/photo-1520975661595-6453be3f7070?auto=format&fit=crop&w=900&q=80",
      "kitchen blender": "https://images-cdn.ubuy.co.in/693b255263e16e0e1b09fcd8-professional-blender-for-kitchen-2200.jpg",
      "home kitchen": "https://images-cdn.ubuy.co.in/693b255263e16e0e1b09fcd8-professional-blender-for-kitchen-2200.jpg",
      "girls fashion": "https://i.pinimg.com/736x/5d/ae/0d/5dae0d6633e91bdb9e728be265c8637f.jpg",
      "beauty & personal care": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80",
      "sports & fitness": "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80",
      books: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80",
      groceries: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80",
      "toys & baby": "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=900&q=80"
    }),
    []
  );

  const defaultImage = productImages["denim jacket"];
  const placeholderImage = PLACEHOLDER_IMAGE;

  function getProductImage(item) {
    const key = item.productName?.toLowerCase() || "";
    const matchKey = Object.keys(productImages).find((name) => key.includes(name));
    const resolvedImage =
      item.imageUrl || productImages[matchKey] || resolveImageUrl(item.image || "") || defaultImage;
    return resolvedImage || placeholderImage;
  }

  useEffect(() => {
    async function load() {
      setError(null);
      const data = await fetchProducts({ pageNumber: 0, pageSize: 100 });
      const items = data.content || [];
      const match = items.find((item) => String(item.productId) === String(id));
      setProduct(match || null);
      setRelated(items.filter((item) => String(item.productId) !== String(id)).slice(0, 4));
    }

    load().catch((err) => setError(normalizeError(err)));
  }, [id]);

  async function handleAddToCart(productId) {
    try {
      await addToCart(productId, 1);
    } catch (err) {
      setError(normalizeError(err));
    }
  }

  if (error) {
    return (
      <div className="error">
        {error.message}
        <div className="error-details">{error.suggestion}</div>
      </div>
    );
  }

  if (!product) {
    return <div className="notice">Product not found.</div>;
  }

  return (
    <section className="product-details">
      <button className="link" type="button" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="details-layout">
        <div className="details-gallery">
          <div className="details-image">
            <img
              src={getProductImage(product)}
              alt={product.productName}
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = placeholderImage;
              }}
            />
          </div>
        </div>
        <div className="details-info">
          <h2>{product.productName}</h2>
          <p className="muted">Top-rated product picked for you.</p>
          <div className="price-row">
            <span className="price">₹{product.specialPrice}</span>
            <span className="muted">₹{product.price}</span>
            <span className="badge outline">{product.discount}% off</span>
          </div>
          <p className="muted">Stock: {product.quantity}</p>
          <button className="btn pill" onClick={() => handleAddToCart(product.productId)}>
            Add to cart
          </button>
        </div>
      </div>

      <div className="section">
        <div className="section-header">
          <div>
            <span className="section-kicker">Related</span>
            <h2>Items you may like</h2>
          </div>
        </div>
        <div className="grid section">
          {related.map((item) => (
            <div
              key={item.productId}
              className="card product-card"
              role="button"
              tabIndex={0}
              onClick={() => navigate(`/products/${item.productId}`)}
            >
              <div className="product-image">
                <img
                  src={getProductImage(item)}
                  alt={item.productName}
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = placeholderImage;
                  }}
                />
              </div>
              <div className="product-body">
                <div className="row">
                  <strong>{item.productName}</strong>
                  <span className="badge pill">{item.quantity} left</span>
                </div>
                <div className="price-row">
                  <span className="price">₹{item.specialPrice}</span>
                  <span className="muted">₹{item.price}</span>
                  <span className="badge outline">{item.discount}% off</span>
                </div>
                <button className="btn pill" onClick={() => handleAddToCart(item.productId)}>
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
