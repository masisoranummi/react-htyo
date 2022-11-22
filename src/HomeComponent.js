import { useState } from "react";

function HomeComponent() {
    const [current, setCurrent] = useState("");
    const [time, setTime] = useState("");
    console.log(current);
    console.log(time);
    function handleActivity(event) {
        setCurrent(event.target.value);
        event.preventDefault();
    }
    function handleTime(event) {
        setTime(event.target.value);
        event.preventDefault();
    }
    function handleSubmit() {
        fetch("http://127.0.0.1:3010/posts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ activity: current, time: time }),
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
                <input type="submit" value="Submit" />
            </form>
        </>
    );
}

export default HomeComponent;
