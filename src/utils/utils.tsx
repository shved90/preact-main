
interface DateFormatProps {
  date: string;
  isPubDate?: boolean;
  hideDay?: boolean;
}

const dateFormat = ({ date, isPubDate = false, hideDay = false }: DateFormatProps) => {
  const getDate = new Date(date)
  const trimmedDate = date?.slice(0, 10)
  const formattedDate = `
    ${!hideDay ? getDate.getUTCDate() : ''} 
    ${getDate.toLocaleString('en', { month: 'long' })} 
    ${getDate.getUTCFullYear()}
  `;
  const pubdate = { ...(isPubDate && { pubdate: true }) }
  
  return (
    <time datetime={trimmedDate} class="whitespace-nowrap" {...pubdate}>
      {formattedDate}
    </time>
  )
}

export { dateFormat }