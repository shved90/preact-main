
import { ThemeColors } from '../../utils/ThemeColor';
import { PageHeader } from '../../components/PageHeader';

interface ReactLoginDemoProps {
  pageColor: typeof ThemeColors[keyof typeof ThemeColors];
}

export default function ReactLoginDemo({ pageColor }: ReactLoginDemoProps) {

  return (
    <article>
      <PageHeader title='React login demo' content='some text here' headerColor={pageColor} />
      <section>
        <iframe src="https://loginsample.shved.uk/" style="border: none;" width='100%' height='700'></iframe>
      </section>
    </article>
  );
}
