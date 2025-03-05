import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);


// // IMPORT THÊM
// import { GoogleOAuthProvider } from '@react-oauth/google';

// // Client ID lấy từ Google Cloud Console (chỗ bạn đã tạo OAuth 2.0 client)
// const GOOGLE_CLIENT_ID = "239078791405-nnl0nfl6o6pd2ljbhbocuplmu13pnu9k.apps.googleusercontent.com";

// const root = ReactDOM.createRoot(
//   document.getElementById("root") as HTMLElement
// );

// root.render(
//   <React.StrictMode>
//     <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
//       <Provider store={store}>
//         <App />
//       </Provider>
//     </GoogleOAuthProvider>
//   </React.StrictMode>
// );