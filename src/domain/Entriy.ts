import path from "path";
import * as fs from "node:fs";

import frontMatter from "front-matter";
import { z } from "zod";

const pastDateString = z.string().transform((dateStr, ctx) => {
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

const metadata = z.object({
  isPublic: z.boolean().default(false),
  tags: z.string().array().default([]),
  createdAt: pastDateString,
  updatedAt: pastDateString.nullable(),
});
type Metadata = z.infer<typeof metadata>;

export class Entry {
  public readonly metadata: Metadata;
  public readonly body: string;

  private static entriesDir = path.join(process.cwd(), "/src/entries");
  private static fileExtensionRegExp = /.*\.md$/;
  static getEntriesFileList() {
    const entryFiles = fs.readdirSync(Entry.entriesDir);
    return entryFiles.filter((filename) =>
      filename.match(Entry.fileExtensionRegExp)
    );
  }

  constructor(filename: string) {
    const filePath = path.join(Entry.entriesDir, filename);
    const parsedData = frontMatter(fs.readFileSync(filePath, "utf-8"));
    this.metadata = metadata.parse(parsedData.attributes);
    this.body = parsedData.body;
  }
}
