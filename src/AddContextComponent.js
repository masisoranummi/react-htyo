import { useState } from "react";

function AddContext() {
    const [newContext, setNewContext] = useState("");
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(!open);
    };

    function handleContext(event) {
        setNewContext(event.target.value);
        event.preventDefault();
    }

    function handleSubmit() {
        fetch("http://127.0.0.1:3010/contexts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: newContext,
            }),
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data);
            });
        alert("A context was submitted: " + newContext);
    }

    return (
        <>
            <button onClick={handleOpen}>Add new context</button>
            {open ? (
                <form onSubmit={handleSubmit}>
                    {" "}
                    <label>
                        New context:{" "}
                        <input
                            type="text"
                            value={newContext}
                            onChange={handleContext}
                        />{" "}
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            ) : null}
        </>
    );
}

export default AddContext;
