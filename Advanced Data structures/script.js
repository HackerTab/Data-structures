class GraphList {
/**
   * @param {number} size - Number of vertices (0 to size-1)
   * @param {boolean} isDirected - Optional flag for directed graph (default: false)
   */
constructor(size, isDirected = false) {
    this.size = size;
    this.isDirected = isDirected;
    // Initialize array of empty lists (one per vertex)
    this.list = Array.from({ length: size }, () => []);
}

  // Add edge u–v
addEdge(u, v) {
    this.list[u].push(v);
    if (!this.isDirected) {
        this.list[v].push(u);
    }
}

  // Remove edge u–v
removeEdge(u, v) {
    this.list[u] = this.list[u].filter(x => x !== v);
    if (!this.isDirected) {
        this.list[v] = this.list[v].filter(x => x !== u);
    }
}

  // Check for edge u–v
hasEdge(u, v) {
    return this.list[u].includes(v);
    }

  // List of neighbors of v
getNeighbors(v) {
    return this.list[v];
    }

  // Print the graph representation
printGraph() {
    for (let i = 0; i < this.size; i++) {
        console.log(`${i} -> ${this.list[i].join(', ')}`);
    }
    }

  // Depth-First Search (DFS)
dfs(start) {
    const visited = new Array(this.size).fill(false);
    const result = [];

    const traverse = (vertex) => {
        visited[vertex] = true;
        result.push(vertex);

    for (let neighbor of this.list[vertex]) {
        if (!visited[neighbor]) {
            traverse(neighbor);
        }
    }
    };

    traverse(start);
    console.log(`DFS from ${start}: ${result.join(' -> ')}`);
    return result;
    }

  // Breadth-First Search (BFS)
    bfs(start) {
    const visited = new Array(this.size).fill(false);
    const queue = [start];
    const result = [];

    visited[start] = true;

    while (queue.length > 0) {
        const vertex = queue.shift();
        result.push(vertex);

        for (let neighbor of this.list[vertex]) {
        if (!visited[neighbor]) {
            visited[neighbor] = true;
            queue.push(neighbor);
        }
    }
    }

    console.log(`BFS from ${start}: ${result.join(' -> ')}`);
    return result;
    }
}

// ==========================================
// TESTING (3+ Vertices)
// ==========================================

console.log("=== 1. Undirected Graph Test ===");
const undir = new GraphList(4, false); // Vertices 0, 1, 2, 3

undir.addEdge(0, 1);
undir.addEdge(0, 2);
undir.addEdge(1, 3);
undir.addEdge(2, 3);

undir.printGraph();

console.log("\nEdge Checks:");
console.log("hasEdge(0, 1):", undir.hasEdge(0, 1)); // true
console.log("hasEdge(1, 0):", undir.hasEdge(1, 0)); // true

console.log("\nTraversals starting from vertex 0:");
undir.dfs(0); // 0 -> 1 -> 3 -> 2
undir.bfs(0); // 0 -> 1 -> 2 -> 3

console.log("\n=== 2. Directed Graph Test ===");
const dir = new GraphList(4, true);

dir.addEdge(0, 1);
dir.addEdge(0, 2);
dir.addEdge(1, 3);

dir.printGraph();

console.log("\nEdge Checks:");
console.log("hasEdge(0, 1):", dir.hasEdge(0, 1)); // true
console.log("hasEdge(1, 0):", dir.hasEdge(1, 0)); // false

console.log("\nTraversals starting from vertex 0:");
dir.dfs(0); // 0 -> 1 -> 3 -> 2
dir.bfs(0); // 0 -> 1 -> 2 -> 3