'use client';

import Image from 'next/image';
import { Send } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const ContactSection = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        comment: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setSubmitStatus('success');
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    comment: ''
                });
                alert('✅ Thank you! Your message has been sent successfully. We will get back to you soon.');
            } else {
                setSubmitStatus('error');
                alert('❌ Failed to send message. Please try again or email us directly.');
                console.error('Error:', data);
            }
        } catch (error) {
            console.error('Error:', error);
            setSubmitStatus('error');
            alert('❌ An error occurred. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };


    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

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

                .animate-slideInLeft {
                    animation: slideInLeft 0.6s ease-out forwards;
                }

                .animate-slideInRight {
                    animation: slideInRight 0.6s ease-out forwards;
                }
            `}</style>

            <section ref={sectionRef} className="relative w-full bg-[#C11E2B] py-12 md:py-20 overflow-hidden">
                <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-start">
                        {/* Left Side - Heading and Map */}
                        <div className={`space-y-6 md:space-y-8 ${isVisible ? 'animate-slideInLeft' : 'opacity-0'}`}>
                            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                                We are always ready to serve you
                            </h2>

                            {/* World Map - Hidden on mobile */}
                            <div className="relative w-full h-[300px] md:h-[440px] opacity-100 hidden md:block md:scale-125 md:-ml-12">
                                <Image
                                    src="/images/map.svg"
                                    alt="World Map"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>

                        {/* Right Side - Contact Form */}
                        <div className={`space-y-4 md:space-y-6 ${isVisible ? 'animate-slideInRight' : 'opacity-0'}`}>
                            <div>
                                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 md:mb-4">
                                    Get In Touch
                                </h3>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                                {/* First Name and Last Name Row */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                                    <div>
                                        <label className="block text-white text-xs md:text-sm mb-2">First Name</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            placeholder="Ali"
                                            className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg bg-white/40 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:border-white transition-colors text-sm md:text-base"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-white text-xs md:text-sm mb-2">Last Name</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            placeholder="Tufan"
                                            className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg bg-white/40 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:border-white transition-colors text-sm md:text-base"
                                        />
                                    </div>
                                </div>

                                {/* Email and Phone Row */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                                    <div>
                                        <label className="block text-white text-xs md:text-sm mb-2">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Creativelayers088@Gmail.Com"
                                            className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg bg-white/40 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:border-white transition-colors text-sm md:text-base"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-white text-xs md:text-sm mb-2">Phone</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="+90 47458 27 3287 12"
                                            className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg bg-white/40 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:border-white transition-colors text-sm md:text-base"
                                        />
                                    </div>
                                </div>

                                {/* Comment Textarea */}
                                <div>
                                    <label className="block text-white text-xs md:text-sm mb-2">Comment</label>
                                    <textarea
                                        name="comment"
                                        value={formData.comment}
                                        onChange={handleChange}
                                        rows={4}
                                        className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg bg-white/40 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:border-white transition-colors resize-none text-sm md:text-base"
                                    ></textarea>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full md:w-auto px-6 md:px-8 py-2.5 md:py-3 bg-gray-900 text-white rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2 text-sm md:text-base ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'
                                        }`}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            Send Message
                                            <Send className="w-4 h-4" />
                                        </>
                                    )}
                                </button>

                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ContactSection;
