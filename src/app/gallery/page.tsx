'use client';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Star } from 'lucide-react';

const galleryCategories = ["All", "Events", "Training", "Community", "Awards"];

const galleryImages = [
    { id: 1, title: "ARIFAC Third National Meeting", category: "Events", image: "/images/img1.png" },
    { id: 2, title: "ARIFAC Third National Meeting", category: "Training", image: "/images/img2.png" },
    { id: 3, title: "ARIFAC Second National Meeting", category: "Community", image: "/images/img3.jpg" },
    { id: 4, title: "ARIFAC Second National Meeting", category: "Awards", image: "/images/img4.jpg" },
    { id: 5, title: "ARIFAC First National Meeting", category: "Events", image: "/images/img5.jpg" },
    { id: 6, title: "Visit of the Indian Delegation to Vienna", category: "Training", image: "/images/img6.jpg" },
];

export default function GalleryPage() {
    return (
        <main className="min-h-screen bg-white flex flex-col font-heading">
            <Navbar />

            <div className="flex-1 pt-48 pb-32">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto mb-32">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-3 text-accent font-bold uppercase tracking-[0.3em] text-[10px] mb-8"
                        >
                            <Star className="w-5 h-5 relative" /> Visual Narrative
                        </motion.div>
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-6xl md:text-8xl font-bold text-[#1d1d1f] mb-10 tracking-tight leading-[1.1]"
                        >
                            Capturing <br />
                            <span className="text-gray-300">Milestones.</span>
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-2xl text-gray-500 leading-relaxed font-medium max-w-2xl"
                        >
                            A visual journey through our community's core milestones, leadership summits, and professional celebrations.
                        </motion.p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 mb-24">
                        {galleryCategories.map((cat) => (
                            <button
                                key={cat}
                                className={`px-10 py-4 rounded-2xl text-[13px] font-bold tracking-widest uppercase transition-all duration-300 ${cat === 'All' 
                                    ? 'bg-[#1d1d1f] text-white shadow-2xl shadow-gray-400/50' 
                                    : 'bg-[#f5f5f7] text-gray-400 hover:bg-gray-200 hover:text-[#1d1d1f]'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {galleryImages.map((item, idx) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="group relative aspect-square rounded-[40px] overflow-hidden bg-[#f5f5f7] hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] transition-all duration-700"
                            >
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-10">
                                    <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        <span className="text-accent text-[10px] font-bold uppercase tracking-[0.3em] mb-3 block">{item.category}</span>
                                        <h3 className="text-white font-bold text-2xl leading-tight">{item.title}</h3>
                                    </div>
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
