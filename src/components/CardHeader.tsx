import { Blog, Job } from '../../gql/graphql';
import { ThemeColors } from '../utils/ThemeColor';

interface CardHeaderProps {
  data: Blog | Job
}

const dateFormat = (date: string) => {
  const getDate = new Date(date)
  const formattedDate = `${getDate.getUTCDate()} ${getDate.toLocaleString('en', { month: 'long' })} ${getDate.getUTCFullYear()}`;
  return <span class="whitespace-nowrap">{formattedDate}</span>
}

const CardHeader = ({ data }: CardHeaderProps) => {
  const title = (data as Blog).title || (data as Job).companyName
  const blogDate = dateFormat((data as Blog).sys?.firstPublishedAt)
  const startDate = dateFormat((data as Job).startDate)
  const endDate = dateFormat((data as Job).endDate)

  return (
    <>
      {data.__typename == "Job" ?
        <header class={`grid grid-cols-2 grid-rows-2`}>

          <h2 class={`font-bold ${ThemeColors.orange.text}`}>
            {title}
          </h2>

          <p class="text-light-700">{data.location}</p>
          <p class="text-light-500">{data.role}</p>
          <p class="text-light-700">
            {startDate} - {endDate}
          </p>
          

        </header>
        :
        <header class={`font-bold`}>
          <h2 class={ThemeColors.blue.link}>
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