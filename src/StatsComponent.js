import React from "react";

class StatsComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            stats: [],
            newstats: [],
        };
    }

    componentDidMount() {
        const activityArr = [];
        if (this.state.loading) {
            fetch("http://localhost:3010/posts")
                .then((response) => response.json())
                .then((data) => {
                    this.setState({ stats: data });
                })
                .then(() => {
                    console.log(this.state.stats);
                    for (let i = 0; i < this.state.stats.length; i++) {
                        activityArr.push(
                            <p key={i}>
                                {this.state.stats[i].activity} for{" "}
                                {this.state.stats[i].time} hours
                            </p>
                        );
                    }
                    this.setState({ loading: false });
                    console.log(activityArr);
                    this.setState({ newstats: [...activityArr] });
                });
        }
    }

    render() {
        return (
            <>
                <h1>Stats</h1>
                <div>{this.state.newstats}</div>
            </>
        );
    }
}

export default StatsComponent;
