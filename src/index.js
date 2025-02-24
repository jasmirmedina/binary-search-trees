import Tree from "./tree.js";

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const bst = new Tree(array);

bst.insert(99);
bst.deleteItem(23);

bst.prettyPrint(bst.root);
