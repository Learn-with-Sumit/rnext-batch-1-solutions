import { useState } from "react";
import { toast } from "react-toastify";
import { useTasks } from "../../contexts/TaskProvider";
import { DELETED } from "../../reducer/actions";
import DeleteModal from "../../ui/DeleteModal";
import Task from "./Task";

export default function Tasks({ filteredTasks }) {
    // Access task state and actions from context
    const { handleCurrentTask, currentTask, dispatch } = useTasks();
    let taskContent = null;
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const { id, title } = currentTask || {};

    // Render tasks content only if there are filtered tasks
    if (filteredTasks.length > 0) {
        taskContent = filteredTasks.map((task) => (
            <Task
                key={task.id}
                task={task}
                onDeleteModal={setShowDeleteModal} // Pass function to trigger delete modal
            />
        ));
    }

    // Handle exit from delete modal
    const handleShowDeleteModal = () => {
        handleCurrentTask(null); // Clear any selected task
        setShowDeleteModal(false);
    };
    // Handle task deletion
    const handleTaskDelete = (id) => {
        dispatch({ type: DELETED, payload: id }); // Dispatch delete action
        toast.success("Successfully deleted"); // Display success toast
        handleCurrentTask(null); // Clear selected task
        setShowDeleteModal(false);
    };

    return (
        <>
            {/* Render delete confirmation modal if needed */}
            {/* If I wanted to, I could do it within the task component, but there was a problem. 
            -> Warning: validateDOMNesting(...): <div> cannot appear as a child of <tbody>. <-
            So I followed this approach. To get out of this warning */}
            {showDeleteModal && (
                <DeleteModal
                    message={`Are you sure you want to delete "${title}"?`}
                    onShowDeleteModal={handleShowDeleteModal}
                    onDelete={() => handleTaskDelete(id)}
                />
            )}
            <div className="overflow-auto">
                <table className="table-fixed overflow-auto xl:w-full">
                    <thead>
                        <tr>
                            <th className="p-4 pb-8 text-sm font-semibold capitalize w-[48px]"></th>
                            <th className="p-4 pb-8 text-sm font-semibold capitalize w-[300px]">
                                {" "}
                                Title{" "}
                            </th>
                            <th className="p-4 pb-8 text-sm font-semibold capitalize w-full">
                                {" "}
                                Description{" "}
                            </th>
                            <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[350px]">
                                {" "}
                                Tags{" "}
                            </th>
                            <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[100px]">
                                {" "}
                                Priority{" "}
                            </th>
                            <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[100px]">
                                {" "}
                                Options{" "}
                            </th>
                        </tr>
                    </thead>
                    <tbody>{taskContent}</tbody>
                </table>
            </div>
        </>
    );
}
