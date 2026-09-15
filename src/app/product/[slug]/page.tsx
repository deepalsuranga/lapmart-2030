import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { LAPTOP_PRODUCTS } from "@/data/lapmart-data";
import { getLaptopBySlug, getLaptopSlug } from "@/utils/slug";
import ProductClientPage from "./ProductClientPage";
import { StoreProvider } from "@/context/StoreContext";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Pre-renders all laptop pages at build time for instant zero-latency loading.
 */
export async function generateStaticParams() {
  return LAPTOP_PRODUCTS.map((product) => ({
    slug: getLaptopSlug(product)
  }));
}

/**
 * Generates dynamic SEO metadata for search engines and social sharing.
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getLaptopBySlug(slug, LAPTOP_PRODUCTS);

  if (!product) {
    return {
      title: "Product Not Found | LapMart 2030",
      description: "The requested laptop rig could not be found."
    };
  }

  const title = `${product.name} | LapMart 2030 Sri Lanka`;
  const description = `Buy ${product.name} (SKU: ${product.sku}) in Sri Lanka. ${product.processor}, ${product.ram}, ${product.storage}, ${product.graphics}. Complimented with 6-Piece Free VIP Pack worth LKR 35,000. 7 islandwide branches.`;

  return {
    title,
    description,
    keywords: [
      product.brand,
      product.category,
      product.condition,
      product.processor,
      "LapMart",
      "Laptop Sri Lanka",
      "Kandy laptop shop",
      "Bambalapitiya laptop",
      "Gaming Laptop Sri Lanka"
    ],
    openGraph: {
      title,
      description,
      images: [
        {
          url: product.image,
          width: 1200,
          height: 800,
          alt: product.name
        }
      ],
      type: "website",
      locale: "en_LK",
      siteName: "LapMart 2030"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [product.image]
    }
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getLaptopBySlug(slug, LAPTOP_PRODUCTS);

  if (!product) {
    notFound();
  }

  // Schema.org Structured Data (JSON-LD) for Google Rich Snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.image,
    description: `${product.name} featuring ${product.processor}, ${product.ram}, ${product.storage}, ${product.graphics}`,
    sku: product.sku,
    mpn: product.sku,
    brand: {
      "@type": "Brand",
      name: product.brand
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating.toString(),
      reviewCount: product.reviewsCount.toString()
    },
    offers: {
      "@type": "Offer",
      url: `https://lapmart.lk/product/${getLaptopSlug(product)}`,
      priceCurrency: "LKR",
      price: product.price.toString(),
      priceValidUntil: "2030-12-31",
      itemCondition:
        product.condition === "Brand New"
          ? "https://schema.org/NewCondition"
          : "https://schema.org/UsedCondition",
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "LapMart 2030"
      }
    }
  };

  return (
    <StoreProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductClientPage product={product} />
    </StoreProvider>
  );
}
