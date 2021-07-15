import "App.css";
import AppProvider from "AppProvider";
import Add from "pages/Add";
import Home from "pages/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Router will manage URL paths.
// Switch will match the first Route to the URL.
// Route creates a link to a real <a> href. So that screenreaders can also see it.
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
