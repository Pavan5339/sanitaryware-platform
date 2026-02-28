import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getProducts } from '@/lib/api';

export default async function Home() {
  const products = await getProducts();
  
  return (
    <main className="min-h-screen bg-white">
      <nav className="w-full p-6 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-50">
        <h1 className="text-2xl font-bold tracking-wider text-[#0A2540]">
          GRAPHISTIC <span className="text-gray-400 font-light">CERAMICS</span>
        </h1>
        <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-600">
          <a href="#" className="hover:text-black transition-colors">Products</a>
          <a href="#" className="hover:text-black transition-colors">Collections</a>
          <a href="#" className="hover:text-black transition-colors">Store Locator</a>
        </div>
      </nav>

      <section className="px-6 py-16 text-center border-b border-gray-50 bg-[#F8F9FA]">
        <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4 tracking-tight">
          Modern Sanitaryware
        </h2>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          Premium ceramic solutions for the sophisticated home.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Featured Products</h3>
            <p className="text-gray-500">Explore our latest arrivals</p>
          </div>
          <span className="text-sm font-semibold text-[#0A2540] cursor-pointer hover:underline">
            View All
          </span>
        </div>

        {products.length === 0 ? (
          <div className="py-20 text-center border-2 border-dashed border-gray-100 rounded-xl">
            <p className="text-gray-400">No products published yet. Check your Strapi dashboard!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {products.map((product) => {
              
              const imageUrl = Array.isArray(product.gallary) 
                ? product.gallary[0]?.url 
                : product.gallary?.url;

              return (
                <Link href={`/products/${product.slug}`} key={product.id} className="group cursor-pointer">
                  
                  <div className="aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden relative border border-gray-50 group-hover:border-gray-200 transition-all">
                    {imageUrl ? (
                      <Image 
                        src={imageUrl} 
                        alt={product.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-gray-300 font-bold text-lg">NO IMAGE</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{product.sku}</p>
                    <h4 className="text-lg font-semibold text-gray-900 group-hover:text-[#0A2540] transition-colors">
                      {product.title}
                    </h4>
                    <p className="text-xl font-light text-gray-900">${product.price}</p>
                  </div>

                </Link>
              );
            })}
          </div>
        )}
      </section>

      <footer className="bg-[#0A2540] text-white py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center opacity-80">
          <p className="text-sm">© 2026 Graphistic Ceramics. All Rights Reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0 text-xs">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </footer>
    </main>
  );
}