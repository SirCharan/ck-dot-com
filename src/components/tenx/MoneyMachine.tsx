/**
 * Signature artifact: power · hardware · compute → AI → money.
 * Anti-slop: no emoji, no glow soup, no fake window chrome.
 */
export function MoneyMachine({ className = "" }: { className?: string }) {
  return (
    <figure
      className={`tx-machine ${className}`}
      aria-label="Power, hardware, and compute go into an AI machine; money comes out"
    >
      <div className="tx-machine-row">
        <div className="tx-machine-ins">
          <div className="tx-m-node">
            <span className="tx-m-bolt" aria-hidden />
            <span className="tx-mono">power</span>
          </div>
          <div className="tx-m-node">
            <span className="tx-m-chip" aria-hidden />
            <span className="tx-mono">hardware</span>
          </div>
          <div className="tx-m-node">
            <span className="tx-m-dots" aria-hidden>
              <i />
              <i />
              <i />
            </span>
            <span className="tx-mono">compute</span>
          </div>
        </div>
        <div className="tx-m-rail" aria-hidden />
        <div className="tx-m-core">
          <span className="tx-mono tx-m-core-t">AI</span>
          <span className="tx-mono tx-m-core-s">MACHINE</span>
        </div>
        <div className="tx-m-arrow" aria-hidden>
          →
        </div>
        <div className="tx-m-out">
          <span className="tx-m-dollar">$</span>
          <span className="tx-mono">money</span>
        </div>
      </div>
    </figure>
  );
}
