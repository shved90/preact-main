import { useEffect, useState } from "preact/hooks";
import { gqlfetch } from "../utils/data";
import { Post, Job, PageHeader as PageHeaderType } from "../../gql/graphql";
import { PreviewCard } from "../components/PreviewCard";
import { PageHeader } from "../components/PageHeader";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [header, setHeader] = useState<PageHeaderType>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await gqlfetch(['latestPostsAndJobs', 'PageHeader'], {PageHeader: {variable: "home"}});
      setPosts(data.latestPostsAndJobs.postCollection.items || []);
      setJobs(data.latestPostsAndJobs.jobCollection.items || []);
      setLoading(false);
      setHeader(data.PageHeader.pageHeaderCollection.items);
    })();
  }, []);
  

  return (
    <main>
      <PageHeader data={header} />
      <div class="h-full flex w-full justify-center items-center dark:bg-gray-800 p-2">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div class="grid gap-8 grid-cols-1 sm:grid-cols-2 content-start justify-start p-6">
            <section class="grid-col-1 grid gap-5 content-start">
              {jobs.map((job) => (
                <PreviewCard data={job} />
              ))}
            </section>
            <section class="grid-col-1 grid gap-5 content-start">
              {posts.map((post) => (
                <PreviewCard data={post} />
              ))}
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
