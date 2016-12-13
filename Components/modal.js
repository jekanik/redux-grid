import React from "react";
import {Modal, Button} from "react-bootstrap";

export default class RecordModal extends React.Component {
    constructor() {
        super();
        this.state = {show: true}
    }

    show() {
        this.setState({show: true})
    }

    close() {
        this.setState({show: false})
    }

    render() {
        return (
            <div>
                <Modal show={this.state.show} onHide={this.close.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Text in a modal</h4>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close.bind(this)}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}