import { useEffect, useState } from 'preact/hooks';
import { gqlfetch } from '../utils/data';
import { Blog } from '../../gql/graphql';
import RichText from '@madebyconnor/rich-text-to-jsx'
import { INLINES } from '@contentful/rich-text-types';
import { Hyperlink } from '../components/RichTextElems/Hyperlink';

export default function BlogPost(props: { url: string }) {
  console.log(props.url)

  const [BlogPost, setBlogPost] = useState<Blog>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogPost() {
      const data = await gqlfetch(['BlogPost'], { BlogPost: { variable: props.url } });
      setBlogPost(data.BlogPost.blogCollection.items[0]);
      setLoading(false);
    }
    fetchBlogPost();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!BlogPost) return <p>Post not found</p>;

  return (
    <div>
      <h1>{BlogPost.title}</h1>
      <RichText
        richText={BlogPost.content?.json}
        overrides={{
          [INLINES.HYPERLINK]: {
            component: Hyperlink,
            props: {
              class: 'text-blue'
            }
          }
        }}
      />
    </div>
  );
}
