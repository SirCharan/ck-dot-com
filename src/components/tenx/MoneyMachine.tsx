/**
 * Minimal machine: electricity · hardware · compute → AI → money.
 * Low detail, cool.
 */
export function MoneyMachine({ className = "" }: { className?: string }) {
  return (
    <figure
      className={`tx-machine ${className}`}
      aria-label="Electricity, hardware, and compute go into an AI machine; money comes out"
    >
      <div className="tx-machine-flow">
        <div className="tx-machine-inputs">
          <div className="tx-machine-node">
            <span className="tx-machine-glyph" aria-hidden>
              ⚡
            </span>
            <span className="tx-mono">power</span>
          </div>
          <div className="tx-machine-node">
            <span className="tx-machine-glyph tx-machine-chip-icon" aria-hidden />
            <span className="tx-mono">hardware</span>
          </div>
          <div className="tx-machine-node">
            <span className="tx-machine-glyph tx-machine-dots" aria-hidden>
              <i />
              <i />
              <i />
            </span>
            <span className="tx-mono">compute</span>
          </div>
        </div>

        <div className="tx-machine-join" aria-hidden>
          <span className="tx-machine-rail" />
        </div>

        <div className="tx-machine-core">
          <span className="tx-mono tx-machine-core-ai">AI</span>
          <span className="tx-mono tx-machine-core-sub">MACHINE</span>
        </div>

        <div className="tx-machine-arrow" aria-hidden>
          →
        </div>

        <div className="tx-machine-out">
          <span className="tx-machine-dollar" aria-hidden>
            $
          </span>
          <span className="tx-mono">money</span>
        </div>
      </div>
    </figure>
  );
}
