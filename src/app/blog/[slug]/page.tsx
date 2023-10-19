const isDev = process.env.NODE_ENV === "development";
export const dynamic = isDev ? "auto" : "force-static";
export const dynamicParams = isDev ? true : false;

type Metadata = { isPublic?: boolean };

import path from "path";
import * as fs from "node:fs";

import frontMatter from "front-matter";
import ReactMarkdown from "react-markdown";

const entriesPath = path.join(process.cwd(), "/src/entries");
function entryFilePath(filename: string) {
  return path.join(entriesPath, filename);
}

type Post = { slug: string; body: string };
export async function generateStaticParams() {
  const entryFiles = fs.readdirSync(entriesPath);
  return entryFiles
    .map((filename) => {
      const contents = frontMatter<Metadata>(
        fs.readFileSync(entryFilePath(filename), "utf-8")
      );
      return contents.attributes?.isPublic === false
        ? null
        : { slug: filename.replace(/\.md$/, "") };
    })
    .filter((params) => {
      return !!params?.slug;
    });
}

export default async function Page({ params }: { params: Post }) {
  const { slug } = params;
  const contents = fs.readFileSync(entryFilePath(`${slug}.md`), "utf-8");

  return (
    <>
      <h1>{slug}</h1>
      <ReactMarkdown>{contents}</ReactMarkdown>
    </>
  );
  // ...
}
