import { Link } from "react-router-dom";
import Carousel, { type Slide } from "../components/Carousel";
import "./Home.css";

// Hard-coded sample images from Unsplash (free to use under the Unsplash License).
// Replace with your own product photos later.
const img = (id: string, w = 1400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;

const slides: Slide[] = [
  {
    src: img("1782576417426-4ae01da20440"), // Cary Bates
    alt: "Colourful crochet granny square pattern in yellow, orange and pink",
    title: "Sunshine granny squares",
    blurb: "Bright patchwork pieces for bags and cushions.",
    to: "/shop",
    color: "var(--sun)",
  },
  {
    src: img("1779433755935-991480f06b98"), // Joachim Schnürle
    alt: "Five colourful crocheted penguin toys stacked on a table",
    title: "Penguin pals",
    blurb: "Soft amigurumi friends in every colour.",
    to: "/shop",
    color: "var(--mint)",
  },
  {
    src: img("1693387369575-df25ef8424e7"), // Bogdan Nesterenko
    alt: "A crocheted blanket laying on a bed",
    title: "Cloud blanket",
    blurb: "Chunky, warm and made to last.",
    to: "/shop",
    color: "var(--lilac)",
  },
  {
    src: img("1693387347071-d3bf494cbe0e"), // Bogdan Nesterenko
    alt: "A person holding a crocheted blanket on top of a bed",
    title: "Cozy throw",
    blurb: "Made for sofas, beds and slow evenings.",
    to: "/shop",
    color: "var(--coral)",
  },
];

type Product = { id: number; name: string; price: number; image: string; alt: string };

// Sample products. Later, load these from your data file or API.
const products: Product[] = [
  { id: 1, name: "Granny square throw", price: 1299, image: img("1782576417426-4ae01da20440", 600), alt: "Colourful granny square crochet" },
  { id: 2, name: "Penguin plush set", price: 799, image: img("1779433755935-991480f06b98", 600), alt: "Crocheted penguin toys" },
  { id: 3, name: "Cloud blanket", price: 1899, image: img("1693387369575-df25ef8424e7", 600), alt: "Crocheted blanket on a bed" },
  { id: 4, name: "Cozy sofa throw", price: 1599, image: img("1693387347071-d3bf494cbe0e", 600), alt: "Person holding a crocheted throw" },
  { id: 5, name: "Pastel baby blanket", price: 999, image: img("1693387359607-f48d0a824b1e", 600), alt: "Soft crocheted blanket" },
];

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
            <h2 id="home-quick-title">Most Loved Products</h2>
            <Link to="/shop" className="btn btn--navy">
              View all
            </Link>
          </div>

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
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
