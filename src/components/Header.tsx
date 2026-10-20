import { useState, type FormEvent } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Header.css";

const links = [
  { label: "Home", to: "/", end: true },
  { label: "About", to: "/about", end: false },
  { label: "Category", to: "/shop", end: false },
  { label: "Contact", to: "/contact", end: false },
];

// Yarnnora logo: a ball of yarn with a looping thread
function Logo() {
  return (
    <svg viewBox="0 0 52 52" width="44" height="44" aria-hidden="true">
      <circle cx="22" cy="22" r="17" fill="#ff7a6b" />
      <path d="M8 15c9 5 20 5 29-2" stroke="#fff" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      <path d="M6 24c11 6 24 6 34-1" stroke="#ffc93c" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      <path d="M11 33c8 4 17 3 25-3" stroke="#b79cff" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      <path
        d="M34 37c6 6 14 1 12-6-1-5-8-5-7-1s8 3 7-1"
        stroke="#17324d"
        strokeWidth="2.6"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

const iconProps = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

function SearchIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="11" cy="11" r="7" />
      <path d="M16.5 16.5 21 21" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg {...iconProps}>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg {...iconProps}>
      <path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 1.9-1.4L21 8H6.2" />
      <circle cx="10" cy="20.5" r="1.4" />
      <circle cx="17" cy="20.5" r="1.4" />
    </svg>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { count } = useCart();

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    navigate(`/shop?search=${encodeURIComponent(q)}`);
    setOpen(false);
  };

  return (
    <header className="site-header">
      <div className="site-header__inner">
        {/* Menu button: only visible on small screens */}
        <button
          className="menu-btn"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="header-panel"
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>

        <Link to="/" className="brand">
          <Logo />
          <span className="brand__name">Yarnnora</span>
        </Link>

        <div id="header-panel" className={`site-header__panel ${open ? "is-open" : ""}`}>
          <nav className="main-nav" aria-label="Main">
            {links.map((l) => (
              <NavLink
                key={l.label}
                to={l.to}
                end={l.end}
                className={({ isActive }) => `main-nav__link ${isActive ? "is-active" : ""}`}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <form className="search" role="search" onSubmit={onSearch}>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search bags, toys, blankets..."
              aria-label="Search products"
            />
            <button type="submit" aria-label="Search">
              <SearchIcon />
            </button>
          </form>
        </div>

        <div className="header-icons">
          <Link to="/wishlist" className="icon-btn" aria-label="Wishlist">
            <HeartIcon />
          </Link>
          <Link
            to="/cart"
            className="icon-btn"
            aria-label={count > 0 ? `Cart, ${count} item${count > 1 ? "s" : ""}` : "Cart"}
          >
            <CartIcon />
            {count > 0 && <span className="icon-btn__badge">{count > 99 ? "99+" : count}</span>}
          </Link>
        </div>
      </div>
    </header>
  );
}