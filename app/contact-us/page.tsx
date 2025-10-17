'use client';

import Image from 'next/image';
import { Mail, Phone } from 'lucide-react';
import ContactSection from '@/components/home/ContactSection';
import { useState, useEffect, useRef } from 'react';

const ContactPage = () => {
    const [isHeroVisible, setIsHeroVisible] = useState(false);
    const [isTitleVisible, setIsTitleVisible] = useState(false);
    const [visibleOffices, setVisibleOffices] = useState<number[]>([]);
    
    const heroRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const officesRef = useRef<HTMLDivElement>(null);

const offices = [
    {
        city: 'DUBAI',
        address: 'Jumeirah Lake Towers, Cluster N,',
        address2: 'JBC4 Office 2205 and 2203',
        address3: 'Dubai, UAE',
        email: 'info@medpushmena.com',
        phone: '+971441614432',
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3613.358641937056!2d55.1357445!3d25.062949!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6cb34616b6ff%3A0xfa4593eb732da3ce!2sJBC%204%20-%202804%20Cluster%20N%20-%20Jumeirah%20Lake%20Towers%20-%20Dubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2s!4v1697523600000!5m2!1sen!2s'
    },
    {
        city: 'RIYADH',
        address: 'Al Yasmin - Anas Bin Malik Street - Alesaaha Building',
        address2: '2nd floor - Office 20',
        address3: '',
        email: 'info@medpushmena.com',
        phone: '+966555787003',
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.0966871384823!2d46.6389599!3d24.8181832!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2ee40eefcb6a9d%3A0xbc4308498520f827!2sAnas%20Ibn%20Malik%20Rd%2C%20Riyadh%20Saudi%20Arabia!5e0!3m2!1sen!2s!4v1697523600000!5m2!1sen!2s'
    }
];

    useEffect(() => {
        setIsHeroVisible(true);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.target === titleRef.current && entry.isIntersecting) {
                        setIsTitleVisible(true);
                    }
                    if (entry.target === officesRef.current && entry.isIntersecting) {
                        offices.forEach((_, index) => {
                            setTimeout(() => {
                                setVisibleOffices((prev) => [...prev, index]);
                            }, index * 200);
                        });
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (titleRef.current) observer.observe(titleRef.current);
        if (officesRef.current) observer.observe(officesRef.current);

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

                .animate-fadeIn {
                    animation: fadeIn 1s ease-out forwards;
                }

                .animate-slideUp {
                    animation: slideUp 0.8s ease-out forwards;
                    animation-delay: 0.3s;
                    opacity: 0;
                }

                .animate-slideInLeft {
                    animation: slideInLeft 0.8s ease-out forwards;
                }
            `}</style>

            <div className="min-h-screen">
                {/* Hero Section */}
                <section ref={heroRef} className={`relative w-full h-[160px] md:h-[200px] overflow-hidden mt-16 md:mt-24 ${isHeroVisible ? 'animate-fadeIn' : 'opacity-0'}`}>
                    <Image
                        src="/images/contact-hero.png"
                        alt="Contact Us"
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-black/40"></div>

                    {/* Centered Text */}
                    <div className="relative z-10 h-full flex items-center justify-center px-4">
                        <h1 className={`text-white text-3xl md:text-5xl lg:text-6xl font-bold text-center ${isHeroVisible ? 'animate-slideUp' : 'opacity-0'}`}>
                            Contact Us
                        </h1>
                    </div>
                </section>

                {/* Our Offices Section */}
                <section className="relative w-full bg-white py-8 md:py-12 lg:py-16">
                    <div className="max-w-[1300px] mx-auto px-4 md:px-8">
                        <h2 ref={titleRef} className={`text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-8 md:mb-12 lg:mb-16 ${isTitleVisible ? 'animate-slideUp' : 'opacity-0'}`}>
                            Our Offices
                        </h2>

                        {/* Offices Grid */}
                        <div ref={officesRef} className="space-y-10 md:space-y-14 lg:space-y-16">
                            {offices.map((office, index) => (
                                <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 lg:gap-12 items-start ${visibleOffices.includes(index) ? 'animate-slideInLeft' : 'opacity-0'}`}>
                                    {/* Left - Office Details */}
                                    <div className="space-y-4 md:space-y-6">
                                        <h3 className="text-2xl md:text-3xl font-bold text-[#C11E2B] mb-4 md:mb-6 lg:mb-8">
                                            {office.city}
                                        </h3>

                                        <div className="space-y-1">
                                            <p className="text-gray-700 text-sm md:text-base">{office.address}</p>
                                            <p className="text-gray-700 text-sm md:text-base">{office.address2}</p>
                                            {office.address3 && <p className="text-gray-700 text-sm md:text-base">{office.address3}</p>}
                                        </div>

                                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 pt-3 md:pt-4">
                                            <div className="flex items-center gap-2 md:gap-3">
                                                <Mail className="w-4 h-4 md:w-5 md:h-5 text-[#C11E2B] flex-shrink-0" />
                                                <a href={`mailto:${office.email}`} className="text-gray-700 text-sm md:text-base hover:text-[#C11E2B] break-all">
                                                    {office.email}
                                                </a>
                                            </div>

                                            <div className="flex items-center gap-2 md:gap-3">
                                                <Phone className="w-4 h-4 md:w-5 md:h-5 text-[#C11E2B] flex-shrink-0" />
                                                <a href={`tel:${office.phone}`} className="text-gray-700 text-sm md:text-base hover:text-[#C11E2B]">
                                                    {office.phone}
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right - Map */}
                                    <div className="w-full h-[220px] md:h-[250px] rounded-lg overflow-hidden shadow-md">
                                        <iframe
                                            src={office.mapUrl}
                                            width="100%"
                                            height="100%"
                                            style={{ border: 0 }}
                                            allowFullScreen
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                        ></iframe>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Contact Form Section - Imported Component */}
                <ContactSection />
            </div>
        </>
    );
};

export default ContactPage;
