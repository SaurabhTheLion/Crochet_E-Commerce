import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import type { Product } from "../data/products";
import "./ProductTile.css";

const iconProps = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

type Props = {
  product: Product;
  showCategory?: boolean; // handy on search results
};

// One tile. Render it inside <ul className="tiles">.
export default function ProductTile({ product, showCategory = false }: Props) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const handleAdd = () => {
    addItem(product.id);
    setAdded(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setAdded(false), 1200);
  };

  return (
    <li className="tile">
      <Link to={`/product/${product.id}`}>
        <div className="tile__img">
          <img
            src={product.image}
            alt={product.alt}
            loading="lazy"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
        </div>
        <div className="tile__body">
          {showCategory && <p className="tile__cat">{product.category}</p>}
          <h3>{product.name}</h3>
          <p className="tile__price">₹{product.price.toLocaleString("en-IN")}</p>
        </div>
      </Link>

      {/* + button: adds this product to the cart */}
      <button
        type="button"
        className={`tile__add ${added ? "is-added" : ""}`}
        aria-label={`Add ${product.name} to cart`}
        onClick={handleAdd}
      >
        {added ? (
          <svg {...iconProps}>
            <path d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg {...iconProps}>
            <path d="M12 5v14M5 12h14" />
          </svg>
        )}
      </button>

      <span className="sr-only" role="status">
        {added ? `${product.name} added to cart` : ""}
      </span>
    </li>
  );
}