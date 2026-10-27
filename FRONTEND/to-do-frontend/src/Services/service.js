const API_BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:3000").replace(/\/$/, "");

export const handleAddToServer = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title");
    const dateDeadline = formData.get("dateDeadline");
    const timeDeadline = formData.get("timeDeadline");
    const note = formData.get("note");
    const Completed = formData.get("Completed");
    const taskData = {
        title, dateDeadline, timeDeadline, note, Completed
    };
    const response = await fetch(`${API_BASE_URL}/task/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(taskData)
    });
    return response;
};

export const handleFetchFromServer = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/task`);
        if (!response.ok) {
            throw new Error(`Failed to fetch tasks: ${response.statusText}`);
        }
        const taskList = await response.json();
        return Array.isArray(taskList) ? taskList : [];
    } catch (err) {
        console.error("Error fetching tasks from server:", err);
        return [];
    }
};

export const handleToggleCompleted = async (task) => {
    task.Completed = !task.Completed;
    const response = await fetch(`${API_BASE_URL}/task/update/${task._id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(task)
    });
    return response;
};

export const handleUpdateToServer = async (e, id, Comp) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title");
    const dateDeadline = formData.get("dateDeadline");
    const timeDeadline = formData.get("timeDeadline");
    const deadline = new Date(`${dateDeadline}T${timeDeadline}`);
    const note = formData.get("note");
    const Completed = Comp;
    const taskData = {
        title, deadline, note, Completed
    };
    const response = await fetch(`${API_BASE_URL}/task/update/${id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(taskData)
    });
    return response;
};

export const deleteTaskFromServer = async (id) => {
    const response = await fetch(`${API_BASE_URL}/task/delete/${id}`, {
        method: "DELETE"
    });
    return response;
};
