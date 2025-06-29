import { useEffect, useState } from 'preact/hooks';
import { gqlfetch } from '../utils/Data';
import { Job, PageHeader as PageHeaderType } from '../../gql/graphql'
import { PreviewCard } from '../components/PreviewCard';
import { ThemeColors } from '../utils/ThemeColor';
import { PageHeader } from '../components/PageHeader';
import { MetaTags } from '../utils/MetaTags';

interface JobListProps {
  pageColor: typeof ThemeColors[keyof typeof ThemeColors];
}

export default function JobList({ pageColor }: JobListProps) {

  const [JobList, setJobList] = useState<Job[]>([]);
  const [header, setHeader] = useState<PageHeaderType>();
  const [loading, setLoading] = useState(true);

  MetaTags({ headerData: header })

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
    <main>
      {header?.title ?
        <PageHeader title={header.title} content={header.description!} headerColor={pageColor} />
        : "loading"}

      {loading ? <p>Loading...</p> : (
        <section class='grid grid-col-1 gap-8 content-start mt-8'>
          {JobList.map(Job => (
            <PreviewCard data={Job} color={pageColor} />
          ))}
        </section>
      )}
    </main>
  );
}
