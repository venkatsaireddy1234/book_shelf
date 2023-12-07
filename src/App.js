import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import BookContextProvider from "./utils/BookContext";

function App() {
  return (
    <BookContextProvider>
      <div className="App">
        <Header />
        <Outlet />
      </div>
    </BookContextProvider>
  );
}

export default App;
