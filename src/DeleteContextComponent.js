import { useState, useEffect } from "react";

function DeleteContext() {
    const [contexts, setContexts] = useState([]);
    const [currentcontext, setCurrentContext] = useState();
    const [newContexts, setNewContexts] = useState([]);
    const [targetActivities, setTargetActivities] = useState([]);
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
                    }
                }
            });
    }, [loading]);

    useEffect(() => {
        const fetchdata = async () => {
            let currentId = 1;
            for (let i = 0; i < contexts.length; i++) {
                if (contexts[i].title === currentcontext) {
                    currentId = contexts[i].id;
                }
            }
            let res = await fetch("http://localhost:3010/posts");
            let jsonres = await res.json();
            console.log(jsonres);
            console.log(currentId);
            console.log(currentcontext);
            let targetArray = [];
            for (let i = 0; i < jsonres.length; i++) {
                if (jsonres[i].contextId.includes(currentId)) {
                    jsonres[i].contextId = jsonres[i].contextId.filter(
                        (e) => e !== currentId
                    );
                    targetArray.push(jsonres[i]);
                }
            }
            setTargetActivities(targetArray);
        };
        fetchdata();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentcontext]);

    useEffect(() => {
        console.log(targetActivities);
    }, [targetActivities]);

    const handleOpen = () => {
        setOpen(!open);
    };
    async function handleContext(event) {
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
        for (let i = 0; i < targetActivities.length; i++) {
            fetch(`http://127.0.0.1:3010/posts/${targetActivities[i].id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    activity: targetActivities[i].activity,
                    time: targetActivities[i].time,
                    contextId: targetActivities[i].contextId,
                }),
            })
                .then((resp) => resp.json())
                .then((data) => {
                    console.log("deleted context from " + data.activity);
                });
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
