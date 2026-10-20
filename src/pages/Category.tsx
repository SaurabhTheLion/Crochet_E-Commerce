import { useEffect, useRef, type ChangeEvent } from "react";
import { useSearchParams } from "react-router-dom";
import ProductTile from "../components/ProductTile";
import { categories, products, type Category as CategoryName } from "../data/products";
import "./Category.css";

const blurbs: Record<CategoryName, string> = {
  "Home decor": "Little touches that make a room feel like yours.",
  Flowers: "Crochet blooms that never wilt.",
  Clothes: "Wearable crochet, made to fit and made to be noticed.",
  "Hair decor": "Scrunchies, clips and pretty little extras.",
  "Bed items": "Blankets and covers for the coziest corner of the house.",
  Toys: "Soft, huggable friends for kids and grown-ups.",
};

export default function Category() {
  const [params, setParams] = useSearchParams();
  const listRef = useRef<HTMLUListElement>(null);

  // /shop?category=Flowers picks that category. With no category in the URL, the first one is selected.
  const selected: CategoryName = categories.find((c) => c === params.get("category")) ?? categories[0];

  // /shop?search=blanket comes from this page's search bar or the header search bar
  const rawQuery = params.get("search") ?? "";
  const query = rawQuery.trim();
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  const searching = words.length > 0;

  // The category list is filtered by the search words too
  const visibleCategories = searching
    ? categories.filter((c) => words.every((w) => c.toLowerCase().includes(w)))
    : categories;

  // Products: when searching, match every word against name, category and details of ALL products
  const list = searching
    ? products.filter((p) => {
        const text = `${p.name} ${p.category} ${p.description} ${p.features.join(" ")}`.toLowerCase();
        return words.every((w) => text.includes(w));
      })
    : products.filter((p) => p.category === selected);

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const next = new URLSearchParams(params);
    if (e.target.value) next.set("search", e.target.value);
    else next.delete("search");
    setParams(next, { replace: true });
  };

  useEffect(() => {
    document.title = `${searching ? "Search" : selected} | Yarnnora`;
  }, [searching, selected]);

  // Keep the selected category visible inside the scrolling list (useful with many categories)
  useEffect(() => {
    const box = listRef.current;
    const el = box?.querySelector<HTMLElement>("button.is-active");
    if (!box || !el) return;
    if (el.offsetTop < box.scrollTop) box.scrollTop = el.offsetTop;
    else if (el.offsetTop + el.offsetHeight > box.scrollTop + box.clientHeight)
      box.scrollTop = el.offsetTop + el.offsetHeight - box.clientHeight;
    if (el.offsetLeft < box.scrollLeft) box.scrollLeft = el.offsetLeft;
    else if (el.offsetLeft + el.offsetWidth > box.scrollLeft + box.clientWidth)
      box.scrollLeft = el.offsetLeft + el.offsetWidth - box.clientWidth;
  }, [selected, searching]);

  const countIn = (c: CategoryName) => products.filter((p) => p.category === c).length;

  return (
    <main className="cat-page">
      <div className="wrap">
        <h1>Shop by category</h1>

        {/* Search bar: categories and products */}
        <form className="cat-search" role="search" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="cat-search-input" className="sr-only">
            Search categories and products
          </label>
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M16.5 16.5 21 21" />
          </svg>
          <input
            id="cat-search-input"
            type="search"
            value={rawQuery}
            onChange={onSearch}
            placeholder="Search categories and products..."
            autoComplete="off"
          />
        </form>

        <div className="cat-layout">
          {/* All categories (scrolls when there are many) */}
          <nav className="cat-nav" aria-label="Categories">
            <h2 className="cat-nav__title">
              Categories <span>({visibleCategories.length})</span>
            </h2>

            {visibleCategories.length === 0 ? (
              <p className="cat-nav__empty">No matching category</p>
            ) : (
              <ul ref={listRef} className="cat-nav__list">
                {visibleCategories.map((c) => {
                  const active = !searching && c === selected;
                  return (
                    <li key={c}>
                      <button
                        type="button"
                        className={active ? "is-active" : ""}
                        aria-pressed={active}
                        onClick={() => setParams({ category: c })}
                      >
                        <span>{c}</span>
                        <span className="cat-nav__count">{countIn(c)}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </nav>

          {/* Products */}
          <section className="cat-results" aria-labelledby="cat-title">
            <div className="cat-results__head">
              <h2 id="cat-title">{searching ? `Results for "${query}"` : selected}</h2>
              {!searching && <p>{blurbs[selected]}</p>}
              <p className="cat-results__count" aria-live="polite">
                {list.length} {list.length === 1 ? "product" : "products"}
                {searching && (
                  <>
                    {" · "}
                    <button type="button" className="cat-results__clear" onClick={() => setParams({})}>
                      Clear search
                    </button>
                  </>
                )}
              </p>
            </div>

            {list.length === 0 ? (
              <p className="cat-empty">No products found. Try another word or pick a category.</p>
            ) : (
              <ul className="tiles">
                {list.map((p) => (
                  <ProductTile key={p.id} product={p} showCategory={searching} />
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}