import Node from "./node.js";

import mergeSort from "./merge-sort.js";
import removeDuplicates from "./remove-duplicates.js";

export default class Tree {
  constructor(array) {
    this.root = this.buildTree(removeDuplicates(mergeSort(array)));
  }

  buildTree(array) {
    return this.sortBst(array, 0, array.length - 1);
  }

  sortBst(array, start, end) {
    if (start > end) return null;

    let mid = start + Math.floor((end - start) / 2);

    let root = new Node(array[mid]);

    root.left = this.sortBst(array, start, mid - 1);
    root.right = this.sortBst(array, mid + 1, end);

    return root;
  }

  prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false,
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };
}
