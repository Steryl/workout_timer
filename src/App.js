import "App.css";
import AppProvider from "AppProvider";
import Add from "pages/Add";
import Home from "pages/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <AppProvider>
      <Router>
        <Switch>
          <Route path="/add">
            <Add />
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
