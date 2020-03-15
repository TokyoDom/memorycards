import React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import Creation from "./Creation";
import Login from './Login';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0e68cf"
    },
    secondary: {
      main: "#2da8e0"
    }
  }
});

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/create" component={Creation} />
            <Route exact path="/" component={Home} />
          </Switch>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
