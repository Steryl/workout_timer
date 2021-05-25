import "App.css";
import AppProvider from "providers/AppProvider";
import Add from "pages/Add";
import Home from "pages/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import InputProvider from "providers/InputProvider";

// Input provider will copy to Appprovider when timer is set.
function App() {
  return (
    <AppProvider>
      <Router>
        <Switch>
          <Route path="/add">
            <InputProvider>
              <Add />
            </InputProvider>
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </AppProvider>
  );
}

export default App;
