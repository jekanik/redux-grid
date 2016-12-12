require("bootstrap/dist/css/bootstrap.css");
require("../css/styles.css")
import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import configureStore from "../store/index";
import GridComponent from "../Components/grid";

const store = configureStore();

render(
    <Provider store={store}>
        <GridComponent/>
    </Provider>,
    document.getElementById('app')
);
