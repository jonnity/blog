import path from "path";
import * as fs from "node:fs";

import frontMatter from "front-matter";
import { z } from "zod";

const pastDateStringSchema = z.string().transform((dateStr, ctx) => {
  const inputtedDate = new Date(dateStr);
  inputtedDate.setHours(0, 0, 0, 0);
  if (inputtedDate > new Date()) {
    ctx.addIssue({
      code: z.ZodIssueCode.invalid_date,
      message: "Input must be past date.",
    });
    return z.NEVER;
  }
  return inputtedDate;
});

const titleSchema = z.string().min(1);
const tagsSchema = z.string().array().optional().default([]);
const descriptionSchema = z.string().optional();
const createdAtSchema = pastDateStringSchema;
const updatedAtSchema = pastDateStringSchema.optional();
const metadataSchema = z.object({
  title: titleSchema,
  tags: tagsSchema,
  description: descriptionSchema,
  createdAt: createdAtSchema,
  updatedAt: updatedAtSchema,
});
type Metadata = z.infer<typeof metadataSchema>;

const entriesDir = path.join(process.cwd(), "/src/entries");

class Entry {
  public readonly metadata: Metadata;
  public readonly body: string;
  public constructor(
    public readonly slug: string,
    mdContents: string,
  ) {
    const parsedData = frontMatter<any>(mdContents);
    this.metadata = metadataSchema.parse(parsedData.attributes);
    this.body = parsedData.body;
  }
}
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

  getEntryList(sort: "asc" | "desc" = "desc"): Entry[] {
    return this.entryList.sort((a, b) => {
      if (sort === "asc") {
        return a.metadata.createdAt > b.metadata.createdAt ? 1 : -1;
      } else if (sort === "desc") {
        return a.metadata.createdAt > b.metadata.createdAt ? -1 : 1;
      }
      return 0;
    });
  }

  private entryList: Entry[] = [];
  private constructor() {
    const entryFiles = fs
      .readdirSync(entriesDir)
      .filter((filename) => filename.match(/.+\.md$/));
    console.info(`entryFiles: ${entryFiles}`);

    this.entryList = entryFiles.map((filename) => {
      const slug = filename.split(".md")[0];
      const fileContents = fs.readFileSync(
        path.join(entriesDir, filename),
        "utf-8",
      );
      return new Entry(slug, fileContents);
    });
  }
}

export type EntryProp = { entry: Entry };
