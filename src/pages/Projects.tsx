import { useEffect, useState } from 'preact/hooks';
import { gqlfetch } from '../utils/data';
import { ThemeColors } from '../utils/ThemeColor';
import { PageHeader } from '../components/PageHeader';
import { PreviewCard } from '../components/PreviewCard';
import { Projects as ProjectType, PageHeader as PageHeaderType } from '../../gql/graphql';

interface ProjectsProps {
  pageColor: typeof ThemeColors[keyof typeof ThemeColors];
}

export default function Projects({ pageColor }: ProjectsProps) {

    const [Projects, setProjects] = useState<ProjectType[]>([]);
    const [header, setHeader] = useState<PageHeaderType>();
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      async function fetchProjects() {
        const data = await gqlfetch(['Projects', 'PageHeader'], { PageHeader: { variable: "projects" } });
        setProjects(data.Projects.projectsCollection.items);
        setHeader(data.PageHeader.pageHeaderCollection.items[0]);
        setLoading(false);
      }
      fetchProjects();
    }, []);

  return (
    <main>
      {header?.title ?
        <PageHeader title={header.title} content={header.description?.json} headerColor={pageColor} />
        : "loading"}

      {loading ? <p>Loading...</p> : (
        <section class='grid grid-col-1 gap-8 content-start mt-8'>
          {Projects.map(Project => (
            <PreviewCard data={Project} color={pageColor} />
          ))}
        </section>
      )}
    </main>
  );
}
