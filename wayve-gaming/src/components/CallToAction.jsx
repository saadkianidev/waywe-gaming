export default function CallToAction({
  imagePath,
  heading,
  description,
  buttonLabel,
  buttonHref = '#contact',
}) {
  return (
    <section
      className="relative overflow-hidden bg-cover bg-center px-6 py-10 sm:px-10 lg:px-12"
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(0, 0, 0, .8), rgba(0, 0, 0, .3)), url('${imagePath}')`,
      }}
    >
      <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-gaming text-3xl leading-tight text-white sm:text-4xl">{heading}</h2>
          <p className="mt-3 max-w-3xl text-xs leading-relaxed text-gray-300">{description}</p>
        </div>
        <a
          href={buttonHref}
          className="btn-primary shrink-0 rounded-lg px-6 py-3 text-xs font-semibold text-white"
        >
          {buttonLabel}
        </a>
      </div>
    </section>
  );
}
