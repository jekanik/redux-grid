import React from "react";
import {connect} from "react-redux";
import * as action from "../actions";
import RecordModal from "./modal";

class GridComponent extends React.Component {
    constructor() {
        super();
    }

    sortRecords(head) {
        let {dispatch} = this.props;
        dispatch(action.sortBy(head));
    }

    editRecord(index, record) {
        let {dispatch} = this.props;
        let {salary} = this.props;
        this.refs.recordModal.show(record, function (newRecord) {
            dispatch(action.edit(index, newRecord, salary));
        });
    }

    addRecord() {
        let {dispatch} = this.props;
        let {salary} = this.props;
        this.refs.recordModal.show(null, function (newRecord) {
            dispatch(action.add(newRecord, salary));
        });
    }

    deleteRecord(index) {
        let {dispatch} = this.props;
        dispatch(action.remove(index));
    }

    changeSalary(e) {
        let {dispatch} = this.props;
        dispatch(action.changeSalary(e.target.value));
    }

    render() {
        let records = this.props.records.map((record, index) => {
            return <GridRecord record={record} key={index} onEdit={this.editRecord.bind(this, index, record)}
                               onDelete={this.deleteRecord.bind(this, index)}/>
        });
        let heads = this.props.heads.map((head, index) => {
            return <HeadCell config={head} key={index} onSort={this.sortRecords.bind(this, head)}/>
        });
        return (
            <div className="grid-component">
                <table className="table table-condensed table-bordered">
                    <thead>
                    <tr>
                        {heads}
                    </tr>
                    </thead>
                    <tbody>
                    {records}
                    </tbody>
                </table>
                <div>
                    <label>Salary <input type="number"
                                         value={this.props.salary}
                                         onChange={this.changeSalary.bind(this)}/></label>
                    <button onClick={this.addRecord.bind(this)}>Add</button>
                </div>
                <RecordModal ref="recordModal"/>
            </div>
        )
    }
}

GridComponent.propTypes = {
    records: React.PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return {
        records: state.grid,
        heads: state.heads,
        salary: state.salary
    }
}

export default connect(
    mapStateToProps
)(GridComponent)

class HeadCell extends React.Component {
    render() {
        let {config} = this.props;
        return <th onClick={this.props.onSort} className={config.sorted ? 'selected' : ''}>
            {config.name}
        </th>
    }
}

class GridRecord extends React.Component {
    render() {
        let {record} = this.props;
        return <tr>
            <th>{record.name}</th>
            <th>
                {record.cost}
            </th>
            <th>
                {record.percent}
            </th>
            <th>
                {record.group}
            </th>
            <th className="buttons">
                <button onClick={this.props.onEdit}>
                    Edit
                </button>
                <button onClick={this.props.onDelete}>
                    Delete
                </button>
            </th>
        </tr>
    }
}

GridRecord.defaultProps = {
    record: {name: "N/A", cost: 0, percent: 0, group: "N/A"}
};

GridRecord.propTypes = {
    record: React.PropTypes.shape({
        name: React.PropTypes.string.isRequired,
        cost: React.PropTypes.number.isRequired,
        percent: React.PropTypes.number.isRequired,
        group: React.PropTypes.string.isRequired
    })
};