import { useEffect, useState } from 'preact/hooks';
import { gqlfetch } from '../utils/data';
import { Blog } from '../../gql/graphql'
import { PreviewCard } from '../components/PreviewCard';

export default function BlogPosts() {
  const [Blog, setBlog] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogPosts() {
      const data = await gqlfetch('Blog');
      setBlog(data.Blog.blogCollection.items);
      setLoading(false);
    }
    fetchBlogPosts();
  }, []);


  return (
    <>
      <h1>Blog</h1>
      {loading ? <p>Loading...</p> : (
        Blog.map(BlogPost => (
          <PreviewCard data={BlogPost} />
        ))
      )}
    </>
  );
}
