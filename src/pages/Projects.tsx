import { ThemeColors } from '../utils/ThemeColor';
import { PageHeader } from '../components/PageHeader';

interface ProjectsProps {
  pageColor: typeof ThemeColors[keyof typeof ThemeColors];
}

export default function Projects({ pageColor }: ProjectsProps) {
  return (
    <main>
      <PageHeader title='Projects' content='projects page description' headerColor={pageColor} />
      <section class='grid grid-col-1 gap-8 content-start mt-8'>
        <a href="/projects/interest-calculator" class="text-blue-500 hover:underline">
          Interest Calculator
        </a>
      </section>
    </main>
  );
}
