'use client';

import Image from 'next/image';
import OfferingCard from '@/components/offerings/OfferingCard';
import OfferingModal from '@/components/modals/OfferingModal';
import { useState, useEffect, useRef } from 'react';
import { virdixData } from '@/app/data/offeringsData';

const VirdixPage = () => {
    const [isHeroVisible, setIsHeroVisible] = useState(false);
    const [isGridVisible, setIsGridVisible] = useState(false);
    const [visibleCards, setVisibleCards] = useState<number[]>([]);
    const [selectedOffering, setSelectedOffering] = useState<typeof virdixData[0] | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const heroRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    const handleCardClick = (offering: typeof virdixData[0]) => {
        setSelectedOffering(offering);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedOffering(null), 300);
    };

    useEffect(() => {
        setIsHeroVisible(true);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.target === gridRef.current && entry.isIntersecting) {
                        setIsGridVisible(true);
                        virdixData.forEach((_, index) => {
                            setTimeout(() => {
                                setVisibleCards((prev) => [...prev, index]);
                            }, index * 100);
                        });
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (gridRef.current) observer.observe(gridRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <>
            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fadeIn {
                    animation: fadeIn 1s ease-out forwards;
                }

                .animate-slideUp {
                    animation: slideUp 0.8s ease-out forwards;
                    animation-delay: 0.3s;
                    opacity: 0;
                }

                .animate-fadeInUp {
                    animation: fadeInUp 0.6s ease-out forwards;
                }
            `}</style>

            <div className="min-h-screen">
                {/* Hero Section */}
                <section
                    ref={heroRef}
                    className={`relative w-full h-[300px] md:h-[400px] overflow-hidden mt-16 md:mt-24 ${
                        isHeroVisible ? 'animate-fadeIn' : 'opacity-0'
                    }`}
                >
                    <Image
                        src="/images/virdix/virdix-hero.png"
                        alt="Virdix Division"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40"></div>
                    <div className="relative z-10 h-full flex items-center justify-center px-4">
                        <h1 className={`text-white text-3xl md:text-5xl lg:text-6xl font-bold text-center ${
                            isHeroVisible ? 'animate-slideUp' : 'opacity-0'
                        }`}>
                            Virdix division offerings
                        </h1>
                    </div>
                </section>

                {/* Offerings Grid */}
                <section className="py-12 md:py-16 lg:py-20 bg-white">
                    <div ref={gridRef} className="max-w-7xl mx-auto px-4 md:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {virdixData.map((offering, index) => (
                                <div
                                    key={offering.id}
                                    onClick={() => handleCardClick(offering)}
                                    className={`cursor-pointer ${
                                        visibleCards.includes(index) ? 'animate-fadeInUp' : 'opacity-0'
                                    }`}
                                >
                                    <OfferingCard
                                        image={offering.image}
                                        title={offering.title}
                                        logo={offering.logo}
                                        bulletPoints={offering.bulletPoints}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Modal */}
                <OfferingModal
                    offering={selectedOffering}
                    isOpen={isModalOpen}
                    onClose={closeModal}
                />
            </div>
        </>
    );
};

export default VirdixPage;
