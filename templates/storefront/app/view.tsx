"use client";
import * as React from "react";
import {
  ArrowRight,
  ArrowUpRight,
  ArrowLeft,
  Search,
  ShoppingBag,
  X,
  Plus,
  Minus,
  ChevronDown,
  Check,
  Package,
  Heart,
} from "lucide-react";
import { Button } from "@registry/ui/button";
import { Input } from "@registry/ui/input";
import { FormField } from "@registry/ui/form-field";
import { useDemoState } from "@registry/blocks/demo-state";
export type TemplateProps = {
  route?: string;
  basePath?: string;
  assetBase?: string;
};
type Product = {
  slug: string;
  name: string;
  category: string;
  price: number;
  finishes: string[];
  images: string[];
  description: string;
  material: string;
  care: string;
};
const products: Product[] = [
  {
    slug: "studio-lamp",
    name: "Studio lamp",
    category: "Lighting",
    price: 145,
    finishes: ["Olive", "Ink", "Sand"],
    images: ["studio-lamp.png", "studio-lamp-ink.png", "studio-lamp-sand.png"],
    description:
      "A soft pool of light, wherever the evening takes you. A generous dome, a slender stem, and three finishes that feel at home.",
    material:
      "A sculptural metal shade and base with a considered, compact silhouette.",
    care: "Wipe with a soft, dry cloth. Switch off and allow to cool before cleaning.",
  },
  {
    slug: "form-vase",
    name: "Form vase",
    category: "Objects",
    price: 48,
    finishes: ["Chalk"],
    images: ["objects-vase.png"],
    description:
      "A rounded stoneware vessel with a quiet presence. Leave it as it is, or add a single stem. Sometimes that is enough.",
    material: "Warm ivory stoneware with a matte, gently speckled surface.",
    care: "Clean gently by hand with a damp cloth. Dry completely before placing on furniture.",
  },
  {
    slug: "linen-throw",
    name: "Linen throw",
    category: "Textiles",
    price: 85,
    finishes: ["Rust"],
    images: ["objects-throw.png"],
    description:
      "A little warmth for slow mornings and long evenings. Tactile woven linen, an easy drape, and a short fringed edge.",
    material:
      "Textured woven linen in an earthy rust shade, finished with a soft fringe.",
    care: "Gentle hand wash in cool water and dry flat. Avoid bleach and direct heat.",
  },
];
type CartItem = { slug?: string; finish: string; quantity: number };
const initial: CartItem[] = [];
const clampQuantity = (n: number) =>
  Number.isFinite(n) ? Math.min(20, Math.max(1, Math.round(n))) : 1;
function productFor(slug?: string) {
  return (
    products.find((p) => p.slug === (slug ?? "studio-lamp")) ?? products[0]
  );
}
function fileFor(p: Product, finish: string) {
  return p.images[Math.max(0, p.finishes.indexOf(finish))];
}
const money = (n: number) => "£" + n;
export function TemplateView({
  route = "",
  basePath = "",
  assetBase = "/assets",
}: TemplateProps) {
  const [cart, setCart, reset] = useDemoState("objects-cart", initial);
  const product = productFor(route.split("/")[1]);
  const [finish, setFinish] = React.useState(product.finishes[0]);
  const [quantity, setQuantity] = React.useState(1);
  const [status, setStatus] = React.useState("");
  const [category, setCategory] = React.useState("All");
  const [query, setQuery] = React.useState("");
  const [sort, setSort] = React.useState("featured");
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [subscribed, setSubscribed] = React.useState(false);
  const link = (p: string) => basePath + "/" + p;
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const value = params.get("finish");
    setFinish(
      value && product.finishes.includes(value) ? value : product.finishes[0],
    );
    setCategory(params.get("category") ?? "All");
    setQuery(params.get("q") ?? "");
    setQuantity(1);
    setStatus("");
  }, [route, product]);
  const count = cart.reduce((n, i) => n + i.quantity, 0);
  const total = cart.reduce(
    (n, i) => n + productFor(i.slug).price * i.quantity,
    0,
  );
  const currentFinish = product.finishes.includes(finish)
    ? finish
    : product.finishes[0];
  function add() {
    setCart((c) =>
      c.some(
        (i) =>
          (i.slug ?? "studio-lamp") === product.slug &&
          i.finish === currentFinish,
      )
        ? c.map((i) =>
            (i.slug ?? "studio-lamp") === product.slug &&
            i.finish === currentFinish
              ? { ...i, quantity: clampQuantity(i.quantity + quantity) }
              : i,
          )
        : [...c, { slug: product.slug, finish: currentFinish, quantity }],
    );
    setStatus("Added to your bag.");
  }
  const entries = products
    .flatMap((p) => p.finishes.map((f) => ({ product: p, finish: f })))
    .filter(
      ({ product: p, finish: f }) =>
        (category === "All" || category === p.category) &&
        (p.name + " " + p.category + " " + f)
          .toLowerCase()
          .includes(query.toLowerCase()),
    )
    .sort((a, b) =>
      sort === "price-low"
        ? a.product.price - b.product.price
        : sort === "price-high"
          ? b.product.price - a.product.price
          : 0,
    );
  function card(p: Product, f = p.finishes[0]) {
    return (
      <a
        className="objects-product-card"
        key={p.slug + f}
        href={link("product/" + p.slug) + "?finish=" + f}
      >
        <div className="objects-product-image">
          <img
            src={assetBase + "/" + fileFor(p, f)}
            alt={p.name + " in " + f}
            loading="lazy"
          />
          <span className="objects-product-arrow">
            <ArrowUpRight size={18} />
          </span>
        </div>
        <div className="objects-product-meta">
          <div>
            <h3>{p.name}</h3>
            <p>
              {f} · {p.category}
            </p>
          </div>
          <span>{money(p.price)}</span>
        </div>
      </a>
    );
  }
  function summary() {
    return (
      <aside className="objects-summary">
        <h2>Order summary</h2>
        <div>
          <span>Subtotal</span>
          <strong>{money(total)}</strong>
        </div>
        <div>
          <span>Delivery</span>
          <span>Demo — no charge</span>
        </div>
        <div className="objects-total">
          <span>Total</span>
          <strong>{money(total)}</strong>
        </div>
        {route === "cart" && (
          <Button asChild>
            <a href={link("checkout")}>
              Continue to demo checkout <ArrowRight size={16} />
            </a>
          </Button>
        )}
        <p>No payment is collected. Products and prices are illustrative.</p>
        <a className="objects-text-link" href={link("collection")}>
          Continue browsing <ArrowRight size={14} />
        </a>
      </aside>
    );
  }
  return (
    <div className="objects-store template-design">
      <div className="objects-announcement">
        Objects for a slower kind of everyday.
        <a href={link("collection")}>
          Explore the collection <ArrowRight size={12} />
        </a>
      </div>
      <header className="objects-nav">
        <a className="objects-brand" href={link("")}>
          Objects<span aria-hidden="true">.</span>
        </a>
        <nav aria-label="Shop navigation">
          <a
            href={link("collection")}
            aria-current={route === "collection" ? "page" : undefined}
          >
            Shop all
          </a>
          <a href={link("collection") + "?category=Lighting"}>Lighting</a>
          <a href={link("collection") + "?category=Objects"}>Objects</a>
          <a href={link("collection") + "?category=Textiles"}>Textiles</a>
        </nav>
        <div className="objects-nav-actions">
          <button
            aria-label={searchOpen ? "Close search" : "Search products"}
            aria-expanded={searchOpen}
            onClick={() => setSearchOpen(!searchOpen)}
          >
            {searchOpen ? <X size={19} /> : <Search size={19} />}
          </button>
          <a aria-label={"Bag, " + count + " items"} href={link("cart")}>
            <ShoppingBag size={18} />
            <span>Bag ({count})</span>
          </a>
        </div>
      </header>
      {searchOpen && (
        <form className="objects-search" action={link("collection")}>
          <Search size={18} />
          <input
            name="q"
            autoFocus
            aria-label="Search products"
            placeholder="Find something for your space…"
          />
          <button type="submit">
            Search <ArrowRight size={16} />
          </button>
        </form>
      )}
      <main>
        {route === "cart" || route === "checkout" ? (
          <section className="objects-purchase">
            <a className="objects-text-link" href={link("collection")}>
              <ArrowLeft size={15} /> Back to the collection
            </a>
            <header>
              <h1>{route === "cart" ? "Your bag." : "One last detail."}</h1>
              <p>
                {route === "cart"
                  ? `${count} considered ${count === 1 ? "object" : "objects"}.`
                  : "Demo checkout. No payment is collected and no order is placed."}
              </p>
            </header>
            {!cart.length ? (
              <div className="objects-empty">
                <ShoppingBag size={32} />
                <h2>A little room for something useful.</h2>
                <p>
                  Your bag is empty. Find a piece that makes your space feel
                  more like you.
                </p>
                <Button asChild>
                  <a href={link("collection")}>
                    Explore the collection <ArrowRight size={16} />
                  </a>
                </Button>
              </div>
            ) : (
              <div className="objects-checkout-grid">
                {route === "cart" ? (
                  <div>
                    {cart.map((i, index) => {
                      const p = productFor(i.slug);
                      return (
                        <div
                          key={p.slug + i.finish}
                          className="objects-cart-row"
                        >
                          <a
                            href={
                              link("product/" + p.slug) + "?finish=" + i.finish
                            }
                          >
                            <img
                              src={assetBase + "/" + fileFor(p, i.finish)}
                              alt={p.name + " in " + i.finish}
                            />
                          </a>
                          <div>
                            <h2>{p.name}</h2>
                            <p>
                              {i.finish} · {money(p.price)}
                            </p>
                            <label>
                              <span className="sr-only">Quantity</span>
                              <Input
                                type="number"
                                min={1}
                                max={20}
                                aria-label={"Quantity " + i.finish}
                                value={i.quantity}
                                onChange={(e) =>
                                  setCart((c) =>
                                    c.map((x, j) =>
                                      j === index
                                        ? {
                                            ...x,
                                            quantity: clampQuantity(
                                              Number(e.target.value),
                                            ),
                                          }
                                        : x,
                                    ),
                                  )
                                }
                              />
                            </label>
                            <button
                              className="objects-remove"
                              onClick={() =>
                                setCart((c) => c.filter((_, j) => j !== index))
                              }
                            >
                              Remove
                              <span className="sr-only">
                                {" "}
                                {p.name} {i.finish}
                              </span>
                            </button>
                          </div>
                          <strong>{money(i.quantity * p.price)}</strong>
                        </div>
                      );
                    })}
                    <button className="objects-remove" onClick={reset}>
                      Reset demo
                    </button>
                  </div>
                ) : (
                  <form
                    className="objects-checkout-form"
                    onSubmit={(e) => {
                      e.preventDefault();
                      setStatus(
                        "Demo complete. Your details were validated; no order was placed.",
                      );
                    }}
                  >
                    <h2>Contact & delivery</h2>
                    <FormField label="Email">
                      <Input type="email" required autoComplete="email" />
                    </FormField>
                    <FormField label="Full name">
                      <Input required autoComplete="name" />
                    </FormField>
                    <FormField label="Delivery address">
                      <Input required autoComplete="street-address" />
                    </FormField>
                    <FormField label="Postcode">
                      <Input required autoComplete="postal-code" />
                    </FormField>
                    <p className="objects-demo-note">
                      Use sample details to try this form.
                    </p>
                    <Button type="submit">
                      Complete demo <ArrowRight size={16} />
                    </Button>
                    {status && (
                      <p className="objects-success" role="status">
                        <Check size={17} />
                        {status}
                      </p>
                    )}
                  </form>
                )}
                {summary()}
              </div>
            )}
          </section>
        ) : route.startsWith("product/") ? (
          <>
            <div className="objects-breadcrumb">
              <a href={link("collection")}>Collection</a>
              <span>/</span>
              <a href={link("collection") + "?category=" + product.category}>
                {product.category}
              </a>
              <span>/</span>
              <span>{product.name}</span>
            </div>
            <section className="objects-product-detail">
              <div className="objects-gallery">
                <img
                  className="objects-main-image"
                  src={assetBase + "/" + fileFor(product, currentFinish)}
                  alt={product.name + " in " + currentFinish}
                />
                {product.finishes.length > 1 && (
                  <div className="objects-thumbnails">
                    {product.finishes.map((f) => (
                      <button
                        key={f}
                        aria-label={"View " + f + " finish"}
                        aria-pressed={f === currentFinish}
                        onClick={() => {
                          setFinish(f);
                          setStatus("");
                        }}
                      >
                        <img
                          src={assetBase + "/" + fileFor(product, f)}
                          alt={f}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="objects-product-info">
                <div className="objects-title-price">
                  <h1>{product.name}.</h1>
                  <span>{money(product.price)}</span>
                </div>
                <p className="objects-product-description">
                  {product.description}
                </p>
                <label className="objects-finish-label">
                  Finish
                  <select
                    value={currentFinish}
                    onChange={(e) => {
                      setFinish(e.target.value);
                      setStatus("");
                    }}
                  >
                    {product.finishes.map((f) => (
                      <option key={f}>{f}</option>
                    ))}
                  </select>
                </label>
                <div className="objects-buy-row">
                  <div className="objects-quantity">
                    <button
                      aria-label="Decrease quantity"
                      disabled={quantity === 1}
                      onClick={() => setQuantity(clampQuantity(quantity - 1))}
                    >
                      <Minus size={15} />
                    </button>
                    <input
                      type="number"
                      aria-label="Quantity"
                      min={1}
                      max={20}
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(clampQuantity(Number(e.target.value)))
                      }
                    />
                    <button
                      aria-label="Increase quantity"
                      disabled={quantity === 20}
                      onClick={() => setQuantity(clampQuantity(quantity + 1))}
                    >
                      <Plus size={15} />
                    </button>
                  </div>
                  <Button onClick={add}>
                    Add to bag <ShoppingBag size={16} />
                  </Button>
                </div>
                {status && (
                  <p className="objects-success" role="status">
                    <Check size={16} />
                    {status} <a href={link("cart")}>View bag</a>
                  </p>
                )}
                <div className="objects-product-service">
                  <Package size={17} />
                  <span>
                    Explore the complete shopping flow.
                    <small>Demo checkout. No order is placed.</small>
                  </span>
                </div>
                {[
                  ["Materials & details", product.material],
                  ["Care instructions", product.care],
                  [
                    "About this collection",
                    "Objects is an illustrative homewares collection. The imagery is AI-generated and the product specifications and prices are demonstration content.",
                  ],
                ].map(([title, text]) => (
                  <details key={title}>
                    <summary>
                      {title}
                      <ChevronDown size={16} />
                    </summary>
                    <p>{text}</p>
                  </details>
                ))}
              </div>
            </section>
            <section className="objects-section">
              <div className="objects-section-heading">
                <h2>Good together.</h2>
                <a href={link("collection")}>
                  Shop all <ArrowRight size={16} />
                </a>
              </div>
              <div className="objects-product-grid objects-related-products">
                {products
                  .filter((p) => p.slug !== product.slug)
                  .map((p) => card(p))}
              </div>
            </section>
          </>
        ) : (
          <>
            {!route ? (
              <section className="objects-hero">
                <div>
                  <h1>
                    Good things.
                    <br />
                    <em>Every day.</em>
                  </h1>
                  <p>
                    Considered objects for the spaces we live in. Useful,
                    beautiful, and made to stay.
                  </p>
                  <a className="objects-primary-link" href={link("collection")}>
                    Meet the collection <ArrowRight size={17} />
                  </a>
                  <span className="objects-hero-caption">
                    Lighting, objects & everyday textures
                  </span>
                </div>
                <img
                  src={assetBase + "/objects-room.png"}
                  alt="A warm living room with sculptural lighting, ceramics and soft textiles"
                  fetchPriority="high"
                />
              </section>
            ) : (
              <header className="objects-collection-header">
                <h1>The everyday collection.</h1>
                <p>
                  A good light. A quiet shape. Something soft.
                  <br />
                  Find a little room for the things you love.
                </p>
              </header>
            )}
            <section className="objects-section" id="collection">
              <div className="objects-section-heading">
                <h2>{route ? "Find your everyday." : "A few good things."}</h2>
                {!route && (
                  <a href={link("collection")}>
                    View the collection <ArrowRight size={16} />
                  </a>
                )}
              </div>
              {route && (
                <>
                  <div className="objects-filters">
                    <div role="group" aria-label="Product categories">
                      {["All", "Lighting", "Objects", "Textiles"].map((c) => (
                        <button
                          key={c}
                          aria-pressed={c === category}
                          onClick={() => setCategory(c)}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                    <label>
                      Sort by
                      <select
                        aria-label="Sort products"
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                      >
                        <option value="featured">Featured</option>
                        <option value="price-low">Price: low to high</option>
                        <option value="price-high">Price: high to low</option>
                      </select>
                    </label>
                  </div>
                  <div className="objects-results">
                    <span role="status">{entries.length} pieces</span>
                    <label>
                      <Search size={15} />
                      <input
                        aria-label="Filter products"
                        value={query}
                        placeholder="Search the collection"
                        onChange={(e) => setQuery(e.target.value)}
                      />
                    </label>
                  </div>
                </>
              )}
              <div className="objects-product-grid">
                {route ? (
                  entries.map(({ product: p, finish: f }) => card(p, f))
                ) : (
                  <>
                    {card(products[0])}
                    {card(products[1])}
                    {card(products[2])}
                    {card(products[0], "Ink")}
                  </>
                )}
              </div>
              {route && entries.length === 0 && (
                <div className="objects-empty">
                  <Search size={28} />
                  <h3>No pieces found.</h3>
                  <p>Try another search or explore the whole collection.</p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setQuery("");
                      setCategory("All");
                    }}
                  >
                    Clear filters
                  </Button>
                </div>
              )}
            </section>
            {!route && (
              <>
                <section className="objects-editorial">
                  <img
                    src={assetBase + "/studio-lamp-sand.png"}
                    alt="A sand-coloured Studio lamp in afternoon light"
                    loading="lazy"
                  />
                  <div>
                    <h2>
                      A softer
                      <br />
                      point of view.
                    </h2>
                    <p>
                      Not everything needs to make a statement. Some things just
                      make a room feel right.
                    </p>
                    <p>
                      A pool of warm light. A favourite corner. A little pause
                      at the end of the day.
                    </p>
                    <a
                      className="objects-text-link"
                      href={link("product/studio-lamp") + "?finish=Sand"}
                    >
                      Find your light <ArrowUpRight size={17} />
                    </a>
                  </div>
                </section>
                <section className="objects-category-section">
                  <div className="objects-section-heading">
                    <h2>Make a little space.</h2>
                    <span>Explore by collection</span>
                  </div>
                  <div className="objects-category-grid">
                    {products.map((p) => (
                      <a
                        key={p.slug}
                        href={link("collection") + "?category=" + p.category}
                      >
                        <img
                          src={assetBase + "/" + p.images[0]}
                          alt={p.category + " collection"}
                          loading="lazy"
                        />
                        <span>
                          {p.category}
                          <ArrowUpRight size={18} />
                        </span>
                      </a>
                    ))}
                  </div>
                </section>
              </>
            )}
          </>
        )}
      </main>
      <section className="objects-newsletter">
        <div>
          <h2>A little inspiration, occasionally.</h2>
          <p>New objects, considered spaces, and things worth keeping.</p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubscribed(true);
          }}
        >
          <label className="sr-only" htmlFor="objects-email">
            Your email address
          </label>
          <div>
            <input
              id="objects-email"
              type="email"
              required
              placeholder="Your email address"
            />
            <button type="submit" aria-label="Subscribe to the demo newsletter">
              <ArrowRight size={19} />
            </button>
          </div>
          <p role={subscribed ? "status" : undefined}>
            {subscribed
              ? "You’re on the demo list. No email was sent."
              : "Demo signup. Your email stays on this page."}
          </p>
        </form>
      </section>
      <footer className="objects-footer">
        <div>
          <a className="objects-brand" href={link("")}>
            Objects.
          </a>
          <p>Good things for the everyday.</p>
        </div>
        <nav aria-label="Footer shop links">
          <h2>The collection</h2>
          <a href={link("collection")}>Shop all</a>
          <a href={link("collection") + "?category=Lighting"}>Lighting</a>
          <a href={link("collection") + "?category=Objects"}>Objects</a>
          <a href={link("collection") + "?category=Textiles"}>Textiles</a>
        </nav>
        <div className="objects-footer-note">
          <Heart size={20} />
          <p>A considered shopping experience.</p>
          <span>
            Fictional collection · AI-generated imagery.
            <br />A Jez UI demo template.
          </span>
        </div>
        <div className="objects-footer-bottom">
          <span>Objects · 2026</span>
          <a href={link("cart")}>
            View your bag <ArrowUpRight size={14} />
          </a>
          <span>GBP £</span>
        </div>
      </footer>
    </div>
  );
}
