import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { IoAdd } from "react-icons/io5";


// ============================================================
// DEFAULT DATA
// ============================================================

const DEFAULT_DAY = {
    name: "TUE",
    date: 22,
    month: "SEP",
};

const DEFAULT_TASKS = [
    {
        id: 1,
        time: "09:00",
        title: "Meetings",
        priority: "medium",
        done: false,
    },
    {
        id: 2,
        time: "10:30",
        title: "Client call",
        priority: "high",
        done: false,
    },
    {
        id: 3,
        time: "12:00",
        title: "Check up",
        priority: "medium",
        done: false,
    },
    {
        id: 4,
        time: "13:30",
        title: "Review designs",
        priority: "medium",
        done: false,
    },
    {
        id: 5,
        time: "17:00",
        title: "Standup notes",
        priority: "medium",
        done: false,
    },
    {
        id: 6,
        time: "19:00",
        title: "Coaching",
        priority: "medium",
        done: false,
    },
];

const DEFAULT_CARD_COLOR = "#9188BC";


// ============================================================
// PRIORITY COLORS
// ============================================================

const PRIORITY_COLOR = {
    high: "bg-[#F3D34A]",
    medium: "bg-[#D6DCE5]",
    low: "bg-white/40",
};


// ============================================================
// TASK CELL
// ============================================================

const TaskCell = ({ task, onToggle }) => {
    return (
        <button
            type="button"
            onClick={() => onToggle(task.id)}
            title={`Click to mark ${task.done ? "not done" : "done"
                }`}
            className={`
                min-w-0
                border-r border-b border-white/15
                px-4 py-4
                text-left
                transition-colors duration-200
                hover:bg-white/5
                ${task.done ? "opacity-40" : ""}
            `}
        >

            {/* TIME */}

            <div className="text-sm font-semibold text-white/75">
                {task.time}
            </div>


            {/* TASK */}

            <div className="mt-1 flex min-w-0 items-center gap-2">

                {/* CHECKBOX */}

                <span
                    className={`
                        flex h-5 w-5 shrink-0
                        items-center justify-center
                        rounded-full
                        text-[11px] font-bold
                        ${task.done
                            ? "bg-white text-[#9188BC]"
                            : "border-2 border-white/70"
                        }
                    `}
                >
                    {task.done && "✓"}
                </span>


                {/* PRIORITY DOT */}

                <span
                    className={`
                        h-2 w-2 shrink-0 rounded-full
                        ${PRIORITY_COLOR[
                        task.priority || "medium"
                        ]
                        }
                    `}
                />


                {/* TITLE */}

                <span
                    className={`
                        min-w-0 truncate
                        text-[15px]
                        font-bold
                        text-white
                        sm:text-base
                        ${task.done
                            ? "line-through"
                            : ""
                        }
                    `}
                >
                    {task.title}
                </span>

            </div>


            {/* NOTE */}

            {task.note && (
                <div className="mt-1 truncate text-xs font-medium text-white/60">
                    {task.note}
                </div>
            )}

        </button>
    );
};


// ============================================================
// WEEK CARD
// ============================================================

const FoldableWeekCard = ({
    day = DEFAULT_DAY,
    tasks: initialTasks = DEFAULT_TASKS,
    color = DEFAULT_CARD_COLOR,
    onAddTask, handleTaskForm
}) => {

    const [tasks, setTasks] = useState(initialTasks);

    /*
     * If there are more than 3 tasks,
     * start collapsed.
     */
    const [expanded, setExpanded] = useState(
        initialTasks.length <= 3
    );


    // ========================================================
    // TOGGLE TASK
    // ========================================================

    const handleToggleTask = (id) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === id
                    ? {
                        ...task,
                        done: !task.done,
                    }
                    : task
            )
        );
    };


    // ========================================================
    // TOGGLE CARD
    // ========================================================

    const handleToggleCollapse = () => {
        setExpanded((prev) => !prev);
    };


    // ========================================================
    // TASK INFORMATION
    // ========================================================

    const hasMoreThanThreeTasks = tasks.length > 3;

    const completedTasks = tasks.filter(
        (task) => task.done
    ).length;


    // ========================================================
    // RETURN
    // ========================================================

    return (
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">

            {/* ==================================================
                OUTER CARD
            ================================================== */}

            <div
                className="
                    w-full
                    overflow-hidden
                    rounded-3xl
                    text-white
                "
                style={{
                    backgroundColor: color,
                }}
            >

                {/* ==================================================
                    HEADER
                ================================================== */}

                <div className="flex min-h-[118px] items-stretch">

                    {/* ==================================================
                        DATE
                    ================================================== */}
                    <div className="flex w-[103px] shrink-0 flex-col justify-center border-r border-white/15 px-[17px]">
                        <span className="text-sm font-bold tracking-wide text-[#C6C3C5]">
                            {day.name}
                        </span>
                        <span className="text-[40px] font-bold leading-[42px] text-white">
                            {day.date}
                        </span>
                        <span className="mt-1 text-xs font-bold tracking-wide text-[#C6C3C5]">
                            {day.month}
                        </span>
                    </div>

                    {/* ==================================================
                        MAIN SPACE
                    ================================================== */}

                    <div className="min-w-0 flex-1">

                        {/* ----------------------------------------------
                            1-3 TASKS
                        ---------------------------------------------- */}

                        {!hasMoreThanThreeTasks && (
                            <div className="flex h-full min-w-0 overflow-x-auto">

                                {tasks.length > 0 ? (
                                    tasks.map((task) => (
                                        <TaskCell
                                            key={task.id}
                                            task={task}
                                            onToggle={
                                                handleToggleTask
                                            }
                                        />
                                    ))
                                ) : (
                                    <div className="flex h-full items-center px-5 text-sm text-white/40">
                                        Nothing planned
                                    </div>
                                )}

                            </div>
                        )}


                        {/* ----------------------------------------------
                            MORE THAN 3 TASKS
                            COLLAPSED STATE
                        ---------------------------------------------- */}

                        {hasMoreThanThreeTasks &&
                            !expanded && (
                                <div className="flex h-full items-center justify-end pr-4">

                                    <span
                                        className="
                                            rounded-full
                                            bg-white/15
                                            px-4 py-2
                                            text-sm font-bold
                                        "
                                    >
                                        +{tasks.length}
                                    </span>

                                </div>
                            )}

                    </div>


                    {/* ==================================================
                        RIGHT CONTROLS
                    ================================================== */}

                    <div className="flex h-auto items-stretch">

                        {/* ==================================================
                            TASK COUNT
                        ================================================== */}

                        {hasMoreThanThreeTasks && expanded && (
                            <div className="flex items-center px-2">

                                <span
                                    className="
                                        rounded-full
                                        bg-white/15
                                        px-4 py-2
                                        text-sm font-bold
                                    "
                                >
                                    +{tasks.length}
                                </span>

                            </div>
                        )}


                        {/* ==================================================
                            CHEVRON
                        ================================================== */}

                        {hasMoreThanThreeTasks && (
                            <button
                                type="button"
                                onClick={
                                    handleToggleCollapse
                                }
                                title={
                                    expanded
                                        ? "Collapse tasks"
                                        : "Show tasks"
                                }
                                className="
                                    flex h-full w-10
                                    shrink-0
                                    cursor-pointer
                                    items-center justify-center
                                    border-l border-white/15
                                    text-white/70
                                    transition-colors
                                    duration-200
                                    hover:text-white
                                "
                            >

                                <FaChevronDown
                                    className={`
                                        text-xs
                                        transition-transform
                                        duration-200
                                        ${expanded
                                            ? "rotate-180"
                                            : ""
                                        }
                                    `}
                                />

                            </button>
                        )}


                        {/* ==================================================
                            ADD BUTTON WRAPPER
                        ================================================== */}

                        <div
                            className="
                                flex
                                h-auto
                                w-[52px]
                                shrink-0
                                items-stretch
                                bg-white/10
                            "
                        >

                            {/* ADD BUTTON */}

                            <button
                                type="button"
                                onClick={handleTaskForm}
                                title={`Add task to ${day.name} ${day.date}`}
                                className="
                                    flex h-full w-full
                                    cursor-pointer
                                    items-center justify-center
                                    rounded-r-3xl
                                    text-xl text-white
                                    transition-colors
                                    duration-200
                                    hover:bg-white/10
                                "
                            >
                                <IoAdd />
                            </button>

                        </div>

                    </div>

                </div>


                {/* ==================================================
                    EXPANDED CONTENT
                ================================================== */}

                {hasMoreThanThreeTasks && expanded && (
                    <div className="border-t border-white/15">

                        {/* ==================================================
                            SUMMARY
                        ================================================== */}

                        <div className="px-5 py-4 sm:px-6">

                            <span className="text-sm font-semibold text-white/80">
                                {tasks.length} tasks ·{" "}
                                {completedTasks} done
                            </span>

                        </div>


                        {/* ==================================================
                            TASK GRID
                        ================================================== */}

                        <div className="mx-5 border-t border-white/15 sm:mx-6">

                            <div
                                className="
                                    grid
                                    grid-cols-1
                                    sm:grid-cols-2
                                    lg:grid-cols-3
                                    xl:grid-cols-5
                                "
                            >

                                {tasks.map((task) => (
                                    <TaskCell
                                        key={task.id}
                                        task={task}
                                        onToggle={
                                            handleToggleTask
                                        }
                                    />
                                ))}

                            </div>

                        </div>

                    </div>
                )}

            </div>

        </div>
    );
};

export default FoldableWeekCard;