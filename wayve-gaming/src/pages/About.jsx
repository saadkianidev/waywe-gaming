import Reveal from '../components/Reveal';
import PageHero from '../components/PageHero';
import CallToAction from '../components/CallToAction';
import FaqList from '../components/FaqList';

const FAQ_ITEMS = [
  {
    question: 'Do You Work With Startups Or Only Established Businesses?',
    answer:
      'We work with ambitious teams at every stage. From concept to launch, we shape the right gaming experience, product strategy, and delivery plan for each partner.',
  },
  {
    question: 'What Services Do You Provide?',
    answer:
      'Our team supports game development, design, live operations, cloud infrastructure, and custom software development.',
  },
  {
    question: 'How Do You Approach A New Project?',
    answer:
      'We start by understanding the product, audience, and goals, then turn that insight into a clear, measurable delivery plan.',
  },
  {
    question: 'How Long Does A Project Take?',
    answer:
      'Timelines depend on scope and complexity. We define milestones early and keep communication clear throughout delivery.',
  },
];

export default function About() {
const metrics = [
  { number: '80%',  label: 'Visibility Growth' },
  { number: '100%', label: 'Client Satisfaction' },
  { number: '3x',   label: 'Faster Delivery' },
  { number: '24/7', label: 'Support Coverage' },
];

  return (
    <div className="bg-white text-gray-900 dark:bg-black dark:text-white">
      <PageHero
        imagePath="https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=2000&q=85"
        pageName="About Us"
        heading={<>World-Class Poker,<br />Casino &amp; Sports Games</>}
        description="Empowering organizations with secure cloud infrastructure, AI-driven innovation, cybersecurity, and custom software development. Empowering organizations with secure cloud infrastructure."
      />

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-12 sm:px-10 lg:grid-cols-[1.15fr_1fr] lg:px-12">
        <Reveal>
          <div>
            <h2 className="font-gaming text-3xl text-gray-900 dark:text-white sm:text-4xl">
              Who <span className="text-primary">We Are</span>
            </h2>
            <p className="mt-3 max-w-xl text-[16px] leading-relaxed text-gray-600 dark:text-gray-100">
              We&apos;re a passionate team of game developers, designers, and storytellers on a
              mission to craft unforgettable gaming experiences. From concept to launch, every
              pixel and mechanic is built with heart, precision, and play in mind. We bring
              imagination and technology together to create games that players remember.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-4">
            {metrics.map((metric, index) => (
                <Reveal key={`${metric.label}-${index}`} delay={index * 80}>
                <div
                    className={`flex min-h-20 flex-col items-center justify-center rounded-xl border border-gray-600 text-center ${
                    index === 1
                      ? 'border-primary bg-orange-50 dark:bg-gray-900'
                      : 'bg-white dark:bg-black'
                    }`}
                >
                    <strong className="text-xl text-gray-800 dark:text-gray-200">{metric.number}</strong>
                    <span className="mt-2 text-[15px] text-gray-600 dark:text-gray-300">{metric.label}</span>
                </div>
                </Reveal>
            ))}
            </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16 sm:px-10 lg:px-12">
        <Reveal>
          <h2 className="font-gaming text-3xl text-gray-900 dark:text-white sm:text-4xl">
            Our <span className="text-primary">Mission</span>
          </h2>
          <p className="mt-3 text-[16px] leading-relaxed text-gray-600 dark:text-gray-100">
            We&apos;re a passionate team of game developers, designers, and storytellers on a
            mission to craft unforgettable gaming experiences. From concept to launch, every
            pixel and mechanic is built with heart, precision, and play in mind. We&apos;re here to
            make ambitious ideas playable, polished, and meaningful.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16 sm:px-10 lg:px-12">
        <Reveal>
          <div className="text-center">
            <h2 className="font-gaming text-3xl text-gray-900 dark:text-white sm:text-4xl">
              What Makes Us <span className="text-primary">Different</span>
            </h2>
            <p className="mx-auto mt-3 max-w-3xl text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              We&apos;re a passionate team of game developers, designers, and storytellers on a
              mission to craft unforgettable gaming experiences. From concept to launch, every
              pixel and mechanic is built with heart, precision, and play in mind.
            </p>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_1fr]">
          <Reveal>
            <img
              src="https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=1000&q=85"
              alt="Game characters in a futuristic scene"
              className="h-full min-h-80 w-full rounded-xl border border-primary object-cover"
            />
          </Reveal>

          <div className="space-y-4">
            {['Business Partnership', 'Business Partnership', 'Business Partnership', 'Business Partnership'].map(
              (title, index) => (
                <Reveal key={`${title}-${index}`} delay={index * 80}>
                  <div className="rounded-xl border border-gray-300 bg-gray-50 p-4 transition hover:border-primary dark:border-gray-600 dark:bg-gray-950">
                    <h3 className="font-gaming text-sm text-gray-900 dark:text-white">
                      <span className="mr-3 text-primary">✓</span>
                      {title.split(' ')[0]} <span className="text-primary">{title.split(' ').slice(1).join(' ')}</span>
                    </h3>
                    <p className="mt-2 pl-7 text-xs leading-relaxed text-gray-600 dark:text-gray-400">
                      We&apos;re a passionate team of game developers, designers, and storytellers
                      on a mission to craft unforgettable gaming experiences. From concept to
                      launch.
                    </p>
                  </div>
                </Reveal>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 pb-20 sm:px-10 lg:grid-cols-[1fr_1.1fr] lg:px-12">
        <Reveal>
          <div>
            <h2 className="max-w-lg font-gaming text-3xl leading-tight text-gray-900 dark:text-white sm:text-4xl">
              Why Our Clients Stay <span className="text-primary">for Years</span>
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              We&apos;re a passionate team of game developers, designers, and storytellers on a
              mission to craft unforgettable gaming experiences. From concept to launch, every
              pixel and mechanic is built with heart, precision, and play in mind.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {['Growth-Focused Execution', 'Growth-Focused Execution', 'Growth-Focused Execution', 'Growth-Focused Execution', 'Growth-Focused Execution', 'Growth-Focused Execution'].map(
            (label, index) => (
              <Reveal key={`${label}-${index}`} delay={index * 60}>
                <div className={`flex items-center gap-3 rounded-lg border px-3 py-3 text-xs text-gray-800 dark:text-gray-200 ${index === 1 ? 'border-primary bg-orange-50 dark:bg-gray-900' : 'border-gray-300 bg-white dark:border-gray-600 dark:bg-black'}`}>
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] text-white">
                    01
                  </span>
                  {label}
                </div>
              </Reveal>
            ),
          )}
        </div>
      </section>

      <CallToAction
        imagePath="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=2000&q=85"
        heading={<>Ready to Join the <span className="text-primary">mission?</span></>}
        description="Empowering organizations with secure cloud infrastructure, AI-driven innovation, cybersecurity, and custom software development."
        buttonLabel="Get Consultation"
        buttonHref="/#contact"
      />

      <FaqList items={FAQ_ITEMS} />
    </div>
  );
}
