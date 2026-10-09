import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Carousel, { type Slide } from "../components/Carousel";
import { useCart } from "../context/CartContext";
import { products, unsplash, type Product } from "../data/products";
import "./Home.css";

const slides: Slide[] = [
  {
    src: unsplash("1782576417426-4ae01da20440"), // Cary Bates
    alt: "Colourful crochet granny square pattern in yellow, orange and pink",
    title: "Sunshine granny squares",
    blurb: "Bright patchwork pieces for bags and cushions.",
    to: "/shop",
    color: "var(--sun)",
  },
  {
    src: unsplash("1779433755935-991480f06b98"), // Joachim Schnürle
    alt: "Five colourful crocheted penguin toys stacked on a table",
    title: "Penguin pals",
    blurb: "Soft amigurumi friends in every colour.",
    to: "/shop",
    color: "var(--mint)",
  },
  {
    src: unsplash("1693387369575-df25ef8424e7"), // Bogdan Nesterenko
    alt: "A crocheted blanket laying on a bed",
    title: "Cloud blanket",
    blurb: "Chunky, warm and made to last.",
    to: "/shop",
    color: "var(--lilac)",
  },
  {
    src: unsplash("1693387347071-d3bf494cbe0e"), // Bogdan Nesterenko
    alt: "A person holding a crocheted blanket on top of a bed",
    title: "Cozy throw",
    blurb: "Made for sofas, beds and slow evenings.",
    to: "/shop",
    color: "var(--coral)",
  },
];

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

const PlusIcon = () => (
  <svg {...iconProps}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const CheckIcon = () => (
  <svg {...iconProps}>
    <path d="M5 13l4 4L19 7" />
  </svg>
);

export default function Home() {
  const { addItem } = useCart();
  const [added, setAdded] = useState<Product | null>(null);
  const timer = useRef<number | undefined>(undefined);

  const handleAdd = (p: Product) => {
    addItem(p.id);
    setAdded(p);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setAdded(null), 1200);
  };

  return (
    <main>
      {/* Punch line + auto-changing photos */}
      <section className="home-top">
        <div className="wrap">
          <h1>Stitched slowly. Loved for years.</h1>
          <p className="home-top__lead">
            Handmade crochet bags, toys and home decor in every colour you can imagine.
          </p>
          <Carousel slides={slides} />
        </div>
      </section>

      <div className="stitch" aria-hidden="true" />

      {/* Quick products */}
      <section className="home-quick" aria-labelledby="home-quick-title">
        <div className="wrap">
          <div className="home-quick__head">
            <h2 id="home-quick-title">Quick Products</h2>
            <Link to="/shop" className="btn btn--navy">
              View all
            </Link>
          </div>

          {/* Screen readers hear this when an item is added */}
          <p className="sr-only" role="status">
            {added ? `${added.name} added to cart` : ""}
          </p>

          <ul className="home-tiles">
            {products.map((p) => (
              <li key={p.id} className="home-tile">
                <Link to={`/product/${p.id}`}>
                  <div className="home-tile__img">
                    <img
                      src={p.image}
                      alt={p.alt}
                      loading="lazy"
                      onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                  </div>
                  <div className="home-tile__body">
                    <h3>{p.name}</h3>
                    <p>₹{p.price}</p>
                  </div>
                </Link>

                {/* + button: adds this product to the cart */}
                <button
                  type="button"
                  className={`home-tile__add ${added?.id === p.id ? "is-added" : ""}`}
                  aria-label={`Add ${p.name} to cart`}
                  onClick={() => handleAdd(p)}
                >
                  {added?.id === p.id ? <CheckIcon /> : <PlusIcon />}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}