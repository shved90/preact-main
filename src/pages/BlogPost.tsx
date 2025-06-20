import { useEffect, useState } from 'preact/hooks';
import { gqlfetch } from '../utils/data';
import { Blog } from '../../gql/graphql';
import RichText from '@madebyconnor/rich-text-to-jsx'
import { INLINES } from '@contentful/rich-text-types';
import { Hyperlink } from '../components/RichTextElems/Hyperlink';
import { ThemeColors } from '../utils/ThemeColor';
import { PageHeader } from '../components/PageHeader';
import { dateFormat } from '../utils/utils';

interface BlogPostProps {
  url: string
  pageColor: typeof ThemeColors[keyof typeof ThemeColors];
}

export default function BlogPost({ url, pageColor }: BlogPostProps) {

  const [BlogPost, setBlogPost] = useState<Blog>();
  const [loading, setLoading] = useState(true);

  const PublishedDate = dateFormat({ date: BlogPost?.sys?.firstPublishedAt })
  const EditDate = dateFormat({ date: BlogPost?.sys?.publishedAt, isPubDate: true })

  useEffect(() => {
    async function fetchBlogPost() {
      const data = await gqlfetch(['BlogPost'], { BlogPost: { variable: url } });
      setBlogPost(data.BlogPost.blogCollection.items[0]);
      setLoading(false);
    }
    fetchBlogPost();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!BlogPost) return <p>Post not found</p>;

  return (
    <article>
      {BlogPost.title && <PageHeader title={BlogPost.title} headerColor={pageColor} />}
      <p class='mt-2 mb-12 font-bold'>Published on {PublishedDate} | Edited on {EditDate}</p>
      <section class="richTextStyling">
        <RichText
          richText={BlogPost.content?.json}
          overrides={{
            [INLINES.HYPERLINK]: {
              component: Hyperlink,
              props: {
                class: pageColor.link
              }
            }
          }}
        />
      </section>
    </article>
  );
}
