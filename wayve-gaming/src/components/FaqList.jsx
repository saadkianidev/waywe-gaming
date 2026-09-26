import { useState } from 'react';

export default function FaqList({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-white px-6 py-16 text-gray-900 dark:bg-black dark:text-white sm:px-10 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <h2 className="font-gaming text-3xl text-gray-900 dark:text-white sm:text-4xl">
          <span className="text-primary">Frequently</span> Answer Questions
        </h2>
        <p className="mt-3 max-w-4xl text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          We&apos;re a passionate team of game developers, designers, and storytellers on a mission
          to craft unforgettable gaming experiences. From concept to launch, every pixel and
          mechanic is built with heart, precision, and play in mind.
        </p>

        <div className="mt-7 space-y-4">
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.question}
                className={`overflow-hidden rounded-xl border transition ${
                  isOpen
                    ? 'border-primary bg-orange-50 dark:bg-gray-900'
                    : 'border-gray-300 bg-white dark:border-gray-600 dark:bg-black'
                }`}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-gray-800 dark:text-gray-200"
                >
                  <span>{item.question}</span>
                  <span className="text-xl font-normal text-gray-900 dark:text-white">{isOpen ? '-' : '+'}</span>
                </button>
                {isOpen && (
                  <p className="border-t border-gray-200 px-5 py-4 text-xs leading-relaxed text-gray-600 dark:border-gray-700 dark:text-gray-400">
                    {item.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
