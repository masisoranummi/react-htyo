import { useState, useEffect } from "react";

function AddTime() {
    const [loading, setLoading] = useState(true);
    const [time, setTime] = useState(1);
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
        let currentContexts;
        for (let i = 0; i < activites.length; i++) {
            if (activites[i].activity === currentActivity) {
                currentId = activites[i].id;
                currentTime = activites[i].time;
                currentContexts = [...activites[i].contextId];
                console.log("Id: " + currentId + " Time: " + currentTime);
            }
        }
        let newtime = parseInt(time) + parseInt(currentTime);
        fetch(`http://127.0.0.1:3010/posts/${currentId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                activity: currentActivity,
                time: newtime,
                contextId: currentContexts,
            }),
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data);
            });
        alert(
            `${currentTime} hours was added to the activity: ${currentActivity}`
        );
    }

    function handleTime(event) {
        setTime(event.target.value);
        console.log(activites);
        event.preventDefault();
    }

    function handleActivity(event) {
        setCurrentActivity(event.target.value);
        event.preventDefault();
    }

    return (
        <>
            <button onClick={handleOpen}>
                Add time to an existing activity
            </button>
            {open ? (
                <form onSubmit={handleSubmit}>
                    {" "}
                    <select onChange={handleActivity}>
                        value={currentActivity}
                        {newActivities}
                    </select>
                    <label>
                        Hours:
                        <input
                            className="numberlabel"
                            type="number"
                            min={1}
                            value={time}
                            onChange={handleTime}
                        />{" "}
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            ) : null}
        </>
    );
}

export default AddTime;
