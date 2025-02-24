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

  insert(value) {
    function ins(root, value) {
      if (root === null) return new Node(value);

      if (root.data === value) return root;

      if (value < root.data) {
        root.left = ins(root.left, value);
      } else if (value > root.data) {
        root.right = ins(root.right, value);
      }

      return root;
    }

    ins(this.root, value);
  }

  deleteItem(value) {
    function getS(curr) {
      curr = curr.right;

      while (curr !== null && curr.left !== null) {
        curr = curr.left;
      }

      return curr;
    }

    function del(root, value) {
      if (root === null) return root;

      if (root.data > value) {
        root.left = del(root.left, value);
      } else if (root.data < value) {
        root.right = del(root.right, value);
      } else {
        if (root.left === null) return root.right;

        if (root.right === null) return root.left;

        let succ = getS(root);

        root.data = succ.data;
        root.right = del(root.right, succ.data);
      }

      return root;
    }

    del(this.root, value);
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
