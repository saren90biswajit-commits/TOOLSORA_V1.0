import { getRouteSEO } from "./routeSeo";

const BASE_URL = "https://toolsora.in";

const CATEGORY_NAMES: Record<string, string> = {
  "/youtube": "YouTube Tools",
  "/instagram": "Instagram Tools",
  "/tiktok": "TikTok Tools",
  "/facebook": "Facebook Tools",
};

function breadcrumbItems(pathname: string) {
  const seo = getRouteSEO(pathname);
  const parts = pathname.split("/").filter(Boolean);
  const items = [{ "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/` }];

  if (parts.length === 0) return items;

  let current = "";
  parts.forEach((part, index) => {
    current += `/${part}`;
    const isLast = index === parts.length - 1;
    const name = isLast
      ? seo.title.split("|")[0].trim().replace(/\s+[–-]\s+.*$/, "")
      : CATEGORY_NAMES[current] || part.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    items.push({
      "@type": "ListItem",
      position: index + 2,
      name,
      item: `${BASE_URL}${current}`,
    });
  });

  return items;
}

export function getStructuredData(pathname: string) {
  const seo = getRouteSEO(pathname);
  const isHome = pathname === "/";
  const isTool = pathname.includes("/youtube-tools/") || pathname.includes("/instagram-tools/") || pathname.includes("/tiktok-tools/") || pathname.includes("/facebook-tools/") || pathname.startsWith("/tools/");

  const graph: Record<string, unknown>[] = [
    {
      "@type": "BreadcrumbList",
      "@id": `${BASE_URL}${pathname}#breadcrumbs`,
      itemListElement: breadcrumbItems(pathname),
    },
  ];

  if (isHome) {
    graph.unshift(
      {
        "@type": "Organization",
        "@id": `${BASE_URL}/#organization`,
        name: "ToolsOra",
        url: `${BASE_URL}/`,
      },
      {
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        url: `${BASE_URL}/`,
        name: "ToolsOra",
        description: seo.description,
        publisher: { "@id": `${BASE_URL}/#organization` },
      },
    );
  }

  if (isTool) {
    graph.push({
      "@type": "WebApplication",
      "@id": `${BASE_URL}${pathname}#webapplication`,
      name: seo.title.split("|")[0].trim(),
      url: `${BASE_URL}${pathname}`,
      description: seo.description,
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Web",
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
