import { createContext, useContext, useReducer, useState } from "react";
import { data } from "../database/data";
import { taskReducer } from "../reducer/taskReducer";

// Create a context for shared task state and functionality
const taskContext = createContext(null);

export default function TaskProvider({ children }) {
    // Manage task state with reducer and other relevant states
    const [tasks, dispatch] = useReducer(taskReducer, data);
    const [searchValue, setSearchValue] = useState("");
    const [showModal, setShowModal] = useState(false); // Flag for modal visibility
    const [currentTask, setCurrentTask] = useState(null);

    // Define handlers for actions
    const handleSearchValue = (e) => setSearchValue(e.target.value);
    const handleShowModal = (action) => setShowModal(action);
    const handleCurrentTask = (data) => setCurrentTask(data);

    // Consolidate state and handlers for convenient context access
    const state = {
        tasks,
        dispatch,
        searchValue,
        handleSearchValue,
        showModal,
        handleShowModal,
        handleCurrentTask,
        currentTask,
    };

    return (
        <taskContext.Provider value={state}>{children}</taskContext.Provider>
    );
}

// Hook to access context values in child components
export const useTasks = () => {
    return useContext(taskContext);
};
