import * as types from "../constants";

export function sortBy(head) {
    return {
        type: types.SORT,
        value: head
    };
}

export function edit(index) {
    return {
        type: types.EDIT,
        value: index
    };
}

export function remove(index) {
    return {
        type: types.REMOVE,
        value: index
    };
}