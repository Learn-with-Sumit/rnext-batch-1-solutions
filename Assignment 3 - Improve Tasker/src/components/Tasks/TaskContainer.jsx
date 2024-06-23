import { useTasks } from "../../contexts/TaskProvider";
import NotFound from "../../ui/NotFound";
import ActionModal from "./ActionModal";
import TaskHeader from "./TaskHeader";
import Tasks from "./Tasks";

export default function TaskContainer() {
    // Access task state and actions from context
    const {
        tasks,
        showModal,
        handleShowModal,
        currentTask,
        handleCurrentTask,
        searchValue,
    } = useTasks() || {};

    // Filter tasks based on search input
    const filteredTasks = tasks?.filter((task) =>
        task.title.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
        <>
            <section
                className="mb-20"
                id="tasks">
                <div className="container">
                    {/* */}
                    <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
                        {/* Renders the task header */}
                        <TaskHeader />

                        {/* Conditionally renders the action modal */}
                        {showModal && (
                            <ActionModal
                                onModalShow={handleShowModal}
                                currentTask={currentTask}
                                onCurrentTask={handleCurrentTask}
                            />
                        )}

                        {/* Renders the list of filtered tasks or a "not found" message */}
                        {filteredTasks?.length > 0 ? (
                            <Tasks filteredTasks={filteredTasks} />
                        ) : (
                            <NotFound />
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}
