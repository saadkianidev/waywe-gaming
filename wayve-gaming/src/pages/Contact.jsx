import CallToAction from '../components/CallToAction';
import PageHero from '../components/PageHero';
import ContactSection from '../components/ContactSection';

export default function Games() {
  return (
    <div className="bg-white dark:bg-black">
        <PageHero
            imagePath="https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=2000&q=85"
            pageName="Let’s Talk Gaming"
            heading={<>Let’s <span className="text-primary">Talk</span> Gaming</>}
            description="empowering organizations with secure cloud infrastructure, AI-driven innovation, cybersecurity, and custom software development. empowering organizations with secure cloud infrastructure."
        />
    
        <ContactSection />

      <CallToAction
        imagePath="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=2000&q=85"
        heading={<>Ready to build the next <span className="text-primary">world?</span></>}
        description="Let&apos;s create a game experience players will remember."
        buttonLabel="Get Consultation"
        buttonHref="/#contact"
      />
    </div>
  );
}
