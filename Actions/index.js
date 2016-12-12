import * as types from "../constants";

export function sortBy(head) {
    return {
        type: types.SORT,
        head: head
    };
}