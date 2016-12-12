import React from "react";
import {connect} from "react-redux";
import * as action from "../actions";

class GridComponent extends React.Component {
    constructor() {
        super();
    }

    handleSort(head) {
        let {dispatch} = this.props;
        dispatch(action.sortBy(head));
    }

    handleRecordEdit(index) {
        let {dispatch} = this.props;
        dispatch(action.edit(index));
    }

    handleRecordDelete(index) {
        let {dispatch} = this.props;
        dispatch(action.remove(index));
    }

    changeSalary(e) {
        let {dispatch} = this.props;
        dispatch(action.changeSalary(e.target.value));
    }

    render() {
        let records = this.props.records.map((record, index) => {
            return <GridRecord record={record} key={index} onEdit={this.handleRecordEdit.bind(this, index)}
                               onDelete={this.handleRecordDelete.bind(this, index)}/>
        });
        let heads = this.props.heads.map((head, index) => {
            return <HeadCell config={head} key={index} onSort={this.handleSort.bind(this, head)}/>
        });
        return (
            <div style={{width: 300, height: 300, padding: 20}}>
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
                    <input type="number" placeholder="Salary" onChange={this.changeSalary.bind(this)}/>
                </div>
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
        heads: state.heads
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