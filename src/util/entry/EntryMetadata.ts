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

export class EntryMetadata {
  public readonly title: z.infer<typeof titleSchema>;
  public readonly createdAt: z.infer<typeof createdAtSchema>;
  public readonly tags: z.infer<typeof tagsSchema>;
  public readonly description: z.infer<typeof descriptionSchema>;
  public readonly updatedAt: z.infer<typeof updatedAtSchema>;
  constructor(
    public readonly slug: string,
    attributes: any,
  ) {
    this.title = titleSchema.parse(attributes.title);
    this.createdAt = createdAtSchema.parse(attributes.createdAt);
    this.tags = tagsSchema.parse(attributes.tags);
    this.description = descriptionSchema.parse(attributes.description);
    this.updatedAt = updatedAtSchema.parse(attributes.updatedAt);
  }
}
