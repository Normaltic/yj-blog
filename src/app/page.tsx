import Postcard from "@/components/post/Postcard";
import { getPosts } from "@/utils/post";

export default async function Home() {
  const result = await getPosts();

  return (
    <div className="flex flex-col gap-8">
      {result.map(({ data, path }) => (
        <Postcard
          key={data.title}
          title={data.title}
          date={new Date(data.date)}
          url={path}
          summary={data.summary}
        />
      ))}
    </div>
  );
}
