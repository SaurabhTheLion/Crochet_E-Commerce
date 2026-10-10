import { Link } from "react-router-dom";
import Carousel, { type Slide } from "../components/Carousel";
import ProductTile from "../components/ProductTile";
import { products, unsplash } from "../data/products";
import "./Home.css";

const slides: Slide[] = [
  {
    src: unsplash("1782576417426-4ae01da20440"), // Cary Bates
    alt: "Colourful crochet granny square pattern in yellow, orange and pink",
    title: "Sunshine granny squares",
    blurb: "Bright patchwork pieces for bags and cushions.",
    to: "/shop?category=Home%20decor",
    color: "var(--sun)",
  },
  {
    src: unsplash("1779433755935-991480f06b98"), // Joachim Schnürle
    alt: "Five colourful crocheted penguin toys stacked on a table",
    title: "Penguin pals",
    blurb: "Soft amigurumi friends in every colour.",
    to: "/shop?category=Toys",
    color: "var(--mint)",
  },
  {
    src: unsplash("1693387369575-df25ef8424e7"), // Bogdan Nesterenko
    alt: "A crocheted blanket laying on a bed",
    title: "Cloud blanket",
    blurb: "Chunky, warm and made to last.",
    to: "/shop?category=Bed%20items",
    color: "var(--lilac)",
  },
  {
    src: unsplash("1693387347071-d3bf494cbe0e"), // Bogdan Nesterenko
    alt: "A person holding a crocheted blanket on top of a bed",
    title: "Cozy throw",
    blurb: "Made for sofas, beds and slow evenings.",
    to: "/shop?category=Home%20decor",
    color: "var(--coral)",
  },
];

// Quick Products shows the first 5 products
const quickProducts = products.slice(0, 5);

export default function Home() {
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
              Shop by category
            </Link>
          </div>

          <ul className="tiles">
            {quickProducts.map((p) => (
              <ProductTile key={p.id} product={p} />
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}