import Node from "./node.js";
import mergeSort from "./merge-sort.js";
import removeDuplicates from "./remove-duplicates.js";

export default class Tree {
  constructor(array) {
    const sortedArray = removeDuplicates(mergeSort(array));
    this.root = this.buildTree(sortedArray);
  }

  buildTree(array) {
    return this.sortBst(array, 0, array.length - 1);
  }

  sortBst(array, start, end) {
    if (start > end) return null;

    const mid = start + Math.floor((end - start) / 2);
    const root = new Node(array[mid]);

    root.left = this.sortBst(array, start, mid - 1);
    root.right = this.sortBst(array, mid + 1, end);

    return root;
  }

  insert(value, root = this.root) {
    if (root === null) return new Node(value);

    if (value === root.data) return root;

    if (value < root.data) {
      root.left = this.insert(value, root.left);
    } else {
      root.right = this.insert(value, root.right);
    }

    return root;
  }

  deleteItem(value, root = this.root) {
    if (root === null) return root;

    if (value < root.data) {
      root.left = this.deleteItem(value, root.left);
    } else if (value > root.data) {
      root.right = this.deleteItem(value, root.right);
    } else {
      if (root.left === null) return root.right;
      if (root.right === null) return root.left;

      const successor = this.getSuccessor(root);
      root.data = successor.data;
      root.right = this.deleteItem(successor.data, root.right);
    }

    return root;
  }

  getSuccessor(curr) {
    curr = curr.right;
    while (curr && curr.left) {
      curr = curr.left;
    }
    return curr;
  }

  find(value, root = this.root) {
    if (root === null) return null;

    if (value === root.data) return root;

    return value < root.data
      ? this.find(value, root.left)
      : this.find(value, root.right);
  }

  inOrder(callback, node = this.root) {
    if (node === null) return;
    this.inOrder(callback, node.left);
    callback(node);
    this.inOrder(callback, node.right);
  }

  preOrder(callback, node = this.root) {
    if (node === null) return;
    callback(node);
    this.preOrder(callback, node.left);
    this.preOrder(callback, node.right);
  }

  postOrder(callback, node = this.root) {
    if (node === null) return;
    this.postOrder(callback, node.left);
    this.postOrder(callback, node.right);
    callback(node);
  }

  height(node) {
    if (!node) return -1;
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(node, currentNode = this.root, depth = 0) {
    if (currentNode === null) return null;
    if (node === currentNode) return depth;
    return node.data < currentNode.data
      ? this.depth(node, currentNode.left, depth + 1)
      : this.depth(node, currentNode.right, depth + 1);
  }

  isBalanced(node = this.root) {
    if (!node) return true;

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    if (Math.abs(leftHeight - rightHeight) > 1) return false;

    return this.isBalanced(node.left) && this.isBalanced(node.right);
  }

  rebalance() {
    const array = [];
    this.inOrder((node) => array.push(node.data));
    this.root = this.buildTree(array);
  }

  prettyPrint(node, prefix = "", isLeft = true) {
    if (!node) return;
    this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
}
