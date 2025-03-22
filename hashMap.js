import LinkedList from "./nodes/linked-list.js";

class HashMap {
  constructor(capacity = 16, loadFactor = 0.8) {
    this.capacity = capacity;
    this.loadFactor = loadFactor;
    this.map = [];
    this.populateMap();
  }

  hash(key) {
    let code = 0;

    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      code = (primeNumber * code + key.charCodeAt(i)) % this.capacity;
    }

    return code;
  }

  set(key, value) {
    const bucket = this.map[this.hash(key)];

    if (bucket.contains(key)) {
      bucket.at(bucket.find(key)).value = value;
    } else {
      bucket.append(key, value);
    }
  }

  printMap() {
    return this.map.forEach((node) => {
      console.log(node.toString());
    });
  }

  populateMap() {
    for (let i = 0; i < this.capacity; i++) {
      this.map[i] = this.map[i] || new LinkedList();
    }
  }
}

const test = new HashMap(16, 0.8);
test.set("Rama", "Blabla");
test.set("jestem", "bialy");
test.set("Rama", "Margaryna");
test.printMap();
