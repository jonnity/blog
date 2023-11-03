import { z } from "zod";

const showDraftArticleParser = z.boolean().default(false);

export class EnvCollector {
  public static instance: EnvCollector | null;
  public static getEnv() {
    if (EnvCollector.instance) {
      return EnvCollector.instance;
    } else {
      const instance = new EnvCollector();
      EnvCollector.instance = instance;
      return EnvCollector.instance;
    }
  }
  private constructor() {
    this.SHOW_DRAFT_ARTICLE = showDraftArticleParser.parse(
      process.env.SHOW_DRAFT_ARTICLE,
    );
  }

  public readonly SHOW_DRAFT_ARTICLE: boolean;
}
