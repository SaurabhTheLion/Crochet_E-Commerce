import { Link } from "react-router-dom";
import "./Footer.css";

// Replace these with your real profile links, handles and contact details.
const socials = [
  { name: "Instagram", handle: "@cozyloops", href: "https://www.instagram.com/" },
  { name: "Facebook", handle: "/cozyloops", href: "https://www.facebook.com/" },
  { name: "YouTube", handle: "@cozyloops", href: "https://www.youtube.com/" },
  { name: "WhatsApp", handle: "+91 90000 00000", href: "https://wa.me/919000000000" },
];

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
              <li><a href="mailto:hello@cozyloops.in">hello@cozyloops.in</a></li>
              <li><a href="tel:+919000000000">+91 90000 00000</a></li>
              <li>Mon to Sat, 10 am to 7 pm</li>
              <li>Made with love in India</li>
            </ul>
          </div>

          <div>
            <h3>Follow us</h3>
            <ul className="site-footer__socials">
              {socials.map((s) => (
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
      <p className="site-footer__copy">© 2026 CozyLoops. Handmade with care.</p>
    </footer>
  );
}
