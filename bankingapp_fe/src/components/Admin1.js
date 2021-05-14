import {BrowserRouter as Router, Switch, Route} from "react-router-dom" 
import routes from "../routes";
import Navbar from "./Navbar";


function Admin1() {

  return (
    <div className="App">
     
    <Navbar />
    <div>
    <h1>Welcome Admin!!!!</h1>
    </div>
    
    </div>
    
  );
}

export default Admin1;
