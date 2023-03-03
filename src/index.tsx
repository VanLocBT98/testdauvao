import React from "react";
import ReactDOM from "react-dom/client";

//Cấu hình redux
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./redux/configStore";


//pages


// import HomeTemplate from "./templates/HomeTemplate";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
