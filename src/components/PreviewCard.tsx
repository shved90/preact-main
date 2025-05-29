import RichText from '@madebyconnor/rich-text-to-jsx'
import { Blog, Job } from '../../gql/graphql';
import { CardHeader } from './CardHeader';
import { INLINES } from '@contentful/rich-text-types';
import { Hyperlink } from './RichTextElems/Hyperlink';
import { ThemeColors } from '../utils/ThemeColor';

type PreviewCardProps = {
  data: Blog | Job
  color: typeof ThemeColors[keyof typeof ThemeColors];
}

const PreviewCard = ({ data, color }: PreviewCardProps) => {

  const content = (data as Blog).content?.json || (data as Job).shortSummary?.json

  return (
    <article class="border-1 border-dark-300 bg-dark-500 p-5">
      <CardHeader data={data} />
      <div class="mt-4">
        <RichText richText={content}
          overrides={{
            [INLINES.HYPERLINK]: {
              component: Hyperlink,
              props: {
                class: color.link
              }
            }
          }}
        />
      </div>
    </article>
  );
}

export { PreviewCard }