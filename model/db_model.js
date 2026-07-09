// Fake in-memory "database"
let tasks = [
  { id: 1, title: 'Buy groceries', done: false },
  { id: 2, title: 'Finish client project', done: false },
  { id: 3, title: 'Call the bank', done: true }
];

// Simulates an async DB call
async function fakeDbFind(id) {
  return new Promise((resolve, reject) => {
      if (id === 999) {
        reject (new Error('Database connection failed'));
      } else {
        resolve(tasks.find(t => t.id === id));
      }
  });
}

module.exports = {
    fakeDbFind,
    tasks
}