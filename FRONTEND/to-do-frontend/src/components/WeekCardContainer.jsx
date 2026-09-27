import WeekCard from "./WeekCard";
import FoldableWeekCard from "./FoldableWeekCard";

const WeekCardContainer = ({
    taskList,
    handleDeleteTask,
    toggleCompleted,
    handleUpdateForm
}) => {
    let l = -1;
    return (
        <div
            className="
                relative min-h-screen w-full overflow-hidden
                bg-white
                px-4 py-5
                sm:px-6 sm:py-6
            "
        >

            {/* Cards */}
            <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-4">
                {taskList.map((task) => {
                    { l = (l + 1) % 6 }
                    return (
                        <WeekCard l={l}
                            handleDeleteTask={handleDeleteTask}
                            toggleCompleted={toggleCompleted}
                            handleUpdateForm={handleUpdateForm}
                            key={task._id}
                            task={task}
                        />
                    );
                })}
            </div>

        </div>
    );
};

export default WeekCardContainer;