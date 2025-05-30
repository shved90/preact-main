import { useEffect, useState } from "preact/hooks";
import { gqlfetch } from "../utils/data";
import { PageHeader as PageHeaderType } from "../../gql/graphql";
import { PageHeader } from "../components/PageHeader";
import { ThemeColors } from "../utils/ThemeColor";

interface ContactProps {
  pageColor: typeof ThemeColors[keyof typeof ThemeColors];
}

export default function Contact({ pageColor }: ContactProps) {
  const [header, setHeader] = useState<PageHeaderType>();

  useEffect(() => {
    (async () => {
      const data = await gqlfetch('PageHeader', { PageHeader: { variable: "contact" } });
      setHeader(data.PageHeader.pageHeaderCollection.items[0]);
    })();
  }, []);

  const labelStyling = "block text-gray-700 text-sm font-bold mb-2"
  const inputStyling = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

  return (
    <main>
      {header?.title ?
        <PageHeader title={header.title} content={header.description?.json} headerColor={pageColor} />
        : "loading"}

      <form name="contact" method="POST" data-netlify="true" netlify-honeypot="subject" class='mt-8'>
        <input type="hidden" name="form-name" value="contact" /> {/* required for form to work */}

        <label for="name" class={labelStyling}>Name (required)</label>
        <input type="text" id="name" name="name" aria-describedby="nameDesc" required class={inputStyling} />
        <p id="nameDesc">Please give a full name so I'm 100% clear who this is from</p>

        <label for="email" class={labelStyling}>Email (required)</label>
        <input type="email" id="email" name="email" aria-describedby="emailDesc" required class={inputStyling} />
        <p id="emailDesc">Please make sure its correct, or I wont be able to reply back</p>

        <input class="hidden" type="text" name="subject" />

        <label for="message" aria-describedby="messageDesc" class={labelStyling}>Message (required)</label>
        <p id="messageDesc">The more information I have when receiving your email the better, please dont try to be misterious.</p>
        <textarea name="message" required class={inputStyling}></textarea>

        <button type="submit">Send</button>
      </form>
    </main>
  );
}
