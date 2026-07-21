/** Signature SVG: power · hardware · compute → AI PRESS → money */
export function PressMachine() {
  return (
    <div className="press-machine" aria-label="Power, hardware, and compute into an AI machine that prints money">
      <svg viewBox="0 0 600 220" fill="none" role="img" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="pf" gradientUnits="userSpaceOnUse" x1="168" y1="0" x2="472" y2="0">
            <stop offset="0%" stopColor="#4ecf7a" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#4ecf7a" stopOpacity="0.95" />
          </linearGradient>
        </defs>

        {/* inputs — 3 equal tiles, icon + label on one row */}
        <g className="pm-in">
          {/* POWER */}
          <rect x="18" y="20" width="150" height="48" rx="8" fill="#101216" stroke="currentColor" strokeOpacity="0.18" />
          <path d="M46 33 L38 46 H45 L41 55" stroke="#c9923a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <text x="74" y="48" fill="currentColor" fillOpacity="0.5" fontSize="11" fontFamily="ui-monospace,monospace" letterSpacing="0.16em">POWER</text>

          {/* HARDWARE */}
          <rect x="18" y="86" width="150" height="48" rx="8" fill="#101216" stroke="currentColor" strokeOpacity="0.18" />
          <rect x="33" y="102" width="26" height="16" rx="2.5" stroke="currentColor" strokeOpacity="0.55" strokeWidth="1.4" />
          <path d="M39 110h3M45 110h3M51 110h3" stroke="currentColor" strokeOpacity="0.55" strokeWidth="1.3" />
          <text x="74" y="114" fill="currentColor" fillOpacity="0.5" fontSize="11" fontFamily="ui-monospace,monospace" letterSpacing="0.12em">HARDWARE</text>

          {/* COMPUTE */}
          <rect x="18" y="152" width="150" height="48" rx="8" fill="#101216" stroke="currentColor" strokeOpacity="0.18" />
          <circle cx="38" cy="176" r="3.6" stroke="#4ecf7a" strokeOpacity="0.85" />
          <circle cx="49" cy="176" r="3.6" stroke="#4ecf7a" strokeOpacity="0.85" />
          <circle cx="60" cy="176" r="3.6" stroke="#4ecf7a" strokeOpacity="0.85" />
          <text x="74" y="180" fill="currentColor" fillOpacity="0.5" fontSize="11" fontFamily="ui-monospace,monospace" letterSpacing="0.14em">COMPUTE</text>
        </g>

        {/* bus: tiles → vertical collector → core */}
        <path className="pm-flow" d="M168 44 H230" stroke="url(#pf)" strokeWidth="1.4" />
        <path className="pm-flow" d="M168 110 H230" stroke="url(#pf)" strokeWidth="1.4" />
        <path className="pm-flow" d="M168 176 H230" stroke="url(#pf)" strokeWidth="1.4" />
        <path d="M230 44 V176" stroke="#4ecf7a" strokeOpacity="0.28" strokeWidth="1.3" />
        <path className="pm-flow" d="M230 110 H270" stroke="url(#pf)" strokeWidth="1.6" />

        {/* core */}
        <rect className="pm-core" x="270" y="68" width="150" height="84" rx="10" fill="rgba(78,207,122,0.07)" stroke="#4ecf7a" strokeWidth="1.6" />
        <text x="345" y="106" textAnchor="middle" fill="#f0eee6" fontSize="17" fontFamily="ui-monospace,monospace" letterSpacing="0.3em" fontWeight="600">AI</text>
        <text x="345" y="128" textAnchor="middle" fill="#4ecf7a" fontSize="11" fontFamily="ui-monospace,monospace" letterSpacing="0.34em">PRESS</text>

        {/* output */}
        <path className="pm-flow" d="M420 110 H462" stroke="url(#pf)" strokeWidth="1.6" />
        <path d="M456 101 L469 110 L456 119" stroke="#4ecf7a" strokeWidth="1.7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <rect className="pm-out" x="472" y="74" width="110" height="72" rx="10" fill="rgba(78,207,122,0.1)" stroke="#4ecf7a" strokeWidth="1.6" />
        <text x="527" y="110" textAnchor="middle" fill="#4ecf7a" fontSize="22" fontFamily="ui-monospace,monospace" fontWeight="700">$</text>
        <text x="527" y="130" textAnchor="middle" fill="#f0eee6" fontSize="11" fontFamily="ui-monospace,monospace" letterSpacing="0.28em">MONEY</text>
      </svg>
    </div>
  );
}
