import React, { useReducer } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chat from "./Chat";
import Login from "./Login";

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_NAME":
      return action.name;
    case "GET_NAME":
      return state;
    default:
      return state;
  }
};

export const UserDispatch = React.createContext(null);

function App() {
  const [state, dispatch] = useReducer(reducer, "");

  console.log(state);

  return (
    <UserDispatch.Provider value={dispatch}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="game" element={<Chat name={state} />}></Route>
        </Routes>
      </BrowserRouter>
    </UserDispatch.Provider>
  );
}

export default App;
