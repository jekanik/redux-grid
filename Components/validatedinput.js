import React from "react";

export default class ValidatedInput extends React.Component {
    value() {
        return this.refs.input.value;
    }

    render() {
        return (
            <div className="validated-input">
                <label>{this.props.label}
                    <input ref="input" name={this.props.name} type={this.props.type} defaultValue={this.props.value}
                           onChange={this.props.onChange}/>
                    {
                        this.props.invalid && <span className="error-msg">{this.props.errorMsg}</span>
                    }
                </label>
            </div>
        );
    }
}