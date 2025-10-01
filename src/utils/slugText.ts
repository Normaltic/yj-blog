import Slugger from "github-slugger";

export function createSlug() {
  const slugger = new Slugger();
  return (text: string) => slugger.slug(text, true);
}

export function slugText(...texts: string[]) {
  const slug = createSlug();
  const results = texts.map((text) => slug(text));

  return results;
}
