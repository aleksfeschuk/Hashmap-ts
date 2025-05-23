interface HashNode {
    key: string;
    value: string;
    next: HashNode | null;
}

interface HashMap {
    buckets: (HashNode | null)[];
    capacity: number;
    loadFactor: number;
    size: number;
    hash(key: string): number;
    set(key: string, value: string): void;
    get(key: string): string | null;
    has(key: string): boolean;
    remove(key: string): boolean;
    length(): number;
    clear(): void;
    keys(): string[];
    values(): string[];
    entries(): [string, string][];
}

function createHashNode(key: string, value: string): HashNode {
    return {
        key,
        value,
        next: null,
    };
}

function createHashMap(initialCapacity: number = 16, loadFactor: number = 0.75): HashMap {
    let buckets: (HashNode | null)[] = new Array(initialCapacity).fill(null);
    let size = 0;

    function checkIndex(index: number) {
        if (index < 0 || index >= buckets.length) {
            throw new Error('Trying to access index out of bounds');
        }
    }

    function hash(key: string): number {
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

    function set (key: string, value: string): void {
        const index = hash(key);
        checkIndex(index);

        if(!buckets[index]) {
            buckets[index] = createHashNode(key, value);
            size++;
        } else {
            let current = buckets[index];
            while(current) {
                if (current.key === key) {
                    current.value = value;
                    return;
                }
                if (!current.next) break;
                current = current.next;
            }
            current!.next = createHashNode(key, value);
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

        hash(key: string): number {
            return hash(key);
        },

        set,
        
        get(key: string): string | null {
            const index = hash(key);
            checkIndex(index);

            let current = buckets[index];
            while (current) {
                if (current.key === key) return current.value;
                current = current.next;
            }
            return null;
        },

        has(key: string): boolean {
            const index = hash(key);
            checkIndex(index);

            let current = buckets[index];
            while (current) {
                if (current.key === key) return true;
                current = current.next;
            }
            return false;
        },

        remove(key: string): boolean {
            const index = hash(key);
            checkIndex(index);

            let current = buckets[index];
            if (!current) return false;

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

        length(): number {
            return size;
        },

        clear(): void {
            buckets = new Array(buckets.length).fill(null);
            size = 0;
        },

        keys(): string[] {
            const result: string[] = [];
            for(const bucket of buckets) {
                let current = bucket;
                while (current) {
                    result.push(current.key);
                    current = current.next;
                }
            }
            return result;
        },

        values(): string[] {
            const result: string[] = [];
            for (const bucket of buckets) {
                let current = bucket;
                while (current) {
                    result.push(current.value);
                    current = current.next;
                }
            }
            return result;
        },

        entries(): [string, string][] {
            const result: [string, string][] = [];
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

export { createHashMap };

