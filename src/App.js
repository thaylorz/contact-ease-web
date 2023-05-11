import HeaderComponent from "./components/header/HeaderComponent"
import MainComponent from "./components/main/MainComponent";

import './App.css';
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="App">
      <HeaderComponent />
      <MainComponent />
      <Toaster position="top-center" />
    </div >
  );
}

export default App;
