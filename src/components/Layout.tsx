import PageTransition from "../utils/PageTransition";
import { Navigation } from "./Navigation";

interface LayoutProps {
  children: preact.ComponentChildren;
  enableTransitions: boolean;
  toggleTransitions: () => void;
}
//@ts-ignore
const Layout = ({ children, enableTransitions, toggleTransitions }: LayoutProps) => {

  const mobile = {
    wrapper: '',
    nav: 'relative w-inherit h-inherit',
    main: ''
  }
  const desktop = {
    wrapper: 'md:grid md:grid-flow-row grid-rows-12',
    nav: 'md:row-span-1',
    main: 'md:row-span-11 p-6'
  }
  const extraWide = {
    wrapper: '2xl:grid 2xl:grid-rows-none 2xl:grid-flow-col 2xl:grid-cols-12',
    nav: '2xl:col-span-3',
    main: '2xl:col-span-9 p-8'
  }

  return (
    <div class={`${mobile.wrapper} ${desktop.wrapper} ${extraWide.wrapper} w-screen h-screen`}>
      <div class={`${mobile.nav} ${desktop.nav} ${extraWide.nav}`}>
        <Navigation />
        {/* <button onClick={toggleTransitions} class="mt-4 p-2 bg-gray-200 rounded">
          {enableTransitions ? "Disable Transitions" : "Enable Transitions"}
        </button> */}
      </div>

      <div class={`${mobile.main} ${desktop.main} ${extraWide.main} bg-dark-700`}>
        <PageTransition enabled={enableTransitions}>{children}</PageTransition>
      </div>
    </div>
  );
};

export { Layout };
