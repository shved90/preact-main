import PageTransition from "../utils/PageTransition";
import { SideNav } from "../components/nav";

interface LayoutProps {
  children: preact.ComponentChildren;
  enableTransitions: boolean;
  toggleTransitions: () => void;
}

const Layout = ({ children, enableTransitions, toggleTransitions }: LayoutProps) => {
  return (
    <div class="grid grid-cols-12 gap-2 w-screen h-screen">
      <div class="col-span-3">
        <SideNav />
        <button onClick={toggleTransitions} class="mt-4 p-2 bg-gray-200 rounded">
          {enableTransitions ? "Disable Transitions" : "Enable Transitions"}
        </button>
      </div>

      <div class="col-span-9 bg-dark-700">
        <PageTransition enabled={enableTransitions}>{children}</PageTransition>
      </div>
    </div>
  );
};

export {Layout};
