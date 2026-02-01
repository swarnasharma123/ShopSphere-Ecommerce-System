import React from "react";

export default function StaticPage({ title, description }) {
  return (
    <section className="page">
      <div className="page-header">
        <h2>{title}</h2>
        <p className="muted">{description}</p>
      </div>
      <div className="page-card">
        <p className="muted">
          This section is being updated. Please check back soon or reach out to our support team.
        </p>
      </div>
    </section>
  );
}
