import CallToAction from '../components/CallToAction';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import catalog from '../data/games.json';

export default function Games() {
  return (
    <div className="bg-white dark:bg-black">
        <PageHero
            imagePath="https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=2000&q=85"
            pageName="Our Games"
            heading={<>World-Class <span className="text-primary">Games</span> Built to Play</>}
            description="Explore the worlds, systems, and stories our studio is building for players everywhere."
        />
        <section className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-12">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {catalog.games.map((game, index) => (
                <Reveal key={game.slug} delay={index * 80}>
                    <article className="group overflow-hidden rounded-2xl border border-primary/80 bg-black transition duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-[0_20px_50px_-20px_rgba(249,115,22,0.45)]">
                    
                    {/* ---------- Image ---------- */}
                    <div className="relative h-44 overflow-hidden sm:h-48 border border-primary/80">
                        <img
                        src={game.image}
                        alt={game.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                        {/* subtle gradient so the image blends into the card */}
                        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/90 to-transparent" />
                    </div>

                    {/* ---------- Body ---------- */}
                    <div className="flex flex-col p-5">
                        <h2 className="font-gaming text-xl font-semibold tracking-wide text-white">
                        {game.title}
                        </h2>

                        {/* tags row: Action · RPG · Multiplayer */}
                        <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-gray-400">
                        {game.tags.map((tag, i) => (
                            <span key={tag} className="inline-flex items-center gap-2">
                            {tag}
                            {i < game.tags.length - 1 && (
                                <span className="text-gray-600">·</span>
                            )}
                            </span>
                        ))}
                        </div>

                        {/* ---------- View Details button ---------- */}
                        <a
                        href={`/games/${game.slug}`}
                        className="mt-6 inline-flex w-fit items-center gap-2 rounded-md border border-gray-600 bg-transparent px-4 py-2 text-xs font-medium text-white transition duration-300 hover:border-primary hover:bg-primary/10"
                        >
                        View Details
                        <i className="fas fa-arrow-right text-[10px] transition-transform duration-300 group-hover:translate-x-1" />
                        </a>
                    </div>
                    </article>
                </Reveal>
                ))}
            </div>
        </section>

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
