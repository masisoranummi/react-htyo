import { useState, useEffect } from "react";

function HomeComponent() {
    const [current, setCurrent] = useState("");
    const [time, setTime] = useState("");
    const [contexts, setContexts] = useState([]);
    const [newContexts, setNewContexts] = useState([]);
    const [currentcontext, setCurrentContext] = useState([]);
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
    function handleContext(event) {
        setCurrentContext(event.target.value);
        event.preventDefault();
    }
    function handleSubmit() {
        let currentId = 0;
        for (let i = 0; i < contexts.length; i++) {
            if (contexts[i].title === currentcontext) {
                currentId = contexts[i].id;
            }
        }
        fetch("http://127.0.0.1:3010/posts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                activity: current,
                time: time,
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
                time
        );
    }
    return (
        <>
            <h1>Home</h1>
            <form onSubmit={handleSubmit}>
                {" "}
                <label>
                    Activity:
                    <input
                        type="text"
                        value={current}
                        onChange={handleActivity}
                    />{" "}
                </label>
                <label>
                    Hours:
                    <input
                        type="number"
                        value={time}
                        onChange={handleTime}
                    />{" "}
                </label>
                <select onChange={handleContext}>
                    value={currentcontext}
                    {newContexts}
                </select>
                <input type="submit" value="Submit" />
            </form>
        </>
    );
}

export default HomeComponent;
