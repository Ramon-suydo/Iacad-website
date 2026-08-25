"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [stage, setStage] = useState<"idle" | "exiting" | "entering">("idle");
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setStage("exiting");

    const exitTimeout = setTimeout(() => {
      setDisplayChildren(children);
      setStage("entering");

      // Let the browser paint the "entering" starting state before animating in
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setStage("idle");
        });
      });
    }, 220);

    return () => clearTimeout(exitTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const stageClasses = {
    idle: "opacity-100 translate-y-0",
    exiting: "opacity-0 -translate-y-1",
    entering: "opacity-0 translate-y-1",
  };

  return (
    <div
      className={`transition-all duration-300 ease-out ${stageClasses[stage]}`}
    >
      {displayChildren}
    </div>
  );
}