import { useState } from "react";
import { toast } from "react-toastify";
import { useTasks } from "../../contexts/TaskProvider";
import { ALL_DELETE } from "../../reducer/actions";
import Button from "../../ui/Button";
import DeleteModal from "../../ui/DeleteModal";

export default function TaskAction() {
    // Hook for task state and actions
    const { handleShowModal, dispatch, tasks } = useTasks();

    // State for controlling the delete confirmation modal
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    // Handles deletion of all tasks
    const handleTasksDelete = () => {
        dispatch({ type: ALL_DELETE }); // Dispatches action to delete all tasks
        toast.success("Successfully all tasks deleted"); // Displays success toast
        setShowDeleteModal(false); // Hides the delete confirmation modal
    };

    return (
        <>
            {/* Renders delete confirmation modal if needed */}
            {showDeleteModal && (
                <DeleteModal
                    message={"Are you sure you want to delete this all tasks?"}
                    onDelete={handleTasksDelete}
                    onShowDeleteModal={() => setShowDeleteModal(false)}
                />
            )}

            {/* Buttons for adding and deleting tasks */}
            <Button
                bg={"bg-blue-500"}
                onClick={() => handleShowModal(true)} // Shows task creation modal
            >
                Add Task
            </Button>
            <Button
                bg={"bg-red-500"}
                onClick={() => setShowDeleteModal(true)} // Shows delete confirmation modal
                disabled={tasks.length < 1} // Disables button if no tasks exist
            >
                Delete All
            </Button>
        </>
    );
}
