"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHashMap = createHashMap;
function createHashNode(key, value) {
    return {
        key,
        value,
        next: null,
    };
}
function createHashMap(initialCapacity = 16, loadFactor = 0.75) {
    let buckets = new Array(initialCapacity).fill(null);
    let size = 0;
    function checkIndex(index) {
        if (index < 0 || index >= buckets.length) {
            throw new Error('Trying to access index out of bounds');
        }
    }
    function hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % buckets.length;
        }
        return hashCode;
    }
    function resize() {
        const oldBuckets = buckets;
        buckets = new Array(buckets.length * 2).fill(null);
        size = 0;
        for (const bucket of oldBuckets) {
            let current = bucket;
            while (current) {
                set(current.key, current.value);
                current = current.next;
            }
        }
    }
    function set(key, value) {
        const index = hash(key);
        checkIndex(index);
        if (!buckets[index]) {
            buckets[index] = createHashNode(key, value);
            size++;
        }
        else {
            let current = buckets[index];
            while (current) {
                if (current.key === key) {
                    current.value = value;
                    return;
                }
                if (!current.next)
                    break;
                current = current.next;
            }
            current.next = createHashNode(key, value);
            size++;
        }
        if (size / buckets.length >= loadFactor) {
            resize();
        }
    }
    return {
        buckets,
        capacity: initialCapacity,
        loadFactor,
        size,
        hash(key) {
            return hash(key);
        },
        set,
        get(key) {
            const index = hash(key);
            checkIndex(index);
            let current = buckets[index];
            while (current) {
                if (current.key === key)
                    return current.value;
                current = current.next;
            }
            return null;
        },
        has(key) {
            const index = hash(key);
            checkIndex(index);
            let current = buckets[index];
            while (current) {
                if (current.key === key)
                    return true;
                current = current.next;
            }
            return false;
        },
        remove(key) {
            const index = hash(key);
            checkIndex(index);
            let current = buckets[index];
            if (!current)
                return false;
            if (current.key === key) {
                buckets[index] = current.next;
                size--;
                return true;
            }
            while (current.next) {
                if (current.next.key === key) {
                    current.next = current.next.next;
                    size--;
                    return true;
                }
                current = current.next;
            }
            return false;
        },
        length() {
            return size;
        },
        clear() {
            buckets = new Array(buckets.length).fill(null);
            size = 0;
        },
        keys() {
            const result = [];
            for (const bucket of buckets) {
                let current = bucket;
                while (current) {
                    result.push(current.key);
                    current = current.next;
                }
            }
            return result;
        },
        values() {
            const result = [];
            for (const bucket of buckets) {
                let current = bucket;
                while (current) {
                    result.push(current.value);
                    current = current.next;
                }
            }
            return result;
        },
        entries() {
            const result = [];
            for (const bucket of buckets) {
                let current = bucket;
                while (current) {
                    result.push([current.key, current.value]);
                    current = current.next;
                }
            }
            return result;
        },
    };
}
