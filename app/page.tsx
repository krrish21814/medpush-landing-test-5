import AboutHome from '@/components/home/AboutHome';
import ContactSection from '@/components/home/ContactSection';
import Hero from '@/components/home/Hero';

export default function Home() {
  return (
    <main className='bg-[#F8F8F8]'>
      <Hero />
      <AboutHome/>
      <ContactSection/>
    </main>
  );
}
