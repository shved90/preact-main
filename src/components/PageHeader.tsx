import { Scalars } from '../../gql/graphql';
import RichText from '@madebyconnor/rich-text-to-jsx'
import { ThemeColors } from "../utils/ThemeColor";

interface PageHeaderProps {
  title: string,
  content?: Scalars["JSON"]["output"] | string;
  headerColor: typeof ThemeColors[keyof typeof ThemeColors];
}

const PageHeader = ({ title, content, headerColor }: PageHeaderProps) => {

  const titleStyles = {
    mobile: 'text-3xl font-bold mb-2',
    desktop: '',
    extraWide: ''
  }

  const contentStyling = {
    mobile: 'sm:w-xs',
    desktop: 'md:w-2xl'
  }

  const parsedContent = !content 
    ? null
    : typeof content === 'string'
      ? <p class='my-4 text-lg'>{content}</p>
      : <RichText richText={content} />

  return (
    <header>
      <h1 class={titleStyles.mobile + ' ' + headerColor.text}>{title}</h1>
      <div class={contentStyling.mobile + ' ' + contentStyling.desktop}>{parsedContent}</div>
    </header>
  );
}

export { PageHeader }