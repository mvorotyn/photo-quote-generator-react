import {
  AppBar,
  Button,
  createTheme,
  MuiThemeProvider,
  Slider,
  TextField,
  ThemeOptions,
  Typography,
  withStyles,
} from "@material-ui/core";
import { Stack } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import "./App.css";
import Header from "../../components/header";
import MainStage from "../../components/main-stage";
import { getRandomWallpaper } from "../../pexels-api";
import { useStore } from "../../stores/use-store";
import { downloadFile, getResizedImageDataURL } from "../../util";

export const themeOptions: ThemeOptions = {
  palette: {
    background: {
      default: "#222222",
      paper: "#222222",
    },
    type: "dark",
    primary: {
      main: "#802daf",
    },
    secondary: {
      main: "rgba(52, 24, 135, 0.98)", //"#f50057",
    },
    info: {
      main: "rgba(255,255,255, 1)",
    },
  },
};

const appTheme = createTheme(themeOptions);

const InputField = withStyles({
  root: {
    // "& .MuiInputBase-input": {
    //   color: "white",
    // },
    // "& .MuiInputBase-root": {
    //   color: "white",
    // },
    // "& .MuiInput-underline": {
    //   borderBottom: "1px solid white",
    // },
  },
})(TextField);

function App() {
  const store = useStore();
  let canvas: HTMLCanvasElement;
  const [author, setAuthor] = useState("");
  const [imageBlur, setImageBlur] = useState(0);
  const [quote, setQuote] = useState("");
  const [imageUrl, setImageUrl] = useState(
    "https://images.pexels.com/photos/572897/pexels-photo-572897.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  );

  // console.log("tweets: ", store.tweets);
  // store.tweets[0]?.toggle();
  const onCanvasRendered = (canv: HTMLCanvasElement) => {
    console.log(".");
    canvas = canv;
  };

  const onImageDownload = () => {
    // const dataUrl = canvas.toDataURL("image/png");
    // compressAndDownload(dataUrl, "quote.png");
    const dataUrlResized = getResizedImageDataURL(canvas);
    downloadFile(dataUrlResized, "quote.png");
  };

  function handleBlurChange(event: any, value: number | number[]): void {
    console.log(value);
    if (typeof value === "number") {
      setImageBlur(value);
    }
  }

  return (
    <MuiThemeProvider theme={appTheme}>
      <Header></Header>

      <div className="App">
        <MainStage
          onCanvasRendered={onCanvasRendered}
          author={author}
          blur={imageBlur}
          quote={quote}
          imageUrl={imageUrl}
        ></MainStage>
        <Stack
          justifyContent="center"
          alignItems="center"
          direction="column"
          spacing={2}
        >
          <a>Blur</a>
          <Slider
            defaultValue={0}
            aria-label="Default"
            style={{ width: "400px" }}
            // valueLabelDisplay="on"
            onChangeCommitted={handleBlurChange}
          />
          <InputField
            id="quote-text"
            label="Quote"
            value={quote}
            onChange={(ev) => {
              setQuote(ev.target.value);
            }}
            multiline
            rows={4}
            // defaultValue="insert some quote"
            variant="standard"
            style={{ width: "400px" }}
          />
          <InputField
            id="quote-author"
            label="Author"
            value={author}
            onChange={(ev) => {
              setAuthor(ev.target.value);
            }}
            variant="standard"
            style={{ width: "400px" }}
          />
        </Stack>
        <Stack
          marginTop="20px"
          marginBottom="60px"
          justifyContent="center"
          alignItems="center"
          direction="row"
          spacing={2}
        >
          <Button variant="contained" color="primary" onClick={onImageDownload}>
            Download
          </Button>
          <Button
            variant="contained"
            href="#contained-buttons"
            onClick={() => {
              getRandomWallpaper().then((result) => {
                // console.log("random wallper", result);
                if (result) setImageUrl(result);
              });
            }}
          >
            Change Background
          </Button>
        </Stack>
        <AppBar
          // position="static"
          position="fixed"
          color="secondary"
          style={{ top: "auto", bottom: 0 }}
        >
          <Typography
            variant="h6"
            color="inherit"
            style={{ textAlign: "center" }}
            component="div"
          >
            Mark Vorotyntsev(c) 2022
          </Typography>
        </AppBar>
      </div>
    </MuiThemeProvider>
  );
}

export default observer(App);
