import { useEffect, useState } from "preact/hooks";
import { gqlfetch } from "../utils/Data";
import { Blog, Projects, PageHeader as PageHeaderType } from "../../gql/graphql";
import { PreviewCard } from "../components/PreviewCard";
import { PageHeader } from "../components/PageHeader";
import { ThemeColors } from "../utils/ThemeColor";
import { MetaTags } from "../utils/MetaTags";

interface HomeProps {
  pageColor: typeof ThemeColors[keyof typeof ThemeColors];
}

export default function Home({ pageColor }: HomeProps) {
  const [projects, setProjects] = useState<Projects[]>([]);
  const [blog, setBlog] = useState<Blog[]>([]);
  const [header, setHeader] = useState<PageHeaderType>();
  const [loading, setLoading] = useState(true);

  MetaTags({ headerData: header })

  useEffect(() => {
    (async () => {
      const data = await gqlfetch(['latestProjectsAndBlog', 'PageHeader'], { PageHeader: { variable: "home" } });
      setProjects(data.latestProjectsAndBlog.projectsCollection.items || []);
      setBlog(data.latestProjectsAndBlog.blogCollection.items || []);
      setHeader(data.PageHeader.pageHeaderCollection.items[0]);
      setLoading(false);
    })();
  }, []);

  return (
    <main>
      {header?.title ?
        <PageHeader title={header.title} content={header.description!} headerColor={pageColor} />
        : "loading"}

      <div class="h-full flex w-full justify-center items-center mt-8">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div class="grid gap-8 grid-cols-1 sm:grid-cols-2 content-start justify-start">
            <section class="grid-col-1 grid gap-8 content-start">
              {blog.map((blogPost) => (
                <PreviewCard data={blogPost} color={ThemeColors.blue} />
              ))}
            </section>
            <section class="grid-col-1 grid gap-8 content-start">
              {projects.length ?
                projects.map((project) => (
                  <PreviewCard data={project} color={ThemeColors.purple} />
                ))
                :
                "No Projects yet, watch this space."
              }
              { }
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
