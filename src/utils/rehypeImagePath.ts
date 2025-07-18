import path from "path";
import { visit } from "unist-util-visit";
import type { Plugin } from "unified";
import type { Element, Root } from "hast";

interface Options {
  prefix: string;
}

function isImageNode(node: unknown): node is Element {
  return (
    typeof node === "object" &&
    node !== null &&
    "tagName" in node &&
    node.tagName === "img" &&
    "properties" in node &&
    typeof node.properties === "object" &&
    node.properties !== null &&
    "src" in node.properties &&
    typeof node.properties.src === "string" &&
    !node.properties.src.startsWith("http")
  );
}

const rehypeImagePath: Plugin<[Options], Root> = (options) => {
  const { prefix } = options;

  function transformPath(node: Element) {
    if (typeof node.properties?.src === "string") {
      node.properties.src = path.join(prefix, node.properties.src);
    }
  }

  return (tree) => {
    visit(tree, isImageNode, transformPath);
  };
};

export default rehypeImagePath;
