import { useState } from "react";
import { useTasks } from "../../contexts/TaskProvider";
import { UPDATED } from "../../reducer/actions";
import Tag from "../../ui/Tag";
import generateColor from "../../utils/generateColor";

export default function Task({ task, onDeleteModal }) {
    const { id, title, description, favorite, priority, tags } = task || {};
    const { dispatch, handleCurrentTask, handleShowModal } = useTasks();
    const [colors] = useState(
        Array(tags?.length)
            .fill(null)
            .map(() => generateColor())
    );
    let tagContent = null;
    if (tags?.length > 0) {
        tagContent = tags.map((tag, index) => (
            <Tag
                key={tag}
                tag={tag}
                color={colors[index] || "#3B82F6"}
            />
        ));
    }

    const favoriteColor = favorite ? "yellow" : "currentColor";

    // handler toggle favorite task
    const handleToggleFavorite = (task) => {
        const updatedTask = { ...task, favorite: !task.favorite };
        dispatch({
            type: UPDATED,
            payload: updatedTask,
        });
    };
    // handler task updated
    const handleTaskUpdate = (task) => {
        handleShowModal(true);
        handleCurrentTask(task);
    };

    // handle deletion
    const handleDelete = (task) => {
        handleCurrentTask(task);
        onDeleteModal(true);
    };

    return (
        <>
            <tr className="border-b border-[#2E3443] [&>td]:align-baseline [&>td]:px-4 [&>td]:py-2">
                <td>
                    <svg
                        onClick={() => handleToggleFavorite(task)}
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-star"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke={favoriteColor}
                        fill={favoriteColor}
                        strokeLinecap="round"
                        strokeLinejoin="round">
                        <path
                            stroke="none"
                            d="M0 0h24v24H0z"
                            fill="none"
                        />
                        <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                    </svg>
                </td>
                <td className="capitalize">{title}</td>
                <td>
                    <div>{description}</div>
                </td>
                <td>
                    <ul className="flex justify-center gap-1.5 flex-wrap">
                        {tagContent}
                    </ul>
                </td>
                <td className="text-center capitalize">{priority}</td>
                <td>
                    <div className="flex items-center justify-center space-x-3">
                        <button
                            className="text-red-500"
                            onClick={() => handleDelete(task)}>
                            Delete
                        </button>
                        <button
                            className="text-blue-500"
                            onClick={() => handleTaskUpdate(task)}>
                            Edit
                        </button>
                    </div>
                </td>
            </tr>
        </>
    );
}
