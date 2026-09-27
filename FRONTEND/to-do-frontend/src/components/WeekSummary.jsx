const WeekSummary = ({ taskList }) => {
    let doneCount = 0;
    let totalCount = taskList.length;

    taskList.forEach((task) => {
        if (task.Completed == true) doneCount++;
    });

    return (
        <div
            className="
                mx-auto w-full max-w-5xl
                bg-white
                border-b border-[#E8E1DA]
                px-4 py-5
                sm:px-6
            "
        >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-10">

                {/* Left today */}
                <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-[#101010]">
                        {totalCount - doneCount}
                    </span>

                    <span className="text-sm text-[#77716D]">
                        left
                    </span>
                </div>

                {/* Done this week */}
                <div className="flex items-baseline gap-2">
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-[#101010]">
                            {doneCount}
                        </span>

                        <span className="text-2xl font-bold text-[#101010]">
                            /
                        </span>

                        <span className="text-2xl font-bold text-[#101010]">
                            {totalCount}
                        </span>
                    </div>

                    <span className="text-sm text-[#77716D]">
                        Completed
                    </span>
                </div>

            </div>
        </div>
    );
};

export default WeekSummary;