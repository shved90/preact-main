import { useState, useEffect } from "preact/hooks";
import { useLocation } from "preact-iso";

interface PageTransitionProps {
  children: preact.ComponentChildren;
  enabled: boolean; // Toggle transitions
}

const PageTransition = ({ children, enabled }: PageTransitionProps) => {
  const location = useLocation();
  const [currentChildren, setCurrentChildren] = useState(children);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (enabled) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentChildren(children);
        setIsTransitioning(false);
      }, 300); // Matches Tailwind transition duration
    } else {
      setCurrentChildren(children); // Instant switch when disabled
    }
  }, [location, children, enabled]);

  return (
    <div
      class={`w-full transition-transform duration-300 ${
        enabled && isTransitioning ? "translate-x-full opacity-0" : "translate-x-0 opacity-100"
      }`}
    >
      {currentChildren}
    </div>
  );
};

export default PageTransition;
