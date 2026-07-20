/** Signature SVG: power · hardware · compute → AI core → money */
export function PressMachine() {
  return (
    <div className="press-machine" aria-label="Power, hardware, and compute into an AI machine that prints money">
      <svg viewBox="0 0 520 172" fill="none" role="img">
        <defs>
          <linearGradient id="pf" gradientUnits="userSpaceOnUse" x1="108" y1="0" x2="394" y2="0">
            <stop offset="0%" stopColor="#4ecf7a" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#4ecf7a" stopOpacity="0.95" />
          </linearGradient>
        </defs>

        {/* inputs */}
        <g className="pm-in">
          <rect className="pm-box" x="8" y="12" width="100" height="36" rx="6" stroke="currentColor" strokeOpacity="0.2" />
          <path d="M58 20 L50 32 H60 L52 44" stroke="#c9923a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <text x="58" y="62" textAnchor="middle" fill="currentColor" fillOpacity="0.45" fontSize="10" fontFamily="ui-monospace,monospace" letterSpacing="0.14em">POWER</text>

          <rect x="8" y="72" width="100" height="36" rx="6" stroke="currentColor" strokeOpacity="0.2" />
          <rect x="40" y="82" width="36" height="16" rx="2" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.4" />
          <path d="M46 88h6M54 88h6M62 88h6" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.2" />
          <text x="58" y="122" textAnchor="middle" fill="currentColor" fillOpacity="0.45" fontSize="10" fontFamily="ui-monospace,monospace" letterSpacing="0.1em">HARDWARE</text>

          <rect x="8" y="132" width="100" height="20" rx="6" stroke="currentColor" strokeOpacity="0.2" />
          <circle cx="44" cy="142" r="3.5" stroke="#4ecf7a" strokeOpacity="0.8" />
          <circle cx="58" cy="142" r="3.5" stroke="#4ecf7a" strokeOpacity="0.8" />
          <circle cx="72" cy="142" r="3.5" stroke="#4ecf7a" strokeOpacity="0.8" />
        </g>
        <text x="58" y="158" textAnchor="middle" fill="currentColor" fillOpacity="0.45" fontSize="10" fontFamily="ui-monospace,monospace" letterSpacing="0.12em">COMPUTE</text>

        {/* flows */}
        <path className="pm-flow" d="M108 30 H160" stroke="url(#pf)" strokeWidth="1.4" />
        <path className="pm-flow" d="M108 90 H160" stroke="url(#pf)" strokeWidth="1.4" />
        <path className="pm-flow" d="M108 142 H160" stroke="url(#pf)" strokeWidth="1.4" />
        <path d="M160 30 V142" stroke="#4ecf7a" strokeOpacity="0.25" strokeWidth="1.3" />
        <path className="pm-flow" d="M160 86 H210" stroke="url(#pf)" strokeWidth="1.6" />

        {/* core */}
        <rect className="pm-core" x="210" y="52" width="130" height="68" rx="8" fill="rgba(78,207,122,0.07)" stroke="#4ecf7a" strokeWidth="1.6" />
        <text x="275" y="82" textAnchor="middle" fill="#f0eee6" fontSize="16" fontFamily="ui-monospace,monospace" letterSpacing="0.28em" fontWeight="600">AI</text>
        <text x="275" y="102" textAnchor="middle" fill="#4ecf7a" fontSize="11" fontFamily="ui-monospace,monospace" letterSpacing="0.32em">PRESS</text>

        {/* out */}
        <path className="pm-flow" d="M340 86 H390" stroke="url(#pf)" strokeWidth="1.6" />
        <path d="M382 78 L394 86 L382 94" stroke="#4ecf7a" strokeWidth="1.6" fill="none" />
        <rect className="pm-out" x="398" y="58" width="110" height="56" rx="8" fill="rgba(78,207,122,0.1)" stroke="#4ecf7a" strokeWidth="1.6" />
        <text x="453" y="84" textAnchor="middle" fill="#4ecf7a" fontSize="22" fontFamily="ui-monospace,monospace" fontWeight="700">$</text>
        <text x="453" y="102" textAnchor="middle" fill="#f0eee6" fontSize="11" fontFamily="ui-monospace,monospace" letterSpacing="0.28em">MONEY</text>
      </svg>
    </div>
  );
}
