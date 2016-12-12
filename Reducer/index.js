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
        case types.SORT:
            let newState = [...state];
            newState.sort(comparator(action.head.sortKey));
            return newState;
        default:
            return state
    }
}

export function heads(state = headOptions, action) {
    switch (action.type) {
        case types.SORT:
            headOptions.forEach(function (item) {
                item.sorted = false;
            });
            action.head.sorted = true;
            return headOptions;
        default:
            return headOptions
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