import { PageHeader as PageHeaderType } from '../../gql/graphql';
import RichText from '@madebyconnor/rich-text-to-jsx'
type PageHeaderProps = { data: PageHeaderType }


const PageHeader = ({ data }: PageHeaderProps) => {
console.log(data)
  return (
    <header>
      <h1>{data.title}</h1>
      {data.description&&<RichText richText={data.description.json} />}
    </header>
  );
}

export { PageHeader }