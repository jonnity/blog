import path from "path";
import * as fs from "node:fs";

import frontMatter from "front-matter";
import { z } from "zod";
import { EnvCollector } from "../EnvCollector";

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
const metadata = z.object({
  title: titleSchema,
  createdAt: pastDateStringSchema,
  tags: tagsSchema,
  updatedAt: pastDateStringSchema.optional(),
});
type Metadata = z.infer<typeof metadata>;

const defaultParam = {
  title: "default title",
  createdAt: new Date(0),
  tags: [],
};
const metadataWithCatch = z
  .object({
    title: titleSchema.catch(defaultParam.title),
    createdAt: pastDateStringSchema.catch(defaultParam.createdAt),
    tags: tagsSchema.catch(defaultParam.tags),
  })
  .catch(defaultParam);
export class Entry {
  public readonly isPublic: boolean;
  public readonly metadata: Metadata;
  public readonly body: string;
  public readonly slug: string;

  private static entriesDir = path.join(process.cwd(), "/src/entries");
  private static mdFilenameWithSlug = /.+\.md$/;

  static getDiplayedEntriesList() {
    const env = EnvCollector.getEnv();
    const entryFiles = fs
      .readdirSync(Entry.entriesDir)
      .filter((filename) => filename.match(Entry.mdFilenameWithSlug));
    const displayedEntries = entryFiles
      .map((filename) => {
        const entry = new Entry(filename);
        if (env.SHOW_DRAFT_ARTICLE) {
          return entry;
        } else {
          return entry.isPublic ? entry : null;
        }
      })
      .filter(function (entry): entry is Entry {
        return !!entry;
      });
    return displayedEntries;
  }
  public static getEntryWithSlug(slug: string) {
    const filename = `${slug}.md`;
    return new Entry(filename);
  }

  private constructor(filename: string) {
    const filePath = path.join(Entry.entriesDir, filename);
    const parsedData = frontMatter<any>(fs.readFileSync(filePath, "utf-8"));
    this.isPublic = !!parsedData.attributes?.isPublic;
    this.slug = filename.split(".md")[0];
    this.metadata = this.isPublic
      ? metadata.parse(parsedData.attributes)
      : metadataWithCatch.parse(parsedData.attributes);
    this.body = parsedData.body;
  }
}
