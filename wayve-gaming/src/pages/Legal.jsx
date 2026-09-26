import PageHero from '../components/PageHero';

const SECTIONS = [
  {
    heading: 'Introduction',
    accentFirst: true,          // whole heading orange
    body: [
      'Welcome to ',
      { link: 'www.waywegaming.com', href: 'https://www.waywegaming.com' },
      '. This Privacy Policy explains how WayWe Gaming ("we", "us", or "our") collects, uses, and protects information when you visit our website, play our games, or interact with our services.',
    ],
    paragraphs: [
      'By accessing or using any of our products, you agree to the collection and use of information in accordance with this policy. If you do not agree with any part of this policy, please discontinue use of our services.',
    ],
  },

  {
    heading: 'Use Of Personal Information',
    accentWord: 'Personal Information',   // last part orange
    body: [
      'At ',
      { link: 'www.waywegaming.com', href: 'https://www.waywegaming.com' },
      ', we use personal information to operate, maintain, and improve our games and services. This includes creating and managing accounts, processing in-game purchases, delivering customer support, and sending important service updates.',
    ],
    paragraphs: [
      'We do not sell, rent, or trade your personal information to third parties. Data may be shared with trusted service providers who assist us in operating our platform, provided they agree to keep your information confidential.',
      'You may request access to, correction of, or deletion of your personal data at any time by contacting us through the details listed below.',
    ],
  },

  {
    heading: 'Use Of Cookies',
    accentWord: 'Cookies',
    body: [
      'Our website uses cookies and similar tracking technologies to remember your preferences, understand how visitors interact with our pages, and improve your overall experience.',
    ],
    paragraphs: [
      'You can control or disable cookies through your browser settings at any time. Please note that disabling cookies may affect the functionality of certain features on our website and in our games.',
      'We may also use analytics tools such as Google Analytics to help us understand traffic patterns. These tools may collect information such as your IP address, browser type, and pages visited.',
    ],
  },
];
const CONTACT = {
  email: 'info@waywegaming.com',
  phone: '516-620-3535',
};

export default function Legal() {
  return (
    <div className="bg-white dark:bg-black">
      <PageHero
        imagePath="https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=2000&q=85"
        pageName="Privacy Policy"
        heading={<>Your <span className="text-primary-dark">Privacy</span> Matters</>}
        description="Learn how WayWe Gaming protects your information and the terms that guide the use of our games and services."
      />

       <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-gray-800 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-black sm:p-10">

        <section id="privacy">
          <div className="space-y-10">
            {SECTIONS.map((section) => (
              <div key={section.heading}>
                {/* ---------- Heading ---------- */}
                <h2 className="font-gaming text-2xl font-bold tracking-wide sm:text-3xl">
                  {section.accentFirst ? (
                    <span className="text-primary-dark">{section.heading}</span>
                  ) : (
                    <>
                      <span className="text-gray-900 dark:text-gray-100">
                        {section.heading.replace(section.accentWord, '').trim()}
                      </span>{' '}
                      <span className="text-primary-dark">{section.accentWord}</span>
                    </>
                  )}
                </h2>

                {/* ---------- Opening body ---------- */}
                <p className="mt-4 text-sm leading-7 text-gray-600 dark:text-gray-400">
                  {section.body.map((part, i) =>
                    typeof part === 'string' ? (
                      <span key={i}>{part}</span>
                    ) : (
                      <a
                        key={i}
                        href={part.href}
                        className="text-primary-dark underline underline-offset-2 transition  dark:text-primary-400 dark:hover:text-blue-300"
                      >
                        {part.link}
                      </a>
                    )
                  )}
                </p>

                {/* ---------- Additional paragraphs ---------- */}
                {section.paragraphs.map((para, i) => (
                  <p
                    key={i}
                    className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-400"
                  >
                    {para}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================
            CONTACT US
            ============================================================ */}
        <section className="mt-14 border-t border-gray-200 pt-8 dark:border-gray-800">
          <h2 className="font-gaming text-2xl font-bold tracking-wide sm:text-3xl">
            <span className="text-primary-dark">Contact</span>{' '}
            <span className="text-gray-900 dark:text-gray-100">Us</span>
          </h2>

          <p className="mt-4 text-sm leading-7 text-gray-600 dark:text-gray-400">
            For questions about this Privacy Policy, or to exercise any of your data rights, please
            contact us at{' '}
            <a
              href={`mailto:${CONTACT.email}`}
              className="text-primary-dark underline underline-offset-2 transition hover:text-primary-400 dark:text-primary-400 dark:hover:text-blue-300"
            >
              {CONTACT.email}
            </a>
            .
          </p>

          <p className="mt-6 font-semibold text-primary-dark">
            For questions about this Privacy Policy, please contact us at {CONTACT.phone}.
          </p>
        </section>

      </div>
    </main>
    </div>
  );
}
