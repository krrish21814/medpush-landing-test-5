'use client';

import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { useState } from 'react';

interface OfferingCardProps {
    image: string;
    title: string;
    logo?: string;
    bulletPoints: string[];
    showLearnMore?: boolean;
}

const OfferingCard = ({ image, title, logo, bulletPoints, showLearnMore = false }: OfferingCardProps) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <>
            <style jsx>{`
                @keyframes imageZoom {
                    from {
                        transform: scale(1);
                    }
                    to {
                        transform: scale(1.05);
                    }
                }

                .card-image-hover {
                    transition: transform 0.3s ease-out;
                }

                .card-image-hover:hover {
                    transform: scale(1.05);
                }
            `}</style>

            <div 
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Image */}
                <div className="relative w-full h-[250px] md:h-[300px] overflow-hidden">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className={`object-cover card-image-hover`}
                    />
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 flex flex-col flex-1">
                    {/* Title - Centered */}
                    <h3 className="text-xl md:text-2xl font-bold text-[#C11E2B] mb-4 md:mb-6 text-center">
                        {title}
                    </h3>

                    {/* Logo (if provided) */}
                    {logo && (
                        <div className="flex justify-center mb-4">
                            <Image
                                src={logo}
                                alt={`${title} logo`}
                                width={150}
                                height={60}
                                className="h-18 w-auto"
                            />
                        </div>
                    )}

                    {/* Bullet Points */}
                    <ul className="space-y-3 flex-1">
                        {bulletPoints.map((point, index) => (
                            <li key={index} className="flex items-start gap-2">
                                <span className="text-gray-700 text-sm md:text-base leading-relaxed">
                                    • {point}
                                </span>
                            </li>
                        ))}
                    </ul>

                    {/* Learn More Button (Virdix only) */}
                    {showLearnMore && (
                        <div className="mt-6 flex justify-center">
                            <button className="border-2 border-[#C11E2B] text-[#C11E2B] hover:bg-[#C11E2B] hover:text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 flex items-center gap-2 group">
                                Learn More
                                <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default OfferingCard;
