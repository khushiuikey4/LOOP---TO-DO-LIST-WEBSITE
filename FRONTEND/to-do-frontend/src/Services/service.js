export const handleAddToServer = async (e) => {
    e.preventDefault();
    console.log("The value of e is : \n", e);
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title")
    const dateDeadline = formData.get("dateDeadline");
    const timeDeadline = formData.get("timeDeadline");
    const note = formData.get("note");
    const Completed = formData.get("Completed");
    const taskData = {
        title, dateDeadline, timeDeadline, note, Completed
    }
    const response = await fetch("http://localhost:3000/task/add",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(taskData)
        }

    )
    return response;
}
export const handleFetchFromServer = async () => {
    const response = await fetch("http://localhost:3000/task");
    const taskList = await response.json();
    return taskList;
}
export const handleToggleCompleted = async (task) => {
    task.Completed = !task.Completed;
    const response = await fetch(`http://localhost:3000/task/update/${task._id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(task)
    });
    return response;

}
export const handleUpdateToServer = async (e, id, Comp) => {
    e.preventDefault();
    console.log("The value of e is : \n", e);
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title")
    const dateDeadline = formData.get("dateDeadline");
    const timeDeadline = formData.get("timeDeadline");
    const deadline = new Date(`${dateDeadline}T${timeDeadline}`);
    const note = formData.get("note");
    const Completed = Comp;
    const taskData = {
        title, deadline, note, Completed
    }
    const response = await fetch(`http://localhost:3000/task/update/${id}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(taskData)
        }

    )
    return response;
}
export const deleteTaskFromServer = async (id) => {
    const response = await fetch(`http://localhost:3000/task/delete/${id}`);
    return response;
}