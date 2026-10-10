import { useEffect, useState, type CSSProperties } from "react";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { products, type Product as ProductType } from "../data/products";
import "./Product.css";

// Star rating. The gold part is cut at the right percentage, so 4.6 shows 4 and a bit stars.
function Stars({ value }: { value: number }) {
  return (
    <>
      <span className="stars" style={{ "--pct": `${(value / 5) * 100}%` } as CSSProperties} aria-hidden="true">
        ★★★★★
      </span>
      <span className="sr-only">Rated {value} out of 5</span>
    </>
  );
}

function ProductView({ product }: { product: ProductType }) {
  const { addItem, items } = useCart();
  const [active, setActive] = useState(0);
  const [justAdded, setJustAdded] = useState(false);
  const inCart = items.find((i) => i.id === product.id)?.qty ?? 0;

  useEffect(() => {
    document.title = `${product.name} | CozyLoops`;
  }, [product.name]);

  const handleAdd = () => {
    addItem(product.id);
    setJustAdded(true);
  };

  const photoAlt = (n: number) => (n === 0 ? product.alt : `${product.name}, dummy photo ${n + 1}`);

  return (
    <main className="pdp">
      <div className="wrap">
        <nav className="pdp-crumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link> › <Link to={`/shop?category=${encodeURIComponent(product.category)}`}>{product.category}</Link> ›{" "}
          <span aria-current="page">{product.name}</span>
        </nav>

        <div className="pdp-top">
          {/* Photos */}
          <div className="pdp-gallery">
            <ul className="pdp-thumbs">
              {product.images.map((src, n) => (
                <li key={n}>
                  <button
                    type="button"
                    className={n === active ? "is-active" : ""}
                    aria-label={`Show photo ${n + 1}`}
                    aria-pressed={n === active}
                    onClick={() => setActive(n)}
                  >
                    <img src={src} alt="" />
                  </button>
                </li>
              ))}
            </ul>
            <div className="pdp-main">
              <img src={product.images[active]} alt={photoAlt(active)} />
            </div>
          </div>

          {/* Details */}
          <div className="pdp-info">
            <h1>{product.name}</h1>

            <a href="#reviews" className="pdp-rating">
              <strong>{product.rating}</strong>
              <Stars value={product.rating} />
              <span>({product.ratingCount} ratings)</span>
            </a>

            <p className="pdp-price">
              <span>₹</span>
              {product.price.toLocaleString("en-IN")}
            </p>
            <p className="pdp-stock">In stock</p>

            <p className="pdp-desc">{product.description}</p>

            <h2 className="pdp-sub">About this item</h2>
            <ul className="pdp-features">
              {product.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>

            <div className="pdp-buy">
              <button type="button" className="btn btn--navy" onClick={handleAdd}>
                {justAdded ? "Added to cart ✓" : "Add to cart"}
              </button>
              {inCart > 0 && (
                <Link to="/cart" className="btn btn--white">
                  Go to cart ({inCart})
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Reviews */}
        <section id="reviews" className="pdp-reviews" aria-labelledby="reviews-title">
          <h2 id="reviews-title">Customer reviews</h2>

          <div className="pdp-reviews__grid">
            <div className="pdp-summary">
              <p className="pdp-summary__score">
                <strong>{product.rating}</strong> out of 5
              </p>
              <Stars value={product.rating} />
              <p className="pdp-summary__count">{product.ratingCount} ratings</p>

              <ul className="pdp-bars">
                {product.breakdown.map((pct, n) => (
                  <li key={n}>
                    <span>{5 - n} star</span>
                    <div className="pdp-bar" aria-hidden="true">
                      <div style={{ width: `${pct}%` }} />
                    </div>
                    <span>{pct}%</span>
                  </li>
                ))}
              </ul>
            </div>

            <ul className="pdp-review-list">
              {product.reviews.map((r) => (
                <li key={r.id} className="review">
                  <div className="review__avatar" aria-hidden="true">
                    {r.name[0]}
                  </div>
                  <div>
                    <p className="review__name">{r.name}</p>
                    <p className="review__title">
                      <Stars value={r.rating} /> <strong>{r.title}</strong>
                    </p>
                    <p className="review__meta">Reviewed on {r.date} · Verified purchase</p>
                    <p>{r.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}

export default function Product() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <main className="pdp">
        <div className="wrap">
          <h1>Product not found</h1>
          <p className="pdp-missing">We could not find that product. It may have been removed.</p>
          <Link to="/" className="btn btn--navy">
            Back to home
          </Link>
        </div>
      </main>
    );
  }

  // key resets the gallery and button state when you move to another product
  return <ProductView key={product.id} product={product} />;
}