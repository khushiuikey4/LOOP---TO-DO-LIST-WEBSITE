import { useState, useEffect } from "react";
import { handleAddToServer, handleUpdateToServer } from "../Services/service"

const NewTaskForm = ({ onCancel, handleUpdateToggle, fetchTasks, handleTaskForm, updateReq, updateData }) => {
    const [title, setTitle] = useState("");
    const [dateDeadline, setDateDeadline] = useState("");
    const [timeDeadline, setTimeDeadline] = useState("");
    const [note, setNote] = useState("");
    const [Completed, setCompleted] = useState(false);
    useEffect(() => {
        if (updateReq) {
            setTitle(updateData.title);
            setDateDeadline(updateData.dateDeadline);
            setTimeDeadline(updateData.timeDeadline);
            setNote(updateData.note);
            setCompleted(updateData.Completed);
        }
    }, [updateReq, updateData]);

    return (
        <div className="w-full max-w-[480px] rounded-3xl bg-white px-6 py-7 shadow-xl sm:px-8 sm:py-8">

            {/* Heading */}
            <h2 className="mb-6 text-2xl font-bold text-[#292729]">
                New task
            </h2>

            <form className="space-y-4" onSubmit={async (e) => {
                if (updateReq) {
                    const response = await handleUpdateToServer(e, updateData.id, updateData.Completed);
                    if (response.ok) {
                        setTitle("");
                        setDateDeadline("");
                        setTimeDeadline("");
                        setNote("");
                        setCompleted(false);
                        handleUpdateToggle();

                    }
                } else {
                    const response = await handleAddToServer(e);
                    if (response.ok) {
                        setTitle("");
                        setDateDeadline("");
                        setTimeDeadline("");
                        setNote("");
                        setCompleted(false);
                        handleTaskForm();

                    }
                }
            }}>

                {/* Task title */}
                <div>
                    <label className="mb-1.5 block text-sm font-medium text-[#292729]">
                        Task title
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Task title"
                        className=" 
                            w-full 
                            rounded-xl 
                            border border-[#D8D0C8] 
                            bg-[#FCFBF9] 
                            px-4 py-3.5 
                            text-base text-[#292729] 
                            outline-none 
                            placeholder:text-[#85817E] 
                            transition-colors duration-200 
                            focus:border-[#C95739] 
                        "
                    />
                </div>

                {/* Date */}
                <div>
                    <label className="mb-1.5 block text-sm font-medium text-[#292729]">
                        Deadline Date
                    </label>
                    <input
                        type="date"
                        name="dateDeadline"
                        value={dateDeadline}
                        onChange={(e) => setDateDeadline(e.target.value)}
                        className=" 
                            w-full 
                            rounded-xl 
                            border border-[#D8D0C8] 
                            bg-[#FCFBF9] 
                            px-4 py-3.5 
                            text-base text-[#292729] 
                            outline-none 
                            transition-colors duration-200 
                            focus:border-[#C95739] 
                        "
                    />
                </div>

                {/* Time */}
                <div>
                    <label className="mb-1.5 block text-sm font-medium text-[#292729]">
                        Deadline Time
                    </label>
                    <input
                        type="time"
                        name="timeDeadline"
                        value={timeDeadline}
                        onChange={(e) => setTimeDeadline(e.target.value)}
                        placeholder="05:00 AM"
                        className=" 
                            w-full 
                            rounded-xl 
                            border border-[#D8D0C8] 
                            bg-[#FCFBF9] 
                            px-4 py-3.5 
                            text-base text-[#292729] 
                            outline-none 
                            transition-colors duration-200 
                            focus:border-[#C95739] 
                        "
                    />
                </div>

                {/* Note */}
                <div>
                    <label className="mb-1.5 block text-sm font-medium text-[#292729]">
                        Note
                    </label>
                    <input
                        type="text"
                        name="note"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Note or location (optional)"
                        className=" 
                            w-full 
                            rounded-xl 
                            border border-[#D8D0C8] 
                            bg-[#FCFBF9] 
                            px-4 py-3.5 
                            text-base text-[#292729] 
                            outline-none 
                            placeholder:text-[#85817E] 
                            transition-colors duration-200 
                            focus:border-[#C95739] 
                        "
                    />
                </div>


                {/* Buttons */}
                <div className="flex gap-3 pt-2">

                    <button
                        type="button"
                        onClick={() => {
                            onCancel();
                            fetchTasks();
                        }}
                        className=" 
                            flex-1 
                            cursor-pointer 
                            rounded-xl 
                            bg-[#F8F6F3] 
                            px-4 py-3.5 
                            text-base font-semibold 
                            text-[#77716D] 
                            transition-colors duration-200 
                            hover:bg-[#EEEAE6] 
                        "
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className=" 
                            flex-1 
                            cursor-pointer 
                            rounded-xl 
                            bg-[#292729] 
                            px-4 py-3.5 
                            text-base font-semibold 
                            text-white 
                            transition-colors duration-200 
                            hover:bg-[#3A383A] 
                            active:scale-[0.98] 
                        "
                    >
                        {updateReq && "Update"}
                        {!updateReq && "Add task"}
                    </button>

                </div>

            </form>
        </div>
    );
};

export default NewTaskForm;