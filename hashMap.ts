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
    get(key: string): boolean | null;
    has(key: string): boolean;
    remove(key: string): boolean;
    length(): number;
    clear(): void;
    keys(): string[];
    values(): string[];
    entries(): [string, string][];
}