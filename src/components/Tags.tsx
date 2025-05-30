import { ContentfulMetadata } from '../../gql/graphql';
import { ThemeColors } from "../utils/ThemeColor";

interface TagsProps {
  data: ContentfulMetadata
  tagColor: typeof ThemeColors[keyof typeof ThemeColors];
}

const Tags = ({ data, tagColor }: TagsProps) => {

  const tagsStyling = 'px-2 py-1 border-1 text-sm border-solid rounded-lg'

  return (
    <aside class='mt-4 flex flex-wrap gap-2'>
      {data.tags.map(tag => (
        <span class={`${tagsStyling} ${tagColor.text}`}>{tag?.name}</span>
      ))}
    </aside>
  )
}

export { Tags }