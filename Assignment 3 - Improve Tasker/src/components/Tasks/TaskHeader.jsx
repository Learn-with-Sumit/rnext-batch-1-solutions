import TaskAction from "./TaskAction";
import TaskSearch from "./TaskSearch";

export default function TaskHeader() {
    return (
        <>
            <div className="mb-14 items-center justify-between sm:flex">
                <h2 className="text-2xl font-semibold max-sm:mb-4">
                    Your Tasks
                </h2>

                <div className="flex items-center space-x-5">
                    {/* Renders the task search component */}
                    <TaskSearch />

                    {/* Renders the task action component (buttons for adding and deleting) */}
                    <TaskAction />
                </div>
            </div>
        </>
    );
}
