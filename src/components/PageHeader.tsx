import { PageHeader as PageHeaderType } from '../../gql/graphql';
import RichText from '@madebyconnor/rich-text-to-jsx'
type PageHeaderProps = { data: PageHeaderType }


const PageHeader = ({ data }: PageHeaderProps) => {

  return (
    <header>
      <h1>{data[0].title}</h1>
      <RichText richText={data[0].description.json} />
    </header>
  );
}

export { PageHeader }