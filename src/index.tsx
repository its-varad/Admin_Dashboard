import React from "react";
import {createRoot} from "react-dom/client";

import App from "./App";
import {DevSupport} from "@react-buddy/ide-toolbox";


const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

root.render(
    <React.StrictMode>

            <App/>

    </React.StrictMode>
);
