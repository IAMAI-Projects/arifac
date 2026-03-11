'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronRight, Image as ImageIcon } from 'lucide-react';

import Image from 'next/image';

const previewImages = [
    { id: 1, title: "Annual Meet 2025", category: "Events", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80" },
    { id: 2, title: "Training Session L2", category: "Training", image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80" },
    { id: 3, title: "Volunteer Recognition", category: "Community", image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=80" },
];

export default function QuickGallerySection() {
    return (
        <section className="py-32 bg-white overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                    <div className="max-w-3xl">
                        <span className="text-accent text-[12px] font-bold tracking-[0.2em] uppercase mb-4 block">Visual Journey</span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1d1d1f] tracking-tight mb-8">
                            Life at ARIFAC
                        </h2>
                        <p className="text-xl text-secondary max-w-2xl font-medium leading-relaxed">
                            Capturing moments of collaboration, learning, and recognition across our national network.
                        </p>
                    </div>
                    <Link
                        href="/gallery"
                        className="group inline-flex items-center gap-2 text-[#0066cc] font-semibold text-lg hover:underline decoration-2 underline-offset-4"
                    >
                        View Full Gallery <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {previewImages.map((item, idx) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="group relative aspect-[4/3] rounded-[32px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700"
                        >
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                                <span className="text-accent text-[11px] font-bold uppercase tracking-[0.15em] mb-2">{item.category}</span>
                                <h3 className="text-white font-bold text-xl tracking-tight">{item.title}</h3>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
