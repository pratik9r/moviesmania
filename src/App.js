import Header from "./components/Header";
import Cards from "./components/Cards";
import { Route,Routes } from "react-router-dom";
import AddMovie from "./components/AddMovie";
import Details from "./components/Details";
import { createContext,useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";

const Appstate = createContext();

function App() {
  const [login,setLogin] = useState(false);
  const [user,setUser] = useState("");
  return (
    <Appstate.Provider value={{login,user,setLogin,setUser}}>
    <div className="App relative">
      <Header />
      <Routes>
        <Route element={<Cards />} path="/"></Route>
        <Route element={<AddMovie />} path="/addmovie"></Route>
        <Route element={<Details />} path="/details/:id"></Route>
        <Route element={<Login />} path="/login"></Route>
        <Route element={<Signup />} path="/signup"></Route>
      </Routes>
    </div>
    </Appstate.Provider>
  );
}

export default App;
export {Appstate};
