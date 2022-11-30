import { useState, useEffect } from "react";

function DeleteContext() {
    const [contexts, setContexts] = useState([]);
    const [currentcontext, setCurrentContext] = useState();
    const [newContexts, setNewContexts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
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

    const handleOpen = () => {
        setOpen(!open);
    };
    function handleContext(event) {
        setCurrentContext(event.target.value);
        event.preventDefault();
    }
    function handleSubmit() {
        let currentId = 1;
        for (let i = 0; i < contexts.length; i++) {
            if (contexts[i].title === currentcontext) {
                currentId = contexts[i].id;
            } else if (currentcontext === undefined) {
                setCurrentContext("Hobbies");
                currentId = 1;
            }
            console.log(currentId);
            console.log(currentcontext);
        }
        fetch(`http://127.0.0.1:3010/contexts/${currentId}`, {
            method: "DELETE",
        }).then(alert(`Deleted the context: ${currentcontext}`));
    }
    return (
        <>
            <button onClick={handleOpen}>Delete an existing context</button>
            {open ? (
                <form onSubmit={handleSubmit}>
                    <select onChange={handleContext}>
                        value={currentcontext}
                        {newContexts}
                    </select>
                    <input type="submit" value="Submit" />
                </form>
            ) : null}
        </>
    );
}

export default DeleteContext;
