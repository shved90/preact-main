import { useEffect, useRef } from 'preact/hooks';
import { Blog, Job, PageHeader } from '../../gql/graphql';

// good reference link: https://zhead.dev/meta/article-section

interface MetaTagDataProps {
  metaData?: Blog | Job
  headerData?: PageHeader
}

const baseMetaTags = [
  "og:type",
  "og:title",
  "og:url",
  "og:image",
  "og:description",
] as const;

const articleMetaTags = [
  "article:author",
  "article:published_time",
  "article:modified_time",
  "article:tag",
] as const;

type BaseMetaTag = typeof baseMetaTags[number];
type ArticleMetaTag = typeof articleMetaTags[number];

interface TagEntry {
  property: BaseMetaTag | ArticleMetaTag;
  content: string;
}


const MetaTags = ({ metaData, headerData }: MetaTagDataProps) => {

  const baseMetaRefs = useRef<{ [key in BaseMetaTag]?: HTMLMetaElement }>({});

  const articleMetaRefs = useRef<HTMLMetaElement[]>([]);

  const fallbackTitle = "Alexander Shved"
  const fallbackDescription = "Web developer with keen focus on minimalism, semantics, and accessibility. I focus on holistic systemic development and scalable approach. Visit my website for my career details, blog, rosume or projects I worked on for personal joy of professional life."

  const metaTitle =
    metaData && metaData.__typename === 'Job'
      ? `${metaData.role} at ${metaData.companyName} - Alexander Shved`
      : metaData && metaData.__typename === 'Blog'
        ? `${metaData.title} - Blog by Alexander Shved`
        : (headerData?.title && `${headerData?.title} - by Alexander Shved`) ?? fallbackTitle;

  const metaDescription = metaData && metaData.summary || headerData && headerData?.description

  const clearArticleMeta = () => {
    if (!articleMetaRefs.current.length) return;

    for (const tag of articleMetaRefs.current) {
      tag.isConnected && tag.remove();
    }
    articleMetaRefs.current = [];
  }

  const getBaseMeta = (property: BaseMetaTag, content: string) => {
    let tag = baseMetaRefs.current[property];

    if (!tag) {
      const existingTag = document.querySelector(`meta[property="${property}"]`);

      if (existingTag instanceof HTMLMetaElement) {
        tag = existingTag;
      } else {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }

      baseMetaRefs.current[property] = tag;
    }

    tag.setAttribute('content', content);
  };

  useEffect(() => {
    if (!metaData && !headerData) return;

    document.title = metaTitle ?? fallbackTitle
    getBaseMeta('og:type', headerData ? 'website' : 'article');
    getBaseMeta('og:title', metaTitle ?? fallbackTitle);
    getBaseMeta('og:url', typeof window !== 'undefined' ? window.location.href : '');
    getBaseMeta('og:description', metaDescription ?? fallbackDescription);

    clearArticleMeta();

    if (metaData) {
      const tagsToAdd: TagEntry[] = [
        {
          property: 'article:author',
          content: 'Alexander Shved',
        },
        {
          property: 'article:published_time',
          content: metaData.sys.firstPublishedAt,
        },
        {
          property: 'article:modified_time',
          content: metaData.sys.publishedAt,
        },
      ];

      for (const tag of metaData.contentfulMetadata.tags ?? []) {
        if (tag?.name) {
          tagsToAdd.push({ property: 'article:tag', content: tag.name });
        }
      }

      articleMetaRefs.current = tagsToAdd.map(({ property, content }) => {
        const tag = document.createElement('meta');
        tag.setAttribute('property', property);
        tag.setAttribute('content', content);
        document.head.appendChild(tag);
        return tag;
      });
    }

    return () => {
      clearArticleMeta();
    };
  }, [metaData, headerData]);

  return null;
};

export { MetaTags };