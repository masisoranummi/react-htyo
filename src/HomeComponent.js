import { useState, useEffect } from "react";
import AddContext from "./AddContextComponent";
import AddTime from "./AddTimeComponent";
import DeleteComponent from "./DeleteComponent";
import DeleteContext from "./DeleteContextComponent";
import TimerComponent from "./TimerComponent";

function HomeComponent() {
    const [current, setCurrent] = useState("");
    const [time, setTime] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [contexts, setContexts] = useState([]);
    const [newContexts, setNewContexts] = useState([]);
    const [currentcontext, setCurrentContext] = useState([]);
    const [contextCount, setContextCount] = useState(1);
    const [loading, setLoading] = useState(true);
    console.log(current);
    console.log(time);
    useEffect(() => {
        fetch("http://localhost:3010/contexts")
            .then((response) => response.json())
            .then((data) => {
                if (loading) {
                    setLoading(false);
                    for (let i = 0; i < data.length; i++) {
                        setContexts((contexts) => [...contexts, data[i]]);
                        setNewContexts((newContexts) => [
                            ...newContexts,
                            <option key={i} value={data[i].title}>
                                {data[i].title}
                            </option>,
                        ]);
                        console.log(data[i].title);
                    }
                }
            });
    }, [loading]);
    function handleActivity(event) {
        setCurrent(event.target.value);
        event.preventDefault();
    }
    function handleTime(event) {
        setTime(event.target.value);
        event.preventDefault();
    }
    function handleMinutes(event) {
        setMinutes(event.target.value);
        event.preventDefault();
    }
    function handleSeconds(event) {
        setSeconds(event.target.value);
        event.preventDefault();
    }
    function handleContext(event, index) {
        let newState = [];
        for (let i = 0; i < contextCount; i++) {
            if (i === index) {
                newState[i] = event.target.value;
            } else {
                newState[i] = currentcontext[i];
            }
            console.log(index);
        }
        setCurrentContext(newState);
        event.preventDefault();
    }
    function handleContextAmount(event) {
        setContextCount(event.target.value);
        event.preventDefault();
    }
    function handleSubmit() {
        let currentId = [1];
        for (let j = 0; j < contextCount; j++) {
            for (let i = 0; i < contexts.length; i++) {
                if (contexts[i].title === currentcontext[j]) {
                    currentId[j] = contexts[i].id;
                } else if (currentcontext[j] === undefined) {
                    currentcontext[j] = "Hobbies";
                    currentId[j] = 1;
                }
                console.log(currentcontext);
                console.log(contexts.length);
            }
            console.log(currentId);
        }
        fetch("http://127.0.0.1:3010/posts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                activity: current,
                time: parseInt(time),
                minutes: parseInt(minutes),
                seconds: parseInt(seconds),
                contextId: currentId,
            }),
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data);
            });
        alert(
            "An activity was submitted: " +
                current +
                "\nTime submitted: " +
                time +
                " hours, " +
                minutes +
                " minutes and " +
                seconds +
                " seconds"
        );
    }
    let selectContextArray = [];
    for (let i = 0; i < contextCount; i++) {
        selectContextArray.push(
            <select key={i} onChange={(event) => handleContext(event, i)}>
                value={currentcontext}
                {newContexts}
            </select>
        );
    }

    return (
        <>
            <h1>Home</h1>
            <TimerComponent />
            <p></p>
            <h3>Add a new activity:</h3>
            <form onSubmit={handleSubmit}>
                {" "}
                <label>
                    Activity:{" "}
                    <input
                        type="text"
                        value={current}
                        onChange={handleActivity}
                    />{" "}
                </label>
                <label>
                    Hours:{" "}
                    <input
                        className="numberlabel"
                        type="number"
                        min={0}
                        value={time}
                        onChange={handleTime}
                    />{" "}
                </label>
                <label>
                    Minutes:{" "}
                    <input
                        className="numberlabel"
                        type="number"
                        min={0}
                        max={59}
                        value={minutes}
                        onChange={handleMinutes}
                    />{" "}
                </label>
                <label>
                    Seconds:{" "}
                    <input
                        className="numberlabel"
                        type="number"
                        min={0}
                        max={59}
                        value={seconds}
                        onChange={handleSeconds}
                    />{" "}
                </label>
                <label>
                    Context amount:{" "}
                    <input
                        className="numberlabel"
                        type="number"
                        min={1}
                        value={contextCount}
                        onChange={handleContextAmount}
                    />{" "}
                </label>
                {selectContextArray} <input type="submit" value="Submit" />
            </form>
            <br></br>
            <h3>Context settings:</h3>
            <AddContext />
            <DeleteContext />
            <br></br>
            <br></br>
            <h3>Edit existing activities:</h3>
            <AddTime />
            <br></br>
            <DeleteComponent />
        </>
    );
}

export default HomeComponent;
