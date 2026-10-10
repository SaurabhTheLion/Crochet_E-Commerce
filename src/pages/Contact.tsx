import { useEffect, useState, type FormEvent } from "react";
import { EMAIL, HOURS, PHONE, SMS_NUMBER, SOCIALS, WHATSAPP_NUMBER } from "../config";
import "./Contact.css";

type Errors = { name?: string; message?: string };
type Channel = "sms" | "whatsapp";

const MAX_LENGTH = 300;

const iconProps = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export default function Contact() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState<Channel | null>(null);

  useEffect(() => {
    document.title = "Contact us | CozyLoops";
  }, []);

  const send = (channel: Channel) => {
    const errs: Errors = {};
    if (name.trim().length < 2) errs.name = "Please enter your name.";
    if (message.trim().length < 10) errs.message = "Please write your query (at least 10 characters).";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const text = `CozyLoops query from ${name.trim()}: ${message.trim()}`;

    if (channel === "sms") {
      // Opens the phone's messaging app with the message ready to send
      window.location.href = `sms:${SMS_NUMBER}?&body=${encodeURIComponent(text)}`;
    } else {
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
    }
    setSent(channel);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    send("sms");
  };

  return (
    <main className="contact">
      <div className="wrap">
        <h1>Say hello</h1>
        <p className="contact-lead">
          Questions about an order, a custom piece, or just want to chat about yarn? We would love to
          hear from you.
        </p>

        <div className="contact-grid">
          {/* Details */}
          <div>
            <ul className="contact-cards">
              <li>
                <a href={`mailto:${EMAIL}`}>
                  <span className="contact-cards__icon">
                    <svg {...iconProps}>
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="m3 7 9 6 9-6" />
                    </svg>
                  </span>
                  <span>
                    <strong>Email</strong>
                    {EMAIL}
                  </span>
                </a>
              </li>
              <li>
                <a href={`tel:${PHONE.tel}`}>
                  <span className="contact-cards__icon">
                    <svg {...iconProps}>
                      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
                    </svg>
                  </span>
                  <span>
                    <strong>Mobile</strong>
                    {PHONE.display}
                  </span>
                </a>
              </li>
              <li>
                <div>
                  <span className="contact-cards__icon">
                    <svg {...iconProps}>
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 7v5l3 2" />
                    </svg>
                  </span>
                  <span>
                    <strong>Hours</strong>
                    {HOURS}
                  </span>
                </div>
              </li>
            </ul>

            <h2 className="contact-sub">Find us online</h2>
            <ul className="contact-socials">
              {SOCIALS.map((s) => (
                <li key={s.name}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer">
                    <strong>{s.name}</strong>
                    <span>{s.handle}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Query form */}
          <form className="contact-form" onSubmit={onSubmit} noValidate>
            <h2>Raise a query</h2>
            <p className="contact-form__hint">Write to us and we will get back to you soon.</p>

            <label htmlFor="q-name">Your name</label>
            <input
              id="q-name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "q-name-err" : undefined}
            />
            {errors.name && (
              <p id="q-name-err" className="contact-form__error">
                {errors.name}
              </p>
            )}

            <label htmlFor="q-message">Your query</label>
            <textarea
              id="q-message"
              rows={5}
              maxLength={MAX_LENGTH}
              placeholder="Tell us how we can help..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "q-message-err" : undefined}
            />
            <p className="contact-form__count">
              {message.length}/{MAX_LENGTH}
            </p>
            {errors.message && (
              <p id="q-message-err" className="contact-form__error">
                {errors.message}
              </p>
            )}

            <button type="submit" className="btn btn--navy contact-form__btn">
              Send query by SMS
            </button>
            <button type="button" className="btn btn--white contact-form__btn" onClick={() => send("whatsapp")}>
              Send on WhatsApp instead
            </button>

            {sent && (
              <p className="contact-form__note" role="status">
                {sent === "sms"
                  ? "Your messaging app should open with your query ready. Press Send there to deliver it. If nothing opened, you are probably on a computer, so please use WhatsApp, email or call us instead."
                  : "WhatsApp should have opened with your query ready. Press Send there to deliver it."}
              </p>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}