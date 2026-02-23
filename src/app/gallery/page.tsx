'use client';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from 'framer-motion';
import Image from 'next/image';

const galleryCategories = ["All", "Events", "Training", "Community", "Awards"];

const galleryImages = [
    { id: 1, title: "Annual Meet 2025", category: "Events", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80" },
    { id: 2, title: "Training Session L2", category: "Training", image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80" },
    { id: 3, title: "Volunteer Recognition", category: "Community", image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=80" },
    { id: 4, title: "Excellence Awards", category: "Awards", image: "https://images.unsplash.com/photo-1531050171651-61afc2836520?w=800&q=80" },
    { id: 5, title: "Board Gathering", category: "Events", image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80" },
    { id: 6, title: "Nodal Officer Workshop", category: "Training", image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=80" },
];

export default function GalleryPage() {
    return (
        <main className="min-h-screen bg-white flex flex-col">
            <Navbar />

            <div className="flex-1 pt-32 pb-20">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl font-bold text-primary mb-4">Gallery</h1>
                        <p className="text-gray-500 max-w-2xl mx-auto">A visual journey through our community's milestones, training sessions, and celebrations.</p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        {galleryCategories.map((cat) => (
                            <button
                                key={cat}
                                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${cat === 'All' ? 'bg-primary text-white shadow-lg' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {galleryImages.map((item, idx) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.1 }}
                                className="group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
                            >
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                    <span className="text-accent text-xs font-bold uppercase tracking-widest mb-1">{item.category}</span>
                                    <h3 className="text-white font-bold text-lg">{item.title}</h3>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
