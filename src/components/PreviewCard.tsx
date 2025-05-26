//@ts-ignore
import RichText from '@madebyconnor/rich-text-to-jsx'
import { Blog, Job } from '../../gql/graphql';
import { CardHeader } from './CardHeader';
import { INLINES } from '@contentful/rich-text-types';
import { Hyperlink } from './RichTextElems/Hyperlink';

type PreviewCardProps = {data: Blog | Job}

const PreviewCard = ({data}: PreviewCardProps) => {
  
  const content = (data as Blog).content?.json || (data as Job).shortSummary?.json
  
  return(
    <article class="border-1 border-dark-300 bg-dark-500 p-5">
      <CardHeader data={data} />
      <div class="mt-4">
        <RichText richText={content}
        overrides={{
          [INLINES.HYPERLINK]: {
            component: Hyperlink,
            props: {
              class: (data as Blog) ? 'text-blue' : 'text-orange'
            }
          }
        }}
       />
      </div>
    </article>
  );
}

export { PreviewCard }