import { Link } from "react-router-dom";
import { EMAIL, HOURS, PHONE, SOCIALS } from "../config";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="stitch" aria-hidden="true" />
      <div className="wrap">
        <h2 className="site-footer__punch">Made by hand. Made for you.</h2>
        <p className="site-footer__sub">
          Every loop holds a little time, a little care and a lot of colour.
        </p>

        <div className="site-footer__grid">
          <div>
            <h3>Quick links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/shop">Category</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3>Contact us</h3>
            <ul>
              <li><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
              <li><a href={`tel:${PHONE.tel}`}>{PHONE.display}</a></li>
              <li>{HOURS}</li>
              <li>Made with love in India</li>
            </ul>
          </div>

          <div>
            <h3>Follow us</h3>
            <ul className="site-footer__socials">
              {SOCIALS.map((s) => (
                <li key={s.name}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer">
                    <strong>{s.name}</strong> {s.handle}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <p className="site-footer__copy">© 2026 Yarnnora. Handmade with care.</p>
    </footer>
  );
}