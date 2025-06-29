import { useEffect, useState } from 'preact/hooks';
import { gqlfetch } from '../utils/Data';
import { Blog, PageHeader as PageHeaderType } from '../../gql/graphql'
import { PreviewCard } from '../components/PreviewCard';
import { ThemeColors } from '../utils/ThemeColor';
import { PageHeader } from '../components/PageHeader';
import { MetaTags } from '../utils/MetaTags';

interface BlogPostsProps {
  pageColor: typeof ThemeColors[keyof typeof ThemeColors];
}

export default function BlogPosts({ pageColor }: BlogPostsProps) {

  const [Blog, setBlog] = useState<Blog[]>([]);
  const [header, setHeader] = useState<PageHeaderType>();
  const [loading, setLoading] = useState(true);

  MetaTags({ headerData: header })

  useEffect(() => {
    async function fetchBlogPosts() {
      const data = await gqlfetch(['Blog', 'PageHeader'], { PageHeader: { variable: "blog" } });
      setBlog(data.Blog.blogCollection.items);
      setHeader(data.PageHeader.pageHeaderCollection.items[0]);
      setLoading(false);
    }
    fetchBlogPosts();
  }, []);

  return (
    <main>
      {header?.title ?
        <PageHeader title={header.title} content={header.description!} headerColor={pageColor} />
        : "loading"}

      {loading ? <p>Loading...</p> : (
        <section class='grid grid-col-1 gap-8 content-start mt-8'>
          {Blog.map(BlogPost => (
            <PreviewCard data={BlogPost} color={pageColor} />
          ))}
        </section>
      )}
    </main>
  );
}
