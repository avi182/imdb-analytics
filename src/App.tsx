import React, { useEffect, useState } from "react";
import {
  AppBar,
  CircularProgress,
  createStyles,
  CssBaseline,
  Divider,
  Drawer,
  LinearProgress,
  List,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { BrowserRouter } from "react-router-dom";
import { Home, BarChart } from "@material-ui/icons";
import Axios from "axios";
import "./App.css";
import { Movie } from "./types";
import { SidebarButton } from "./components/SidebarButton";
import { ChartRoutes } from "./pages/chart-routes/ChartRoutes";

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
    Axios.get("http://localhost:5000/api/movies/all")
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
              <SidebarButton to="/" title="Home" icon={<Home />} />
            </List>
            <p style={{ paddingLeft: "10px" }}>Correlation Charts</p>
            <Divider />
            {isLoading ? (
              <div style={{ padding: "10px" }}>
                <CircularProgress />
              </div>
            ) : (
              <List>
                <SidebarButton
                  to="/name-and-cumulative-gross-profit"
                  title="Name Length & Cumulative Gross Profit"
                  icon={<BarChart />}
                />
                <SidebarButton
                  to="/rating-and-roi"
                  title="Rating & ROI"
                  icon={<BarChart />}
                />
                <SidebarButton
                  to="/release-quarter-and-roi"
                  title="Release Quarter & ROI"
                  icon={<BarChart />}
                />
                <SidebarButton
                  to="/runtime-and-roi"
                  title="Runtime & ROI"
                  icon={<BarChart />}
                />
                <SidebarButton
                  to="/roi-by-genres"
                  title="ROI by Genres"
                  icon={<BarChart />}
                />
              </List>
            )}
          </div>
        </Drawer>
        <main className={classes.content}>
          <Toolbar />
          {isLoading ? (
            <>
              <LinearProgress />
              <p>Fetching fresh data, Please wait...</p>
            </>
          ) : error ? (
            <>{error}</>
          ) : (
            <ChartRoutes movies={movies} />
          )}
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
