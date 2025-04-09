import { lazy, LocationProvider, ErrorBoundary, Router, Route } from "preact-iso";
import { Layout } from "./components/Layout";
import { useState } from "preact/hooks";
import "./app.css";

// Lazy load pages for better performance
const Home = lazy(() => import("./pages/home"));
const Posts = lazy(() => import("./pages/posts"));
const Post = lazy(() => import("./pages/post"));


export function App() {
  const [enableTransitions, setEnableTransitions] = useState(true);

  return (
    <LocationProvider>
        <ErrorBoundary onError={(e) => console.error("Error:", e)}>
          <Layout enableTransitions={enableTransitions} toggleTransitions={() => setEnableTransitions((prev) => !prev)}>
            <Router>
              <Route path="/" component={Home} />
              <Route path="/posts" component={Posts} />
              <Route path="/post/:url" component={(props) => <Post url={props.path.split('/').pop() as string} />} />
            </Router>
          </Layout>
        </ErrorBoundary>
    </LocationProvider>
  );
}
