import React, { useEffect, useState } from "react";
import {
  AppBar,
  createStyles,
  CssBaseline,
  Divider,
  Drawer,
  List,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { Mail, Inbox, People } from "@material-ui/icons";
import Axios from "axios";
import "./App.css";
import { CorrelationScatterChart } from "./charts/correlation-chart/CorrelationScatterChart";
import { formatDataForCorrelationScatterChart } from "./charts/util/formatter";
import { Movie } from "./types";
import { SidebarButton } from "./components/SidebarButton";

const drawerWidth = 240;

function App() {
  const classes = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        display: "flex",
      },
      root2: {
        width: "100%",
      },
      appBar: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: "#33415c",
      },
      drawer: {
        width: drawerWidth,
        flexShrink: 0,
      },
      drawerPaper: {
        width: drawerWidth,
      },
      drawerContainer: {
        overflow: "auto",
      },
      content: {
        flexGrow: 1,
        padding: theme.spacing(3),
      },
    })
  )();

  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    Axios.get("http://localhost:3000/api/movies/all")
      .then(({ data: movies }) => {
        setMovies(movies);
        setLoading(false);
      })
      .catch((e) => {
        console.error("Error:", e);
        setError(e.toString());
        setLoading(false);
      });
  }, []);

  if (isLoading) {
    return <>Loading...</>;
  } else {
    if (error) {
      return <>Sorry, an error occured.</>;
    }
    return (
      <BrowserRouter>
        <div className={classes.root}>
          <CssBaseline />
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" noWrap>
                Big Fake Dollar Loving Studios - Analytics System
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <Toolbar />
            <div className={classes.drawerContainer}>
              <List>
                <SidebarButton to="/" title="Home" icon={<Inbox />} />
              </List>
              <span style={{ padding: "10px" }}>Correlation Charts</span>
              <Divider />
              <List>
                <SidebarButton
                  to="/name-and-cumulative-gross-profit"
                  title="Name Length & Cumulative Gross Profit"
                  icon={<Mail />}
                />
                <SidebarButton
                  to="/stories"
                  title="Name & Cumulative Gross Profit"
                  icon={<Mail />}
                />
                <SidebarButton
                  to="/stories"
                  title="Name & Cumulative Gross Profit"
                  icon={<Mail />}
                />
                <SidebarButton
                  to="/stories"
                  title="Name & Cumulative Gross Profit"
                  icon={<Mail />}
                />
              </List>
            </div>
          </Drawer>
          <main className={classes.content}>
            <Toolbar />
            <Switch>
              <Route path="/name-and-cumulative-gross-profit">
                <CorrelationScatterChart
                  data={formatDataForCorrelationScatterChart(
                    movies.map(({ name, cumulativeGross }: Movie) => ({
                      name: name.trim().length,
                      cumulativeGross: cumulativeGross / 1000000,
                      label: name,
                    }))
                  )}
                  yAxisLabel="Profit"
                  xAxisLabel="Letters"
                  yAxisUnitString="M$"
                />
              </Route>
              <Route path="/">Home page</Route>
            </Switch>
          </main>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
