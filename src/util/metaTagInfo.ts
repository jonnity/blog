import { EntryMetadata } from "./entry/EntryMetadata";

export const defaultTitle = "jonnity blog";
export const titleParam = {
  default: defaultTitle,
  template: `%s | ${defaultTitle}`,
};
export const defaultDescription = EntryMetadata.defaultDescription;
