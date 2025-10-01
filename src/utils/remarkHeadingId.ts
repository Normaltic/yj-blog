import { visit } from "unist-util-visit";
import { toString } from "mdast-util-to-string";
import type { Plugin } from "unified";
import type { Root, Heading } from "mdast";
import { createSlug } from "./slugText";

function isHeadingNode(node: unknown): node is Heading {
  return (
    typeof node === "object" &&
    node !== null &&
    "type" in node &&
    node.type === "heading"
  );
}

const remarkHeadingId: Plugin<[], Root> = () => {
  return (tree) => {
    const slug = createSlug();

    function addHeadingId(node: Heading) {
      if (!node.data) {
        node.data = {};
      }

      if (!node.data.hProperties) {
        node.data.hProperties = {};
      }

      const text = toString(node);
      const id = slug(text);
      node.data.hProperties.id = id;
    }

    visit(tree, isHeadingNode, addHeadingId);
  };
};

export default remarkHeadingId;
