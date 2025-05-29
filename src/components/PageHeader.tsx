import { PageHeader as PageHeaderType } from '../../gql/graphql';
import RichText from '@madebyconnor/rich-text-to-jsx'
import { ThemeColors } from "../utils/ThemeColor";

interface PageHeaderProps {
  data: PageHeaderType
  headerColor: typeof ThemeColors[keyof typeof ThemeColors];
}

const PageHeader = ({ data, headerColor }: PageHeaderProps) => {

  const titleStyles = {
    mobile: 'text-2xl',
    desktop: '',
    extraWide: ''
  }

  return (
    <header>
      <h1 class={titleStyles.mobile +' ' + headerColor.text}>{data.title}</h1>
      {data.description && <RichText richText={data.description.json} />}
    </header>
  );
}

export { PageHeader }