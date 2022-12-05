//Unused code, saved because of potential usefulness

/*
import { useState, useEffect } from "react";

function StatsContextComponent(props) {
    const [loading, setLoading] = useState(props.loading);
    const [currentContext, setCurrentContext] = useState(props.context);
    const [currentId, setCurrentId] = useState();
    const [activites, setActivities] = useState([""]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        setCurrentContext(props.context);
        findId();
    }, [props.context]);

    function findId() {
        console.log(props.fullContexts);
        for (let i = 0; i < props.fullContexts.length; i++) {
            console.log(i);
            if (props.fullContexts[i].title === currentContext) {
                console.log(props.fullContexts[i].id);
                setCurrentId(props.fullContexts[i].id);
            }
        }
        console.log(currentContext);
        console.log(props.stats);
        console.log(currentId);
        if (currentId !== undefined) {
            fetchData();
        }
    }

    function fetchData() {
        let activityArr = [];
        for (let i = 0; i < props.stats.length; i++) {
            if (props.stats[i].contextId.includes(currentId)) {
                activityArr.push(
                    <p key={i}>
                        {props.stats[i].activity} for {props.stats[i].time}{" "}
                        hours
                    </p>
                );
            }
        }
        console.log(activityArr);
        setActivities([...activityArr]);
    }

    return <div>{activites}</div>;
}

export default StatsContextComponent;

*/
