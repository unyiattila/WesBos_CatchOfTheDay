import React from "react";

class AddFishForm extends React.Component {
    constructor() {
        super()
        this.createFish = this.createFish.bind(this)
    }
    createFish(event) {
        event.preventDefault()
        const fish = {
            name: this.name.value,
            price: this.price.value,
            status:this.status.value,
            desc:this.desc.value,
            image:this.image.value,
        }
        this.props.addFish(fish)
        this.fishForm.reset()

    }
    
    render() {
        return(
            <form ref={(input) => this.fishForm = input} className="fish-edit" onSubmit={this.createFish}>
                <input ref={(input) => this.name = input} type="text" placeholder="Fish name"></input>
                <input ref={(input) => this.price = input} type="text" placeholder="Fish price"></input>
                <select ref={(input) => this.status = input}>
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold out!</option>
                </select>
                <textarea ref={(input) => this.desc = input} type="text" placeholder="Fish description"></textarea>
                <input ref={(input) => this.image = input} type="text" placeholder="Fish image"></input>
                <button type="submit">+ Add item</button>
            </form>
        )
    }
}

export default AddFishForm;