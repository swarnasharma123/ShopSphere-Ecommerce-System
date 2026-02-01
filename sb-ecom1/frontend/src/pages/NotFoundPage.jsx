import React from "react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section>
      <h2>Page not found</h2>
      <p>Return to <Link to="/">home</Link>.</p>
    </section>
  );
}
