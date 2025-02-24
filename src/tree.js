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

  insert(value, root = this.root) {
    if (root === null) return new Node(value);

    if (root.data === value) return root;

    if (value < root.data) {
      root.left = this.insert(value, root.left);
    } else {
      root.right = this.insert(value, root.right);
    }

    return root;
  }

  deleteItem(value, root = this.root) {
    if (root === null) return root;

    if (root.data > value) {
      root.left = this.deleteItem(value, root.left);
    } else if (root.data < value) {
      root.right = this.deleteItem(value, root.right);
    } else {
      if (root.left === null) return root.right;
      if (root.right === null) return root.left;

      let succ = this.getSuccessor(root);

      root.data = succ.data;
      root.right = this.deleteItem(succ.data, root.right);
    }

    return root;
  }

  getSuccessor(curr) {
    curr = curr.right;

    while (curr !== null && curr.left !== null) {
      curr = curr.left;
    }

    return curr;
  }

  find(value) {
    function fi(root, value) {
      if (root === null) return null;

      if (root.data === value) return root;

      if (value < root.data) {
        return fi(root.left, value);
      } else {
        return fi(root.right, value);
      }
    }

    return fi(this.root, value);
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
