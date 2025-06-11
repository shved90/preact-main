import { FunctionalComponent } from 'preact';
import { lazy } from 'preact-iso';
import { ThemeColors } from '../utils/ThemeColor';

interface ProjectRouteProps {
    path: string;
    component: FunctionalComponent<any>;
    pageColor: typeof ThemeColors[keyof typeof ThemeColors];
}

const InterestCalculator = lazy(() => import('../pages/projects/InterestCalculator'));
const ReactLoginDemo = lazy(() => import('../pages/projects/ReactLoginDemo'));

export const ProjectRoutes: ProjectRouteProps[] = [
    {
        path: '/projects/interest-calculator',
        component: InterestCalculator,
        pageColor: ThemeColors.purple
    },
    {
        path: '/projects/react-login-demo',
        component: ReactLoginDemo,
        pageColor: ThemeColors.purple
    },
];
