export default function Logo({ size = 48, variant = 'navbar' }) {
  const width = variant === 'footer' ? size * 2.4 : size * 2.7;

  return (
    <>
      <img
        src="/heroimage/black-logo.png"
        alt="Wayve Gaming"
        width={width}
        height={size}
        className="h-auto dark:hidden"
        style={{ width: `${width}px` }}
        draggable="false"
      />
      <img
        src="/heroimage/logo.png"
        alt=""
        aria-hidden="true"
        width={width}
        height={size}
        className="hidden h-auto dark:block"
        style={{ width: `${width}px` }}
        draggable="false"
      />
    </>
  );
}