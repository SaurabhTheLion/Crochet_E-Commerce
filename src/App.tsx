import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { CartProvider } from "./context/CartContext";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Product from "./pages/Product";

// Temporary page so links don't show a blank screen. Replace with real pages later.
function ComingSoon({ title }: { title: string }) {
  return (
    <main className="wrap" style={{ padding: "64px 24px", minHeight: "50vh" }}>
      <h1>{title}</h1>
      <p>Coming soon.</p>
    </main>
  );
}

// Jump to the top whenever the page (URL) changes
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/shop" element={<ComingSoon title="Category" />} />
          <Route path="/about" element={<ComingSoon title="About" />} />
          <Route path="/contact" element={<ComingSoon title="Contact" />} />
          <Route path="/wishlist" element={<ComingSoon title="Wishlist" />} />
          <Route path="/product/:id" element={<Product />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}