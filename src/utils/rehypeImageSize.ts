import fs from "fs";
import path from "path";
import { visit } from "unist-util-visit";
import { imageSize } from "image-size";
import type { Plugin } from "unified";
import type { Element, Root } from "hast";

interface Options {
  root: string;
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

const rehypeImageSize: Plugin<[Options], Root> = (options) => {
  const { root } = options;

  function addImageSize(node: Element) {
    const src = node.properties.src;
    if (typeof src !== "string") return;

    const imagePath = path.join(root, src);

    try {
      const file = fs.readFileSync(imagePath);
      const size = imageSize(file);
      node.properties = {
        ...node.properties,
        width: size.width,
        height: size.height
      };
    } catch (e) {
      console.error(`[rehypeImageSize] Can't find image: ${imagePath}`, e);
    }
  }

  return (tree) => {
    visit(tree, isImageNode, addImageSize);
  };
};

export default rehypeImageSize;
