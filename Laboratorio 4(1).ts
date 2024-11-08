export class NodeRBT {
    private data: number;
    private father!: NodeRBT; 
    private leftChild!: NodeRBT; 
    private rightChild!: NodeRBT; 
    private color: string;

    constructor(data: number, isLeaf?: boolean) {
        this.data = data;
        this.color = "RED";
        if (isLeaf)
            this.color = "BLACK";
    }

    public getData(): number {
        return this.data;
    }

    public setFather(newFather: NodeRBT): void {
        this.father = newFather;
    }

    public getFather(): NodeRBT {
        return this.father;
    }

    public setLeftChild(newChild: NodeRBT): void {
        this.leftChild = newChild;
    }

    public getLeftChild(): NodeRBT {
        return this.leftChild;
    }

    public setRightChild(newChild: NodeRBT): void {
        this.rightChild = newChild;
    }

    public getRightChild(): NodeRBT {
        return this.rightChild;
    }

    public setNodeAsRed(): void {
        this.color = "RED";
    }

    public setNodeAsBlack(): void {
        this.color = "BLACK";
    }

    public getColor(): string {
        return this.color;
    }
}


class RBTree {
    private root: NodeRBT;
    private leaf: NodeRBT;

    constructor() {
        this.leaf = new NodeRBT(0, true);  // Nodo hoja, color negro
        this.root = this.leaf;
    }

    // Método para corregir el balance del árbol después de la inserción
    private fixInsert(testNode: NodeRBT): void {
        while (testNode !== this.root && testNode.getFather().getColor() == "RED") {
            if (testNode.getFather() === testNode.getFather().getFather().getLeftChild()) {
                let uncle: NodeRBT = testNode.getFather().getFather().getRightChild();
                if (uncle.getColor() === "RED") {
                    testNode.getFather().setNodeAsBlack();
                    uncle.setNodeAsBlack();
                    testNode.getFather().getFather().setNodeAsRed();
                    testNode = testNode.getFather().getFather();
                } else {
                    if (testNode === testNode.getFather().getRightChild()) {
                        testNode = testNode.getFather();
                        this.leftRotate(testNode);
                    }
                    testNode.getFather().setNodeAsBlack();
                    testNode.getFather().getFather().setNodeAsRed();
                    this.rightRotate(testNode.getFather().getFather());
                }
            } else {
                let uncle: NodeRBT = testNode.getFather().getFather().getLeftChild();
                if (uncle.getColor() === "RED") {
                    testNode.getFather().setNodeAsBlack();
                    uncle.setNodeAsBlack();
                    testNode.getFather().getFather().setNodeAsRed();
                    testNode = testNode.getFather().getFather();
                } else {
                    if (testNode === testNode.getFather().getLeftChild()) {
                        testNode = testNode.getFather();
                        this.rightRotate(testNode);
                    }
                    testNode.getFather().setNodeAsBlack();
                    testNode.getFather().getFather().setNodeAsRed();
                    this.leftRotate(testNode.getFather().getFather());
                }
            }
        }
        this.root.setNodeAsBlack();
    }

    // Rotación a la izquierda
    private leftRotate(x: NodeRBT): void {
        let y: NodeRBT = x.getRightChild();
        x.setRightChild(y.getLeftChild());
        if (y.getLeftChild() != this.leaf)
            y.getLeftChild().setFather(x);
        y.setFather(x.getFather());
        if (x.getFather() == this.leaf)
            this.root = y;
        else if (x === x.getFather().getLeftChild())
            x.getFather().setLeftChild(y);
        else
            x.getFather().setRightChild(y);
        y.setLeftChild(x);
        x.setFather(y);
    }

    // Rotación a la derecha
    private rightRotate(x: NodeRBT): void {
        let y: NodeRBT = x.getLeftChild();
        x.setLeftChild(y.getRightChild());
        if (y.getRightChild() != this.leaf)
            y.getRightChild().setFather(x);
        y.setFather(x.getFather());
        if (x.getFather() == this.leaf)
            this.root = y;
        else if (x === x.getFather().getRightChild())
            x.getFather().setRightChild(y);
        else
            x.getFather().setLeftChild(y);
        y.setRightChild(x);
        x.setFather(y);
    }

    public insert(data: number): void {
        let newNode: NodeRBT = new NodeRBT(data);
        newNode.setLeftChild(this.leaf);
        newNode.setRightChild(this.leaf);

        let parent: NodeRBT = this.leaf;
        let current: NodeRBT = this.root;

        while (current !== this.leaf) {
            parent = current;
            if (newNode.getData() < current.getData()) {
                current = current.getLeftChild();
            } else {
                current = current.getRightChild();
            }
        }

        newNode.setFather(parent);
        if (parent === this.leaf) {
            this.root = newNode;
        } else if (newNode.getData() < parent.getData()) {
            parent.setLeftChild(newNode);
        } else {
            parent.setRightChild(newNode);
        }

        if (newNode.getFather() === this.leaf) {
            newNode.setNodeAsBlack();
            return;
        }
        if (newNode.getFather().getFather() == this.leaf) return;

        this.fixInsert(newNode);
    }

    public search(data: number): number {
        let current: NodeRBT = this.root;
        while (current !== this.leaf) {
            if (current.getData() === data) {
                return data;
            } else if (data < current.getData()) {
                current = current.getLeftChild();
            } else {
                current = current.getRightChild();
            }
        }
        return -1;
        
    }

    // Recorrido inorden
    public inorder(node: NodeRBT): void {
        if (node !== this.leaf) {
            this.inorder(node.getLeftChild());
            console.log(node.getData() + "(" + node.getColor() + ")");
            this.inorder(node.getRightChild());
        }
    }
    // Recorrido Preorder
    public preorder(node: NodeRBT): void {
        if (node !== this.leaf) {
            console.log(node.getData() + "(" + node.getColor() + ")");
            this.preorder(node.getLeftChild());
            this.preorder(node.getRightChild());
        }
    }
    // Recorrido Postorder
    public postorder(node: NodeRBT): void {
        if (node !== this.leaf) {
            this.postorder(node.getLeftChild());
            this.postorder(node.getRightChild());
            console.log(node.getData() + "(" + node.getColor() + ")");
        }
    }

    public inorderprint(): void {
        this.inorder(this.root);
    }

    public preorderprint(): void {
        this.preorder(this.root);
    }

    public postorderprint(): void {
        this.postorder(this.root);
    }
}


const myRBTree: RBTree = new RBTree();


myRBTree.insert(9);
myRBTree.insert(3);
myRBTree.insert(18);
myRBTree.insert(6);
myRBTree.insert(1);
myRBTree.insert(4);
myRBTree.insert(24);
myRBTree.insert(7);
myRBTree.insert(12);
myRBTree.insert(17);
myRBTree.insert(20);
myRBTree.insert(15);


const searchResult = myRBTree.search(9);

if (searchResult !== -1) {
    console.log(searchResult);
} else {
    console.log("-1");
}

// Llamando a los recorridos
console.log("Recorrido Inorden:");
myRBTree.inorderprint();

console.log("\nRecorrido Preorden:");
myRBTree.preorderprint();

console.log("\nRecorrido Postorden:");
myRBTree.postorderprint();
