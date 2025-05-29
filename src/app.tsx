import { lazy, LocationProvider, ErrorBoundary, Router, Route } from "preact-iso";
import { Layout } from "./components/Layout";
import { useState } from "preact/hooks";
import "./app.css";
import { ThemeColors } from "./utils/ThemeColor.tsx";

// Lazy load pages for better performance
const Home = lazy(() => import("./pages/Home"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost.tsx"));
const Resume = lazy(() => import("./pages/Resume"));
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
              <Route path="/resume" component={Resume} pageColor={ThemeColors.orange} />
              <Route path="/contact" component={Contact} pageColor={ThemeColors.purple} />
              <Route default component={NotFound} />
            </Router>
          </Layout>
        </ErrorBoundary>
    </LocationProvider>
  );
}
