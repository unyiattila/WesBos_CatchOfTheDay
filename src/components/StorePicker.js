import React from "react";
import { getFunName } from "../helpers";
import PropTypes from 'prop-types';


class StorePicker extends React.Component {
    constructor() {
        super()
        this.goToStore = this.goToStore.bind(this)
    }
    

    goToStore(event) {
        event.preventDefault();
        console.log("You changed the URL!")
        //first grab the text from the box
        const storeId = this.storeInput.value
        console.log(storeId)
        //transition to the proper URL
        this.context.router.history.push(`/store/${storeId}`)

    }

    render() {
        return (
            <form className="store-selector" onSubmit={this.goToStore}>
            {/* This is a comment */}
                <h2>Please enter a store</h2>
                <input type="text" required placeholder="Store Name" defaultValue={getFunName()} 
                ref={(input) => {this.storeInput = input}}></input>
                <button type="submit">Visit store</button>
            </form>
        )
    }
}

StorePicker.contextTypes = {
    router: PropTypes.object
}

export default StorePicker