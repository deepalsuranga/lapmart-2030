import { LaptopProduct } from "@/types";

/**
 * Creates an SEO-friendly, URL-safe slug from a product name and SKU.
 * Example: "Acer Nitro 16 AI Edition | Ryzen 7" + "D001099"
 * Result: "acer-nitro-16-ai-edition-ryzen-7-rtx-4060-d001099"
 */
export function generateLaptopSlug(product: LaptopProduct): string {
  if (product.slug) {
    return product.slug;
  }

  const base = `${product.brand}-${product.name}-${product.sku}`
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters like quotes, bars, etc.
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Collapse consecutive hyphens
    .replace(/^-+|-+$/g, ""); // Trim leading/trailing hyphens

  return base.slice(0, 70).replace(/-+$/, "");
}

/**
 * Returns the definitive URL slug for any laptop product.
 */
export function getLaptopSlug(product: LaptopProduct): string {
  return product.slug || generateLaptopSlug(product);
}

/**
 * Resolves a product by slug, sku, or id.
 * Supports exact slug match, case-insensitive SKU match (e.g. "d001099"),
 * or ID match (e.g. "lap-acer-nitro").
 */
export function getLaptopBySlug(
  slugOrIdentifier: string,
  laptops: LaptopProduct[]
): LaptopProduct | undefined {
  if (!slugOrIdentifier) return undefined;
  const target = decodeURIComponent(slugOrIdentifier).toLowerCase().trim();

  // 1. Direct slug match
  const matchBySlug = laptops.find((p) => (p.slug || "").toLowerCase() === target);
  if (matchBySlug) return matchBySlug;

  // 2. Direct SKU match (e.g. D001099 or d001099)
  const matchBySku = laptops.find((p) => p.sku.toLowerCase() === target);
  if (matchBySku) return matchBySku;

  // 3. Direct ID match (e.g. lap-acer-nitro)
  const matchById = laptops.find((p) => p.id.toLowerCase() === target);
  if (matchById) return matchById;

  // 4. Generated slug match
  const matchByGeneratedSlug = laptops.find(
    (p) => generateLaptopSlug(p).toLowerCase() === target
  );
  if (matchByGeneratedSlug) return matchByGeneratedSlug;

  // 5. Fallback: Check if target contains SKU
  const matchSubstringSku = laptops.find((p) =>
    target.includes(p.sku.toLowerCase())
  );
  if (matchSubstringSku) return matchSubstringSku;

  return undefined;
}
