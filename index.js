import { BST } from "./tree.js";

const tree = new BST

tree.buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])

tree.add (3)
tree.add( 343)
tree.add(66)
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
};
 console.log(tree)

setTimeout(() => prettyPrint(tree.root), 2000);


console.log(tree.isBalanced())
tree.rebalance()
console.log(tree.isBalanced())