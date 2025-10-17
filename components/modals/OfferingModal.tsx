'use client';

import Image from 'next/image';
import { X } from 'lucide-react';
import { useEffect } from 'react';

interface OfferingModalProps {
    offering: {
        image: string;
        title: string;
        logo?: string;
        description: string;
        details?: string[];
    } | null;
    isOpen: boolean;
    onClose: () => void;
}

const OfferingModal = ({ offering, isOpen, onClose }: OfferingModalProps) => {
    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen || !offering) return null;

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
                        transform: translateY(50px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .modal-backdrop {
                    animation: fadeIn 0.3s ease-out forwards;
                }

                .modal-content {
                    animation: slideUp 0.4s ease-out forwards;
                }
            `}</style>

            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop">
                {/* Backdrop */}
                <div
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    onClick={onClose}
                ></div>

                {/* Modal */}
                <div className="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden modal-content">
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-10 w-10 h-10 bg-[#C11E2B] hover:bg-[#a01822] text-white rounded-full flex items-center justify-center transition-colors duration-200"
                        aria-label="Close modal"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    {/* Content Container */}
                    <div className="flex flex-col md:flex-row max-h-[90vh]">
                        {/* Left Side - Image */}
                        <div className="md:w-5/12 flex-shrink-0 relative h-64 md:h-auto">
                            <Image
                                src={offering.image}
                                alt={offering.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>

                        {/* Right Side - Content */}
                        <div className="md:w-7/12 overflow-y-auto p-6 md:p-8">
                            {/* Title with proper padding to avoid close button */}
                            <h3 className="text-2xl md:text-3xl font-bold text-[#C11E2B] mb-6 pr-10">
                                {offering.title}
                            </h3>

                            {/* Description */}
                            <div className="prose prose-sm md:prose-base max-w-none">
                                <p className="text-gray-700 leading-relaxed whitespace-pre-line mb-4">
                                    {offering.description}
                                </p>

                                {/* Additional Details */}
                                {offering.details && offering.details.length > 0 && (
                                    <div className="mt-6">
                                        {offering.details.map((detail, index) => (
                                            <div key={index} className="mb-4">
                                                <p className="text-gray-700 leading-relaxed">
                                                    {detail}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OfferingModal;
