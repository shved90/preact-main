//@ts-ignore
import RichText from '@madebyconnor/rich-text-to-jsx'
import { Post, Job } from '../../gql/graphql';
import { CardHeader } from './CardHeader';

type PreviewCardProps = {data: Post | Job}

const PreviewCard = ({data}: PreviewCardProps) => {
  
  const content = (data as Post).content?.json || (data as Job).shortSummary?.json
  
  
  return(
    <article class="border-1 border-dark-300 bg-dark-500 p-5">
      <CardHeader data={data} />
      <div class="mt-4">
        <RichText richText={content} />
      </div>
    </article>
  );
}

export { PreviewCard }