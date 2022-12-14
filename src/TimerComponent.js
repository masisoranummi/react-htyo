/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

function TimerComponent() {
    const [loading, setLoading] = useState(true);
    const [time, setTime] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [activites, setActivities] = useState([]);
    const [newActivities, setNewActivities] = useState([]);
    const [timer, setTimer] = useState(false);
    const [oldTime, setOldTime] = useState();
    const [newTime, setNewTime] = useState();
    const [currentTime, setCurrentTime] = useState();

    const [currentActivity, setCurrentActivity] = useState(
        "Creating react project"
    );

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

    useEffect(() => {
        setCurrentTime(newTime - oldTime);
    }, [newTime]);

    useEffect(() => {
        setTime(Math.floor((currentTime / (1000 * 60 * 60)) % 24));
        setMinutes(Math.floor((currentTime / 1000 / 60) % 60));
        setSeconds(Math.floor((currentTime / 1000) % 60));
    }, [currentTime]);

    useEffect(() => {
        console.log(time);
        console.log(minutes);
        console.log(seconds);
        if (seconds > 0) {
            postResults();
        }
    }, [seconds]);

    function handleActivity(event) {
        setCurrentActivity(event.target.value);
        event.preventDefault();
    }

    function handleStart(event) {
        setTimer(event.target.value);
        setOldTime(Date.now());
        event.preventDefault();
    }

    function handleEnd(event) {
        setTimer(event.target.value);
        setNewTime(Date.now());
        event.preventDefault();
    }

    function postResults() {
        let currentId;
        let currentTime;
        let currentMinutes;
        let currentSeconds;
        let currentContexts;
        for (let i = 0; i < activites.length; i++) {
            if (activites[i].activity === currentActivity) {
                currentId = activites[i].id;
                currentTime = activites[i].time;
                currentMinutes = activites[i].minutes;
                currentSeconds = activites[i].seconds;
                currentContexts = [...activites[i].contextId];
                console.log("Id: " + currentId + " Time: " + currentTime);
            }
        }
        let newtime = parseInt(time) + parseInt(currentTime);
        let newminutes = parseInt(minutes) + parseInt(currentMinutes);
        let newseconds = parseInt(seconds) + parseInt(currentSeconds);
        if (newseconds >= 60) {
            newseconds -= 60;
            newminutes += 1;
        }
        if (newminutes >= 60) {
            newminutes -= 60;
            newtime += 1;
        }
        fetch(`http://127.0.0.1:3010/posts/${currentId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                activity: currentActivity,
                time: newtime,
                minutes: newminutes,
                seconds: newseconds,
                contextId: currentContexts,
            }),
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data);
            });
        alert(
            `${time} hours, ${minutes} minutes and ${seconds} was added to the activity: ${currentActivity}`
        );
        refreshPage();
    }

    function refreshPage() {
        window.location.reload(false);
    }

    return (
        <>
            <h3>Start timer:</h3>{" "}
            <form>
                {" "}
                {timer ? (
                    `Currently active: ${currentActivity} `
                ) : (
                    <select onChange={handleActivity}>
                        value={currentActivity}
                        {newActivities}
                    </select>
                )}{" "}
                {timer ? (
                    <button onClick={handleEnd} value={false}>
                        Stop timer
                    </button>
                ) : (
                    <button onClick={handleStart} value={true}>
                        Start timer
                    </button>
                )}
            </form>
        </>
    );
}

export default TimerComponent;
