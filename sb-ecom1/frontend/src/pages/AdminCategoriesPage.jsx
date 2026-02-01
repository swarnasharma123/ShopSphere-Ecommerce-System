import React, { useEffect, useState } from "react";
import { createCategory, deleteCategory, fetchCategories } from "../api/catalog";
import { normalizeError } from "../utils/errorHelpers";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  async function loadCategories() {
    setError(null);
    try {
      const data = await fetchCategories({ pageNumber: 0, pageSize: 100 });
      setCategories(data.content || []);
    } catch (err) {
      setError(normalizeError(err));
    }
  }

  useEffect(() => {
    loadCategories();
  }, []);

  async function handleCreate(event) {
    event.preventDefault();
    setError(null);
    setMessage("");
    try {
      await createCategory({ categoryName: name });
      setName("");
      setMessage("Category created.");
      await loadCategories();
    } catch (err) {
      setError(normalizeError(err));
    }
  }

  async function handleDelete(categoryId) {
    setError(null);
    setMessage("");
    try {
      await deleteCategory(categoryId);
      setMessage("Category deleted.");
      await loadCategories();
    } catch (err) {
      setError(normalizeError(err));
    }
  }

  return (
    <section>
      <h2>Manage categories</h2>
      {error && (
        <div className="error">
          {error.message}
          <div className="error-details">{error.suggestion}</div>
        </div>
      )}
      {message && <div className="success">{message}</div>}

      <form className="form section" onSubmit={handleCreate}>
        <input
          className="input"
          placeholder="Category name (min 5 chars)"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
          minLength={5}
        />
        <button className="btn" type="submit">
          Create category
        </button>
      </form>

      <div className="section">
        <h3>Existing categories</h3>
        <div className="grid">
          {categories.map((category) => (
            <div className="card" key={category.categoryId}>
              <strong>{category.categoryName}</strong>
              <button
                className="btn danger"
                onClick={() => handleDelete(category.categoryId)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
