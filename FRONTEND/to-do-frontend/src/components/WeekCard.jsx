import { FaEdit, FaTrash } from "react-icons/fa";
import { useState } from "react";

const WeekCard = ({ l, task, toggleCompleted, handleUpdateForm, handleDeleteTask }) => {

    let bg = "#211F20";

    if (l == 1) bg = "#C05A3D";
    else if (l == 2) bg = "#8F86B8";
    else if (l == 3) bg = "#6E4048";
    else if (l == 4) bg = "#6F9169";
    else if (l == 5) bg = "#3E8686";

    const convertToDay = (n) => {
        if (n == 0) return "SUN";
        else if (n == 1) return "MON";
        else if (n == 2) return "TUE";
        else if (n == 3) return "WED";
        else if (n == 4) return "THU";
        else if (n == 5) return "FRI";
        else if (n == 6) return "SAT";
    }

    const convertToMonth = (n) => {
        if (n == 0) return "JAN";
        else if (n == 1) return "FEB";
        else if (n == 2) return "MAR";
        else if (n == 3) return "APR";
        else if (n == 4) return "MAY";
        else if (n == 5) return "JUN";
        else if (n == 6) return "JUL";
        else if (n == 7) return "AUG";
        else if (n == 8) return "SEP";
        else if (n == 9) return "OCT";
        else if (n == 10) return "NOV";
        else if (n == 11) return "DEC";
    }

    let [toggle, setToggle] = useState(task.Completed);
    const deadline = new Date(task.deadline);

    return (
        <div className="mx-auto w-full max-w-5xl px-3 sm:px-6">

            <div
                className="
                    flex min-h-[120px] w-full
                    overflow-hidden rounded-3xl text-white
                "
                style={{ backgroundColor: bg }}
            >

                {/* DEADLINE */}
                <div
                    className="
                        flex shrink-0 flex-col items-center justify-center
                        border-r border-white/25
                        w-[62px] px-2
                        sm:w-[78px] sm:px-3
                        md:w-[103px] md:px-[17px]
                    "
                >
                    <span
                        className="
                            text-[10px] font-bold tracking-wide
                            text-[#F1EFF0]
                            sm:text-xs
                            md:text-sm
                        "
                    >
                        {convertToDay(deadline.getDay())}
                    </span>

                    <span
                        className="
                            text-[28px] font-bold leading-[32px]
                            text-white
                            sm:text-[34px] sm:leading-[38px]
                            md:text-[40px] md:leading-[42px]
                        "
                    >
                        {deadline.getDate()}
                    </span>

                    <span
                        className="
                            mt-1 text-[9px] font-bold tracking-wide
                            text-[#F1EFF0]
                            sm:text-[10px]
                            md:text-xs
                        "
                    >
                        {convertToMonth(deadline.getMonth())}
                    </span>
                </div>


                {/* TASK */}
                <div
                    className="
                        flex min-w-0 flex-1 flex-col justify-center
                        px-3 py-3
                        sm:px-[18px] sm:py-4
                    "
                >

                    {/* TIME + STATUS */}
                    <div className="mb-1 flex min-w-0 flex-wrap items-center gap-2">

                        <span
                            className="
                                text-xs font-semibold
                                text-[#F1EFF0]
                                sm:text-sm
                            "
                        >
                            {deadline.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit"
                            })}
                        </span>

                        {deadline < new Date() ? (
                            <span className="
    rounded-full
   bg-[#FF6B6B]/30 text-[#FFE5E5]
    px-2.5 py-1
    text-white
    shadow-sm
    sm:text-[10px]
">
                                OVERDUE
                            </span>
                        ) : (
                            <span
                                className="
                                    rounded-full
                                    bg-white/10
                                    px-2 py-0.5
                                    text-[9px] font-semibold
                                    text-[#E8E4E5]
                                    sm:text-[10px]
                                "
                            >
                                YET TO BE DONE
                            </span>
                        )}

                    </div>


                    {/* CHECKBOX + TITLE + ICONS */}
                    <div className="flex min-w-0 items-start gap-2">

                        {/* CHECKBOX */}
                        <div
                            className={`
                                mt-0.5
                                flex h-5 w-5 shrink-0
                                items-center justify-center
                                rounded-full
                                text-[11px] font-bold

                                ${toggle
                                    ? "bg-[#E2DEDF] text-[#211F20]"
                                    : "border-2 border-[#E5E1E2]"
                                }
                            `}
                        >
                            <input
                                type="checkbox"
                                checked={toggle}
                                onChange={() => {
                                    toggleCompleted(task);
                                    setToggle(prev => !prev);
                                }}
                                className="
                                    absolute h-5 w-5
                                    cursor-pointer opacity-0
                                "
                            />

                            {toggle && "✓"}
                        </div>


                        {/* TITLE */}
                        <span
                            className="
                                min-w-0 flex-1
                                break-words
                                text-sm font-bold
                                text-white
                                sm:text-base
                            "
                        >
                            {task.title}
                        </span>


                        {/* UPDATE + DELETE */}
                        <div
                            className="
                                ml-auto flex shrink-0
                                items-center gap-3 pl-2
                                sm:pl-3
                            "
                        >
                            <span
                                onClick={() => {
                                    handleUpdateForm(task);
                                }}
                            >
                                <FaEdit
                                    className="
                                        cursor-pointer
                                        text-[#E5E1E2]
                                        hover:text-white
                                    "
                                />
                            </span>

                            <span
                                onClick={() => {
                                    handleDeleteTask(task._id);
                                }}
                            >
                                <FaTrash
                                    className="
                                        cursor-pointer
                                        text-[#E5E1E2]
                                        hover:text-white
                                    "
                                />
                            </span>
                        </div>

                    </div>


                    {/* NOTE */}
                    {task.note && (
                        <span
                            className="
                                mt-1 break-words
                                text-xs font-medium
                                text-[#D8D4D5]
                            "
                        >
                            {task.note}
                        </span>
                    )}

                </div>

            </div>

        </div>
    );
};

export default WeekCard;