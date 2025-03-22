import Node from "./node.js";

export default class LinkedList {
  constructor() {
    (this.head = null), (this.tail = this.head);
  }

  append(value) {
    const newNode = new Node(value, null);

    if (!this.head) {
      this.addFirst(newNode);
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
  }

  prepend(value) {
    const newNode = new Node(value, null);

    if (!this.head) {
      this.addFirst(newNode);
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
  }

  size() {
    let counter = 0;
    let currentNode = this.head;

    while (currentNode.next !== null) {
      counter++;
      currentNode = currentNode.next;
    }

    return counter + 1; //returns (+1) because the while loop stops before tail
  }

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

  contains(value) {
    let currentNode = this.head;

    for (let i = 0; i < this.size(); i++) {
      if (currentNode.value === value) {
        return true;
      }
      currentNode = currentNode.next;
    }

    return false;
  }

  find(value) {
    let currentNode = this.head;

    for (let i = 0; i < this.size(); i++) {
      if (currentNode.value === value) {
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
      stringArr.push("( " + currentNode.value + " )");
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
    const prevNode = this.at(index - 1);
    const removedNode = this.at(index);

    prevNode.next = removedNode.next;
  }

  addFirst(newNode) {
    this.head = newNode;
    this.tail = this.head;
    this.tail.next = null;
  }
}
