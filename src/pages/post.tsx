import { useEffect, useState } from 'preact/hooks';
import { gqlfetch } from '../utils/data';
//@ts-ignore
import RichText from '@madebyconnor/rich-text-to-jsx'

export default function Post(props: { url: string }) {
  console.log(props.url)

  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      const data = await gqlfetch(['post'], { post: { variable: props.url } });
      setPost(data.post.postCollection.items[0]);
      setLoading(false);
    }
    fetchPost();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!post) return <p>Post not found</p>;

  return (
    <div>
      <h1>{post.title}</h1>
      <img src={post.coverImage.url} alt={post.title} width={600} />
      <RichText richText={post.content.json} />
    </div>
  );
}
