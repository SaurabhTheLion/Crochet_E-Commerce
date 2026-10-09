import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { WHATSAPP_NUMBER } from "../config";
import "./Cart.css";

type Errors = { name?: string; mobile?: string; address?: string };

// Turns "+91 98765-43210", "09876543210" etc. into 10 digits. Returns "" if it isn't valid.
function cleanMobile(input: string): string {
  let d = input.replace(/[\s-]/g, "");
  if (d.startsWith("+91")) d = d.slice(3);
  else if (d.length === 12 && d.startsWith("91")) d = d.slice(2);
  else if (d.length === 11 && d.startsWith("0")) d = d.slice(1);
  return /^[6-9]\d{9}$/.test(d) ? d : "";
}

export default function Cart() {
  const { items, total, setQty, removeItem, clear } = useCart();
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [opened, setOpened] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    const errs: Errors = {};
    if (name.trim().length < 2) errs.name = "Please enter your name.";
    const phone = cleanMobile(mobile);
    if (!phone) errs.mobile = "Enter a valid 10-digit mobile number.";
    if (address.trim().length < 10) errs.address = "Please enter your full delivery address.";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const lines = items.map((i, n) => `${n + 1}. ${i.name} x ${i.qty} = ₹${i.price * i.qty}`);
    const message = [
      "*New order from CozyLoops website*",
      "",
      "*Items*",
      ...lines,
      "",
      `*Total:* ₹${total}`,
      "",
      `*Name:* ${name.trim()}`,
      `*Mobile:* +91 ${phone}`,
      `*Delivery address:* ${address.trim()}`,
    ].join("\n");

    // Opens WhatsApp (app on phone, WhatsApp Web on computer) with the message ready to send
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setOpened(true);
  };

  if (items.length === 0) {
    return (
      <main className="cart-page">
        <div className="wrap">
          <h1>Your cart</h1>
          <p className="cart-empty">Your cart is empty. Add something cozy to get started.</p>
          <Link to="/" className="btn btn--navy">
            Browse products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <div className="wrap">
        <h1>Your cart</h1>

        <div className="cart-layout">
          {/* Items */}
          <ul className="cart-items">
            {items.map((i) => (
              <li key={i.id} className="cart-item">
                <img src={i.image} alt={i.alt} className="cart-item__img" />
                <div className="cart-item__info">
                  <h2>{i.name}</h2>
                  <p>₹{i.price} each</p>
                  <button type="button" className="cart-item__remove" onClick={() => removeItem(i.id)}>
                    Remove
                  </button>
                </div>
                <div className="cart-item__qty" role="group" aria-label={`Quantity of ${i.name}`}>
                  <button type="button" aria-label={`Decrease ${i.name}`} onClick={() => setQty(i.id, i.qty - 1)}>
                    −
                  </button>
                  <span aria-live="polite">{i.qty}</span>
                  <button type="button" aria-label={`Increase ${i.name}`} onClick={() => setQty(i.id, i.qty + 1)}>
                    +
                  </button>
                </div>
                <p className="cart-item__total">₹{i.price * i.qty}</p>
              </li>
            ))}
          </ul>

          {/* Customer details + order */}
          <form className="cart-form" onSubmit={onSubmit} noValidate>
            <h2>Delivery details</h2>

            <label htmlFor="cust-name">Name</label>
            <input
              id="cust-name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "err-name" : undefined}
            />
            {errors.name && <p id="err-name" className="cart-form__error">{errors.name}</p>}

            <label htmlFor="cust-mobile">Mobile number</label>
            <input
              id="cust-mobile"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="10-digit number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              aria-invalid={!!errors.mobile}
              aria-describedby={errors.mobile ? "err-mobile" : undefined}
            />
            {errors.mobile && <p id="err-mobile" className="cart-form__error">{errors.mobile}</p>}

            <label htmlFor="cust-address">Delivery address</label>
            <textarea
              id="cust-address"
              rows={4}
              autoComplete="street-address"
              placeholder="House no, street, area, city, pincode"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              aria-invalid={!!errors.address}
              aria-describedby={errors.address ? "err-address" : undefined}
            />
            {errors.address && <p id="err-address" className="cart-form__error">{errors.address}</p>}

            <div className="cart-form__total">
              <span>Total</span>
              <strong>₹{total}</strong>
            </div>

            <button type="submit" className="btn btn--navy cart-form__submit">
              Place order on WhatsApp
            </button>

            {opened && (
              <div className="cart-form__note" role="status">
                <p>
                  WhatsApp should have opened with your order message. Press <strong>Send</strong> there to
                  confirm your order.
                </p>
                <button type="button" className="cart-item__remove" onClick={clear}>
                  I have sent it. Clear my cart
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}
