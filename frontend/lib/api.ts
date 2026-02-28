/**
 * @file This file contains all the API logic for fetching data from Strapi.
 * @author Graphistic Ceramics
 */

import { unstable_noStore as noStore } from 'next/cache';

/**
 * Represents the structure of a Product object.
 */
export interface Product {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  price: number;
  sku: string;
  description: any;
  gallary?: {
    url: string;
    alternativeText?: string;
  } | Array<{ url: string; alternativeText?: string }>;
  seo?: SEO;
}

/**
 * Represents the structure of the SEO component in Strapi.
 */
export interface SEO {
  metaTitle?: string;
  metaDescription?: string;
  structuredData?: any;
}

const STRAPI_URL = process.env.STRAPI_URL || 'http://127.0.0.1:1337';

/**
 * Fetches all products from the Strapi API.
 * 
 * @returns {Promise<Product[]>} A promise that resolves to an array of products.
 * @throws {Error} If the fetch operation fails.
 */
export async function getProducts(): Promise<Product[]> {
  noStore(); // Opt out of caching for this function
  const url = new URL('/api/products', STRAPI_URL);
  url.searchParams.append('populate', '*');

  try {
    const res = await fetch(url.toString());
    
    if (!res.ok) {
      console.error('Failed to fetch products:', res.status, res.statusText);
      throw new Error(`Failed to fetch products. Status: ${res.status}`);
    }

    const json = await res.json();
    if (!json.data) {
        console.warn('No products found in the response.');
        return [];
    }
    return json.data as Product[];
  } catch (error) {
    console.error('An error occurred while fetching products:', error);
    // In a real app, you might want to log this to an external service
    throw new Error('An unexpected error occurred. Please try again later.');
  }
}

/**
 * Fetches a single product by its slug from the Strapi API.
 *
 * @param {string} slug - The slug of the product to fetch.
 * @returns {Promise<Product | undefined>} A promise that resolves to the product, or undefined if not found.
 * @throws {Error} If the fetch operation fails.
 */
export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  noStore(); // Opt out of caching for this function
  const url = new URL('/api/products', STRAPI_URL);
  url.searchParams.append('filters[slug][$eq]', slug);
  url.searchParams.append('populate', '*');

  try {
    const res = await fetch(url.toString());

    if (!res.ok) {
      console.error(`Failed to fetch product with slug ${slug}:`, res.status, res.statusText);
      throw new Error(`Failed to fetch product. Status: ${res.status}`);
    }

    const json = await res.json();
    
    if (!json.data || json.data.length === 0) {
      console.warn(`Product with slug "${slug}" not found.`);
      return undefined;
    }
    
    return json.data[0] as Product;
  } catch (error) {
    console.error(`An error occurred while fetching product with slug "${slug}":`, error);
    throw new Error('An unexpected error occurred. Please try again later.');
  }
}
