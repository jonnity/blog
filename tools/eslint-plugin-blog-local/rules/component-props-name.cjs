const utilityTypeNames = new Set([
  "Awaited",
  "Partial",
  "Required",
  "Readonly",
  "Pick",
  "Record",
  "Exclude",
  "Extract",
  "Omit",
  "NonNullable",
  "Parameters",
  "ConstructorParameters",
  "ReturnType",
  "InstanceType",
  "ThisParameterType",
  "OmitThisParameter",
  "ThisType",
  "Uppercase",
  "Lowercase",
  "Capitalize",
  "Uncapitalize",
  "NoInfer",
  "PropsWithChildren",
  "ComponentProps",
  "ComponentPropsWithoutRef",
  "ComponentPropsWithRef",
]);

module.exports = {
  meta: {
    type: "suggestion",
    schema: [],
    messages: {
      incorrectName:
        "コンポーネント「{{componentName}}」の Props 型名は「{{expectedName}}」にしてください（現在: 「{{actualName}}」）。",
      namedPropsRequired:
        "コンポーネント「{{componentName}}」の Props 型は「type {{expectedName}} = …」のように名前を付け、「{{expectedName}}」を指定してください。",
    },
  },
  create(context) {
    return {
      VariableDeclarator(node) {
        if (node.parent.kind !== "const" || node.id.type !== "Identifier") {
          return;
        }
        const annotation = node.id.typeAnnotation?.typeAnnotation;
        if (
          annotation?.type !== "TSTypeReference" ||
          annotation.typeName.type !== "TSQualifiedName" ||
          annotation.typeName.left.type !== "Identifier" ||
          annotation.typeName.left.name !== "React" ||
          annotation.typeName.right.name !== "FC"
        ) {
          return;
        }
        const props = annotation.typeArguments?.params[0];
        if (!props) {
          return;
        }
        const data = {
          componentName: node.id.name,
          expectedName: `${node.id.name}Props`,
        };
        if (
          props.type === "TSTypeReference" &&
          props.typeName.type === "Identifier" &&
          !utilityTypeNames.has(props.typeName.name)
        ) {
          if (props.typeName.name !== data.expectedName) {
            context.report({
              node: props,
              messageId: "incorrectName",
              data: { ...data, actualName: props.typeName.name },
            });
          }
          return;
        }
        context.report({ node: props, messageId: "namedPropsRequired", data });
      },
    };
  },
};
