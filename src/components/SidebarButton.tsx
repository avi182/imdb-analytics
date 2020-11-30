import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
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
  return (
    <Link style={{ color: "inherit", textDecoration: "inherit" }} to={to}>
      <ListItem button key={title}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={title} />
      </ListItem>
    </Link>
  );
};
