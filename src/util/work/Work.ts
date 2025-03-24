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

const titleSchema = z.string();
const thumbnailPathSchema = z.string();
const categoriesSchema = z.string().array();
const descriptionSchema = z.string();
const createdAtSchema = pastDateStringSchema;
const updatedAtSchema = pastDateStringSchema.optional();
const externalLinkSchema = z.object({
  url: z.string().url(),
  message: z.string(),
});

const workMetadataSchema = z.object({
  title: titleSchema,
  categories: categoriesSchema,
  description: descriptionSchema,
  createdAt: createdAtSchema,
  updatedAt: updatedAtSchema,
  thumbnailPath: thumbnailPathSchema,
  externalLink: externalLinkSchema,
});
type WorkMetadata = z.infer<typeof workMetadataSchema>;

const worksDir = path.join(process.cwd(), "/src/works");

class Work {
  public readonly metadata: WorkMetadata;
  public readonly body: string;
  public constructor(
    public readonly slug: string,
    mdContents: string,
  ) {
    const parsedData = frontMatter<any>(mdContents);
    this.metadata = workMetadataSchema.parse(parsedData.attributes);
    this.body = parsedData.body;
  }
  getThumbnail() {
    return {
      url: `/work/${this.metadata.thumbnailPath}`,
      alt: `${this.metadata.title}のアイコン`,
    };
  }
}

export class WorkManager {
  public static instance: WorkManager | null = null;
  public static getInstance() {
    if (WorkManager.instance) {
      return WorkManager.instance;
    } else {
      const instance = new WorkManager();
      WorkManager.instance = instance;
      return instance;
    }
  }
  private constructor() {
    const entryFiles = fs
      .readdirSync(worksDir)
      .filter((filename) => filename.match(/.+\.md$/));

    entryFiles.forEach((filename) => {
      const slug = filename.split(/\.md$/)[0];
      const fileContents = fs.readFileSync(
        path.join(worksDir, filename),
        "utf-8",
      );
      this.entryRecord[slug] = new Work(slug, fileContents);
    });
  }

  getWorkList(): Work[] {
    const entryList = Object.values(this.entryRecord);
    return entryList.sort((a, b) => {
      return a.metadata.createdAt > b.metadata.createdAt ? -1 : 1;
    });
  }
  getEntry(slug: string) {
    if (!this.entryRecord[slug]) {
      throw new Error("invalid slug is specified");
    }
    return this.entryRecord[slug];
  }

  private entryRecord: { [slug: string]: Work } = {};
}

export type WorkType = typeof Work;
