export default function generateId(tasks = []) {
    // Find the highest existing ID among the tasks using the reduce method
    const nextId = tasks.reduce((prev, curr) => (prev.id > curr.id ? prev : curr)).id;

    // Return the next available ID, which is one greater than the highest existing ID
    return nextId + 1;
}
