import {createStore} from "redux";
import {rootReducer} from "../reducer";

export default function configureStore() {
    const persistedState = localStorage.getItem('localState') ? JSON.parse(localStorage.getItem('localState')) : {};
    const store = createStore(rootReducer, persistedState);
    store.subscribe(() => {
        localStorage.setItem('localState', JSON.stringify(store.getState()));
    });
    return store;
}
