import { useEffect, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import "./About.css";

const offers = [
  {
    title: "Flowers that never wilt",
    color: "var(--coral)",
    text: "Sunflowers, tulips, roses and wildflowers in every shade you can imagine. Each bloom is crocheted petal by petal, so it can brighten a desk, fill a vase or make a gift that lasts long after real bouquets have faded.",
    to: "/shop?category=Flowers",
    cta: "Explore flowers",
  },
  {
    title: "Home decor with heart",
    color: "var(--sun)",
    text: "Cushion covers, coasters, throws and little statement pieces in cheerful patterns. From soft pastels for a calm corner to bold patchwork for a room that wants to smile, every piece adds warmth you can see and feel.",
    to: "/shop?category=Home%20decor",
    cta: "Explore home decor",
  },
  {
    title: "Beauty, made gentle",
    color: "var(--mint)",
    text: "Scrunchies, hair clips, headbands and pretty little extras stitched from soft yarn. Small touches that turn getting ready into a happier part of your day, in styles for every mood and every look.",
    to: "/shop?category=Hair%20decor",
    cta: "Explore beauty",
  },
];

export default function About() {
  useEffect(() => {
    document.title = "About us | CozyLoops";
  }, []);

  return (
    <main className="about">
      {/* Story */}
      <section className="about-hero">
        <div className="wrap">
          <h1>Hello, we are CozyLoops</h1>
          <p className="about-lead">
            Every CozyLoops piece begins with a ball of yarn, a crochet hook and a little patience. We
            turn soft, colourful thread into things you can hold, gift and keep: flowers that bloom all
            year, decor that makes a house feel like home, and small beauty treats that make every day a
            little prettier. Everything is made by hand, one loop at a time, because we believe good
            things cannot be rushed.
          </p>
        </div>
      </section>

      <div className="stitch" aria-hidden="true" />

      {/* What we make */}
      <section className="about-offers" aria-labelledby="about-offers-title">
        <div className="wrap">
          <h2 id="about-offers-title" className="about-title">
            What we make
          </h2>
          <ul className="about-cards">
            {offers.map((o) => (
              <li key={o.title} className="about-card" style={{ "--c": o.color } as CSSProperties}>
                <span className="about-ball" aria-hidden="true" />
                <h3>{o.title}</h3>
                <p>{o.text}</p>
                <Link to={o.to}>{o.cta}</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Promise */}
      <section className="about-promise-wrap">
        <div className="wrap">
          <div className="about-promise">
            <h2>Why handmade?</h2>
            <p>
              Because a handmade thing carries time, care and a little bit of the person who made it. No
              two pieces are exactly alike, and that is the whole point. Pick something that makes you
              smile, or tell us your idea and we will stitch it just for you.
            </p>
            <div className="about-actions">
              <Link to="/shop" className="btn btn--navy">
                Shop all
              </Link>
              <Link to="/contact" className="btn btn--white">
                Say hello
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}