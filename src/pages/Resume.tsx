import { useEffect, useState } from 'preact/hooks';
import { gqlfetch } from '../utils/data';
import { Blog, PageHeader as PageHeaderType } from '../../gql/graphql'
import { PreviewCard } from '../components/PreviewCard';
import { ThemeColors } from '../utils/ThemeColor';
import { PageHeader } from '../components/PageHeader';

interface BlogPostsProps {
  pageColor: typeof ThemeColors[keyof typeof ThemeColors];
}

export default function BlogPosts({pageColor}: BlogPostsProps) {

  const [JobList, setJobList] = useState<Blog[]>([]);
  const [header, setHeader] = useState<PageHeaderType>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJobList() {
      const data = await gqlfetch(['JobList', 'PageHeader'], { PageHeader: { variable: "resume" } });
      setJobList(data.JobList.jobCollection.items);
      setHeader(data.PageHeader.pageHeaderCollection.items[0]);
      setLoading(false);
    }
    fetchJobList();
  }, []);


  return (
    <>
      {header ?
        <PageHeader data={header} headerColor={pageColor} />
        : "loading"}
      {loading ? <p>Loading...</p> : (
        JobList.map(Job => (
          <PreviewCard data={Job} color={pageColor} />
        ))
      )}
    </>
  );
}
