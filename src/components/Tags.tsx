import { ContentfulMetadata } from '../../gql/graphql';
import { ThemeColors } from "../utils/ThemeColor";

interface TagsProps {
  data: ContentfulMetadata
  tagColor: typeof ThemeColors[keyof typeof ThemeColors];
}

const Tags = ({ data, tagColor }: TagsProps) => {

  const tagsStyling = `px-2 py-1 border-2 ${tagColor.background.static} ${tagColor.border} text-white dark:${tagColor.border} dark:bg-transparent dark:text-text-primary font-bold text-sm rounded-lg  list-none m-0`

  return (
    <aside>
      <ul class='flex flex-wrap gap-2 m-0'>
        {data.tags.map(tag => (
          <li class={`${tagsStyling}`}>{tag?.name}</li>
        ))}
      </ul>
    </aside>
  )
}

export { Tags }