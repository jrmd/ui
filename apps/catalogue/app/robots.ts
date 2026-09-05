export default function robots() {
  return {
    rules: {
      userAgent: "*",
      disallow: process.env.JEZ_PUBLIC_URL ? ["/preview/"] : ["/"],
    },
    sitemap: process.env.JEZ_PUBLIC_URL
      ? process.env.JEZ_PUBLIC_URL + "/sitemap.xml"
      : undefined,
  };
}
