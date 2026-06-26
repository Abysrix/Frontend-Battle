"use client";

import { useCallback, useState } from "react";

/**
 * Drives both the desktop bento grid's "expanded cell" and the mobile
 * accordion's "open panel" from one state value. Because the bento grid and
 * the accordion are CSS reflows of the *same* mounted component tree (not
 * separately-mounted desktop/mobile variants), this state survives a resize
 * across breakpoints without any media-query listener.
 */
export function useActivePanel(initialId: string) {
  const [activeId, setActiveId] = useState(initialId);

  const toggle = useCallback((id: string) => {
    setActiveId((current) => (current === id ? current : id));
  }, []);

  return { activeId, toggle };
}
