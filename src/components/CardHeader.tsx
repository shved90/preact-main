import { Blog, Job } from '../../gql/graphql';

type CardHeaderProps = { data: Blog | Job }

const dateFormat = (date: string) => {
  const getDate = new Date(date)
  const formattedDate = `${getDate.getUTCDate()} ${getDate.toLocaleString('en', { month: 'long' })} ${getDate.getUTCFullYear()}`;
  return <span class="whitespace-nowrap">{formattedDate}</span>
}

const CardHeader = ({ data }: CardHeaderProps) => {
  const title = (data as Blog).title || (data as Job).companyName
  // const jobLocation = (data as Job).location
  const blogDate = dateFormat((data as Blog).sys?.firstPublishedAt)
  const startDate = dateFormat((data as Job).startDate)
  const endDate = dateFormat((data as Job).endDate)

  return (
    <>
      {data.__typename == "Job" ?
        <header class="grid grid-cols-2 grid-rows-2 text-orange">

          <h2 class="text-orange font-bold">
            {data.slug
              ? <a href={`job/`+data.slug}>{title}</a>
              : title
            }
          </h2>

          <p class="text-light-700">{data.location}</p>
          <p class="text-light-500">{data.role}</p>
          <p class="text-light-700">
            {startDate} - {endDate}
          </p>
          

        </header>
        :
        <header class="text-blue font-bold">
          <h2>
            {data.slug
              ? <a href={'blog/'+data.slug}>{title}</a>
              : title
            }
          </h2>
          <p class="text-light-700">Published on {blogDate}</p>
        </header>
      }
    </>
  );
}

export { CardHeader }