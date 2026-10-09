import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Carousel.css";

export type Slide = {
  src: string;
  alt: string;
  title: string;
  blurb: string;
  to: string;
  color: string; // shown if the image fails to load
};

type Props = {
  slides: Slide[];
  intervalMs?: number;
};

export default function Carousel({ slides, intervalMs = 4500 }: Props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [failed, setFailed] = useState<Record<number, boolean>>({});
  const count = slides.length;

  const go = (i: number) => setIndex((i + count) % count);

  // Autoplay (skipped when paused or when the visitor prefers reduced motion)
  useEffect(() => {
    if (paused || count < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), intervalMs);
    return () => window.clearInterval(id);
  }, [paused, count, intervalMs]);

  return (
    <section
      className="carousel"
      aria-roledescription="carousel"
      aria-label="Featured products"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="carousel__viewport">
        <div className="carousel__track" style={{ transform: `translateX(-${index * 100}%)` }}>
          {slides.map((s, i) => (
            <div
              key={s.title}
              className="carousel__slide"
              style={{ background: s.color }}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
            >
              {!failed[i] && (
                <img
                  src={s.src}
                  alt={s.alt}
                  loading={i === 0 ? "eager" : "lazy"}
                  onError={() => setFailed((f) => ({ ...f, [i]: true }))}
                />
              )}
              <div className="carousel__caption">
                <h3>{s.title}</h3>
                <p>{s.blurb}</p>
                <Link to={s.to} tabIndex={i === index ? 0 : -1}>
                  Shop this
                </Link>
              </div>
            </div>
          ))}
        </div>

        <button className="carousel__arrow carousel__arrow--prev" aria-label="Previous slide" onClick={() => go(index - 1)}>
          ‹
        </button>
        <button className="carousel__arrow carousel__arrow--next" aria-label="Next slide" onClick={() => go(index + 1)}>
          ›
        </button>
      </div>

      <div className="carousel__dots">
        {slides.map((s, i) => (
          <button
            key={s.title}
            className={`carousel__dot ${i === index ? "is-active" : ""}`}
            aria-label={`Show slide ${i + 1}`}
            aria-current={i === index}
            onClick={() => go(i)}
          />
        ))}
      </div>
    </section>
  );
}
