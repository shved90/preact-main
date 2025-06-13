import { useEffect, useState } from 'preact/hooks';
import { gqlfetch } from '../utils/data';
import { Job } from '../../gql/graphql';
import RichText from '@madebyconnor/rich-text-to-jsx'
import { INLINES } from '@contentful/rich-text-types';
import { Hyperlink } from '../components/RichTextElems/Hyperlink';
import { ThemeColors } from '../utils/ThemeColor';
import { PageHeader } from '../components/PageHeader';
import { dateFormat } from '../utils/utils';
import { Tags } from '../components/Tags';
interface JobPostProps {
  url: string
  pageColor: typeof ThemeColors[keyof typeof ThemeColors];
}

export default function JobPost({ url, pageColor }: JobPostProps) {

  const [JobPost, setJobPost] = useState<Job>();
  const [loading, setLoading] = useState(true);

  const startDate = dateFormat({ date: JobPost?.startDate, isPubDate: true, hideDay: true })
  const endDate = dateFormat({ date: JobPost?.endDate, hideDay: true })

  useEffect(() => {
    async function fetchJobPost() {
      const data = await gqlfetch(['Job'], { Job: { variable: url } });
      setJobPost(data.Job.jobCollection.items[0]);
      setLoading(false);
    }
    fetchJobPost();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!JobPost) return <p>Post not found</p>;
  console.log(JobPost)
  return (
    <article>
      {JobPost.companyName && <PageHeader title={JobPost.companyName} content={JobPost.strapline} headerColor={pageColor} />}

      <section class="richTextStyling">
        
        <p><span class='inline-block w-20'>Role:</span> {JobPost.role}</p>
        <p><span class='inline-block w-20'>Period:</span> {startDate} - {endDate}</p>
        <p><span class='inline-block w-20'>Website:</span> <a href={JobPost.companyUrl!} target="_blank" rel="noopener noreferrer" class={pageColor.link}>{JobPost.companyUrl}</a></p>
        <p class='mb-8'><span class='inline-block w-20'>Location:</span> {JobPost.location}</p>

        <RichText
          richText={JobPost.description?.json}
          overrides={{
            [INLINES.HYPERLINK]: {
              component: Hyperlink,
              props: {
                class: pageColor.link
              }
            }
          }}
        />

        <div class="mt-12">
          {JobPost.contentfulMetadata.tags.length ? <Tags data={JobPost.contentfulMetadata} tagColor={pageColor} /> : null}
        </div>
      </section>
    </article>
  );
}
