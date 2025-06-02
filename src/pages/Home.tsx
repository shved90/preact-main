import { useEffect, useState } from "preact/hooks";
import { gqlfetch } from "../utils/data";
import { Job, Blog, PageHeader as PageHeaderType } from "../../gql/graphql";
import { PreviewCard } from "../components/PreviewCard";
import { PageHeader } from "../components/PageHeader";
import { ThemeColors } from "../utils/ThemeColor";

interface HomeProps {
  pageColor: typeof ThemeColors[keyof typeof ThemeColors];
}

export default function Home({ pageColor }: HomeProps) {
  const [blog, setBlog] = useState<Blog[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [header, setHeader] = useState<PageHeaderType>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await gqlfetch(['latestBlogsAndJobs', 'PageHeader'], { PageHeader: { variable: "home" } });
      setBlog(data.latestBlogsAndJobs.blogCollection.items || []);
      setJobs(data.latestBlogsAndJobs.jobCollection.items || []);
      setHeader(data.PageHeader.pageHeaderCollection.items[0]);
      setLoading(false);
    })();
  }, []);

  return (
    <main>
      {header?.title ?
        <PageHeader title={header.title} content={header.description?.json} headerColor={pageColor} />
        : "loading"}

      <div class="h-full flex w-full justify-center items-center dark:bg-dark-700 mt-8">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div class="grid gap-8 grid-cols-1 sm:grid-cols-2 content-start justify-start">
            <section class="grid-col-1 grid gap-8 content-start">
              {jobs.map((job) => (
                <PreviewCard data={job} color={ThemeColors.orange} />
              ))}
            </section>
            <section class="grid-col-1 grid gap-8 content-start">
              {blog.map((blogPost) => (
                <PreviewCard data={blogPost} color={ThemeColors.blue} />
              ))}
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
