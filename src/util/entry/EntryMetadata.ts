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
const defaultParam = {
  title: "default title",
  createdAt: new Date(0),
  tags: [],
  description: "個人開発の進捗報告や、アリ飼育の様子などを書くブログサイトです",
};

const titleSchema = z.string().min(1);
const tagsSchema = z.string().array().optional().default([]);
const descriptionSchema = z.string();
const metadata = z.object({
  title: titleSchema,
  createdAt: pastDateStringSchema,
  tags: tagsSchema,
  description: descriptionSchema.optional(),
  updatedAt: pastDateStringSchema.optional(),
});
type Metadata = z.infer<typeof metadata>;

const metadataWithCatch = z
  .object({
    title: titleSchema.catch(defaultParam.title),
    createdAt: pastDateStringSchema.catch(defaultParam.createdAt),
    tags: tagsSchema.catch(defaultParam.tags),
    description: descriptionSchema,
  })
  .catch(defaultParam);
export class EntryMetadata {
  public readonly isPublic: boolean;
  public readonly metadata: Metadata;
  constructor(
    public readonly slug: string,
    mdString: string,
  ) {
    const parsedData = frontMatter<any>(mdString);
    this.isPublic = !!parsedData.attributes?.isPublic;
    this.metadata = this.isPublic
      ? metadata.parse(parsedData.attributes)
      : metadataWithCatch.parse(parsedData.attributes);
  }

  static defaultDescription = defaultParam.description;
}
