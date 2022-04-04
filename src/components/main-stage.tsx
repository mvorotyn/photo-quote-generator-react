import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../util";
import WallPaper from "./wallpaper";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { Layer, Rect, Stage, Text } from "react-konva";

let textConfig = {
  text: "Many of life's failures are people who did not realize how close they were to success when they gave up",
  size: 150,
  fill: "rgba(255, 255, 255, 0.8)",
  x: CANVAS_WIDTH / 2,
  y: CANVAS_HEIGHT / 2,
  width: 2400,
  height: 800,
};

export default function MainStage(props: {
  onCanvasRendered: (arg0: HTMLCanvasElement) => void;
  imageUrl: string;
  blur: number;
  quote: string | undefined;
  author: string | undefined;
}) {
  const [renderTextHeight, setRenderTextHeight] = useState(textConfig.size);

  const konvaContainer = useRef(null);
  const konvaMainText = useRef(null);

  let canvasText: { textArr: [] } = { textArr: [] };
  let lines = 1;
  if (konvaMainText.current) {
    canvasText = konvaMainText.current;
    lines = canvasText.textArr.length;
  }

  useEffect(() => {
    if (konvaContainer.current) {
      let cur: { content: HTMLElement } = konvaContainer.current;
      let content: HTMLElement = cur.content;
      let canva: HTMLCanvasElement = content.getElementsByTagName("canvas")[0];
      canva.setAttribute("style", "");
      props.onCanvasRendered(canva);
    }
  }, [props]);

  useEffect(() => {
    setRenderTextHeight(lines * textConfig.size);
  }, [lines]);

  return (
    <Stage width={CANVAS_WIDTH} height={CANVAS_HEIGHT} ref={konvaContainer}>
      <Layer>
        <WallPaper pic={props.imageUrl} blurAmount={props.blur} />
        <Rect
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          fill="#222"
          opacity={0.7}
        />
        <Text
          ref={konvaMainText}
          text={props.quote}
          fontSize={textConfig.size}
          fill={textConfig.fill}
          x={textConfig.x - textConfig.width / 2}
          y={textConfig.y - renderTextHeight / 2}
          fontFamily="'Open Sans', sans-serif" // wrap="char"
          align="center" // textDecoration=""
          // stroke="orange"
          // fontVariant="italic"
          width={textConfig.width}
        />
        <Text
          text={props.author}
          fontSize={textConfig.size * 0.7}
          fill="rgba(241, 90, 34, 0.85)"
          x={textConfig.x - textConfig.width / 2}
          y={textConfig.y - renderTextHeight / 2 + (renderTextHeight + 40)}
          fontFamily="'Open Sans', sans-serif" // wrap="char"
          align="center"
          textDecoration="underline" // stroke="white"
          strokeWidth={3} // fontVariant="bold"
          fontStyle="italic bold"
          width={textConfig.width}
        />
      </Layer>
    </Stage>
  );
}
