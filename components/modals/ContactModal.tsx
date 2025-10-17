'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    comment: '',
  });

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

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    onClose();
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      comment: '',
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Semi-transparent Backdrop - shows underlying page */}
      <div
        className="absolute inset-0 bg-black/30  transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Slide-in Drawer from Right - 80% width */}
      <div
        className={`absolute top-0 right-0 h-full w-[80%] bg-white shadow-2xl transform transition-transform duration-500 ease-in-out overflow-y-auto ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 w-14 h-14 flex items-center justify-center bg-gray-900 hover:bg-gray-800 text-white rounded-full transition-colors duration-200"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-full">
          {/* Left Side - Form */}
          <div className="p-12 lg:p-16 bg-gray-50">
            {/* Logo */}
            <div className="mb-10">
              <Image
                src="/images/logo.png"
                alt="MEDPUSH"
                width={180}
                height={60}
                className="h-10 w-auto"
              />
            </div>

            {/* Form Header */}
            <div className="mb-8">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Get In Touch
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Etiam pharetra egestas interdum blandit viverra morbi consequat mi non bibendum egestas quam egestas nulla.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>

              <textarea
                name="comment"
                placeholder="Comment"
                value={formData.comment}
                onChange={handleChange}
                rows={5}
                className="w-full px-5 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
              />

              <button
                type="submit"
                className="px-10 py-4 bg-red-600 hover:bg-red-700 text-white rounded-full font-semibold transition-colors duration-200 flex items-center gap-2"
              >
                Send Message
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </form>
          </div>

          {/* Right Side - Office Info */}
          <div className="bg-white p-12 lg:p-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-10">Our Offices</h3>

            {/* Office Locations */}
            <div className="space-y-10 mb-12">
              {/* San Francisco */}
              <div>
                <h4 className="font-bold text-gray-900 text-lg mb-3">San Francisco</h4>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  329 Queensberry Street, North Melbourne VIC3051, Australia.
                </p>
                <button className="text-red-600 hover:text-red-700 font-medium flex items-center gap-2 mb-5">
                  See on Map
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <div className="space-y-3">
                  <a href="mailto:ali@boxcars.com" className="flex items-center gap-3 text-gray-600 hover:text-red-600 transition-colors">
                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    ali@boxcars.com
                  </a>
                  <a href="tel:+76956039967" className="flex items-center gap-3 text-gray-600 hover:text-red-600 transition-colors">
                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    +76 956 039 967
                  </a>
                </div>
              </div>

              {/* New York */}
              <div>
                <h4 className="font-bold text-gray-900 text-lg mb-3">New York</h4>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  329 Queensberry Street, North Melbourne VIC3051, Australia.
                </p>
                <button className="text-red-600 hover:text-red-700 font-medium flex items-center gap-2 mb-5">
                  See on Map
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <div className="space-y-3">
                  <a href="mailto:newyork@boxcars.com" className="flex items-center gap-3 text-gray-600 hover:text-red-600 transition-colors">
                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    newyork@boxcars.com
                  </a>
                  <a href="tel:+76956039967" className="flex items-center gap-3 text-gray-600 hover:text-red-600 transition-colors">
                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    +76 956 039 967
                  </a>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="w-full h-72 bg-gray-200 rounded-2xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
