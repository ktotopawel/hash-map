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

  get(key) {
    const bucket = this.map[this.hash(key)];
    return bucket.contains(key) ? bucket.at(bucket.find(key)).value : null;
  }

  has(key) {
    return this.map[this.hash(key)].contains(key);
  }

  remove(key) {
    const bucket = this.map[this.hash(key)];

    if (!bucket.contains(key)) {
      return false;
    }

    bucket.removeAt(bucket.find(key));
    return true;
  }

  length() {
    let count = 0;
    this.map.forEach((bucket) => {
      count += bucket.size();
    });
    return count;
  }

  clear() {
    this.map.forEach((bucket) => {
      for (let i = 0; i < bucket.size(); i++) {
        bucket.removeAt(i);
      }
    });
  }

  keys() {
    const keysArr = [];
    this.map.forEach((bucket) => {
      for (let i = 0; i < bucket.size(); i++) {
        keysArr.push(bucket.at(i).key);
      }
    });
    return keysArr;
  }

  values() {
    const valuesArr = [];
    this.map.forEach((bucket) => {
      for (let i = 0; i < bucket.size(); i++) {
        valuesArr.push(bucket.at(i).value);
      }
    });
    return valuesArr;
  }

  printMap() {
    this.map.forEach((node, index) => {
      const stringifiedList = node.toString();

      console.log(`Bucket: ${index}`);
      if (stringifiedList === "") {
        console.log("empty");
      } else {
        console.log(stringifiedList);
      }
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
test.set("Sita", "Blabla");
console.log('GET "Rama": ', test.get("Rama"));
console.log('contains "jestescie"? ', test.has("jestescie"));
test.remove("jestem");
test.set("acab", "baca");
test.set("bajo", "jajo");
test.printMap();
console.log(test.length());
console.log(test.keys());
console.log(test.values());

// test.clear();
// test.printMap();
// console.log(test.length());
