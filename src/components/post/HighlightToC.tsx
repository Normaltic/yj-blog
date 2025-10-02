"use client";

import { useEffect, useRef, useState } from "react";

export interface HighlightToCProps {
  className?: string;
  headings: { text: string; level: number; id: string }[];
}

const TOP_OFFSET = 400;

function HighlightToC({ className, headings }: HighlightToCProps) {
  const headingOffsetTopList = useRef<Array<{ id: string; top: number }>>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const offsetTopList = headings
      .map(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return null;
        return { id, top: el.offsetTop };
      })
      .filter((v) => v !== null);
    headingOffsetTopList.current = offsetTopList.sort((a, b) => a.top - b.top);
  }, [headings]);

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target instanceof HTMLElement && entry.isIntersecting) {
          const { id, offsetTop } = entry.target;
          const existHeader = headingOffsetTopList.current.find(
            (v) => v.id === id
          );

          if (!existHeader) return;

          existHeader.top = offsetTop;
          headingOffsetTopList.current.sort((a, b) => a.top - b.top);
        }
      });
    });

    headings
      .map(({ id }) => document.getElementById(id))
      .filter((el) => el !== null)
      .forEach((el) => intersectionObserver.observe(el));

    return () => intersectionObserver.disconnect();
  }, [headings]);

  useEffect(() => {
    const handleScroll = () => {
      const targetY = window.scrollY + TOP_OFFSET;
      const activeHeading = headingOffsetTopList.current.findLast(
        (heading) => heading.top < targetY
      );
      setActiveId(activeHeading ? activeHeading.id : "");
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const minLevel = Math.min(...headings.map((heading) => heading.level));

  return (
    <nav className={className}>
      <ul className="flex flex-col gap-2 text-sm">
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{
              paddingLeft: `${(heading.level - minLevel) * 0.75}rem`
            }}
          >
            <a
              href={`#${heading.id}`}
              data-active={activeId === heading.id}
              className="text-foreground/70 dark:text-foreground/50 hover:text-foreground data-[active='true']:text-foreground linear-transition-colors"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default HighlightToC;
