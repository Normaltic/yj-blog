import Link from "next/link";

import { formatDate } from "@/utils/date";

export interface PostcardProps {
  title: string;
  date: Date;
  url: string;
  summary?: string;
}

function Postcard({ title, date, url, summary }: PostcardProps) {
  return (
    <article>
      <Link href={url}>
        <h4 className="text-3xl text-primary">{title}</h4>
        <i className="block mb-2 text-gray-400">{formatDate(date)}</i>
        {summary && <p>{summary}</p>}
      </Link>
    </article>
  );
}

export default Postcard;
