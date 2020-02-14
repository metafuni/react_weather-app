import React from 'react';

class Form extends React.Component {
    render () {
        return (
            <form onSubmit={this.props.getWeather} id="forms">
                <input id="input-city" type="text" name="city" placeholder="City... "></input>
                <input id="input-country" type="text" name="country" placeholder="Country... "></input>
                <button id="btn-get-weather">Get Live Weather</button>
            </form>
        );
    }
};

export default Form;