import path from "path";
import * as fs from "node:fs";
import frontMatter from "front-matter";

import { EntryMetadata } from "./EntryMetadata";

const entriesDir = path.join(process.cwd(), "/src/entries");

export class EntryManager {
  public static instance: EntryManager | null = null;
  public static getInstance() {
    if (EntryManager.instance) {
      return EntryManager.instance;
    } else {
      const instance = new EntryManager();
      EntryManager.instance = instance;
      return instance;
    }
  }
  public static getBody(entry: EntryMetadata) {
    const fileContents = fs.readFileSync(
      path.join(entriesDir, `${entry.slug}.md`),
      "utf-8",
    );
    const { body } = frontMatter<any>(fileContents);
    return body;
  }

  getEntryMetadataList(sort: "asc" | "desc" = "desc"): EntryMetadata[] {
    return this.entryMetadataList.sort((a, b) => {
      if (sort === "asc") {
        return a.createdAt > b.createdAt ? 1 : -1;
      } else if (sort === "desc") {
        return a.createdAt > b.createdAt ? -1 : 1;
      }
      return 0;
    });
  }

  private entryMetadataList: EntryMetadata[] = [];
  private constructor() {
    const entryFiles = fs
      .readdirSync(entriesDir)
      .filter((filename) => filename.match(/.+\.md$/));
    console.info(`entryFiles: ${entryFiles}`);

    this.entryMetadataList = entryFiles.map((filename) => {
      const slug = filename.split(".md")[0];
      const fileContents = fs.readFileSync(
        path.join(entriesDir, filename),
        "utf-8",
      );
      const { attributes } = frontMatter<any>(fileContents);
      return new EntryMetadata(slug, attributes);
    });
  }
}
