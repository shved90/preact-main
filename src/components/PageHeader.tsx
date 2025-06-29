import { Scalars } from '../../gql/graphql';
import { ThemeColors } from "../utils/ThemeColor";

interface PageHeaderProps {
  title: string,
  content?: Scalars["String"]["output"] | string;
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



  return (
      <header>
        <h1 class={titleStyles.mobile + ' ' + headerColor.text}>{title}</h1>
        {content &&<div class={'my-4 text-lg ' + contentStyling.mobile + ' ' + contentStyling.desktop}>{content}</div>}
      </header>
  );
}

export { PageHeader }