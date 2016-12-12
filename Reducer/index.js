import {combineReducers} from "redux";
import * as types from "../constants";

let gridRecords = [
    {name: "Train", cost: 12, percent: 25, group: "Traveling"},
    {name: "Car", cost: 13, percent: 13, group: "Shopping"},
    {name: "Ship", cost: 14, percent: 45, group: "Meal"}
];

let headOptions = [
    {name: "Name", sortKey: "name", sorted: false},
    {name: "Cost", sortKey: "cost", sorted: false},
    {name: "% from Salary", sortKey: "percent", sorted: false},
    {name: "Group", sortKey: "group", sorted: false}
];

export function grid(state = gridRecords, action) {
    switch (action.type) {
        case types.SORT: {
            let newState = [...state];
            newState.sort(comparator(action.value.sortKey));
            return newState;
        }
        case types.EDIT: {
            return state;
        }
        case types.REMOVE: {
            let newState = [...state];
            newState.splice(action.value, 1);
            return newState;
        }
        case types.CHANGE_SALARY: {
            let salary = action.value;
            return state.map(function (item) {
                item.percent = Math.round((item.cost / salary) * 10000) / 100;
                return item;
            });
        }
        default:
            return state
    }
}

export function heads(state = headOptions, action) {
    switch (action.type) {
        case types.SORT: {
            let opts = JSON.parse(JSON.stringify(headOptions));
            opts.filter(function (item) {
                return item.sortKey === action.value.sortKey;
            }).map(function (item) {
                return item.sorted = true;
            });
            return opts;
        }
        default:
            return headOptions;
    }
}

function comparator(property) {
    let sortOrder = 1;
    return function (a, b) {
        let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

export const rootReducer = combineReducers({
    grid, heads
});