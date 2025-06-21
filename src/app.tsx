import { lazy, LocationProvider, ErrorBoundary, Router, Route } from "preact-iso";
import { Layout } from "./components/Layout";
import { useState } from "preact/hooks";
import { ThemeColors } from "./utils/ThemeColor.tsx";
import { ProjectRoutes } from "./routes/ProjectRoutes.tsx";
import "./app.css";

const Home = lazy(() => import("./pages/Home"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost.tsx"));
const Projects = lazy(() => import("./pages/Projects"));
const Resume = lazy(() => import("./pages/Resume"));
const JobPost = lazy(() => import("./pages/JobPost"));
const Contact = lazy(() => import("./pages/Contact.tsx"));
const NotFound = lazy(() => import('./pages/404'));

export function App() {
  const [enableTransitions, setEnableTransitions] = useState(true);

  return (
    <LocationProvider>
      <ErrorBoundary onError={(e) => console.error("Error:", e)}>
        <Layout enableTransitions={enableTransitions} toggleTransitions={() => setEnableTransitions((prev) => !prev)}>
          <Router>
            <Route path="/" component={Home} pageColor={ThemeColors.green} />
            <Route path="/blog" component={Blog} pageColor={ThemeColors.blue} />
            <Route path="/blog/:url" component={(props) => <BlogPost url={props.path.split('/').pop() as string} pageColor={ThemeColors.blue} />} />
            <Route path="/projects" component={Projects} pageColor={ThemeColors.purple} />
            {ProjectRoutes.map(({ path, component, pageColor }) => (
              <Route path={path} component={component} pageColor={pageColor} />
            ))}
            <Route path="/resume" component={Resume} pageColor={ThemeColors.orange} />
            <Route path="/resume/:url" component={(props) => <JobPost url={props.path.split('/').pop() as string} pageColor={ThemeColors.orange} />} />
            <Route path="/contact" component={Contact} pageColor={ThemeColors.teal} />
            <Route default component={NotFound} />
          </Router>
        </Layout>
      </ErrorBoundary>
    </LocationProvider>
  );
}
