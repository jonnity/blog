import path from "path";
import * as fs from "node:fs/promises";
const entriesPath = path.join(process.cwd(), "/src/entries");

type Post = { slug: string; body: string };
export async function generateStaticParams() {
  const entryFiles = await fs.readdir(entriesPath);
  return entryFiles.map((filename) => filename.replace(/\.txt$/, ""));
}

export default async function Page({ params }: { params: Post }) {
  const { slug } = params;
  const entryFilePath = path.join(entriesPath, `${slug}.txt`);
  const contents = await fs.readFile(entryFilePath, "utf-8");

  return (
    <>
      <h1>{slug}</h1>
      <p>{contents}</p>
    </>
  );
  // ...
}
