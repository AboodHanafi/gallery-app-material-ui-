import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { CardContent, Typography } from "@material-ui/core";

export default function MediaCard(props) {
  const { imagePath, full_Link, alt } = props;
  return (
    <Card
      sx={{
        width: "320px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        margin: "20px 10px",
        borderRadius: "8px",
        border: "1px solid #e0e0e0",
        boxShadow: "none",
      }}
    >
      <CardMedia component="img" height="300" image={imagePath} alt={alt} />
      <CardContent>
        <Typography variant="body2" color="textSecondary">
          {alt}
        </Typography>
      </CardContent>

      <CardActions>
        <Button
          onClick={() => window.open(full_Link)}
          size="medium"
          sx={{
            margin: "auto",
            backgroundColor: "#008ba3",
            color: "#fff",
            textTransform: "Capitalize",
            marginRight: "10px",
          }}
        >
          full resolution
        </Button>
      </CardActions>
    </Card>
  );
}
