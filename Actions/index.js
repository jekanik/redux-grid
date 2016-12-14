import * as types from "../constants";

export function sortBy(head) {
    return {
        type: types.SORT,
        value: head
    };
}

export function edit(index, newRecord, salary) {
    return {
        type: types.EDIT,
        value: {index, newRecord, salary}
    };
}

export function add(newRecord, salary) {
    return {
        type: types.ADD,
        value: {newRecord, salary}
    };
}

export function remove(index) {
    return {
        type: types.REMOVE,
        value: index
    };
}

export function changeSalary(newValue) {
    return {
        type: types.CHANGE_SALARY,
        value: newValue
    };
}