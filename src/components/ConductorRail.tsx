import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

type Chapter = {
  step: number;
  title: string;
  id: string;
  /** Position along the story range, 0–1. */
  ratio: number;
};

/**
 * The conductor rail: a transmission line down the left margin that energizes as
 * the reader descends, with a node per chapter. It is the page's own metaphor
 * doing a job — reading position, chapter wayfinding, and jump-to-chapter — so it
 * earns its place rather than decorating.
 *
 * Below xl there is no clear margin to run it in, so the same progress reads as a
 * hairline across the top of the viewport.
 */
export function ConductorRail() {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [active, setActive] = useState(-1);
  const [engaged, setEngaged] = useState(false);
  const rangeRef = useRef({ start: 0, end: 1 });
  const reduceMotion = useReducedMotion();

  const progress = useMotionValue(0);
  const smoothed = useSpring(progress, { stiffness: 220, damping: 40, mass: 0.4 });
  const charge = reduceMotion ? progress : smoothed;
  const scaleY = useTransform(charge, (v) => v);
  const scaleX = useTransform(charge, (v) => v);

  const measure = useCallback(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-chapter]")
    );
    if (nodes.length === 0) return;

    const tops = nodes.map((n) => n.getBoundingClientRect().top + window.scrollY);
    const last = nodes[nodes.length - 1];
    const start = tops[0];
    const end =
      last.getBoundingClientRect().bottom + window.scrollY + last.offsetHeight;
    rangeRef.current = { start, end: Math.max(end, start + 1) };

    setChapters(
      nodes.map((node, i) => ({
        step: Number(node.dataset.chapter),
        title: node.dataset.chapterTitle ?? "",
        id: node.id,
        ratio: (tops[i] - start) / (rangeRef.current.end - start),
      }))
    );
  }, []);

  useEffect(() => {
    let frame = 0;

    const read = () => {
      frame = 0;
      const { start, end } = rangeRef.current;
      // The reading line sits a third down the viewport, where the eye actually is.
      const line = window.scrollY + window.innerHeight * 0.33;
      const p = Math.min(Math.max((line - start) / (end - start), 0), 1);
      progress.set(p);
      setEngaged(line > start - window.innerHeight * 0.25);

      let current = -1;
      const tops = Array.from(
        document.querySelectorAll<HTMLElement>("[data-chapter]")
      ).map((n) => n.getBoundingClientRect().top + window.scrollY);
      tops.forEach((top, i) => {
        if (line >= top - 8) current = i;
      });
      setActive(current);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(read);
    };

    measure();
    read();

    const onResize = () => {
      measure();
      onScroll();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    // Chart blocks mount lazily and change the document height under us.
    const observer = new ResizeObserver(() => {
      measure();
      onScroll();
    });
    observer.observe(document.body);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [measure, progress]);

  const jumpTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <>
      <nav
        aria-label="Chapters"
        className={`hidden xl:block fixed left-8 top-1/2 z-40 -translate-y-1/2 transition-opacity duration-500 ${
          engaged ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="relative h-[58vh] w-px bg-neutral-200 dark:bg-neutral-800">
          <motion.div
            style={{ scaleY }}
            className="absolute inset-x-0 top-0 h-full origin-top bg-accent"
          />
          {chapters.map((chapter, i) => {
            const passed = i <= active;
            return (
              <button
                key={chapter.id}
                type="button"
                onClick={() => jumpTo(chapter.id)}
                style={{ top: `${chapter.ratio * 100}%` }}
                aria-label={`Chapter ${String(chapter.step).padStart(2, "0")}: ${chapter.title}`}
                aria-current={i === active ? "true" : undefined}
                className="group absolute left-1/2 flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
              >
                <span
                  className={`h-1.5 w-1.5 rotate-45 border transition-all duration-300 ${
                    passed
                      ? "border-accent bg-accent"
                      : "border-neutral-300 bg-[var(--page-bg)] dark:border-neutral-700"
                  } ${i === active ? "scale-150" : "group-hover:scale-125"}`}
                />
                <span className="pointer-events-none absolute left-6 flex items-center gap-2 whitespace-nowrap rounded-md border border-neutral-200/70 bg-[var(--page-bg)] px-2.5 py-1 text-[11px] text-neutral-600 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 dark:border-neutral-800/70 dark:text-neutral-400">
                  <span className="font-mono text-accent">
                    {String(chapter.step).padStart(2, "0")}
                  </span>
                  {chapter.title}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      <div
        aria-hidden
        className={`fixed inset-x-0 top-0 z-40 h-px xl:hidden ${
          engaged ? "opacity-100" : "opacity-0"
        } transition-opacity duration-500`}
      >
        <motion.div
          style={{ scaleX }}
          className="h-full w-full origin-left bg-accent"
        />
      </div>
    </>
  );
}
