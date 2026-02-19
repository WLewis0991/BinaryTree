import { Node } from "./node.js";

export { BST };

class BST {
	// Start with an empty tree.
	constructor() {
		this.root = null;
	}
	// Insert a new value in BST order. Ignores duplicates.
	add(data) {
		const node = this.root;
		if (node === null) {
			this.root = new Node(data);
			return;
		} else {
			const searchTree = function (node) {
				if (data < node.data) {
					if (node.left === null) {
						node.left = new Node(data);
						return;
					} else if (node.left !== null) {
						return searchTree(node.left);
					}
				} else if (data > node.data) {
					if (node.right === null) {
						node.right = new Node(data);
						return;
					} else if (node.right !== null) {
						return searchTree(node.right);
					}
				} else {
					return null;
				}
			};
			return searchTree(node);
		}
	}
	// Return the smallest value in the tree.
	findMin() {
		let current = this.root;
		while (current.left !== null) {
			current = current.left;
		}
		return current.data;
	}
	// Return the largest value in the tree.
	findMax() {
		let current = this.root;
		while (current.right !== null) {
			current = current.right;
		}
		return current.data;
	}
	// Check whether a value exists in the tree.
	includes(data) {
		let current = this.root;
		while (current) {
			if (data === current.data) {
				return true;
			}
			if (data < current.data) {
				current = current.left;
			} else {
				current = current.right;
			}
		}
		return false;
	}
	// Remove a value from the tree while preserving BST rules.
	remove(data) {
		const removeNode = function (node, data) {
			if (node == null) {
				return null;
			}
			if (data == node.data) {
				//if node has no children
				if (node.left == null && node.right == null) {
					return null;
				}
				//if node has no left child
				if (node.left == null) {
					return node.right;
				}
				//if node has no right chile
				if (node.right == null) {
					return node.left;
				}
				//if node has two children
				var tempNode = node.right;
				while (tempNode.left !== null) {
					tempNode = tempNode.left;
				}
				node.data = tempNode.data;
				node.right = removeNode(node.right, tempNode.data);
				return node;
			} else if (data < node.data) {
				node.left = removeNode(node.left, data);
				return node;
			} else {
				node.right = removeNode(node.right, data);
				return node;
			}
		};
		this.root = removeNode(this.root, data);
	}

	// Return how far a value is from the root. Root depth is 0.
	depth(value) {
		let current = this.root;
		let currentDepth = 0;

		while (current !== null) {
			if (value === current.data) {
				return currentDepth;
			}
			if (value < current.data) {
				current = current.left;
			} else {
				current = current.right;
			}
			currentDepth += 1;
		}
		return -1;
	}
	// Build a balanced tree from an array (sort + dedupe first).
	buildTree(arr) {
	    const sorted = [...new Set(arr)].sort(this.compareNumbers);
	    this.root = this.sortedArray(sorted);
	    return this.root;
	}
	// Numeric sort helper used by buildTree.
    compareNumbers(a, b) {
        return a - b;
    }
	// Build a BST from a sorted array.
	sortedArray(arr) {
		return this.sortedArrayRecur(arr, 0, arr.length - 1);
	}
	// Recursively choose middle elements to keep the tree balanced.
	sortedArrayRecur(arr, start, end) {
		if (start > end) return null;

		const mid = start + Math.floor((end - start) / 2);
		const root = new Node(arr[mid]);

		// Divide from middle 
		root.left = this.sortedArrayRecur(arr, start, mid - 1);
		root.right = this.sortedArrayRecur(arr, mid + 1, end);

		return root;
	}
	// Return height from a starting node (pass 0 for h at the first call).
	getHeight(root, h) {
		if (root === null) return h - 1;
		return Math.max(this.getHeight(root.left, h + 1), this.getHeight(root.right, h + 1));
	}
	// Visit nodes level by level (BFS). Returns values if no callback is given.
	levelOrder(callback) {
		if (this.root === null) {
			return [];
		}
		const queue = [this.root];
		const values = [];

		while (queue.length > 0) {
			const current = queue.shift();
			if (callback) {
				callback(current);
			} else {
				values.push(current.data);
			}

			if (current.left !== null) {
				queue.push(current.left);
			}
			if (current.right !== null) {
				queue.push(current.right);
			}
		}
		return callback ? undefined : values;
	}
	// In-order traversal (left, root, right).
	inOrder(callback, node = this.root, values = []) {
		if (node === null) {
			return callback ? undefined : values;
		}
		this.inOrder(callback, node.left, values);
		if (callback) {
			callback(node);
		} else {
			values.push(node.data);
		}
		this.inOrder(callback, node.right, values);
		return callback ? undefined : values;
	}
	// Pre-order traversal (root, left, right).
	preOrder(callback, node = this.root, values = []) {
		if (node === null) {
			return callback ? undefined : values;
		}
		if (callback) {
			callback(node);
		} else {
			values.push(node.data);
		}
		this.preOrder(callback, node.left, values);
		this.preOrder(callback, node.right, values);
		return callback ? undefined : values;
	}
	// Post-order traversal (left, right, root).
	postOrder(callback, node = this.root, values = []) {
		if (node === null) {
			return callback ? undefined : values;
		}
		this.postOrder(callback, node.left, values);
		this.postOrder(callback, node.right, values);
		if (callback) {
			callback(node);
		} else {
			values.push(node.data);
		}
		return callback ? undefined : values;
	}
	// Convenience helper that returns values in sorted order.
	inOrderValues(node = this.root, values = []) {
		return this.inOrder(undefined, node, values);
	}
	// Return true if every node's left/right subtree heights differ by at most 1.
	isBalanced(node = this.root) {
		const checkHeight = (current) => {
			if (current === null) {
				return 0;
			}
			const leftHeight = checkHeight(current.left);
			if (leftHeight === -1) {
				return -1;
			}
			const rightHeight = checkHeight(current.right);
			if (rightHeight === -1) {
				return -1;
			}
			if (Math.abs(leftHeight - rightHeight) > 1) {
				return -1;
			}
			return Math.max(leftHeight, rightHeight) + 1;
		};
		return checkHeight(node) !== -1;
	}
	// Rebuild the current tree into a balanced one.
	rebalance() {
		const values = this.inOrderValues();
		this.root = this.sortedArray(values);
		return this.root;
	}
}
