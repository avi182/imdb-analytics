import {
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { Link } from "react-router-dom";

export const SidebarButton = ({
  to,
  title,
  icon,
}: {
  to: string;
  title: string;
  icon: any;
}) => {
  const styles = makeStyles((theme: Theme) => ({
    listItemText: {
      fontSize: "1em",
    },
  }))();
  return (
    <Link
      style={{
        color: "inherit",
        textDecoration: "inherit",
      }}
      to={to}
    >
      <ListItem button key={title}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText
          primary={title}
          classes={{ primary: styles.listItemText }}
        />
      </ListItem>
    </Link>
  );
};
