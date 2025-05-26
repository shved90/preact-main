import { lazy, LocationProvider, ErrorBoundary, Router, Route } from "preact-iso";
import { Layout } from "./components/Layout";
import { useState } from "preact/hooks";
import "./app.css";

// Lazy load pages for better performance
const Home = lazy(() => import("./pages/home"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost.tsx"));
const Contact = lazy(() => import("./pages/contact"));
const NotFound = lazy(() => import('./pages/404'));

export function App() {
  const [enableTransitions, setEnableTransitions] = useState(true);

  return (
    <LocationProvider>
        <ErrorBoundary onError={(e) => console.error("Error:", e)}>
          <Layout enableTransitions={enableTransitions} toggleTransitions={() => setEnableTransitions((prev) => !prev)}>
            <Router>
              <Route path="/" component={Home} />
              <Route path="/blog" component={Blog} />
              <Route path="/blog/:url" component={(props) => <BlogPost url={props.path.split('/').pop() as string} />} />
              <Route path="/contact" component={Contact} />
              <Route default component={NotFound} />

            </Router>
          </Layout>
        </ErrorBoundary>
    </LocationProvider>
  );
}
