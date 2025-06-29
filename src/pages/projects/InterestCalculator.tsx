
import { ThemeColors } from '../../utils/ThemeColor';
import { PageHeader } from '../../components/PageHeader';

interface InterestCalculatorProps {
  pageColor: typeof ThemeColors[keyof typeof ThemeColors];
}

export default function InterestCalculator({ pageColor }: InterestCalculatorProps) {
  
  return (
    <article>
      <PageHeader title='Interest Calculator' content='some text here' headerColor={pageColor} />
      <section>
        <p class="codepen" data-height="600" data-default-tab="result" data-slug-hash="KKOVNaX" data-pen-title="Interest calculator" data-user="Sapphi" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
          <span>See the Pen <a href="https://codepen.io/Sapphi/pen/KKOVNaX">
            Interest calculator</a> by Saph (<a href="https://codepen.io/Sapphi">@Sapphi</a>)
            on <a href="https://codepen.io">CodePen</a>.</span>
        </p>
        <script async src="https://public.codepenassets.com/embed/index.js"></script>
      </section>
    </article>
  );
}
