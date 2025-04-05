import { createHashMap } from "./hashMap";

const test = createHashMap(16, 0.75);


test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

console.log('Length', test.length());
console.log('Entries', test.entries());

test.set('apple', 'green');
console.log('New apple value:', test.get('apple'));
console.log('Length after overwrite:', test.length());

test.set('moon', 'silver');
console.log("Length after growth:", test.length());
console.log("Buckets length:", test.buckets.length);