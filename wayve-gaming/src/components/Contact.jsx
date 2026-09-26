import Reveal from './Reveal';

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-6xl font-gaming font-black mb-6">
              <span className="text-gray-900 dark:text-white font-gaming">GET IN</span>{' '}
              <span className="text-primary relative font-gaming">TOUCH</span>
              <div className="w-16 h-1 bg-primary mb-6 mx-auto mt-3" />
            </h2>
            <h3 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              Let&apos;s Create Brighter Worlds
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Have a project in mind, a question, or just want to say hello? We&apos;d love to
              hear from you.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}