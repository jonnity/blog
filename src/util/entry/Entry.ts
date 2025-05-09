import path from "path";
import * as fs from "node:fs";

import frontMatter from "front-matter";
import { z } from "zod";

const dateStringSchema = z.string().transform((dateStr, ctx) => {
  const inputtedDate = new Date(dateStr);
  inputtedDate.setHours(0, 0, 0, 0);
  if (inputtedDate > new Date()) {
    console.info(`
  -------------
    Need to check before publish the article: ${dateStr} is future date.
  -------------
`);
  }
  return inputtedDate;
});

const titleSchema = z.string().min(1);
const tagsSchema = z.string().array().optional().default([]);
const descriptionSchema = z.string().optional();
const createdAtSchema = dateStringSchema;
const updatedAtSchema = dateStringSchema.optional();
const thumbnailSchema = z
  .object({
    url: z.string(),
    alt: z.string(),
  })
  .optional();
const summarySchema = z.string().array().optional();

const metadataSchema = z.object({
  title: titleSchema,
  tags: tagsSchema,
  description: descriptionSchema,
  createdAt: createdAtSchema,
  updatedAt: updatedAtSchema,
  thumbnail: thumbnailSchema,
  summary: summarySchema,
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
  getThumbnail() {
    if (this.metadata.thumbnail) {
      return {
        url: `/entry/${this.metadata.thumbnail.url}`,
        alt: this.metadata.thumbnail.alt,
      };
    } else {
      return {
        url: "/icon_keyboard.webp",
        alt: "デフォルトのサムネイル",
      };
    }
  }
}
export class EntryManager {
  public static instance: EntryManager | null = null;
  public static getInstance() {
    if (process.env.NODE_ENV === "development") {
      return new EntryManager();
    }

    if (EntryManager.instance) {
      return EntryManager.instance;
    } else {
      const instance = new EntryManager();
      EntryManager.instance = instance;
      return instance;
    }
  }

  isMonthlyEntry(slug: string): boolean {
    return /^monthly-\d{4}-\d{2}$/.test(slug);
  }

  getEntryList(
    sort: "asc" | "desc" = "desc",
    category?: "blog" | "monthly",
  ): Entry[] {
    const allEntries = Object.values(this.entryRecord);
    const entryFilter: (entry: Entry) => boolean = !category
      ? (_entry) => true
      : category == "blog"
        ? (entry) => !this.isMonthlyEntry(entry.slug)
        : category == "monthly"
          ? (entry) => this.isMonthlyEntry(entry.slug)
          : (_entry) => false;
    const entries = allEntries.filter(entryFilter);
    return entries.sort((a, b) => {
      if (sort === "asc") {
        return a.metadata.createdAt > b.metadata.createdAt ? 1 : -1;
      } else if (sort === "desc") {
        return a.metadata.createdAt > b.metadata.createdAt ? -1 : 1;
      }
      return 0;
    });
  }
  getEntry(slug: string) {
    if (!this.entryRecord[slug]) {
      throw new Error("invalid slug is specified");
    }
    return this.entryRecord[slug];
  }

  private entryRecord: { [slug: string]: Entry } = {};
  private constructor() {
    const entryFiles = fs
      .readdirSync(entriesDir)
      .filter((filename) => filename.match(/.+\.md$/));

    entryFiles.forEach((filename) => {
      const slug = filename.split(/\.md$/)[0];
      const fileContents = fs.readFileSync(
        path.join(entriesDir, filename),
        "utf-8",
      );
      this.entryRecord[slug] = new Entry(slug, fileContents);
    });
  }
}

export type EntryType = InstanceType<typeof Entry>;
