import path from "path";
import * as fs from "node:fs/promises";

import ReactMarkdown from "react-markdown";

const entriesPath = path.join(process.cwd(), "/src/entries");

type Post = { slug: string; body: string };
export async function generateStaticParams() {
  const entryFiles = await fs.readdir(entriesPath);
  return entryFiles.map((filename) => {
    return { slug: filename.replace(/\.md$/, "") };
  });
}

export default async function Page({ params }: { params: Post }) {
  const { slug } = params;
  const entryFilePath = path.join(entriesPath, `${slug}.md`);
  const contents = await fs.readFile(entryFilePath, "utf-8");

  return (
    <>
      <h1>{slug}</h1>
      <ReactMarkdown>{contents}</ReactMarkdown>
    </>
  );
  // ...
}
