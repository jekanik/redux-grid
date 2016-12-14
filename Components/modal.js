import React from "react";
import {Modal, Button} from "react-bootstrap";

export default class RecordModal extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    close() {
        this.setState({show: false})
    }

    save() {
        let refs = this.refs;
        let newRecord = {
            name: refs.nameInput.value,
            cost: parseInt(refs.costInput.value),
            group: refs.groupSelect.value
        };
        this.state.callback(newRecord);
        this.close();
    }

    show(record = emptyRecord, callback) {
        this.setState({show: true, record, callback})
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
                        <label>Name <input ref="nameInput" defaultValue={record.name} type="text"/></label>
                        <label>Cost <input ref="costInput" defaultValue={record.cost} type="number"/></label>
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

const emptyRecord = {name: "", cost: 0, group: ""};