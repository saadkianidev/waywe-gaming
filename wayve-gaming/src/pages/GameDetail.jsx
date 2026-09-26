import CallToAction from '../components/CallToAction';
import Reveal from '../components/Reveal';
import catalog from '../data/games.json';
import PageHero from '../components/PageHero';

export default function GameDetail({ slug }) {
  const game = catalog.games.find((item) => item.slug === slug);

  if (!game) {
    return (
      <section className="bg-white px-6 py-32 text-center dark:bg-black">
        <h1 className="font-gaming text-4xl text-gray-900 dark:text-white">Game Not Found</h1>
        <a href="/games" className="btn-primary mt-6 inline-flex rounded-lg px-5 py-3 text-xs font-semibold text-white">
          Back to Games
        </a>
      </section>
    );
  }

  return (
    <div className="bg-white dark:bg-black">
        <PageHero
            imagePath="https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=2000&q=85"
            pageName="Our Games"
            heading={<>World-Class <span className="text-primary">Games</span> Built to Play</>}
            description="Explore the worlds, systems, and stories our studio is building for players everywhere."
        />
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-10 sm:px-10 lg:px-12">
       {/* ================= STORE BUTTONS ================= */}
        <div className="flex flex-wrap items-center gap-6 pb-10">
            <a href="#" className="inline-flex items-center gap-3  transition hover:opacity-80">
                <i className="fab fa-google-play text-3xl text-green-400" />
                <span className="text-left text-[11px] leading-tight">
                GET IT ON<br />
                <strong className="text-lg font-semibold">Google Play</strong>
                </span>
            </a>
            <a href="#" className="inline-flex items-center gap-3  transition hover:opacity-80">
                <i className="fab fa-apple text-4xl" />
                <span className="text-left text-[11px] leading-tight">
                Download on the<br />
                <strong className="text-lg font-semibold">App Store</strong>
                </span>
            </a>
        </div>

        {/* ================= 3-COLUMN GRID ================= */}
        <div className="grid gap-10 lg:grid-cols-[1.05fr_1fr_1.35fr]">

        {/* ---------- Left: game image ---------- */}
        <Reveal>
            <img
            src={game.image}
            alt={game.title}
            className="h-full min-h-72 w-full rounded-xl border border-primary object-cover"
            />
        </Reveal>

        {/* ---------- Middle: game info ---------- */}
        <Reveal delay={120}>
            <div className="space-y-6">
            {/* Developer */}
            <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-primary bg-transparent">
                <i className="fas fa-code text-sm text-primary" />
                </div>
                <div>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">Developer</p>
                <p className="mt-1 text-sm text-gray-800 dark:text-gray-200">WayWe Studio</p>
                </div>
            </div>

            {/* Publisher */}
            <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-primary bg-transparent">
                <i className="fas fa-building text-sm text-primary" />
                </div>
                <div>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">Publisher</p>
                <p className="mt-1 text-sm text-gray-800 dark:text-gray-200">WayWe Gaming</p>
                </div>
            </div>

            {/* Release Date */}
            <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-primary bg-transparent">
                <i className="fas fa-calendar text-sm text-primary" />
                </div>
                <div>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">Release Date</p>
                <p className="mt-1 text-sm text-gray-800 dark:text-gray-200">{game.requirements.release}</p>
                </div>
            </div>

            {/* Platforms — shows icons instead of text */}
            <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-primary bg-transparent">
                <i className="fas fa-gamepad text-sm text-primary" />
                </div>
                <div>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">Platforms</p>
                <div className="mt-2 flex items-center gap-2">
                    {/* Replace with your actual platform icons */}
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500">
                    <i className="fab fa-windows text-[10px] " />
                    </span>
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500">
                    <i className="fab fa-apple text-[10px] " />
                    </span>
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500">
                    <i className="fab fa-android text-[10px] " />
                    </span>
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500">
                    <i className="fas fa-gamepad text-[10px] " />
                    </span>
                </div>
                </div>
            </div>
            </div>
        </Reveal>

        {/* ---------- Right: About This Game ---------- */}
        <Reveal delay={220}>
            <div>
            <h2 className="font-gaming text-3xl font-bold tracking-wide  sm:text-4xl">
                <span className="text-primary">About</span> This Game
            </h2>

            <p className="mt-5 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                {game.description} We're a passionate team of game developers, designers, and
                storytellers on a mission to craft unforgettable gaming experiences. From concept
                to launch, every pixel and mechanic is built with heart, precision, and play in
                mind.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
                {['Single Player', 'Online Co-op', 'PVP'].map((mode) => (
                <span
                    key={mode}
                    className="rounded-md border border-gray-300 bg-gray-100 px-5 py-2 text-xs text-gray-700 transition hover:border-primary hover:bg-primary/10 dark:border-gray-600 dark:bg-gray-900/80 dark:text-gray-200"
                >
                    {mode}
                </span>
                ))}
            </div>
            </div>
        </Reveal>

        </div>

        {/* game screen shot */}
        {/* ============================================================
    GAME SCREENSHOTS
    ============================================================ */}
<Reveal>
  <h2 className="mt-16 font-gaming text-3xl font-bold tracking-wide text-gray-900 dark:text-gray-100 sm:text-4xl">
    Game <span className="text-primary">Screenshots</span>
  </h2>
  <p className="mt-3 max-w-xl text-sm text-gray-600 dark:text-gray-400">
    Take a closer look at the world, characters and actions.
  </p>
</Reveal>

<div className="mt-6 grid gap-4 lg:grid-cols-[1.05fr_2fr]">
  {/* Large hero screenshot */}
  <Reveal>
    <img
      src={game.screenshots[0]}
      alt={`${game.title} screenshot 1`}
      className="h-72 w-full rounded-xl border-2 border-primary object-cover lg:h-full"
    />
  </Reveal>

  {/* 2×2 grid of smaller screenshots */}
  <div className="grid grid-cols-2 gap-4">
    {game.screenshots.slice(1, 5).map((image, index) => (
      <Reveal key={image} delay={(index + 1) * 80}>
        <img
          src={image}
          alt={`${game.title} screenshot ${index + 2}`}
          className="h-32 w-full rounded-xl border border-primary/70 object-cover transition duration-300 hover:border-primary sm:h-36 lg:h-[8.5rem]"
        />
      </Reveal>
    ))}
  </div>
</div>


{/* ============================================================
    KEY FEATURES
    ============================================================ */}
<Reveal>
  <h2 className="mt-16 font-gaming text-3xl font-bold tracking-wide text-gray-900 dark:text-gray-100 sm:text-4xl">
    Key <span className="text-primary">Features</span>
  </h2>
</Reveal>

<div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
  {game.features.map((feature, index) => (
    <Reveal key={feature.title} delay={index * 80}>
      <div className="h-full rounded-xl border border-primary/70 bg-white p-5 transition duration-300 hover:border-primary hover:shadow-[0_15px_40px_-20px_rgba(249,115,22,0.5)] dark:bg-gray-950">
        {/* Icon */}
        <div className="flex h-10 w-10 items-center justify-center">
          <i className="fas fa-gamepad text-2xl text-gray-800 dark:text-gray-200" />
        </div>

        {/* Title */}
        <h3 className="mt-4 font-gaming text-base font-semibold text-gray-900 dark:text-gray-100">
          {feature.title}
        </h3>

        {/* Description */}
        <p className="mt-2 text-xs leading-relaxed text-gray-600 dark:text-gray-400">
          {feature.description}
        </p>
      </div>
    </Reveal>
  ))}
</div>


{/* ============================================================
    DEVICE REQUIREMENTS
    ============================================================ */}
<Reveal>
  <h2 className="mt-16 font-gaming text-3xl font-bold tracking-wide text-gray-900 dark:text-gray-100 sm:text-4xl">
    Device <span className="text-primary">Requirements</span>
  </h2>
</Reveal>

<div className="mt-6 grid gap-6 md:grid-cols-2">
  {[
    { key: 'minimum',     title: 'Minimum Requirements',     icon: 'fa-gamepad' },
    { key: 'recommended', title: 'Recommended Requirements', icon: 'fa-gamepad' },
  ].map(({ key, title, icon }) => (
    <Reveal key={key}>
      <div className="h-full rounded-xl border border-primary/70 bg-white p-6 transition duration-300 hover:border-primary dark:bg-gray-950">

        {/* Card header */}
        <div className="flex items-center gap-3 border-b border-gray-200 pb-4 dark:border-gray-800">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-primary/70">
            <i className={`fas ${icon} text-sm text-primary`} />
          </span>
          <h3 className="font-gaming text-base font-semibold text-gray-900 dark:text-gray-100">
            {title}
          </h3>
        </div>

        {/* Spec rows */}
        <dl className="mt-5 space-y-3 text-sm">
          {[
            ['OS',        game.requirements[key].os],
            ['Processor', game.requirements[key].processor],
            ['Memory',    game.requirements[key].memory],
            ['Graphics',  game.requirements[key].graphics],
            ['Storage',   game.requirements[key].storage],
          ].map(([label, value]) => (
            <div key={label} className="grid grid-cols-[100px_1fr] gap-3">
              <dt className="text-gray-500 dark:text-gray-400">{label}</dt>
              <dd className="text-gray-800 dark:text-gray-200">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Reveal>
  ))}
</div>

      </section>

      <CallToAction
        imagePath={game.image}
        heading={<>Want to build a world like <span className="text-primary">{game.title}?</span></>}
        description="Talk to our studio about your next game experience."
        buttonLabel="Get Consultation"
        buttonHref="/#contact"
      />
    </div>
  );
}
