import React from "react";

class StatsComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            stats: [],
            newstats: [],
            currentContext: "All",
            allContexts: [<option key={"default"}>{"All"}</option>],
            fullContexts: [],
            currentContextId: null,
        };
        this.fetchData = this.fetchData.bind(this);
        this.newFetch = this.newFetch.bind(this);
        this.fetchContexts = this.fetchContexts.bind(this);
        this.handleContext = this.handleContext.bind(this);
        this.fetchBasedonContext = this.fetchBasedonContext.bind(this);
    }

    componentDidMount() {
        if (this.state.loading) {
            this.fetchContexts();
            fetch("http://localhost:3010/posts")
                .then((response) => response.json())
                .then((data) => {
                    this.setState({ stats: data }, () => {
                        if (this.state.currentContext === "All") {
                            this.fetchData();
                        } else {
                            this.fetchBasedonContext();
                        }
                    });
                });
        }
    }

    newFetch() {
        if (this.state.currentContext === "All") {
            this.fetchData();
        } else {
            this.fetchBasedonContext();
        }
    }

    fetchBasedonContext() {
        const activityArr = [];
        for (let i = 0; i < this.state.fullContexts.length; i++) {
            if (
                this.state.fullContexts[i].title === this.state.currentContext
            ) {
                this.setState(
                    {
                        currentContextId: this.state.fullContexts[i].id,
                    },
                    () => {
                        for (let i = 0; i < this.state.stats.length; i++) {
                            console.log(this.state.stats[i].contextId);
                            console.log(this.state.currentContextId);
                            if (
                                this.state.stats[i].contextId.includes(
                                    this.state.currentContextId
                                )
                            ) {
                                activityArr.push(
                                    <p key={i}>
                                        {this.state.stats[i].activity} for{" "}
                                        {this.state.stats[i].time} hours,{" "}
                                        {this.state.stats[i].minutes} minutes
                                        and {this.state.stats[i].seconds}{" "}
                                        seconds
                                    </p>
                                );
                            }
                        }
                        this.setState({ loading: false });
                        console.log(activityArr);
                        this.setState({ newstats: [...activityArr] });
                    }
                );
            }
        }
    }

    fetchContexts() {
        fetch("http://localhost:3010/contexts")
            .then((response) => response.json())
            .then((data) => {
                this.setState({ fullContexts: data });
                data.map((x) =>
                    this.setState((previousState) => ({
                        allContexts: [
                            ...previousState.allContexts,
                            <option key={x.id}>{x.title}</option>,
                        ],
                    }))
                );
            });
    }

    fetchData() {
        const activityArr = [];
        console.log(this.state.stats);
        for (let i = 0; i < this.state.stats.length; i++) {
            activityArr.push(
                <p key={i}>
                    {this.state.stats[i].activity} for{" "}
                    {this.state.stats[i].time} hours,{" "}
                    {this.state.stats[i].minutes} minutes and{" "}
                    {this.state.stats[i].seconds} seconds
                </p>
            );
        }
        this.setState({ loading: false });
        console.log(activityArr);
        this.setState({ newstats: [...activityArr] });
    }

    handleContext(event) {
        this.setState({ currentContext: event.target.value }, () =>
            this.newFetch()
        );

        event.preventDefault();
    }

    render() {
        return (
            <>
                <h1>Stats</h1>
                <br></br>
                <select onChange={this.handleContext}>
                    value={this.state.currentContext}
                    {this.state.allContexts}
                </select>
                {this.state.currentContext === "All" ? (
                    <div>{this.state.newstats}</div>
                ) : (
                    <div>{this.state.newstats}</div>
                )}
            </>
        );
    }
}

export default StatsComponent;
