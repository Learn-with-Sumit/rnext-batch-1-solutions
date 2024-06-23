import { useState } from "react";
import { toast } from "react-toastify";
import { useTasks } from "../../contexts/TaskProvider";
import { ADDED, UPDATED } from "../../reducer/actions";
import Button from "../../ui/Button";

// created task. initial input state
const initialState = {
    title: "",
    description: "",
    tags: [],
    priority: "",
};

export default function ActionModal({
    onModalShow,
    currentTask,
    onCurrentTask,
}) {
    const [inputTasks, setInputTasks] = useState(currentTask || initialState); // current means edit mode
    const { dispatch } = useTasks();

    // controlled input
    const handleTaskInput = (e) => {
        const name = e.target.name;
        let value = e.target.value;
        if (name === "tags") value = value.split(",");
        setInputTasks((prevTasks) => ({
            ...prevTasks,
            [name]: value,
        }));
    };
    const handleTaskSubmit = (e) => {
        e.preventDefault();

        const inputValues = Object.values(inputTasks);
        // Checking Validate inputs
        const isNotEmptyInputs = inputValues.every((task) =>
            Boolean(String(task).trim())
        );

        if (isNotEmptyInputs) {
            // Checking editing mode not change previous values
            if (JSON.stringify(currentTask) === JSON.stringify(inputTasks)) {
                toast.warning(
                    "Hmm, the task remains the same after the update attempt."
                );
            } else {
                const tags = inputTasks.tags.filter(Boolean);
                if (tags.length > 0) {
                    dispatch({
                        type: currentTask ? UPDATED : ADDED,
                        payload: {
                            ...inputTasks,
                            tags: inputTasks.tags.filter(Boolean),
                        },
                    });
                    toast.success(
                        `Task successfully ${
                            currentTask ? "updated" : "created"
                        }.`
                    );
                    if (currentTask) {
                        onCurrentTask(null);
                    }
                    onModalShow(false);
                } else {
                    toast.error(
                        "Oops! It looks like you forgot to fill in valid tags"
                    );
                }
            }
        } else {
            toast.error(
                "Oops! It looks like you forgot to fill in some information."
            );
        }
    };
    // handle modal close
    const handleCloseModal = () => {
        // current task has then null
        if (currentTask) {
            onCurrentTask(null);
        }
        onModalShow(false);
    };

    return (
        <>
            <form
                className="mx-auto my-10 w-full max-w-[740px] rounded-xl border border-[#FEFBFB]/[36%] bg-[#191D26] p-9 max-md:px-4 lg:my-20 lg:p-11 z-[102] absolute left-1/4 top-1/4 after:bg-black/45 after:w-full after:h-full after:fixed after:top-0 after:left-0 after:-z-[11]"
                onSubmit={handleTaskSubmit}>
                <h2 className="mb-9 text-center text-2xl font-bold text-white lg:mb-11 lg:text-[28px]">
                    {currentTask ? "Update Task" : "Add New Task"}
                </h2>

                {/* <!-- inputs --> */}
                <div className="space-y-9 text-white lg:space-y-10">
                    {/* <!-- title --> */}
                    <div className="space-y-2 lg:space-y-3">
                        <label htmlFor="title">Title</label>
                        <input
                            className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
                            type="text"
                            name="title"
                            id="title"
                            value={inputTasks.title}
                            onChange={handleTaskInput}
                        />
                    </div>
                    {/* <!-- description --> */}
                    <div className="space-y-2 lg:space-y-3">
                        <label htmlFor="description">Description</label>
                        <textarea
                            className="block min-h-[120px] w-full rounded-md bg-[#2D323F] px-3 py-2.5 lg:min-h-[180px]"
                            type="text"
                            name="description"
                            id="description"
                            value={inputTasks.description}
                            onChange={handleTaskInput}></textarea>
                    </div>
                    {/* <!-- input group --> */}
                    <div className="grid-cols-2 gap-x-4 max-md:space-y-9 md:grid lg:gap-x-10 xl:gap-x-20">
                        {/* <!-- tags --> */}
                        <div className="space-y-2 lg:space-y-3">
                            <label htmlFor="tags">Tags</label>
                            <input
                                className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
                                type="text"
                                name="tags"
                                id="tags"
                                value={inputTasks.tags}
                                onChange={handleTaskInput}
                            />
                        </div>
                        {/* <!-- priority --> */}
                        <div className="space-y-2 lg:space-y-3">
                            <label htmlFor="priority">Priority</label>
                            <select
                                className="block w-full cursor-pointer rounded-md bg-[#2D323F] px-3 py-2.5"
                                name="priority"
                                id="priority"
                                value={inputTasks.priority}
                                onChange={handleTaskInput}>
                                <option value="">Select Priority</option>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                    </div>
                </div>
                {/* <!-- inputs ends --> */}
                <div className="mt-16 flex justify-between lg:mt-20">
                    <Button
                        bg={"bg-red-600"}
                        type="button"
                        onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button
                        type="submit"
                        bg={"bg-blue-600"}>
                        {currentTask ? "Update Task" : "Create new Task"}
                    </Button>
                </div>
            </form>
        </>
    );
}
