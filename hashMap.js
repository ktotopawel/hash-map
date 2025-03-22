import LinkedList from "./nodes/linked-list.js";

export default class HashMap {
  constructor(capacity = 16, loadFactor = 0.8) {
    this.capacity = capacity;
    this.loadFactor = loadFactor;
    this.map = [];
    this.populateMap();
  }

  getBucket(key) {
    for (let bucket of this.map) {
      if (bucket.contains(key)) return bucket;
    }
    return null;
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
    if (this.has(key)) {
      const bucket = this.getBucket(key);
      bucket.at(bucket.find(key)).value = value;
    } else {
      const bucket = this.map[this.hash(key)];
      bucket.append(key, value);
    }

    if (this.length() > this.capacity * this.loadFactor) {
      this.capacity *= 2;
      this.populateMap();
    }
  }

  get(key) {
    const bucket = this.getBucket(key);
    return bucket.contains(key) ? bucket.at(bucket.find(key)).value : null;
  }

  has(key) {
    return this.getBucket(key) ? true : false;
  }

  remove(key) {
    const bucket = this.getBucket(key);

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

  entries() {
    const valuesArr = [];
    this.map.forEach((bucket) => {
      for (let i = 0; i < bucket.size(); i++) {
        const entry = [];
        entry.push(bucket.at(i).key);
        entry.push(bucket.at(i).value);
        valuesArr.push(entry);
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
