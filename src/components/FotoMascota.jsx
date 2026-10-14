function FotoMascota({ src, alt, className }) {
  if (src) {
    return <img className={className} src={src} alt={alt} />;
  }

  return (
    <span className={`${className} foto-placeholder`} role="img" aria-label={alt}>
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8.2 10.3c-1.3 0-2.4 1.4-2.4 3.1 0 1.4.8 2.4 1.9 2.4.8 0 1.4-.6 2.1-.6s1.3.6 2.1.6c1.1 0 1.9-1 1.9-2.4 0-1.7-1.1-3.1-2.4-3.1-.8 0-1.2.5-1.6.5s-.8-.5-1.6-.5Z" />
        <ellipse cx="5.3" cy="7.4" rx="1.3" ry="1.8" transform="rotate(-25 5.3 7.4)" />
        <ellipse cx="9" cy="5.7" rx="1.3" ry="1.8" />
        <ellipse cx="12.7" cy="7.4" rx="1.3" ry="1.8" transform="rotate(25 12.7 7.4)" />
      </svg>
    </span>
  );
}

export default FotoMascota;
