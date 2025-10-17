'use client';


import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import TeamMemberModal from '@/components/team/TeamMemberModal';


interface TeamMember {
    image: string;
    name: string;
    role: string;
    about: string;
    workExperience: string;
    specialties: string[];
    mainClientsExperience: string[];
}


const allTeamMembers: TeamMember[] = [
    {
        image: '/images/team/team-images/ceo.png',
        name: 'Samir Ayoub',
        role: 'Founder & CEO',
        about: 'Samir has 30+ years of solid experience in the media industry and is known as one of the media veterans in the MENA region. He is living in Dubai since Q4 1990 and has good knowledge and insights about the GCC culture and society. Since 2022, Samir spends his time between Riyadh and Dubai.',
        workExperience: '30+ Years in Media Industry. Led Mindshare MENA for 17 Years. Under his leadership, Mindshare grew significantly and ranked amongst the top media agencies in the region. Founded MEDPUSH in Q4 2016, and gradually the company grew to become the leading media consultancy company in GCC. MEDPUSH partners with 40+ big advertisers/brands through two offices and 30 employees.',
        specialties: [
            'Business transformation and leadership',
            'Setting new trends',
            'Strategic thinking',
            'Digital transformation',
            'Talent development'
        ],
        mainClientsExperience: [
            'Government, semi-government and private organizations across the MENA region',
            'A mix of global, regional and local clients across a wide range of categories',
            'Master in computer science',
            'Master in math statistics'
        ]
    },
    {
        image: '/images/team/team-images/coo.png',
        name: 'Imad Abi Rizk',
        role: 'Chief Operating Officer',
        about: 'Imad is the Chief Operations Officer of MEDPUSH and leads the core offering team. He is responsible for the quality of products, focuses on maximizing ROI for advertising activities across clients. Before joining MEDPUSH, he spent 9 years at Mindshare. Imad holds BA in business and finance.',
        workExperience: '15+ years experience. Worked at Mindshare and MCN/UM. Joined MEDPUSH in 2016.',
        specialties: [
            'Strategic media planning',
            'Digital optimization and implementations',
            'Analytics and reviews (audit)'
        ],
        mainClientsExperience: [
            'All MEDPUSH clients'
        ]
    },
    {
        image: '/images/team/team-images/cs-go.png',
        name: 'Duri Alajrami',
        role: 'Chief Strategy & Growth Officer',
        about: "Duri is known as a digital veteran, he has built digital practices at DDB, Wunderman, Ogilvy and Mindshare, and founded and exited startups in Dubai and Canada. A champion of customer-centric, data-driven growth, Duri has led multiple industry firsts—from launching MENA's first digital advertising division (Arabia.com in 1999) and internet media house (NetAdvantage in 2002) to WPP's first digital agency in MENA (Mindshare Interaction in 2006), Ogilvy's first social division in Canada (in 2009) and Canada's first SaaS influencer engagement marketplace (in 2012).",
        workExperience: '26+ years experience. Joined MEDPUSH in 2025.',
        specialties: [
            'Digital transformation',
            'Strategy development',
            'Client relationship'
        ],
        mainClientsExperience: [
            'Government of Dubai, IBM, Unilever, Etisalat, VW, McDonalds'
        ]
    },
    {
        image: '/images/team/team-images/md.png',
        name: 'Bashayer Alshdukhi',
        role: 'Managing Director - KSA',
        about: "Bashayer holds a Bachelor's degree in Business, with experience in project management, consulting, auditing, and is known for her business improvement ideas. She strongly believes in the vision of the Kingdom of Saudi Arabia 2030 and has participated in many events related to the vision projects.",
        workExperience: '14+ years experience. Joined MEDPUSH in 2022.',
        specialties: [
            'Projects management',
            'Consultancy services and compliance',
            'Data and financial analytics'
        ],
        mainClientsExperience: [
            'All MEDPUSH KSA clients'
        ]
    },
    {
        image: '/images/team/team-images/mcd.png',
        name: 'Roni Ayoub',
        role: 'Media Consultancy Director',
        about: 'Roni oversees the operations in the Dubai office, in addition to handling a portfolio of clients. He has strong analytical skills particularly in digital and gained the trust and respect of clients. Roni has BA in mechanical engineering.',
        workExperience: '8+ years experience. Joined MEDPUSH in 2017.',
        specialties: [
            'Strategic Media Planning',
            'Campaigns review and audit',
            'Optimization, implementations, analytics'
        ],
        mainClientsExperience: [
            'Zain, Expo, AFG, MAF, Nissan, JG, Dubai Holding, Nakheel, Yaqoot'
        ]
    },
    {
        image: '/images/team/team-images/mcm.png',
        name: 'Yara Kassem',
        role: 'Media Consultancy Manager',
        about: 'Yara holds BA in arts & science, mass communication and works consultancy manager in charge of several clients. She manages clients relationship, ensures quality in addition to coaching and growing her team.',
        workExperience: '6 years experience including Ogilvy. Joined MEDPUSH in 2020.',
        specialties: [
            'Campaigns review and audit',
            'Digital analytics',
            'Optimization & implementations'
        ],
        mainClientsExperience: [
            'Al Futtaim Group, Americana, Expo 2020, California Garden, du, PUIG'
        ]
    },
    {
        image: '/images/team/team-images/mcm2.png',
        name: 'Omar Jouejati',
        role: 'Media Consultancy Manager',
        about: 'Omar began his career in the advertising and media industry in 2011 with Publicis, where he spent the first six years specializing in social and digital content. In 2017, he transitioned into media planning and buying, a role he held through 2025. Over the years, he has led strategic campaigns for a diverse portfolio of both local and global brands.',
        workExperience: '14+ years experience. Joined MEDPUSH in 2025.',
        specialties: [
            'Campaigns review and audit',
            'Digital analytics',
            'Strategy and optimization',
            'Client relationship'
        ],
        mainClientsExperience: [
            'Mars, Mondelez, adidas, Yas Marina Circuit (F1 Abu Dhabi Grand Prix), General Motors, Dubai Tourism, Procter & Gamble',
            'EXPO CITY, ASD, Aujan Coca-Cola, Nakheel, Meraas'
        ]
    },
    {
        image: '/images/team/team-images/mcm3.png',
        name: 'Sohaib Khan',
        role: 'Media Consultancy Manager',
        about: 'Sohaib holds a master\'s degree in business administration, specializing in Marketing. He has a strong experience developing and implementing media strategies for global advertisers including P&G, Unilever and Mondelez. His expertise lies in crafting innovative media solutions that drive business growth and deliver impactful results. Prior to MEDPUSH, he worked on the agency and client end including Starcom and Unilever.',
        workExperience: '11+ years experience. Joined MEDPUSH late 2024.',
        specialties: [
            'Data analysis',
            'Campaigns review and audit',
            'Planning, optimization, and analysis',
            'Client relationship management'
        ],
        mainClientsExperience: [
            'Saudi Tourism Authority, Nahdi, Badael, Goody, Unilever, P&G'
        ]
    },
    {
        image: '/images/team/team-images/sc.png',
        name: 'Madiha Khan',
        role: 'Senior Consultant',
        about: 'Madiha works with the core team in analyzing and reviewing campaigns and managing clients relationship. She holds a master\'s degree in digital marketing and consumer psychology.',
        workExperience: '6+ years experience. Joined MEDPUSH in 2022.',
        specialties: [
            'Data analysis',
            'Campaigns review and audit',
            'Planning, optimization and analysis',
            'Client relationship management'
        ],
        mainClientsExperience: [
            'STA, Badael, Diriyah, Nahdi, Almarai, Goody, Savola, JG'
        ]
    },
    {
        image: '/images/team/team-images/sfc.png',
        name: 'Amil Joy',
        role: 'Senior Financial Controller',
        about: 'Amil is a Sr. Financial Controller with strong experience in finance and audit. He works in financial audit (media related) and invoices validation and reporting. Prior to joining MEDPUSH he worked in several finance and audit companies including JAXA.',
        workExperience: '10+ years experience. 4 years at MEDPUSH.',
        specialties: [
            'All financial-media audit aspects',
            'Scrutiny and validation',
            'Analysis and reporting'
        ],
        mainClientsExperience: [
            'All MEDPUSH clients'
        ]
    },
    {
        image: '/images/team/team-images/smc.png',
        name: 'Sarah Altowireb',
        role: 'Senior Media Consultant',
        about: 'Sarah holds a bachelor\'s degree of Education, yet she is passionate about marketing and social media where she gained a couple of years of experience before joining MEDPUSH. Sarah works within the team in Riyadh office, to collect data, analyze and review campaigns.',
        workExperience: '5+ years experience. Joined MEDPUSH in 2023.',
        specialties: [
            'Process preparation and validation',
            'Digital analytics',
            'Optimization and Implementations'
        ],
        mainClientsExperience: [
            'STA, Badael, Diriyah, Nahdi, Almarai, Saco, Goody, Savola'
        ]
    },
    {
        image: '/images/team/team-images/ma.png',
        name: 'Ali Alqarni',
        role: 'Media Analyst',
        about: 'Ali holds BA in accounting and works within the team to Riyadh office, to collect data, analyze and review campaigns as well as validate invoices.',
        workExperience: '9+ years experience. Joined MEDPUSH in 2022.',
        specialties: [
            'Data analysis',
            'Campaigns review and audit',
            'Invoices validation and reporting'
        ],
        mainClientsExperience: [
            'STA, Badael, Diriyah, Nahdi, Savola, Almarai, ASD'
        ]
    },
    {
        image: '/images/team/team-images/ma2.png',
        name: 'Rebecca Mitri',
        role: 'Media Analyst',
        about: 'Rebecca holds a bachelor\'s degree in economics. As a fresh graduate, Rebecca went through an intensive training program before she became actively involved within the team. She works in preparation, gathering information, validation and analysis of campaigns.',
        workExperience: '2+ years experience. Joined MEDPUSH in 2023.',
        specialties: [
            'Process preparation and validation',
            'Digital analytics',
            'Optimization and Implementations'
        ],
        mainClientsExperience: [
            'Zain, Expo, AFG, Nissan, Jumeirah Group, Dubai Holding'
        ]
    },
    {
        image: '/images/team/team-images/ma3.png',
        name: 'Ahmad Dankar',
        role: 'Media Analyst',
        about: 'Ahmad has experience in planning and digital gained by working at both client and agency sides. He holds bachelor\'s in computer engineering with focus in data science, hence he has a strong analytical background.',
        workExperience: '5+ years experience. Joined MEDPUSH in 2023.',
        specialties: [
            'Process preparation and validation',
            'Digital analytics',
            'Optimization and Implementations'
        ],
        mainClientsExperience: [
            'Al Futtaim Group, Americana, California Garden, du, PUIG'
        ]
    },
    {
        image: '/images/team/team-images/ma4.png',
        name: 'Jennifer Mitri',
        role: 'Media Analyst',
        about: 'Jennifer holds a BA in mechatronics engineering; hence she has a strong analytical background. As a fresh graduate, Jennifer went through an intensive training before she became actively involved within the team.',
        workExperience: '1+ years experience. Joined MEDPUSH in 2024.',
        specialties: [
            'Process preparation and validation',
            'Digital analytics',
            'Optimization and Implementations'
        ],
        mainClientsExperience: [
            'EXPO CITY, ASD, Aujan Coca-Cola, Nakheel, Agthia'
        ]
    },
    {
        image: '/images/team/team-images/ma5.png',
        name: 'Faiza Irshad',
        role: 'Media Analyst',
        about: 'Faiza holds a bachelor\'s degree in business marketing and management. She has experience in marketing analytics. She works in gathering data, analyzing, reviewing campaigns and auditing.',
        workExperience: '5+ years experience. Joined MEDPUSH in 2022.',
        specialties: [
            'Process preparation and validation',
            'Digital analytics',
            'Optimization and Implementations'
        ],
        mainClientsExperience: [
            'Zain, Expo, AFG, Nissan, Jumeirah Group, Dubai Holding, Nakheel, Americana'
        ]
    },
    {
        image: '/images/team/team-images/ma6.png',
        name: 'Raneem Alrudayan',
        role: 'Media Analyst',
        about: 'Raneem holds a bachelor\'s degree in finance and investment with a strong passion for digital marketing and media campaigns. She has 2.5 years of experience working in different capacities in financial analysis, reporting, and social media marketing for prestigious clients such as ALRajhi Bank and STC.',
        workExperience: '2+ years experience. Joined MEDPUSH in early 2025.',
        specialties: [
            'Process preparation and validation',
            'Digital analytics',
            'Campaigns review',
            'Optimization and Implementations'
        ],
        mainClientsExperience: [
            'STA, Badael, STC, Alrajhi, Nahdi, ASD'
        ]
    },
    {
        image: '/images/team/team-images/ma7.png',
        name: 'Reem Alanzan',
        role: 'Media Analyst',
        about: 'Reem holds a bachelor\'s degree in finance and Investment, and a master\'s degree in business administration (MBA). She is passionate about data analysis and the media industry and has 1.5 years of in the same field. Reem joined MEDPUSH in early 2025 and works with the team in Riyadh to support campaigns review, analysis, reporting, and client insights.',
        workExperience: '1+ years experience. Joined MEDPUSH in early 2025.',
        specialties: [
            'Process preparation and validation',
            'Digital analytics',
            'Campaigns review',
            'Optimization and Implementations'
        ],
        mainClientsExperience: [
            'STA, Badael, Nahdi, ASD'
        ]
    },
    {
        image: '/images/team/team-images/ma8.png',
        name: 'Abdulelah Alahmari',
        role: 'Media Analyst',
        about: 'Abdulelah is a results-driven enthusiast with multiple sectors experience including United Nations and in Consulting practice. His skills lies in data analytics and project management. This unique blend of experience positions him to excel in dynamic projects that demand both analytical rigor and strong interpersonal skills for successful project execution.',
        workExperience: '2+ years experience. Joined MEDPUSH in 2025.',
        specialties: [
            'Process preparation and validation',
            'Digital analytics',
            'Campaigns review',
            'Optimization and Implementations'
        ],
        mainClientsExperience: [
            'STA, Badael, UN, Nahdi, ASD'
        ]
    },
    {
        image: '/images/team/team-images/da.png',
        name: 'Alim Jahagirdar',
        role: 'Data Analyst',
        about: 'Alim is a specialized data analyst, focusing on deriving data driven insights with expertise in data analytics. Alim utilizes his analytical skills to support business growth and operational efficiency. He is passionate about transforming complex data into actionable insights that empower informed decision making.',
        workExperience: '2+ years experience. Joined MEDPUSH in Jan 2024.',
        specialties: [
            'Process preparation and validation',
            'Data gathering, visualization, and reviews',
            'Invoices validation'
        ],
        mainClientsExperience: [
            'Al Futtaim Group, Americana, California Garden, du, PUIG'
        ]
    },
    {
        image: '/images/team/team-images/ma9.png',
        name: 'Mohammed Almutairi',
        role: 'Media Analyst',
        about: 'Mohammed is a digitally focused E-Commerce specialist with a bachelor\'s degree in E-Commerce from Saudi Electronic University. He completed his training at the General Authority for Research, Development, and Innovation, where he contributed to market analysis and digital strategy projects. His background combines practical knowledge in customer service with a strategic mindset in digital marketing.',
        workExperience: '1+ years experience. Joined MEDPUSH in 2025.',
        specialties: [
            'Process preparation and validation',
            'Digital analytics',
            'Campaigns review',
            'Optimization and Implementations'
        ],
        mainClientsExperience: [
            'STA, Badael, UN, Nahdi, ASD'
        ]
    },
    {
        image: '/images/team/team-images/de.png',
        name: 'Laiba Shahid',
        role: 'DataOps Executive',
        about: 'Laiba holds a bachelor\'s degree in Software Engineering, certified in Data Science (University of California). She has in-depth knowledge of Analyzing market research/logistics. She assists the team gathering, reviewing, validating and analyzing data.',
        workExperience: '4+ years experience. Joined MEDPUSH in Jan 2023.',
        specialties: [
            'Process preparation and validation',
            'Data gathering and invoices validation',
            'Optimization and Implementations'
        ],
        mainClientsExperience: [
            'EXPO CITY, ASD, Aujan Coca-Cola, Nakheel, Agthia'
        ]
    },
    {
        image: '/images/team/team-images/de2.png',
        name: 'Aaron Karl Cabildo',
        role: 'DataOps Executive',
        about: 'Aaron is a data analyst with a background in data engineering, analytics, and automation. He focuses on improving data accuracy, streamlining processes, and turning complex information into clear, actionable insights that support business growth.',
        workExperience: '2+ years experience. Joined MEDPUSH in 2025.',
        specialties: [
            'Process preparation and validation',
            'Data gathering and visualization',
            'Invoices validation'
        ],
        mainClientsExperience: [
            'Al Futtaim Group, Americana, California Garden, du, PUIG'
        ]
    },
    {
        image: '/images/team/team-images/de3.png',
        name: 'Mohammed Ayub Khan',
        role: 'DataOps Executive',
        about: 'Mohammed is an MBA Post-Graduate in International Marketing with expertise in digital marketing and e-commerce across global markets. He specializes in data-driven marketing campaigns and is recognized for his analytical mindset and results-oriented approach.',
        workExperience: '3+ years experience. Joined MEDPUSH in 2025.',
        specialties: [
            'Campaigns review',
            'Data analysis and visualization',
            'Invoices validation'
        ],
        mainClientsExperience: [
            'Zain, Nissan, Jumeirah Group, Yaqoot, Tamam'
        ]
    },
    {
        image: '/images/team/team-images/de4.png',
        name: 'Randy Jr. Alday',
        role: 'DataOps Executive',
        about: 'Randy is a talented Data Analyst known for his adaptability, strong analytical skills, and expertise in creating databases and data visualization. He excels at transforming complex data into great insights to drive informed decision-making & gives fruitful outcomes.',
        workExperience: '5+ years experience. Joined MEDPUSH in Jan 2023.',
        specialties: [
            'Process preparation and validation',
            'Data gathering and visualization',
            'Invoices validation'
        ],
        mainClientsExperience: [
            'Al Futtaim Group, Americana, California Garden, du, PUIG'
        ]
    },
    {
        image: '/images/team/team-images/de5.png',
        name: 'Clarisse Lomotan',
        role: 'DataOps Executive',
        about: 'Clarisse holds a BA in Entrepreneurship from Bulacan State University. She has experience in social media marketing and known for her thorough analysis and attention to details. She works within the support function team.',
        workExperience: '5+ years experience. Joined MEDPUSH in Jan 2023.',
        specialties: [
            'Process preparation and validation',
            'Admin and data gathering',
            'Invoices validation'
        ],
        mainClientsExperience: [
            'Zain, Expo, AFG, Nissan, Jumeirah Group, Yaqoot, Tamam'
        ]
    },
    {
        image: '/images/team/team-images/de6.png',
        name: 'Ann Anana',
        role: 'DataOps Executive/Secretary',
        about: 'Ann holds a BS in Education. She has 15 years\' experience in retail industry, joined MEDPUSH in early 2023 as DataOps Executive. She provides administrative support to the team and also assists in gathering data, validation and reporting.',
        workExperience: '15+ years experience. Joined MEDPUSH in 2023.',
        specialties: [
            'Process preparation and validation',
            'Admin and data gathering',
            'Invoices validation'
        ],
        mainClientsExperience: [
            'EXPO CITY, ASD, Aujan Coca-Cola, Nakheel, Agthia'
        ]
    }
];


// Calculate items per page to ensure complete rows of 3
// Total: 27 members, split into 2 pages with complete rows
// Page 1: 15 (5 rows × 3), Page 2: 12 (4 rows × 3)
const ITEMS_PER_PAGE = 15;


const TeamPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isHeroVisible, setIsHeroVisible] = useState(false);
    const [isTitleVisible, setIsTitleVisible] = useState(false);
    const [visibleCards, setVisibleCards] = useState<number[]>([]);
    
    const heroRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);


    const totalPages = Math.ceil(allTeamMembers.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentMembers = allTeamMembers.slice(startIndex, endIndex);


    useEffect(() => {
        setIsHeroVisible(true);


        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.target === titleRef.current && entry.isIntersecting) {
                        setIsTitleVisible(true);
                    }
                    if (entry.target === gridRef.current && entry.isIntersecting) {
                        setVisibleCards([]);
                        currentMembers.forEach((_, index) => {
                            setTimeout(() => {
                                setVisibleCards((prev) => [...prev, index]);
                            }, index * 100);
                        });
                    }
                });
            },
            { threshold: 0.1 }
        );


        if (titleRef.current) observer.observe(titleRef.current);
        if (gridRef.current) observer.observe(gridRef.current);


        return () => observer.disconnect();
    }, [currentPage]);


    const handleMemberClick = (member: TeamMember) => {
        setSelectedMember(member);
        setIsModalOpen(true);
    };


    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedMember(null), 200);
    };


    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };


    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };


    const goToPage = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };


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


                .team-card {
                    opacity: 0;
                }
            `}</style>


            <div className="min-h-screen bg-white">
                {/* Hero Section */}
                <section ref={heroRef} className={`relative w-full h-[180px] md:h-[240px] overflow-hidden mt-16 md:mt-24 ${isHeroVisible ? 'animate-fadeIn' : 'opacity-0'}`}>
                    <Image
                        src="/images/partners-page-hero.png"
                        alt="Our Team"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40"></div>
                    <div className="relative z-10 h-full flex items-center justify-center px-4">
                        <h1 className={`text-white text-3xl md:text-5xl lg:text-6xl font-bold text-center ${isHeroVisible ? 'animate-slideUp' : 'opacity-0'}`}>
                            Our Team
                        </h1>
                    </div>
                </section>


                {/* Team Members Section */}
                <section className="max-w-[1400px] mx-auto px-4 md:px-8 py-10 md:py-16 lg:py-20">
                    <h2 ref={titleRef} className={`text-2xl md:text-3xl font-bold text-center text-[#C11E2B] mb-10 md:mb-12 ${isTitleVisible ? 'animate-slideUp' : 'opacity-0'}`}>
                        Meet Our Team Members
                    </h2>


                    {/* Team Grid */}
                    <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                        {currentMembers.map((member, idx) => (
                            <div
                                key={`${member.name}-${idx}`}
                                onClick={() => handleMemberClick(member)}
                                className={`relative rounded-2xl overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer group team-card ${visibleCards.includes(idx) ? 'animate-fadeInUp' : ''}`}
                            >
                                <div className="relative w-full aspect-[3/4]">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        className="object-cover group-hover:scale-102 transition-transform duration-300"
                                        priority={idx < 3}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>


                    {/* Pagination */}
                    <div className="flex items-center justify-center gap-4 mt-10 md:mt-12">
                        <button
                            onClick={goToPreviousPage}
                            disabled={currentPage === 1}
                            className={`text-sm md:text-base transition-colors duration-200 ${
                                currentPage === 1
                                    ? 'text-gray-300 cursor-not-allowed'
                                    : 'text-gray-600 hover:text-gray-800'
                            }`}
                        >
                            ← Previous
                        </button>


                        <div className="flex items-center gap-2">
                            {[1, 2].map((page) => (
                                <button
                                    key={page}
                                    onClick={() => goToPage(page)}
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-200 ${
                                        currentPage === page
                                            ? 'bg-[#C11E2B] text-white'
                                            : 'hover:bg-gray-100 text-gray-600'
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>


                        <button
                            onClick={goToNextPage}
                            disabled={currentPage === totalPages}
                            className={`text-sm md:text-base transition-colors duration-200 ${
                                currentPage === totalPages
                                    ? 'text-gray-300 cursor-not-allowed'
                                    : 'text-gray-600 hover:text-gray-800'
                            }`}
                        >
                            Next →
                        </button>
                    </div>
                </section>


                {/* Modal */}
                {selectedMember && (
                    <TeamMemberModal
                        member={selectedMember}
                        isOpen={isModalOpen}
                        onClose={closeModal}
                    />
                )}
            </div>
        </>
    );
};


export default TeamPage;
