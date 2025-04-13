class WorkerPool {
  constructor(size = navigator.hardwareConcurrency || 4) {
    this.size = size;
    this.tasks = [];
    this.workers = [];
    this.initialize();
  }

  initialize() {
    // Since we can't use Web Workers in this environment,
    // we'll simulate them with Promise-based processing
    this.workers = Array(this.size).fill(null).map(() => ({
      busy: false,
      task: null
    }));
  }

  async execute(task) {
    return new Promise((resolve, reject) => {
      const worker = this.workers.find(w => !w.busy);
      
      if (worker) {
        worker.busy = true;
        worker.task = task;
        
        Promise.resolve()
          .then(() => task())
          .then(result => {
            worker.busy = false;
            worker.task = null;
            resolve(result);
          })
          .catch(error => {
            worker.busy = false;
            worker.task = null;
            reject(error);
          });
      } else {
        this.tasks.push({ task, resolve, reject });
      }
    });
  }

  async processQueue() {
    while (this.tasks.length > 0) {
      const worker = this.workers.find(w => !w.busy);
      if (!worker) break;

      const { task, resolve, reject } = this.tasks.shift();
      worker.busy = true;
      worker.task = task;

      try {
        const result = await task();
        resolve(result);
      } catch (error) {
        reject(error);
      } finally {
        worker.busy = false;
        worker.task = null;
      }
    }
  }

  terminate() {
    this.workers.forEach(worker => {
      worker.busy = false;
      worker.task = null;
    });
    this.tasks = [];
  }
}

export default WorkerPool;