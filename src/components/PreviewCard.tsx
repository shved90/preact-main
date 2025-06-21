import RichText from '@madebyconnor/rich-text-to-jsx'
import { Blog, Job, Projects } from '../../gql/graphql';
import { CardHeader } from './CardHeader';
import { INLINES } from '@contentful/rich-text-types';
import { Hyperlink } from './RichTextElems/Hyperlink';
import { ThemeColors } from '../utils/ThemeColor';
import { Tags } from './Tags';

type PreviewCardProps = {
  data: Blog | Job | Projects
  color: typeof ThemeColors[keyof typeof ThemeColors];
}

const PreviewCard = ({ data, color }: PreviewCardProps) => {

  const content = 'summary' in data
  ? data.summary?.json
  : 'shortSummary' in data
    ? data.shortSummary?.json
    : null;


  return (
    <article class="border-1 dark:border-border-primary dark:bg-background-secondary bg-background-primary p-5">
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
        {data.contentfulMetadata.tags.length &&
          <div class='mt-4'>
            <Tags data={data.contentfulMetadata} tagColor={color} />
          </div>
        }
      </div>
    </article>
  );
}

export { PreviewCard }