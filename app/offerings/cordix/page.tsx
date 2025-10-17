'use client';

import Image from 'next/image';
import OfferingCard from '@/components/offerings/OfferingCard';
import OfferingModal from '@/components/modals/OfferingModal';
import { useState, useEffect, useRef } from 'react';
import { cordixData } from '@/app/data/offeringsData';


const CordixPage = () => {
    const [isHeroVisible, setIsHeroVisible] = useState(false);
    const [isGridVisible, setIsGridVisible] = useState(false);
    const [visibleCards, setVisibleCards] = useState<number[]>([]);
    const [selectedOffering, setSelectedOffering] = useState<typeof cordixData[0] | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const heroRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    const handleCardClick = (offering: typeof cordixData[0]) => {
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
                        cordixData.forEach((_, index) => {
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
            {/* Hero Section */}
            <section
                ref={heroRef}
                className={`relative w-full h-[300px] md:h-[400px] overflow-hidden mt-16 md:mt-24 ${
                    isHeroVisible ? 'animate-fadeIn' : 'opacity-0'
                }`}
            >
                <Image
                    src="/images/cordix-hero.png"
                    alt="Cordix Division"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="relative z-10 h-full flex items-center justify-center px-4">
                    <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-bold text-center">
                        Cordix division offerings
                    </h1>
                </div>
            </section>

            {/* Offerings Grid */}
            <section className="py-12 md:py-16 lg:py-20 bg-white">
                <div ref={gridRef} className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {cordixData.map((offering, index) => (
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
        </>
    );
};

export default CordixPage;
