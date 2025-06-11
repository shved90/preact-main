import { Blog, Job, Projects } from '../../gql/graphql';
import { ThemeColors } from '../utils/ThemeColor';
import { dateFormat } from '../utils/utils';

interface CardHeaderProps {
  data: Blog | Job | Projects
}

const CardHeader = ({ data }: CardHeaderProps) => {
  const title = (data as Blog).title || (data as Job).companyName
  const blogDate = dateFormat((data as Blog).sys?.firstPublishedAt)
  const startDate = dateFormat((data as Job).startDate)
  const endDate = dateFormat((data as Job).endDate)

  return (
    <>
      {data.__typename == "Job" &&
        <header class={`grid grid-cols-2 grid-rows-2`}>

          <h2 class={`font-bold ${ThemeColors.orange.text}`}>
            {title}
          </h2>

          <p class="text-text-tertiary">{data.location}</p>
          <p class="text-text-secondary">{data.role}</p>
          <p class="text-text-tertiary">
            {startDate} - {endDate}
          </p>


        </header>
      }
      {data.__typename == "Blog" &&
        <header class={`font-bold`}>
          <h2 class={ThemeColors.blue.link}>
            {data.slug
              ? <a href={'blog/' + data.slug}>{title}</a>
              : title
            }
          </h2>
          <p class="text-text-tertiary">Published on {blogDate}</p>
        </header>
      }
      {data.__typename == "Projects" &&
        <header class={`font-bold`}>
          <h2 class={ThemeColors.purple.link}>
            {data.slug
              ? <a href={'projects/' + data.slug}>{title}</a>
              : title
            }
          </h2>
        </header>
      }
    </>
  );
}

export { CardHeader }