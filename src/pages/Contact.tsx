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

  const labelStyling = "block text-sm font-bold mt-4 -mb-2 dark:text-text-primary"
  const inputStyling = "shadow appearance-none border rounded w-full py-2 px-4 dark:text-text-primary leading-tight mt-2 focus:outline-none focus:shadow-outline"
  const buttonStyling = "text-white bg-purple rounded px-4 py-2 mt-4 text-lg cursor-pointer hover:bg-purple-500"

  return (
    <main>
      {header?.title ?
        <PageHeader title={header.title} content={header.description?.json} headerColor={pageColor} />
        : "loading"}

      <form name="contact" method="POST" data-netlify="true" netlify-honeypot="subject" class='mt-8'>
        <input type="hidden" name="form-name" value="contact" /> {/* required for form to work */}

        <label for="name" class={labelStyling}>Name (required)</label>
        <sub id="nameDesc">Please give a full name so I'm 100% clear who this is from</sub>
        <input type="text" id="name" name="name" aria-describedby="nameDesc" required class={inputStyling} />
        

        <label for="email" class={labelStyling}>Email (required)</label>
        <sub id="emailDesc">Please make sure its correct, or I wont be able to reply back</sub>
        <input type="email" id="email" name="email" aria-describedby="emailDesc" required class={inputStyling} />
        

        <input class="hidden" type="text" name="subject" />

        <label for="message" class={labelStyling}>Message (required)</label>
        <sub id="messageDesc">The more information I have when receiving your email the better, please dont try to be misterious.</sub>
        <textarea id="message" name="message" aria-describedby="messageDesc" required class={inputStyling}></textarea>

        <button type="submit" class={buttonStyling}>Send</button>
      </form>
    </main>
  );
}
