type QueryKey = 'PageHeader' | 'posts' | 'post' | 'latestPostsAndJobs';

const queryMap: Record<QueryKey, string> = {

  PageHeader: `
    query getPageHeaders ($variable: String!) {
      pageHeaderCollection (where: {pageName: $variable}){
        items{
          title
          pageName
          description{
            json
          }
        }
      }
    }
    `,

  posts: `
    query getAllPosts {
      postCollection{
      items{
        title
        slug
        date
        coverImage{
          url
        }
      }
      }
    }
    `,

  post: `
    query getPostBySlug ($variable: String!) {
        postCollection (where: {slug: $variable}){
          items{
            title
            slug
            content {
              json
            }
            
            coverImage{
              url
            }
          }
        }
      }
    `,

  latestPostsAndJobs: `
    query getLatestPostsAndJobs {
      postCollection(limit: 4, order: sys_publishedAt_DESC) {
        items {
        __typename
          title
          slug
          date
          content {
              json
            }
          coverImage {
            url
          }
        }
      }
      jobCollection(limit: 4, order: sys_publishedAt_DESC) {
    items{
    __typename
      socialsCollection{
        items{
          social
          url
        }
      }
      endDate
      startDate
      companyUrl
      companyName
      slug
      role
      location
      shortSummary{
        json
      }
      description{
       json
      }
    }
      }
    }
  `,
}

type QueryVariablesMap = {
  PageHeader: {variable: string};
  posts: undefined;
  latestPostsAndJobs: undefined;
  post: { variable: string };
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