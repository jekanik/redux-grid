import {createStore} from "redux";
import {rootReducer} from "../reducer";

export default function configureStore() {
    let grid = localStorage.getItem('grid');
    let salary = localStorage.getItem('salary');

    const persistedState = {};
    if (grid) {
        persistedState.grid = JSON.parse(grid);
    }
    if (salary) {
        persistedState.salary = JSON.parse(salary);
    }
    const store = createStore(rootReducer, persistedState);
    store.subscribe(() => {
        localStorage.setItem('grid', JSON.stringify(store.getState().grid));
        localStorage.setItem('salary', JSON.stringify(store.getState().salary));
    });
    return store;
}
