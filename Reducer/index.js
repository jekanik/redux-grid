import {combineReducers} from "redux";
import * as types from "../constants";

const gridRecords = [
    {name: "Train", cost: 12, percent: 25, group: "Traveling"},
    {name: "Car", cost: 17, percent: 13, group: "Shopping"},
    {name: "Ship", cost: 14, percent: 45, group: "Meal"}
];

function createSortOrderEnum() {
    let e = {ASC: 1, DESC: -1, NO: 0};
    e.next = function (id) {
        switch (id) {
            case e.ASC:
                return e.DESC;
            case e.DESC:
            case e.NO:
            default:
                return e.ASC;
        }
    };
    return Object.freeze(e);
}

const SortOrder = createSortOrderEnum();

const headOptions = [
    {name: "Name", sortKey: "name", sorted: false, sortOrder: SortOrder.NO},
    {name: "Cost", sortKey: "cost", sorted: false, sortOrder: SortOrder.NO},
    {name: "% from Salary", sortKey: "percent", sorted: false, sortOrder: SortOrder.NO},
    {name: "Group", sortKey: "group", sorted: false, sortOrder: SortOrder.NO}
];

function calculatePercent(cost, salary) {
    return Math.round((cost / salary) * 10000) / 100;
}

export function grid(state = gridRecords, action) {
    switch (action.type) {
        case types.SORT: {
            let newState = [...state];
            let head = action.value;
            newState.sort(comparator(head.sortKey, SortOrder.next(head.sortOrder)));
            return newState;
        }
        case types.EDIT: {
            let newState = [...state];
            let newRecord = action.value.newRecord;
            newRecord.percent = calculatePercent(newRecord.cost, action.value.salary);
            newState[action.value.index] = newRecord;
            return newState;
        }
        case types.ADD: {
            let newState = [...state];
            let newRecord = action.value.newRecord;
            newRecord.percent = calculatePercent(newRecord.cost, action.value.salary);
            newState.push(newRecord);
            return newState;
        }
        case types.REMOVE: {
            let newState = [...state];
            newState.splice(action.value, 1);
            return newState;
        }
        case types.CHANGE_SALARY: {
            let salary = action.value;
            return state.map(function (item) {
                item.percent = calculatePercent(item.cost, salary);
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
                item.sortOrder = SortOrder.next(action.value.sortOrder);
                return item.sorted = true;
            });
            return opts;
        }
        default:
            return headOptions;
    }
}

export function salary(state = 0, action) {
    switch (action.type) {
        case types.CHANGE_SALARY: {
            return action.value;
        }
        default:
            return state;
    }
}

function comparator(property, sortOrder) {
    return function (a, b) {
        let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

export const rootReducer = combineReducers({
    grid, heads, salary
});