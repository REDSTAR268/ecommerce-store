
function ProductCard({
  product,
  formatPrice,
  onViewDetails,
  onAddToCart
}) {
  return (
    <article className="product-card">
      <img
        src={product.image}
        alt={product.name}
      />

      <div className="product-info">
        <p className="product-category">
          {product.category}
        </p>

        <h3>{product.name}</h3>

        <p className="product-description">
          {product.description}
        </p>

        {/* PRODUCT PRICE */}
        <div className="product-price-row">
          <strong>
            {formatPrice(product.price)}
          </strong>
        </div>

        {/* PRODUCT BUTTONS */}
        <div className="product-actions">
          <button
            className="view-button"
            onClick={() => onViewDetails(product)}
          >
            View Details
          </button>

          <button
            className="primary-button"
            onClick={() => onAddToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
