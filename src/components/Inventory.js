import React from "react";
import AddFishForm from "./AddFishForm"

class Inventory extends React.Component {
    constructor() {
        super()
        this.renderInventory = this.renderInventory.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e, key) {
        const fish = this.props.fishes[key]
        const updatedFish = {
            ...fish, 
            [e.target.name]: e.target.value,
        };
        this.props.updateFish(key, updatedFish)
    }

    renderInventory(key) {
        const fish = this.props.fishes[key]
        return (
            <div className="fish-edit" key={key}>
                <input name="name" value={fish.name} type="text" placeholder="Fish name" onChange={(e) => this.handleChange(e, key)}></input>
                <input name="price" value={fish.price} type="text" placeholder="Fish price" onChange={(e) => this.handleChange(e, key)}></input>
                <select name="status" value={fish.status} onChange={(e) => this.handleChange(e, key)}>
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold out!</option>
                </select>
                <textarea name="desc" value={fish.desc} type="text" placeholder="Fish description" onChange={(e) => this.handleChange(e, key)}></textarea>
                <input name="image" value={fish.image} type="text" placeholder="Fish image" onChange={(e) => this.handleChange(e, key)}></input>
                <button onClick={() => this.props.removeFish(key)}>Remove Fish</button>
            </div>
        )
    }
    
    render() {
        return(
            <div>
                <h2>Inventory</h2>
                {Object.keys(this.props.fishes).map(this.renderInventory)}
                <AddFishForm addFish={this.props.addFish}/>
                <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
            </div>
        )
    }
}
export default Inventory