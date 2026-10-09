import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { CartProvider } from "./context/CartContext";
import Home from "./pages/Home";
import Cart from "./pages/Cart";

// Temporary page so links don't show a blank screen. Replace with real pages later.
function ComingSoon({ title }: { title: string }) {
  return (
    <main className="wrap" style={{ padding: "64px 24px", minHeight: "50vh" }}>
      <h1>{title}</h1>
      <p>Coming soon.</p>
    </main>
  );
}

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/shop" element={<ComingSoon title="Category" />} />
          <Route path="/about" element={<ComingSoon title="About" />} />
          <Route path="/contact" element={<ComingSoon title="Contact" />} />
          <Route path="/wishlist" element={<ComingSoon title="Wishlist" />} />
          <Route path="/product/:id" element={<ComingSoon title="Product" />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}