"use client";

import { useEffect, useRef, useState } from "react";

export function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(media.matches);

    const handler = (event: MediaQueryListEvent) => {
      setReducedMotion(event.matches);
    };

    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  return reducedMotion;
}

export function useReveal() {
  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const elements = document.querySelectorAll(".reveal");

    if (reducedMotion) {
      elements.forEach((element) => element.classList.add("in"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

export function useNavSpy(sectionIds: readonly string[]) {
  useEffect(() => {
    const links = [...document.querySelectorAll<HTMLAnchorElement>("nav a")];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            links.forEach((link) => {
              link.classList.toggle(
                "active",
                link.getAttribute("href") === `#${entry.target.id}`,
              );
            });
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [sectionIds]);
}

export function useCycleChartAnimation(reducedMotion: boolean) {
  const pathRef = useRef<SVGPathElement>(null);
  const headRef = useRef<SVGCircleElement>(null);
  const [liveState, setLiveState] = useState("En proceso");
  const [readout, setReadout] = useState({
    temp: "20 °C",
    bar: "0.0 bar",
    time: "00:00",
  });

  useEffect(() => {
    const path = pathRef.current;
    const head = headRef.current;
    if (!path || !head) return;

    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = reducedMotion ? "0" : `${length}`;

    const yToTemp = (y: number) => 20 + ((212 - y) * 114) / 172;
    const tempToBar = (temp: number) => Math.max(0, ((temp - 100) * 2.1) / 34);

    const updateReadout = (progress: number) => {
      const point = path.getPointAtLength(length * progress);
      const temp = yToTemp(point.y);

      head.setAttribute("cx", String(point.x));
      head.setAttribute("cy", String(point.y));

      const seconds = Math.round(progress * 34 * 60);
      const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
      const secs = String(seconds % 60).padStart(2, "0");

      setReadout({
        temp: `${temp.toFixed(0)} °C`,
        bar: `${tempToBar(temp).toFixed(1)} bar`,
        time: `${minutes}:${secs}`,
      });
    };

    if (reducedMotion) {
      updateReadout(1);
      setReadout({ temp: "134 °C", bar: "2.1 bar", time: "34:00" });
      setLiveState("Ciclo conforme");
      return;
    }

    const duration = 3800;
    let startTime: number | null = null;

    const frame = (timestamp: number) => {
      if (!startTime) startTime = timestamp;

      const rawProgress = Math.min(1, (timestamp - startTime) / duration);
      const eased =
        rawProgress < 0.5
          ? 2 * rawProgress * rawProgress
          : 1 - Math.pow(-2 * rawProgress + 2, 2) / 2;

      path.style.strokeDashoffset = `${length * (1 - eased)}`;
      updateReadout(eased);

      if (rawProgress < 1) {
        requestAnimationFrame(frame);
      } else {
        setLiveState("Ciclo conforme");
        setReadout({ temp: "134 °C", bar: "2.1 bar", time: "34:00" });
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            requestAnimationFrame(frame);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 },
    );

    observer.observe(path.closest("svg")!);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return { pathRef, headRef, liveState, readout };
}

export function useTraceLabelLink() {
  useEffect(() => {
    const link = (key: string, active: boolean) => {
      document
        .querySelectorAll(`.f[data-k="${key}"]`)
        .forEach((element) => element.classList.toggle("hot", active));
      document
        .querySelectorAll(`.tl li[data-k="${key}"]`)
        .forEach((element) => element.classList.toggle("hot", active));
    };

    const elements = document.querySelectorAll(".f[data-k], .tl li[data-k]");
    const handlers: Array<{ element: Element; enter: () => void; leave: () => void }> =
      [];

    elements.forEach((element) => {
      const key = (element as HTMLElement).dataset.k;
      if (!key) return;

      const enter = () => link(key, true);
      const leave = () => link(key, false);

      element.addEventListener("pointerenter", enter);
      element.addEventListener("pointerleave", leave);
      handlers.push({ element, enter, leave });
    });

    return () => {
      handlers.forEach(({ element, enter, leave }) => {
        element.removeEventListener("pointerenter", enter);
        element.removeEventListener("pointerleave", leave);
      });
    };
  }, []);
}

export function generateBarcodeWidths(seed = 7, count = 46) {
  let state = seed;
  const rnd = () => {
    state = (state * 1103515245 + 12345) % 2147483648;
    return state / 2147483648;
  };

  return Array.from({ length: count }, () => (rnd() > 0.62 ? 3 : 1.5));
}

export function generateDataMatrix(seed = 7) {
  let state = seed;
  const rnd = () => {
    state = (state * 1103515245 + 12345) % 2147483648;
    return state / 2147483648;
  };

  return Array.from({ length: 144 }, (_, index) => {
    const row = Math.floor(index / 12);
    const col = index % 12;
    return col === 0 || row === 11 || (row === 0 || col === 11 ? index % 2 === 0 : rnd() > 0.5);
  });
}
