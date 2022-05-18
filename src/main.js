// import * as Vue from "vue";
import { createApp } from "vue";
import App from "~/App";
import store from "~/store";
import "./css/style.css";
import "./css/bootstrap.min.css";

import ModalComponent from "~/components/ModalComponent";
import SpinnerComponent from "~/components/SpinnerComponent";

const app = createApp(App);
app.use(store);
app.component("ModalComponent", ModalComponent);
app.component("SpinnerComponent", SpinnerComponent);
app.mount("#app");
