import { Blog, Job, Projects } from '../../gql/graphql';
import { CardHeader } from './CardHeader';
import { ThemeColors } from '../utils/ThemeColor';
import { Tags } from './Tags';

type PreviewCardProps = {
  data: Blog | Job | Projects
  color: typeof ThemeColors[keyof typeof ThemeColors];
}

const PreviewCard = ({ data, color }: PreviewCardProps) => {

  return (
    <article class="border-1 dark:border-border-primary dark:bg-background-secondary bg-background-primary p-5">
      <CardHeader data={data} />
      <div class="mt-4">
        <p>{data.summary}</p>
        {data.contentfulMetadata.tags &&
          <div class='mt-4'>
            <Tags data={data.contentfulMetadata} tagColor={color} />
          </div>
        }
      </div>
    </article>
  );
}

export { PreviewCard }