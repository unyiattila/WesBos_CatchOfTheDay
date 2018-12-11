import React from "react";
import Header from "./Header"
import Order from "./Order"
import Inventory from "./Inventory"
import sampleFishes from "../sample-fishes.js"
import Fish from "./Fish"
import base from "../base"

class App extends React.Component {
    constructor() {
        super()

        this.addFish = this.addFish.bind(this)
        this.loadSamples = this.loadSamples.bind(this)
        this.addToOrder = this.addToOrder.bind(this)
        this.removeFromOrder = this.removeFromOrder.bind(this)
        this.updateFish = this.updateFish.bind(this)
        this.removeFish = this.removeFish.bind(this)

        this.state = {
            fishes: {},
            order: {},
        }
    }
    componentWillMount() {
        this.ref = base.syncState(`${this.props.match.params.storeId}/fishes`,
        {
            context: this,
            state: "fishes"
        });
        const localStorageRef = localStorage.getItem(`order-${this.props.match.params.storeId}`)

        if(localStorageRef) {
            this.setState({
                order: JSON.parse(localStorageRef)
            })
        }
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }
    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem(`order-${this.props.match.params.storeId}`, JSON.stringify(nextState.order))
    }

    addFish(fish) {
        const fishes = {...this.state.fishes}
        const timestamp = Date.now();
        fishes[`fish-${timestamp}`] = fish;
        this.setState({fishes})
        console.log(fishes)
    }

    updateFish(key, updatedFish) {
        const fishes = {...this.state.fishes};
        fishes[key] = updatedFish;
        this.setState({
            fishes: fishes,
        })
    }

    removeFish(key) {
        const fishes = {...this.state.fishes};
        fishes[key] = null;
        this.setState({
            fishes: fishes,
        })
    }

    loadSamples() {
        this.setState({
            fishes: sampleFishes
        })
    }

    addToOrder(key) {
        const order = {...this.state.order};
        order[key] = order[key] + 1 || 1;
        this.setState({
            order: order,
        })
    }

    removeFromOrder(key) {
        const order = {...this.state.order};
        delete order[key];
        this.setState({
            order: order,
        })
    }

    render() {
        return(
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fisssh, yesss"/>
                    <ul className="list-of-fishes">
                        {
                            Object
                                .keys(this.state.fishes)
                                .map((key) => <Fish index={key} addToOrder={this.addToOrder} key={key} details={this.state.fishes[key]}/> )
                        } 
                    </ul>
                </div>
                <Order removeFromOrder={this.removeFromOrder} fishes={this.state.fishes} order={this.state.order}/>
                <Inventory removeFish={this.removeFish} updateFish={this.updateFish} fishes={this.state.fishes} addFish={this.addFish} loadSamples={this.loadSamples}/>
            </div>
        )
    }
}

export default App;