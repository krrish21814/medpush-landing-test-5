'use client';

import Image from 'next/image';
import { Check } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const AboutHome = () => {
    const [isFirstSectionVisible, setIsFirstSectionVisible] = useState(false);
    const [isSecondSectionVisible, setIsSecondSectionVisible] = useState(false);
    const [visibleFeatures, setVisibleFeatures] = useState<number[]>([]);
    const [visiblePoints, setVisiblePoints] = useState<number[]>([]);
    
    const firstSectionRef = useRef<HTMLDivElement>(null);
    const secondSectionRef = useRef<HTMLDivElement>(null);

    const features = [
        { text: 'Verified Global Database' },
        { text: 'Data-Driven Performance' },
        { text: 'Niche-Specific Creator' },
        { text: 'AI-Powered Discovery Tools' }
    ];

    const points = [
        {
            text: 'Drive higher compliance, transparency and accountability across the entire media value chain'
        },
        {
            text: 'Better performance for your agency while you remunerate them fairly in a transparent model'
        },
        {
            text: 'Ensure that data, particularly in digital, is properly used and leveraged'
        },
        {
            text: 'No extra cost as our fees are financed from within the value & savings we unlock and secure'
        }
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.target === firstSectionRef.current && entry.isIntersecting) {
                        setIsFirstSectionVisible(true);
                        features.forEach((_, index) => {
                            setTimeout(() => {
                                setVisibleFeatures((prev) => [...prev, index]);
                            }, index * 100);
                        });
                    }
                    if (entry.target === secondSectionRef.current && entry.isIntersecting) {
                        setIsSecondSectionVisible(true);
                        points.forEach((_, index) => {
                            setTimeout(() => {
                                setVisiblePoints((prev) => [...prev, index]);
                            }, index * 100);
                        });
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (firstSectionRef.current) observer.observe(firstSectionRef.current);
        if (secondSectionRef.current) observer.observe(secondSectionRef.current);

        return () => observer.disconnect();
    }, []);

    return (
        <>
            <style jsx>{`
                @keyframes slideInLeft {
                    from {
                        opacity: 0;
                        transform: translateX(-50px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes slideInRight {
                    from {
                        opacity: 0;
                        transform: translateX(50px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-slideInLeft {
                    animation: slideInLeft 0.6s ease-out forwards;
                }

                .animate-slideInRight {
                    animation: slideInRight 0.6s ease-out forwards;
                }

                .animate-fadeInUp {
                    animation: fadeInUp 0.5s ease-out forwards;
                }
            `}</style>

            {/* First Section - Connecting Brands */}
            <section ref={firstSectionRef} className="relative w-full bg-[#F8F8F8] py-8 md:py-20 overflow-hidden">
                {/* Decorative Stars - Single Image with all 3 stars */}
                <div className="absolute top-10 left-0 right-0 hidden md:block">
                    <Image
                        src="/images/stars.svg"
                        alt=""
                        width={1400}
                        height={100}
                        className="w-full h-auto scale-75"
                    />
                </div>

                <div className="max-w-[1400px] mx-auto px-4 md:px-8 pt-4 md:pt-14">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-16 items-center">
                        {/* Left Side - Image with Decorative Elements */}
                        <div className={`relative flex justify-center items-center h-[280px] md:h-[500px] order-2 lg:order-1 ${isFirstSectionVisible ? 'animate-slideInLeft' : 'opacity-0'}`}>
                            {/* Background Shadow */}
                            <div className="absolute inset-0 flex justify-center items-center">
                                <Image
                                    src="/images/bg-shadow.svg"
                                    alt=""
                                    width={400}
                                    height={600}
                                    className="w-[280px] md:w-[540px] h-auto"
                                />
                            </div>

                            {/* Dotted Circle - Behind the image */}
                            <div className="absolute inset-0 flex justify-center items-center z-0">
                                <Image
                                    src="/images/dotted-circle.svg"
                                    alt=""
                                    width={550}
                                    height={550}
                                    className="w-[220px] md:w-[370px] h-auto"
                                />
                            </div>

                            {/* Main Circular Image (about-image.png) - On top */}
                            <div className="relative z-10 w-[200px] h-[200px] md:w-[330px] md:h-[330px]">
                                <Image
                                    src="/images/about-image.png"
                                    alt="Business Growth"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>

                        {/* Right Side - Content */}
                        <div className={`space-y-4 md:space-y-6 order-1 lg:order-2 ${isFirstSectionVisible ? 'animate-slideInRight' : 'opacity-0'}`}>
                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
                                <span className="text-gray-900">Help brands </span>
                                <span className="text-[#C11E2B]">maximize effectiveness</span>
                                <span className="text-gray-900"> across the entire media value chain</span>
                            </h2>
                            <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                                Our team of 30+ media experts partner with advertisers and act as an extended arm of their team to maximise effectiveness and secure higher return on their media investment.
                            </p>
                            {/* Features Grid */}
                        </div>
                    </div>
                </div>
            </section>

            {/* Second Section - Mission Statement */}
            <section ref={secondSectionRef} className="relative w-full bg-[#F8F8F8] pb-10">
                <div className="max-w-[1350px] mx-auto px-4 md:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-16 items-center">
                        {/* Left Side - Content */}
                        <div className={`lg:col-span-7 space-y-4 md:space-y-8 ${isSecondSectionVisible ? 'animate-slideInLeft' : 'opacity-0'}`}>
                            <h2 className="text-xl md:text-2xl font-bold leading-tight">
                                <span className="text-gray-900">Why partner with </span>
                                <span className="text-[#C11E2B]">MEDPUSH</span>
                                <span className="text-gray-900"> ?</span>
                            </h2>

                            {/* Points List */}
                            <div className="space-y-4 md:space-y-6 pt-2 md:pt-4">
                                {points.map((point, index) => (
                                    <div key={index} className={`flex items-start gap-3 md:gap-4 ${visiblePoints.includes(index) ? 'animate-fadeInUp' : 'opacity-0'}`}>
                                        <div className="flex-shrink-0 w-6 h-6 md:w-7 md:h-7 rounded-full bg-[#C11E2B] flex items-center justify-center mt-1">
                                            <Check className="w-4 h-4 md:w-5 md:h-5 text-white" strokeWidth={3} />
                                        </div>
                                        <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                                            {point.text}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Side - Image */}
                        <div className={`lg:col-span-5 relative flex justify-center items-center ${isSecondSectionVisible ? 'animate-slideInRight' : 'opacity-0'}`}>
                            <div className="relative w-full h-[250px] md:h-[480px]">
                                <Image
                                    src="/images/about-image-2.png"
                                    alt="Success Target"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AboutHome;
