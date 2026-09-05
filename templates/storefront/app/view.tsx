"use client";
import * as React from "react";
import { MarketingNavigation } from "@registry/blocks/marketing-navigation";
import { MarketingFooter } from "@registry/blocks/marketing-footer";
import { ApplicationShell } from "@registry/blocks/application-shell";
export type TemplateProps = {
  route?: string;
  basePath?: string;
  assetBase?: string;
};
function name(p: string) {
  return p
    .split("/")[0]
    .replaceAll("-", " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
function Marketing({
  brand,
  basePath,
  nav,
  children,
}: {
  brand: string;
  basePath: string;
  nav: string[];
  children: React.ReactNode;
}) {
  const items = nav.map((p) => ({ label: name(p), href: basePath + "/" + p }));
  return (
    <div className="template-marketing mx-auto max-w-7xl px-5 md:px-10">
      <MarketingNavigation brand={brand} home={basePath + "/"} items={items} />
      {children}
      <MarketingFooter brand={brand} items={items} />
    </div>
  );
}
function Workspace({
  brand,
  basePath,
  nav,
  children,
}: {
  brand: string;
  basePath: string;
  nav: string[];
  children: React.ReactNode;
}) {
  return (
    <ApplicationShell
      brand={brand}
      items={[
        { label: "Overview", href: basePath + "/" },
        ...nav.map((p) => ({ label: name(p), href: basePath + "/" + p })),
      ]}
    >
      {children}
    </ApplicationShell>
  );
}
function PageTitle({ title, text }: { title: string; text?: string }) {
  return (
    <header className="py-10 md:py-12">
      <h1 className="text-4xl md:text-5xl">{title}</h1>
      {text && <p className="mt-4 max-w-2xl text-muted-foreground">{text}</p>}
    </header>
  );
}
import { ChevronDown, Truck, PackageCheck } from "lucide-react";
import { Button } from "@registry/ui/button";
import { Input } from "@registry/ui/input";
import { FormField } from "@registry/ui/form-field";
import { useDemoState } from "@registry/blocks/demo-state";
type CartItem = { finish: string; quantity: number };
const initial: CartItem[] = [];
export function TemplateView({
  route = "",
  basePath = "",
  assetBase = "/assets",
}: TemplateProps) {
  const [cart, setCart, reset] = useDemoState("objects-cart", initial);
  const [finish, setFinish] = React.useState("Olive");
  const [quantity, setQuantity] = React.useState(1);
  const [status, setStatus] = React.useState("");
  const imageFor = (value: string) =>
    `${assetBase}/studio-lamp${value === "Olive" ? "" : "-" + value.toLowerCase()}.png`;
  React.useEffect(() => {
    const selected = new URLSearchParams(window.location.search).get("finish");
    if (selected && ["Olive", "Ink", "Sand"].includes(selected))
      setFinish(selected);
  }, []);
  const link = (p: string) => basePath + "/" + p;
  const count = cart.reduce((n, i) => n + i.quantity, 0),
    total = count * 145;
  function add() {
    setCart((c) =>
      c.some((i) => i.finish === finish)
        ? c.map((i) =>
            i.finish === finish ? { ...i, quantity: i.quantity + quantity } : i,
          )
        : [...c, { finish, quantity }],
    );
    setStatus("Added to your bag.");
  }
  return (
    <Marketing brand="Objects" basePath={basePath} nav={["collection", "cart"]}>
      <main>
        {route === "cart" ? (
          <>
            <PageTitle
              title="Your bag."
              text={`${count} considered ${count === 1 ? "object" : "objects"}.`}
            />
            {!cart.length ? (
              <div className="py-12">
                <p className="mb-5">A little room for something useful.</p>
                <Button asChild>
                  <a href={link("collection")}>Explore the collection</a>
                </Button>
              </div>
            ) : (
              <>
                {cart.map((i) => (
                  <div
                    key={i.finish}
                    className="flex flex-wrap items-center gap-6 border-b border-border py-6"
                  >
                    <img
                      src={imageFor(i.finish)}
                      alt={`Studio lamp in ${i.finish}`}
                      className="size-24 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h2 className="text-xl">Studio lamp</h2>
                      <p className="text-sm text-muted-foreground">
                        {i.finish} · £145
                      </p>
                    </div>
                    <Input
                      type="number"
                      min={1}
                      max={20}
                      aria-label={`Quantity ${i.finish}`}
                      value={i.quantity}
                      onChange={(e) =>
                        setCart((c) =>
                          c.map((x) =>
                            x.finish === i.finish
                              ? {
                                  ...x,
                                  quantity: Math.min(
                                    20,
                                    Math.max(1, Number(e.target.value)),
                                  ),
                                }
                              : x,
                          ),
                        )
                      }
                      className="w-20"
                    />
                    <Button
                      variant="ghost"
                      onClick={() =>
                        setCart((c) => c.filter((x) => x.finish !== i.finish))
                      }
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <div className="my-8 flex justify-between text-2xl">
                  <span>Total</span>
                  <span>£{total}</span>
                </div>
                <Button asChild>
                  <a href={link("checkout")}>Continue to demo checkout →</a>
                </Button>
                <Button variant="ghost" className="ml-3" onClick={reset}>
                  Reset demo
                </Button>
              </>
            )}
          </>
        ) : route === "checkout" ? (
          <>
            <PageTitle
              title="One last detail."
              text="Demo checkout. No payment is collected and no order is placed."
            />
            {!cart.length ? (
              <a href={link("collection")} className="underline">
                Your bag is empty. Explore the collection →
              </a>
            ) : (
              <form
                className="grid max-w-lg gap-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  setStatus(
                    "Demo complete. Your details were validated; no order was placed.",
                  );
                }}
              >
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
                <p className="text-xl">Demo total · £{total}</p>
                <Button type="submit">Complete demo</Button>
                {status && <p role="status">{status}</p>}
              </form>
            )}
          </>
        ) : route.startsWith("product/") ? (
          <section className="grid gap-10 py-12 md:grid-cols-2">
            <img
              src={imageFor(finish)}
              alt={`Studio lamp in ${finish} on travertine`}
              className="aspect-square w-full rounded-xl object-cover"
            />
            <div className="py-5 md:pl-6">
              <p className="mb-4 text-xs uppercase tracking-widest text-muted-foreground">
                Objects / Lighting / 001
              </p>
              <h1 className="font-display text-5xl">Studio lamp.</h1>
              <p className="mt-4 text-2xl">£145</p>
              <p className="my-6 max-w-md leading-relaxed text-muted-foreground">
                A softer kind of light. A sculptural shade, a considered
                footprint, and a warm glow for the corner you keep coming back
                to.
              </p>
              <div className="mb-4 flex items-center gap-2" aria-hidden="true">
                {["#63705a", "#343739", "#c9bba6"].map((c) => (
                  <span
                    key={c}
                    className="size-5 rounded-full border border-black/10"
                    style={{ background: c }}
                  />
                ))}
              </div>
              <label className="grid gap-2 text-sm">
                Finish
                <select
                  value={finish}
                  onChange={(e) => setFinish(e.target.value)}
                  className="rounded-xl border border-border bg-background p-3"
                >
                  <option>Olive</option>
                  <option>Ink</option>
                  <option>Sand</option>
                </select>
              </label>
              <label className="mt-5 grid gap-2 text-sm">
                Quantity
                <Input
                  type="number"
                  min={1}
                  max={20}
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(
                      Math.min(20, Math.max(1, Number(e.target.value))),
                    )
                  }
                />
              </label>
              <Button className="mt-6 w-full" onClick={add}>
                Add to bag →
              </Button>
              {status && (
                <p role="status" className="mt-3 text-sm">
                  {status}{" "}
                  <a href={link("cart")} className="underline">
                    View bag
                  </a>
                </p>
              )}
              <div className="mt-7 grid gap-3 border-y border-border py-5 text-sm">
                <span className="flex items-center gap-2">
                  <Truck size={16} />
                  Delivery options shown at checkout
                </span>
                <span className="flex items-center gap-2">
                  <PackageCheck size={16} />A considered object for everyday use
                </span>
              </div>
              <details className="group border-b border-border py-4 text-sm">
                <summary className="flex cursor-pointer list-none items-center justify-between">
                  Design notes
                  <ChevronDown
                    size={16}
                    className="transition-transform group-open:rotate-180"
                  />
                </summary>
                <p className="pt-4 leading-relaxed text-muted-foreground">
                  A broad shade balances a compact base. The three finishes
                  share the same sculptural form, each designed to settle into a
                  different palette.
                </p>
              </details>
              <p className="mt-7 text-xs text-muted-foreground">
                Fictional product · AI-generated product imagery.
              </p>
            </div>
          </section>
        ) : (
          <>
            {!route && (
              <section className="grid items-center gap-8 py-12 md:grid-cols-2">
                <div>
                  <h1 className="text-5xl leading-[1.02] md:text-7xl">
                    Good things.
                    <br />
                    Every day.
                  </h1>
                  <p className="my-6 max-w-sm text-muted-foreground">
                    Considered objects for the spaces we live in. Useful,
                    beautiful, and made to stay.
                  </p>
                  <Button asChild>
                    <a href={link("collection")}>Meet the collection →</a>
                  </Button>
                </div>
                <img
                  src={assetBase + "/studio-lamp.png"}
                  alt="Studio lamp in warm afternoon light"
                  className="aspect-[4/5] w-full rounded-xl object-cover"
                />
              </section>
            )}
            {route === "collection" && (
              <PageTitle
                title="The everyday collection."
                text="One considered design, three quiet finishes."
              />
            )}
            <div className="mb-6 mt-8 flex items-center justify-between border-y border-border py-4 text-xs text-muted-foreground">
              <span>THE COLLECTION</span>
              <span>3 finishes · 1 considered design</span>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {["Olive", "Ink", "Sand"].map((f) => (
                <a href={link("product/studio-lamp") + "?finish=" + f} key={f}>
                  <img
                    src={imageFor(f)}
                    alt={`Studio lamp in ${f}`}
                    className="aspect-square w-full rounded-xl object-cover"
                  />
                  <div className="mt-4 flex justify-between gap-3">
                    <div>
                      <h2 className="text-base font-medium">Studio lamp</h2>
                      <p className="mt-1 text-sm text-muted-foreground">{f}</p>
                    </div>
                    <span>£145</span>
                  </div>
                </a>
              ))}
            </div>
            <p className="mt-6 text-xs text-muted-foreground">
              Fictional collection. AI-generated product imagery.
            </p>
          </>
        )}
      </main>
    </Marketing>
  );
}
