'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Image as ImageIcon } from 'lucide-react';

import Image from 'next/image';

const previewImages = [
    { id: 1, title: "Annual Meet 2025", category: "Events", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80" },
    { id: 2, title: "Training Session L2", category: "Training", image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80" },
    { id: 3, title: "Volunteer Recognition", category: "Community", image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=80" },
];

export default function QuickGallerySection() {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="max-w-xl">
                        <div className="flex items-center gap-2 text-accent font-bold uppercase tracking-widest text-[10px] mb-4">
                            <ImageIcon size={14} /> Visual Journey
                        </div>
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">
                            Life at ARIFAC
                        </h2>
                        <p className="text-gray-600">
                            Capturing moments of collaboration, learning, and recognition across our national network.
                        </p>
                    </div>
                    <Link
                        href="/gallery"
                        className="group flex items-center gap-2 text-primary font-bold hover:text-accent transition-colors shrink-0"
                    >
                        View Full Gallery <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {previewImages.map((item, idx) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
                        >
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                <span className="text-accent text-[10px] font-bold uppercase tracking-widest mb-1">{item.category}</span>
                                <h3 className="text-white font-bold text-lg">{item.title}</h3>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
