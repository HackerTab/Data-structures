class Queue {
    constructor() {
        this.items = [];
    }
    enqueue(value) {
        this.items.push(value);
    }
    dequeue() {
        if (this.isEmpty()) {
        return undefined;
        }
        return this.items.shift();
    }
    peek() {
        return this.items[0];
    }
    isEmpty() {
        return this.items.length === 0;
    }
}

class PrinterQueue {
    constructor() {
        this.queue = new Queue();
    }
    addJob(name, pages) {
        const job = {
            name: name,
            pages: pages
        };
        this.queue.enqueue(job);
        console.log(`${name} added to the queue.`);
    }
    processJob() {
        if (this.queue.isEmpty()) {
            console.log("No jobs in the queue.");
            return;
        }
        const job =this.queue.dequeue();
        console.log(
            `Printing ${job.name} (${job.pages} pages)...`
        );
    }
    printQueue(){
        if (this.queue.isEmpty()) {
            console.log("The printer queue is empty.");
            return;
        }
        console.log("Current Printer Queue:");
        console.log(this.queue.items);
    }
}

//Testing 
const printerQueue = new PrinterQueue();
printerQueue.addJob("Job 1", 10);
printerQueue.addJob("Job 2", 5);
printerQueue.addJob("Job 3", 15);
printerQueue.printQueue();
printerQueue.processJob();
printerQueue.printQueue();
printerQueue.processJob();
printerQueue.printQueue();
printerQueue.processJob();
printerQueue.printQueue();