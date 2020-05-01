import React from "react";
import GridList from "@material-ui/core/GridList";
import { makeStyles } from "@material-ui/core/styles";
import GridListTile from "@material-ui/core/GridListTile";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 1280,
    height: 500,
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
}));

export default function ImageView(props) {
  const classes = useStyles();

  return (
    <GridList cellHeight={120} className={classes.gridList} cols={4}>
      {props.imageData.map((option) => (
        <GridListTile key={option.id}>
          <img
            src={`http://farm${option.farm}.static.flickr.com/${option.server}/${option.id}_${option.secret}.jpg`}
            alt="search-img"
          />
        </GridListTile>
      ))}
    </GridList>
  );
}
