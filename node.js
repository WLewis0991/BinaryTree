export { Node }

// Node creation

class Node {
    constructor(data, left=null, right=null) {
        this.data=data;
        this.left=left;
        this.right=right;
    }
}