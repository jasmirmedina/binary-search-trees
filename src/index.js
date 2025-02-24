import Tree from "./tree.js";

const array = Array.from({ length: 20 }, () => Math.floor(Math.random() * 20));

const bst = new Tree(array);

console.log("Tree structure:");
bst.prettyPrint(bst.root);

console.log("\nIs the tree balanced?");
console.log(bst.isBalanced());

console.log("\nPost-order traversal:");
bst.postOrder((node) => console.log(node.data));

console.log("\nIn-order traversal:");
bst.inOrder((node) => console.log(node.data));

console.log("\nPre-order traversal:");
bst.preOrder((node) => console.log(node.data));

console.log("\nPost-order traversal again:");
bst.postOrder((node) => console.log(node.data));
