import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import HomeComponent from "./HomeComponent";
import InfoComponent from "./InfoComponent";
import StatsComponent from "./StatsComponent";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            answer: "",
        };
        this.addData = this.addData.bind(this);
    }

    addData() {
        fetch("http://127.0.0.1:3010/posts/1", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ author: "Masi" }),
        })
            .then((resp) => resp.json())
            .then((data) => {
                this.setState({ answer: data.author });
                console.log(data);
            });
    }

    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <ul>
                        <li className="nav-item">
                            <Link to="/">Main Page</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/stats">Stats</Link>
                        </li>
                        <li className="last-nav-item">
                            <Link to="/info">Info</Link>
                        </li>
                    </ul>

                    <Routes>
                        <Route path="/" element={<HomeComponent />} />
                        <Route path="stats" element={<StatsComponent />} />
                        <Route path="info" element={<InfoComponent />} />
                        <Route path="*" element={<h1>Do not do that!</h1>} />
                    </Routes>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
