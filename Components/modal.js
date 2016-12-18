import React from "react";
import {Modal, Button} from "react-bootstrap";
import ValidatedInput from "./validatedinput";

export default class RecordModal extends React.Component {
    constructor() {
        super();
        this.state = {show: false, errors: {}};
    }

    close() {
        this.setState({show: false, errors: {}})
    }

    save() {
        let errors = this.state.errors;
        for (let key in errors) {
            if (errors.hasOwnProperty(key) && errors[key]) return;
        }

        let refs = this.refs;
        let newRecord = {
            name: refs.nameInput.value(),
            cost: parseInt(refs.costInput.value()),
            group: refs.groupSelect.value
        };
        this.state.callback(newRecord);
        this.close();
    }

    show(record = emptyRecord, callback) {
        this.setState({show: true, record, callback})
    }

    validate(validationStrategy, e) {
        let errors = this.state.errors;
        errors[e.target.name] = !validationStrategy(e.target.value);
        let newState = this.state;
        newState.errors = errors;
        this.setState(newState);
    }

    render() {
        let record = this.state.record || emptyRecord;
        return (
            <div>
                <Modal show={this.state.show} onHide={this.close.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Record</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ValidatedInput name="name"
                                        ref="nameInput"
                                        label="Name "
                                        type="text"
                                        value={record.name}
                                        onChange={
                                            this.validate.bind(this, function (value) {
                                                return value && value.length > 1 && value.length < 25;
                                            })
                                        }
                                        invalid={this.state.errors["name"]}
                                        errorMsg="Name length must be >1 and <25 characters"/>
                        <ValidatedInput name="cost"
                                        ref="costInput"
                                        label="Cost "
                                        type="number"
                                        value={record.cost}
                                        onChange={
                                            this.validate.bind(this, function (value) {
                                                return value && !isNaN(value) && parseInt(value) > 0 && value.length > 0 && value.length < 10;
                                            })
                                        }
                                        invalid={this.state.errors["cost"]}
                                        errorMsg="Cost must be numeric positive with length >0 and <10"/>
                        <label>Group
                            <select ref="groupSelect" defaultValue={record.group}>
                                <option value="Traveling">Traveling</option>
                                <option value="Shopping">Shopping</option>
                                <option value="Meal">Meal</option>
                                <option value="Tickets">Tickets</option>
                            </select>
                        </label>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.save.bind(this)}>OK</Button>
                        <Button onClick={this.close.bind(this)}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

const emptyRecord = {name: "Empty", cost: 1, group: ""};