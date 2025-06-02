

const dateFormat = (date: string) => {
  const getDate = new Date(date)
  const trimmedDate = date?.slice(0, 10)
  const formattedDate = `${getDate.getUTCDate()} ${getDate.toLocaleString('en', { month: 'long' })} ${getDate.getUTCFullYear()}`;
  return <time datetime={trimmedDate} class="whitespace-nowrap">{formattedDate}</time>
}

export { dateFormat }