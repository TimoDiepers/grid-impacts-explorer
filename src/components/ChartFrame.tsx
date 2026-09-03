import { Component, Suspense, type ReactNode } from "react";
import { RefreshCw, Unplug } from "lucide-react";

/**
 * Every chart is a lazily loaded chunk. Two things can go wrong on a static host:
 * the chunk is slow (nothing to look at, and the page reflows when it lands), or
 * the chunk never arrives — offline, or a stale hash after a redeploy — in which
 * case an unhandled rejection would take the whole page down with it.
 *
 * ChartFrame reserves the chart's height, shows what is happening while it loads,
 * and contains a failure to the one card it belongs to.
 *
 * Recovery is a page reload, not an in-place retry: React.lazy caches a rejected
 * import for the lifetime of the module, so remounting the boundary can never
 * re-fetch the chunk. A reload also picks up fresh asset hashes, which is the
 * actual fix when a redeploy left this page pointing at chunks that are gone.
 */

type BoundaryProps = { children: ReactNode; fallback: ReactNode };
type BoundaryState = { failed: boolean };

class ChartErrorBoundary extends Component<BoundaryProps, BoundaryState> {
  state: BoundaryState = { failed: false };

  static getDerivedStateFromError(): BoundaryState {
    return { failed: true };
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

function ChartSkeleton({ label }: { label: string }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex h-full w-full flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-neutral-200/70 dark:border-neutral-800/70"
    >
      <span className="h-1 w-24 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
        <span className="block h-full w-1/3 animate-[chartLoad_1.4s_ease-in-out_infinite] rounded-full bg-accent" />
      </span>
      <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-neutral-400 dark:text-neutral-600">
        Loading {label}
      </span>
    </div>
  );
}

function ChartFailure({ label }: { label: string }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-neutral-200/70 px-6 text-center dark:border-neutral-800/70">
      <Unplug className="h-5 w-5 text-neutral-400 dark:text-neutral-600" />
      <p className="max-w-xs text-sm text-neutral-500">
        The {label} could not be loaded. The rest of the page is unaffected — the
        figures behind it are in the paper.
      </p>
      <button
        type="button"
        onClick={() => window.location.reload()}
        className="inline-flex items-center gap-1.5 rounded-md border border-neutral-300 px-3 py-1.5 text-xs font-medium text-neutral-600 transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
      >
        <RefreshCw className="h-3.5 w-3.5" />
        Reload the page
      </button>
    </div>
  );
}

export function ChartFrame({
  label,
  className,
  children,
}: {
  /** Named in the loading and failure copy, e.g. "component breakdown". */
  label: string;
  /** Reserves the chart's height so a slow chunk cannot reflow the page. */
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <ChartErrorBoundary fallback={<ChartFailure label={label} />}>
        <Suspense fallback={<ChartSkeleton label={label} />}>{children}</Suspense>
      </ChartErrorBoundary>
    </div>
  );
}
