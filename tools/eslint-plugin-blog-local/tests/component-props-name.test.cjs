const assert = require("node:assert/strict");
const { describe, it } = require("node:test");
const { createRequire } = require("node:module");
const { RuleTester } = require("eslint");
const plugin = require("../index.cjs");
const rule = require("../rules/component-props-name.cjs");
const requireFromNext = createRequire(
  require.resolve("eslint-config-next/package.json"),
);
const parser = requireFromNext("@typescript-eslint/parser");

RuleTester.describe = describe;
RuleTester.it = it;

it("プラグインがルールを公開し、自動修正を提供しない", () => {
  assert.equal(plugin.rules["component-props-name"], rule);
  assert.equal(rule.meta.fixable, undefined);
  assert.equal(rule.meta.hasSuggestions, undefined);
});

const tester = new RuleTester({
  languageOptions: {
    parser,
    ecmaVersion: 2022,
    sourceType: "module",
    parserOptions: { ecmaFeatures: { jsx: true } },
  },
});
const valid = [
  "type CardProps = { title: string }; const Card: React.FC<CardProps> = () => null;",
  "interface CardProps { title: string } export const Card: React.FC<CardProps> = () => null;",
  "type CardProps<T> = { value: T }; const Card: React.FC<CardProps<string>> = () => null;",
  "type CardProps = Readonly<{ title: string }>; const Card: React.FC<CardProps> = () => null;",
  "const Divider: React.FC = () => null;",
  "function Page(props: { title: string }) { return null; }",
  "export default async function Page(props: { title: string }) { return null; }",
  "function Layout(props: { children: React.ReactNode }) { return null; }",
  "type MetadataProps = { params: Promise<{ slug: string }> }; async function generateMetadata(props: MetadataProps) { return {}; }",
  "const Card: FC<WrongProps> = () => null;",
  "const Card: React.FunctionComponent<WrongProps> = () => null;",
  "const Card: FunctionComponent<WrongProps> = () => null;",
  "const Card: R.FC<WrongProps> = () => null;",
  "const Card: NS.React.FC<WrongProps> = () => null;",
  "type Alias<T> = React.FC<T>; const Card: Alias<WrongProps> = () => null;",
  "let Card: React.FC<WrongProps> = () => null;",
  "var Card: React.FC<WrongProps> = () => null;",
  "const Card = (() => null) as React.FC<WrongProps>;",
  "const Card = (() => null) satisfies React.FC<WrongProps>;",
  "const Card = () => null;",
  "const { Card }: { Card: React.FC<WrongProps> } = components;",
  "function factory(): React.FC<WrongProps> { return () => null; }",
  "const Card = React.memo<WrongProps>(() => null);",
  "const Card = React.forwardRef<HTMLDivElement, WrongProps>(() => null);",
  "const value: WrongProps = {};",
];
const invalid = [];
for (const actualName of [
  "WrongProps",
  "cardProps",
  "OtherProps",
  "MetadataProps",
]) {
  const prefix = "const Card: React.FC<";
  invalid.push({
    code: `${prefix}${actualName}> = () => null;`,
    errors: [
      {
        messageId: "incorrectName",
        data: { componentName: "Card", expectedName: "CardProps", actualName },
        type: "TSTypeReference",
        line: 1,
        column: prefix.length + 1,
        endLine: 1,
        endColumn: prefix.length + actualName.length + 1,
      },
    ],
  });
}
const unnamedTypes = [
  ["{ title: string }", "TSTypeLiteral"],
  ["{}", "TSTypeLiteral"],
  ["CardProps | OtherProps", "TSUnionType"],
  ["CardProps & OtherProps", "TSIntersectionType"],
  ["any", "TSAnyKeyword"],
  ["unknown", "TSUnknownKeyword"],
  ["NS.CardProps", "TSTypeReference"],
  ["NS.OtherProps", "TSTypeReference"],
  ["NS.Inner.CardProps", "TSTypeReference"],
  ...[
    "Awaited<CardProps>",
    "Partial<CardProps>",
    "Required<CardProps>",
    "Readonly<CardProps>",
    'Pick<CardProps, "title">',
    "Record<string, CardProps>",
    "Exclude<CardProps, OtherProps>",
    "Extract<CardProps, OtherProps>",
    'Omit<CardProps, "title">',
    "NonNullable<CardProps>",
    "Parameters<CardProps>",
    "ConstructorParameters<CardProps>",
    "ReturnType<CardProps>",
    "InstanceType<CardProps>",
    "ThisParameterType<CardProps>",
    "OmitThisParameter<CardProps>",
    "ThisType<CardProps>",
    "Uppercase<CardProps>",
    "Lowercase<CardProps>",
    "Capitalize<CardProps>",
    "Uncapitalize<CardProps>",
    "NoInfer<CardProps>",
    "PropsWithChildren<CardProps>",
    "ComponentProps<CardProps>",
    "ComponentPropsWithoutRef<CardProps>",
    "ComponentPropsWithRef<CardProps>",
    "React.PropsWithChildren<CardProps>",
    "React.ComponentProps<CardProps>",
    "React.ComponentPropsWithoutRef<CardProps>",
    "React.ComponentPropsWithRef<CardProps>",
  ].map((type) => [type, "TSTypeReference"]),
];
for (const [props, type] of unnamedTypes) {
  const prefix = "const Card: React.FC<";
  invalid.push({
    code: `${prefix}${props}> = () => null;`,
    errors: [
      {
        messageId: "namedPropsRequired",
        data: { componentName: "Card", expectedName: "CardProps" },
        type,
        line: 1,
        column: prefix.length + 1,
        endLine: 1,
        endColumn: prefix.length + props.length + 1,
      },
    ],
  });
}
invalid.push({
  code: "export const Card: React.FC<WrongProps> = () => null, Badge: React.FC<{}> = () => null;",
  errors: [
    {
      messageId: "incorrectName",
      data: {
        componentName: "Card",
        expectedName: "CardProps",
        actualName: "WrongProps",
      },
      type: "TSTypeReference",
    },
    {
      messageId: "namedPropsRequired",
      data: { componentName: "Badge", expectedName: "BadgeProps" },
      type: "TSTypeLiteral",
    },
  ],
});

tester.run("component-props-name", rule, {
  valid: valid.map((code) => ({ code, filename: "fixture.tsx" })),
  invalid: invalid.map((test) => ({
    ...test,
    filename: "fixture.tsx",
    output: null,
  })),
});
