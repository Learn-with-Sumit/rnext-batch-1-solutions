import generateId from "../utils/generateId";
import { ADDED, ALL_DELETE, DELETED, UPDATED } from "./actions";

export const taskReducer = (state, action) => {
    // Handle different actions to update the task state
    switch (action.type) {
        case ADDED:
            // Add a new task with a generated ID and initialize "favorite" state
            return [
                ...state,
                {
                    ...action.payload, // Spread payload data for task properties
                    id: state.length > 0 ? generateId(state) : 1, // Ensure unique ID
                    favorite: false, // Initialize task as not favorite
                },
            ];

        case UPDATED:
            // Update an existing task
            return state.map((task) =>
                task.id === action.payload.id ? action.payload : task
            );

        case DELETED:
            // Remove a task with the specified ID
            return state.filter((task) => task.id !== action.payload);

        case ALL_DELETE:
            // Clear all tasks from the state
            return [];

        default:
            // Return the state unchanged for unrecognized actions
            return state;
    }
};
