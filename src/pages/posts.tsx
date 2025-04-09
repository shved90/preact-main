import { useEffect, useState } from 'preact/hooks';
import { gqlfetch } from '../utils/data';
import { useLocation } from 'preact-iso'
import {Post} from '../../gql/graphql'

export default function Posts() {
  const [post, setPost] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    async function fetchPost() {
      const data = await gqlfetch('posts');
      setPost(data.posts.postCollection.items);
      setLoading(false);
    }
    fetchPost();
  }, []);

console.log(post)

  return (
<>
        <h1>Blog</h1>
        {loading ? <p>Loading...</p> : (
          post.map(post => (
            <div key={post.slug}>
              <h2>
                <a href={`/post/${post.slug}`} onClick={() => console.log(location, post)}>
                  {post.title}
                </a>
              </h2>
              
              {post.coverImage && <img src={post.coverImage.url!} alt={post.title!} width={400} />}
            </div>
          ))
        )}
        </>
  );
}
