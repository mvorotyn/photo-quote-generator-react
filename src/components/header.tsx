import { AppBar, Toolbar, Typography } from "@mui/material";

export default function Header() {
    return (
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" component="div">
            PhotoQuote Generator
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
  