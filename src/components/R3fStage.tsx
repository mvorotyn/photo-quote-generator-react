import { Environment, Image, OrbitControls, Text } from "@react-three/drei";
import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { Ref, Suspense, useEffect, useRef, useState } from "react";
import { Canvas, ReactThreeFiber, useThree } from "react-three-fiber";
import { BufferGeometry, Material, Mesh, Vector3 } from "three";
import fontUrl from './../assets/font.ttf'

// import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
// import typefaceData from "@compai/font-recursive/data/typefaces/normal-400.json";
// const font= new FontLoader().parse(typefaceData);


export default function R3dStage(props: {
  onCanvasRendered: (arg0: HTMLCanvasElement) => void;
  imageUrl: string;
  blur: number;
  quote: string | undefined;
  author: string | undefined;
}) {
  // console.log(props);


  // var imageRef = useRef<Mesh>() as Ref<Mesh<BufferGeometry, Material | Material[]>>
  var stageRef = useRef<HTMLCanvasElement>(); //as Ref<HTMLCanvasElement>;
  const cam = useRef();
  let mesh: Mesh<BufferGeometry, Material | Material[]> | undefined = undefined;
  const maxCharsInRow = 30;

  function textFold(input: string | undefined, lineSize: number) {
    if (!input) return "";
    const output = [];
    let outputCharCount = 0;
    let outputCharsInCurrentLine = 0;
    for (var i = 0; i < input.length; i++) {
      const inputChar = input[i];
      output[outputCharCount++] = inputChar;
      if (inputChar === "\n") {
        outputCharsInCurrentLine = 0;
      } else if (outputCharsInCurrentLine > lineSize - 2) {
        output[outputCharCount++] = "\n";
        outputCharsInCurrentLine = 0;
      } else {
        outputCharsInCurrentLine++;
      }
    }
    let result = output.join("");
    return result;
  }

  const getTextRowsCount = (input: string) => {
    return input.split("\n").length;
  };

  useEffect(() => {
    if (stageRef) {
      let canva: HTMLCanvasElement = stageRef.current as HTMLCanvasElement;
      props.onCanvasRendered(canva);
      // canva.setAttribute("style", "width: 1920px; height: 1080px");
    }
    // if (imageRef?.current) {
    //   mesh = imageRef.current as Mesh<BufferGeometry>;
    //   if (mesh) {
    // mesh.material.scale = scale;
    // console.log(mesh, "222");
    // mesh.material.opacity = 0.5;
    // mesh.material.scale[1] = mesh.scale.y = 9;
    // mesh.material.scale[0] = mesh.scale.x = 16;

    // scale = backgroundImageCalcScale(image);
    //   imageCenter = imageGetCenterPoint(image, scale);
    // mesh.
    // }
    // }
  });

  function getPisitionedText(text: string | undefined): string {
    if (!text) return "";
    let rows = getTextRowsCount(textFold(props.quote, maxCharsInRow));
    let posString = "";
    for (let index = 0; index < rows; index++) {
      posString += "\n";
    }
    posString += `\n${text}`;
    return posString;
  }

  return (
    <Canvas
      // flat
      // linear
      ref={stageRef as Ref<HTMLCanvasElement>}
      gl={{
        // size:
        powerPreference: "high-performance",
        alpha: true,
        preserveDrawingBuffer: true,
        antialias: true,
        stencil: false,
        depth: false,
      }}
      //   mode="concurrent"
      //   frameloop="never"
      resize={{ scroll: false, debounce: 0 }}
      style={
        {
          // border: '1px solid black',
          minWidth: "340px",
          aspectRatio: "16 / 9",
          display: "block",
          postion: "static !important",
          maxWidth: "calc( 100vw - 15rem )",
          maxHeight: "calc( 100vh - 9rem )",
          boxShadow: "5px 5px 15px rgba(0,0,0,0.25)",
          marginBottom: " 1rem",
        } as React.CSSProperties
      }
    >
      <Suspense fallback={null}>
        <Image
          // ref={imageRef}
          // @ts-expect-error
          scale={[16, 9, 1]}
          url={props.imageUrl}
        />
        <Text
          font={fontUrl}
          // whiteSpace="overflowWrap"
          castShadow={true}
          textAlign="center"
          overflowWrap="break-word"
          maxWidth={5}
          scale={[6, 6, 6]}
          color="white" // default
          anchorX="center" // default
          anchorY="middle" // default
          position={[0, 0, 0.1]}
        >
          {textFold(props.quote, maxCharsInRow)}
        </Text>
        <Text
        font={fontUrl}
          // whiteSpace="overflowWrap"
          castShadow={true}
          textAlign="center"
          overflowWrap="break-word"
          maxWidth={5}
          // outlineColor="white"
          // outlineWidth="10"
          scale={[6, 6, 6]}
          color="#ff8000" // default
          anchorX="center" // default
          anchorY="middle" // default
          position={[0, 0, 0.1]}
   
        >
          {getPisitionedText(props.author)}
        </Text>
        <OrbitControls
          // autoRotate={true} // zoomSpeed={5}
          autoRotateSpeed={1}
        />
        <Environment preset="sunset" background />
      </Suspense>
      <EffectComposer>
        <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={props.blur * 0.1} height={480} />
        {/* <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} /> */}
        {/* <Noise opacity={0.02} /> */}
        <Vignette eskil={false} offset={0.1} darkness={0.9} />
      </EffectComposer>
    </Canvas>
  );
}
