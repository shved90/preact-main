type QueryKey = 'PageHeader' | 'Blog' | 'BlogPost' | 'JobList' | 'Job' | 'Projects' | 'latestProjectsAndJobs';

const queryMap: Record<QueryKey, string> = {

  PageHeader: `
    query getPageHeaders ($variable: String!) {
      pageHeaderCollection (where: {pageName: $variable}, limit: 1){
        items{
          __typename
          title
          pageName
          description{
            json
            links {
              assets {
                hyperlink {
                  sys {
                    id
                  }
                  url
                }
              }
            }
          }
        }
      }
    }
  `,

  Blog: `
    query getAllBlogPosts {
      blogCollection{
        items{
          __typename
          title
          slug
          summary {
            json
          }
          sys {
            publishedAt
            firstPublishedAt
          }
          contentfulMetadata{
            tags{
              name
            }
          }
        }
      }
    }
  `,

  BlogPost: `
    query getBlogBySlug ($variable: String!) {
        blogCollection (where: {slug: $variable}){
          items{
            __typename
            title
            slug
            content {
              json
            }
            sys {
              publishedAt
              firstPublishedAt
            }
            contentfulMetadata{
              tags{
                name
              }
            }
          }
        }
      }
  `,

  JobList: `
    query getJobList {
      jobCollection(order: startDate_DESC) {
        items{
          __typename
          endDate
          startDate
          companyUrl
          companyName
          strapline
          slug
          role
          location
          shortSummary{
            json
          }
          description{
            json
          }
          contentfulMetadata{
            tags{
              name
            }
          }
        }
      }
    }
  `,

  Job: `
    query getJobBySlug ($variable: String!) {
        jobCollection (where: {slug: $variable}){
          items{
            __typename
            endDate
            startDate
            companyUrl
            companyName
            strapline
            slug
            role
            location
            shortSummary{
              json
            }
            description{
              json
            }
            contentfulMetadata{
              tags{
                name
              }
            }
          }
        }
      }
  `,

  Projects: `
    query getAllProjects {
      projectsCollection{
        items{
          __typename
          title
          slug
          summary {
            json
          }
          sys {
            publishedAt
            firstPublishedAt
          }
          contentfulMetadata{
            tags{
              name
            }
          }
        }
      }
    }
  `,

  latestProjectsAndJobs: `
    query getLatestProjectsAndJobs {
      projectsCollection(limit: 4, order:  sys_firstPublishedAt_DESC) {
        items {
          __typename
          title
          slug
          summary {
            json
          }
          sys {
            publishedAt
            firstPublishedAt
          }
          contentfulMetadata{
            tags{
              name
            }
          }
        }
      }
      jobCollection(limit: 4, order: startDate_DESC) {
        items{
          __typename
          endDate
          startDate
          companyUrl
          companyName
          strapline
          slug
          role
          location
          shortSummary{
            json
          }
          description{
            json
          }
          contentfulMetadata{
            tags{
              name
            }
          }
        }
      }
    }
  `,
}

type QueryVariablesMap = {
  PageHeader: { variable: string };
  Blog: undefined;
  BlogPost: { variable: string };
  JobList: undefined;
  Job: { variable: string };
  Projects: undefined;
  latestProjectsAndJobs: undefined;
};

type MaybeArray<T> = T | T[];

const normalize = <T,>(value: MaybeArray<T>): T[] => {
  return Array.isArray(value) ? value : [value];
};

export async function gqlfetch<K extends QueryKey>(
  keys: MaybeArray<K>,
  variables?: Partial<Pick<QueryVariablesMap, K>>
): Promise<Record<K, any>> {
  const keyList = normalize(keys);
  const results: Partial<Record<K, any>> = {};

  for (const key of keyList) {
    const query = queryMap[key];
    const vars: QueryVariablesMap[K] | undefined = variables?.[key];

    try {
      const res = await fetch(
        `https://graphql.contentful.com/content/v1/spaces/${import.meta.env.VITE_CONTENTFUL_SPACE_ID}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query, variables: vars }),
        }
      );

      if (!res.ok) throw new Error(`${key} fetch failed: ${res.status}`);

      const { data } = await res.json();
      results[key] = data;
    } catch (err) {
      console.error(`Error fetching ${key}:`, err);
    }
  }

  return results as Record<K, any>;
}