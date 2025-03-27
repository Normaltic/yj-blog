import Link from "next/link";

function Postcard() {
  return (
    <article>
      <Link href="/">
        <h4 className="text-3xl text-primary">Title</h4>
        <i className="block mb-2 text-gray-400">2020-03-13</i>
        <p>Description</p>
      </Link>
    </article>
  );
}

export default Postcard;
