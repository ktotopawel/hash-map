export default class LinkedList {
  constructor() {
    (this.head = null), (this.tail = this.head);
  }

  append(key, value) {
    const newNode = new Node(key, value, null);

    if (!this.head) {
      this.addFirst(newNode);
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
  }

  prepend(key, value) {
    const newNode = new Node(key, value, null);

    if (!this.head) {
      this.addFirst(newNode);
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
  }

  size() {
    if (!this.head) return 0;

    let counter = 0;
    let currentNode = this.head;

    while (currentNode.next) {
      counter++;
      currentNode = currentNode.next;
    }

    return counter + 1; //returns (+1) because the while loop stops before tail
  }

  //returns node with given index
  at(index) {
    let currentNode = this.head;

    for (let i = 0; i < this.size(); i++) {
      if (i === index) {
        return currentNode;
      }
      currentNode = currentNode.next;
    }
  }

  pop() {
    const secondToLast = this.at(this.size() - 2);
    console.log("popped: ", secondToLast.next);
    secondToLast.next = null;
  }

  contains(key) {
    let currentNode = this.head;

    for (let i = 0; i < this.size(); i++) {
      if (currentNode.key === key) {
        return true;
      }
      currentNode = currentNode.next;
    }

    return false;
  }

  //returns index of node with the searched for key
  find(key) {
    let currentNode = this.head;

    for (let i = 0; i < this.size(); i++) {
      if (currentNode.key === key) {
        return i;
      }
      currentNode = currentNode.next;
    }
    return null;
  }

  toString() {
    const stringArr = [];
    let currentNode = this.head;

    for (let i = 0; i < this.size(); i++) {
      stringArr.push("( " + currentNode.key + ": " + currentNode.value + " )");
      currentNode = currentNode.next;
    }

    return stringArr.join(" -> ");
  }

  insertAt(value, index) {
    const prevNode = this.at(index - 1);
    const newNode = new Node(value);
    newNode.next = prevNode.next;
    prevNode.next = newNode;
  }

  removeAt(index) {
    const removedNode = this.at(index);

    if (removedNode === this.head) {
      this.head = null;
      this.tail = null;
      return;
    }

    const prevNode = this.at(index - 1);

    prevNode.next = removedNode.next;
  }

  addFirst(newNode) {
    this.head = newNode;
    this.tail = this.head;
    this.tail.next = null;
  }
}

class Node {
  constructor(key = null, value = null, next = null) {
    (this.key = key), (this.value = value), (this.next = next);
  }
}
