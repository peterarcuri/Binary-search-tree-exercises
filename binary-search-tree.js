class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {

    if(this.root === null) {
        this.root = new Node(val);
        return this;
    }

    let current = this.root;

    while(true) {
        if(val < current.val) {
            if(current.left === null) {
                current.left = new Node(val);
                return this;
            }
            current = current.left;
        }
        else {
            if(current.right === null) {
                current.right = new Node(val);
                return this;
            }
            current = current.right;
        }
    }
}

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val, current = this.root) {
    if(this.root === null) {
        this.root = new Node(val);
        return this;
    }
    if(current === null) {
        return new Node(val);
    }
    if(val < current.val) {
        current.left = this.insertRecursively(val, current.left);
    }
    else if(val > current.val) {
        current.right = this.insertRecursively(val, current.right);
    }
    return current;
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {

    let current = this.root;

    while(current !== null) {
        if(val === current.val) {
            return current;
        }
        else if(val < current.val) {
            current = current.left;
        }
        else {
            current = current.right;
        }
    }
    return undefined;
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val, current = this.root) {
    if(current === null) {
        return undefined;
    }
    if(val === current.val) {
        return current;
    }
    else if(val < current.val) {
        return this.findRecursively(val, current.left);
    }
    else {
        return this.findRecursively(val, current.right);
    }
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    const data = [];

    function traverse(current) {
        if(!current) return;

        data.push(current.val);
        traverse(current.left);
        traverse(current.right);
    }
    traverse(this.root);
    return data;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    const data = [];

    function traverse(node) {
        if(node === null) return;

        traverse(node.left);
        data.push(node.val);
        traverse(node.right);
    }
    traverse(this.root);
    return data;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    const data = [];

    function traverse(node) {
        if(node === null) return;

        traverse(node.left);
        traverse(node.right);
        data.push(node.val);
    }
    traverse(this.root);
    return data;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    if(this.root === null) {
        return [];
    }
    const queue = [this.root];
    const data = [];

    while(queue.length > 0) {
        const current = queue.shift();
        data.push(current.val);

        if(current.left !== null) {
            queue.push(current.left);
        }
        if(current.right !== null) {
            queue.push(current.right);
        }
    }
    return data;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  findMin(node) { // helper function to find the minimum value node in a subtree
    while(node.left !== null) {
        node = node.left;
    }
    return node;
  }
  remove(val) {
      this.root = this.remove_Node(this.root, val);
  }
  remove_Node(node, val) { 
    if(node === null) {
        return null; // Base case: node not found
    }
    if(val < node.val) { // Traverse left subtree
        node.left = this.remove_Node(node.left, val);
    }
    else if(val > node.val) { // Traverse right subtree
        node.right = this.remove_Node(node.right, val);
    }
    else { // Node to be removed is found
        if(node.left === null && node.right === null) { // Node with no children(leaf node)
            return null;
        }

        if(node.left === null) { // Node with one child
            return node.right;
        }
        if(node.right === null) {
            return node.left;
        }

        // Node with two children
        let minNode = this.findMin(node.right); // find the minimum node in the right subtree
        node.val = minNode.val; // copy value of successor to the current node
        node.right = this.remove_Node(node.right, minNode.val); // Remove the successor
    }
    return node;
}

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced() {
    return this.check_balance(this.root) !== -1;
}
check_balance(node) {
    if(node === null) {
        return 0;
    }

    const leftHeight = this.check_balance(node.left);
    if(leftHeight === -1) {
        return -1;
    }

    const rightHeight = this.check_balance(node.right);
    if(rightHeight === -1) {
        return -1;
    }

    if(Math.abs(leftHeight - rightHeight) > 1) {
        return -1;
    }
    
    return Math.max(leftHeight, rightHeight) + 1;
}

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest(node = this.root) {
    // if the tree is too small, return
    if (!this.root || (!this.root.left && !this.root.right)) return;

    while (node) {
      // Current is largest and has a left subtree and 2nd largest is the largest in that subtree
      if (node.left && !node.right) {
        return this.findSecondHighest(node.left);
      }
      // Current is parent of largest and largest has no children so current is 2nd largest
      if (node.right && (!node.right.left && !node.right.right)) {
        return node.val;
      }
      node = node.right;
    }
  }
  dfsInOrderIteratively() {
    const data = [];
    const stack = [];
    let current = this.root;

    while(current || stack.length > 0) {
        while(current) {
            stack.push(current);
            current = current.left;
        }

        current = stack.pop();
        data.push(current.val);

        current = current.right;
    }
    return data;
  }
}

console.log('============================================================');

// insert()

let binarySearchTree = new BinarySearchTree();
binarySearchTree.insert(15);
binarySearchTree.insert(20);
binarySearchTree.insert(10);
binarySearchTree.insert(12);

console.log(binarySearchTree.root.val);
console.log(binarySearchTree.root.right.val);
console.log(binarySearchTree.root.left.right.val);

console.log('============================================================');

// insertRecursively

let binarySearchTree2 = new BinarySearchTree();

binarySearchTree2.insertRecursively(15);
binarySearchTree2.insertRecursively(20);
binarySearchTree2.insertRecursively(10);
binarySearchTree2.insertRecursively(12);

console.log(binarySearchTree2.root.val); // 15
console.log(binarySearchTree2.root.right.val); // 20
console.log(binarySearchTree2.root.left.right.val); // 12

console.log('============================================================');

// find()

let binarySearchTree3 = new BinarySearchTree();
binarySearchTree3.insert(15)
binarySearchTree3.insert(20)
binarySearchTree3.insert(10)
binarySearchTree3.insert(12);

let foundNode = binarySearchTree3.find(20);

console.log(foundNode.val); // 20
console.log(foundNode.left);  // null
console.log(foundNode.right);  // null


console.log('============================================================');

//findRecursively()

let binarySearchTree4 = new BinarySearchTree();
binarySearchTree4.insert(15)
binarySearchTree4.insert(20)
binarySearchTree4.insert(10)
binarySearchTree4.insert(12);
let foundNode2 = binarySearchTree4.findRecursively(20);

console.log(foundNode2.val); // 20
console.log(foundNode2.left); // null
console.log(foundNode2.right); // null


console.log('============================================================');

// dfsPreOrder()

let binarySearchTree5 = new BinarySearchTree();
binarySearchTree5.insert(15)
binarySearchTree5.insert(20)
binarySearchTree5.insert(10)
binarySearchTree5.insert(12)
binarySearchTree5.insert(1)
binarySearchTree5.insert(5)
binarySearchTree5.insert(50);
binarySearchTree5.dfsPreOrder() // [15, 10, 1, 5, 12, 20, 50]

console.log(binarySearchTree5.dfsPreOrder());


console.log('============================================================');

// dfsInOrder()

let binarySearchTree6 = new BinarySearchTree();
binarySearchTree6.insert(15)
binarySearchTree6.insert(20)
binarySearchTree6.insert(10)
binarySearchTree6.insert(12)
binarySearchTree6.insert(1)
binarySearchTree6.insert(5)
binarySearchTree6.insert(50);
binarySearchTree6.dfsInOrder() // [1, 5, 10, 12, 15, 20, 50]

console.log(binarySearchTree6.dfsInOrder());

console.log('============================================================');

// dfsPostOrder()

let binarySearchTree7 = new BinarySearchTree();
binarySearchTree7.insert(15)
binarySearchTree7.insert(20)
binarySearchTree7.insert(10)
binarySearchTree7.insert(12)
binarySearchTree7.insert(1)
binarySearchTree7.insert(5)
binarySearchTree7.insert(50);
binarySearchTree7.dfsPostOrder() // [5, 1, 12, 10, 50, 20, 15]

console.log(binarySearchTree7.dfsPostOrder());

console.log('============================================================');

// bfs()

let binarySearchTree8 = new BinarySearchTree();
binarySearchTree8.insert(15)
binarySearchTree8.insert(20)
binarySearchTree8.insert(10)
binarySearchTree8.insert(12)
binarySearchTree8.insert(1)
binarySearchTree8.insert(5)
binarySearchTree8.insert(50);
binarySearchTree8.bfs() // [15, 10, 20, 1, 12, 50, 5]

console.log(binarySearchTree8.bfs());

console.log('============================================================');

// remove()

let binarySearchTree9 = new BinarySearchTree();
binarySearchTree9.insert(15)
binarySearchTree9.insert(20)
binarySearchTree9.insert(10)
binarySearchTree9.insert(12)
binarySearchTree9.insert(1)
binarySearchTree9.insert(5)
binarySearchTree9.insert(50);
binarySearchTree9.remove(50);

console.log(binarySearchTree9.root.right.val);  // 20
console.log(binarySearchTree9.root.right.right);  // null


binarySearchTree9.remove(5);

console.log(binarySearchTree9.root.left.left.val); // 1
console.log(binarySearchTree9.root.left.left.right);  // null


console.log('============================================================');

// isBalanced()

// Construct a balanced binary search tree
const balancedTree = new BinarySearchTree(
    new Node(10, new Node(5), new Node(15))
  );
  
  // Check if the balanced tree is balanced
  console.log(balancedTree.isBalanced()); // Output: true
  
  // Construct a truly unbalanced binary search tree
  const unbalancedTree = new BinarySearchTree(
    new Node(10, new Node(5, new Node(3, new Node(1))), null) // 1 -> 3 -> 5 -> 10
  );
  
  // Check if the unbalanced tree is balanced
  console.log(unbalancedTree.isBalanced()); // Output: false


console.log('============================================================');

// findSecondHighest()

const bst = new BinarySearchTree();
bst.root = new Node(10);
bst.root.left = new Node(5);
bst.root.right = new Node(15);
bst.root.right.right = new Node(20);
bst.root.right.left = new Node(12);

console.log(bst.findSecondHighest()); // Output: 15

console.log('============================================================');

// dfsInOrder_Iterative()

const bst2 = new BinarySearchTree();
bst2.root = new Node(10);
bst2.root.left = new Node(5);
bst2.root.right = new Node(15);
bst2.root.left.left = new Node(3);
bst2.root.left.right = new Node(7);
bst2.root.right.right = new Node(18);

console.log(bst2.dfsInOrderIteratively()); // Output: [3, 5, 7, 10, 15, 18]


console.log('============================================================');

module.exports = BinarySearchTree;
