import React from 'react';
import Image from 'next/image';
import { getProductBySlug } from '@/lib/api';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const product = await getProductBySlug(resolvedParams.slug);

  if (!product) return { title: 'Product Not Found' };

  return {
    title: product.seo?.metaTitle || product.title,
    description: product.seo?.metaDescription || "Premium sanitaryware from Graphistic Ceramics",
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const product = await getProductBySlug(resolvedParams.slug);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-10 text-center bg-gray-50">
        <h1 className="text-4xl text-red-500 font-bold mb-4">Product Not Found in Database!</h1>
        <p className="text-lg text-gray-600">
          Next.js successfully reached Strapi, but could not find a published product with the slug: <br/>
          <strong className="text-black text-2xl bg-white px-4 py-2 border rounded shadow inline-block mt-4">{resolvedParams.slug}</strong>
        </p>
      </div>
    );
  }

  const imageUrl = Array.isArray(product.gallary) ? product.gallary[0]?.url : product.gallary?.url;

  return (
    <main className="min-h-screen bg-white">
      {product.seo?.structuredData && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(product.seo.structuredData) }} />
      )}

      <nav className="w-full p-6 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-50">
        <h1 className="text-2xl font-bold tracking-wider text-[#0A2540]">
          GRAPHISTIC <span className="text-gray-400 font-light">CERAMICS</span>
        </h1>
        <a href="/" className="text-sm font-medium text-gray-600 hover:text-black transition">
          ← Back to Catalog
        </a>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-xs text-gray-400 mb-10 uppercase tracking-widest">
          <a href="/" className="hover:text-[#0A2540] transition">Home</a> 
          <span className="mx-3">/</span> 
          <span className="text-gray-800 font-semibold">{product.title}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <div className="w-full lg:w-1/2 sticky top-32">
            <div className="aspect-square bg-[#F8F9FA] rounded-2xl overflow-hidden relative border border-gray-100 flex items-center justify-center p-8 group">
              {imageUrl ? (
                <Image src={imageUrl} alt={product.title} fill className="object-contain p-8 drop-shadow-2xl group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 50vw" priority />
              ) : (
                <span className="text-gray-300 font-bold text-xl tracking-widest">NO IMAGE</span>
              )}
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col justify-center pt-4">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
              SKU: {product.sku}
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#0A2540] mb-6 leading-tight">
              {product.title}
            </h1>
            <p className="text-3xl font-light text-gray-900 mb-8">${product.price}</p>

            <div className="prose prose-sm text-gray-600 mb-12 text-lg leading-relaxed">
              <p>Premium ceramic construction offering unparalleled durability and modern aesthetics. Designed for the sophisticated space.</p>
            </div>

            <div className="flex gap-4 mb-16">
              <button className="flex-1 bg-[#0A2540] text-white py-5 px-8 rounded-xl font-bold hover:bg-black transition-colors tracking-wide shadow-lg hover:shadow-xl">
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}