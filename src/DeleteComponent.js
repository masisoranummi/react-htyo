import { useState, useEffect } from "react";

function DeleteComponent() {
    const [loading, setLoading] = useState(true);
    const [activites, setActivities] = useState([]);
    const [newActivities, setNewActivities] = useState([]);
    const [open, setOpen] = useState(false);
    const [currentActivity, setCurrentActivity] = useState(
        "Creating react project"
    );

    const handleOpen = () => {
        setOpen(!open);
    };

    useEffect(() => {
        fetch("http://localhost:3010/posts")
            .then((response) => response.json())
            .then((data) => {
                if (loading) {
                    setLoading(false);
                    for (let i = 0; i < data.length; i++) {
                        setActivities((activites) => [...activites, data[i]]);
                        setNewActivities((newActivities) => [
                            ...newActivities,
                            <option key={i} value={data[i].activity}>
                                {data[i].activity}
                            </option>,
                        ]);
                    }
                }
            });
    }, [loading]);

    function handleSubmit() {
        let currentId;
        let currentTime;
        for (let i = 0; i < activites.length; i++) {
            if (activites[i].activity === currentActivity) {
                currentId = activites[i].id;
                currentTime = activites[i].time;
                console.log("Id: " + currentId + " Time: " + currentTime);
            }
        }
        fetch(`http://127.0.0.1:3010/posts/${currentId}`, {
            method: "DELETE",
        }).then(alert(`Deleted the activity: ${currentActivity}`));
    }

    function handleActivity(event) {
        setCurrentActivity(event.target.value);
        event.preventDefault();
    }

    return (
        <>
            <button onClick={handleOpen}>Delete existing activity</button>
            {open ? (
                <form onSubmit={handleSubmit}>
                    {" "}
                    <select onChange={handleActivity}>
                        value={currentActivity}
                        {newActivities}
                    </select>
                    <input type="submit" value="Submit" />
                </form>
            ) : null}
        </>
    );
}

export default DeleteComponent;
