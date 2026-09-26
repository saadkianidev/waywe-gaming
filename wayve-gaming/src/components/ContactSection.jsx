import { useState } from 'react';
import Reveal from './Reveal';

const DETAILS = [
  { icon: 'fa-envelope', text: 'info@waywegaming.com' },
  { icon: 'fa-phone', text: '(800) 659-0691' },
  { icon: 'fa-map-marker-alt', text: '932 Ditmas Ave, Brooklyn, NY 11218' },
  {
    icon: 'fa-map-marker-alt',
    text: '857 Street 12, Block B Police Foundation,\nIslamabad, Pakistan',
  },
  {
    icon: 'fa-map-marker-alt',
    text: '857 Street 12, Block B Police Foundation,\nIslamabad, Pakistan',
  },
];

const INITIAL_FORM = { name: '', email: '', country: '', phone: '', message: '' };

export default function ContactSection() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm(INITIAL_FORM);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="bg-white py-20 text-gray-900 dark:bg-black dark:text-white md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <Reveal>
            <div>
              <div className="mb-5 flex items-center gap-5">
                <p className="whitespace-nowrap text-xs uppercase tracking-wide text-gray-700 dark:text-gray-200">Get In Touch</p>
                <div className="h-px max-w-xs flex-1 bg-gray-300 dark:bg-gray-600" />
              </div>
              <h2 className="max-w-xl font-gaming text-4xl font-black leading-[1.05] sm:text-5xl">
                Let&apos;s <span className="text-primary-dark">Create</span>
                <br />
                <span className="text-primary-dark">Something</span> Amazing
              </h2>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                We&apos;re a passionate team of game developers, designers, and storytellers on a
                mission to craft unforgettable gaming experiences.
              </p>

              <div className="mt-7 space-y-4">
                {DETAILS.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300">
                    <i className={`fas ${item.icon} mt-1 w-4 text-primary`} />
                    <p className="whitespace-pre-line">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="rounded-lg border border-gray-300 bg-gray-100 px-4 py-3 text-xs text-gray-900 placeholder-gray-500 transition focus:border-primary focus:outline-none dark:border-gray-500 dark:bg-gray-800 dark:text-white dark:placeholder-gray-300 sm:focus:border-sky-500"
              />
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="rounded-lg border border-gray-300 bg-gray-100 px-4 py-3 text-xs text-gray-900 placeholder-gray-500 transition focus:border-primary focus:outline-none dark:border-gray-500 dark:bg-gray-800 dark:text-white dark:placeholder-gray-300"
              />
              <select
                name="country"
                required
                value={form.country}
                onChange={handleChange}
                className="rounded-lg border border-gray-300 bg-gray-100 px-4 py-3 text-xs text-gray-700 focus:border-primary focus:outline-none dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300"
              >
                <option value="">Country</option>
                <option value="United States">United States</option>
                <option value="Pakistan">Pakistan</option>
                <option value="United Kingdom">United Kingdom</option>
              </select>
              <input
                type="tel"
                name="phone"
                required
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="rounded-lg border border-gray-300 bg-gray-100 px-4 py-3 text-xs text-gray-900 placeholder-gray-500 transition focus:border-primary focus:outline-none dark:border-gray-500 dark:bg-gray-800 dark:text-white dark:placeholder-gray-300"
              />
              <textarea
                rows={6}
                name="message"
                required
                value={form.message}
                onChange={handleChange}
                placeholder="Your Message"
                className="resize-none rounded-lg border border-gray-300 bg-gray-100 px-4 py-3 text-xs text-gray-900 placeholder-gray-500 transition focus:border-primary focus:outline-none dark:border-gray-500 dark:bg-gray-800 dark:text-white dark:placeholder-gray-300 sm:col-span-2"
              />
              <button
                type="submit"
                className="btn-primary rounded-lg px-8 py-3 text-xs font-semibold text-white sm:col-span-2 sm:w-fit"
              >
                Send Message
              </button>
              {sent && (
                <p className="text-sm text-primary sm:col-span-2">
                  Thank you for your message! We&apos;ll get back to you soon.
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}