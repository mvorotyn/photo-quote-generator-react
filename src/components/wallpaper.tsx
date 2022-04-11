// import Konva from "konva";
// import { useEffect, useRef } from "react";
// import useImage from "use-image";
// import { backgroundImageCalcScale, imageGetCenterPoint } from "../util";
// import { Image as Img} from "react-konva";

 export default function  WallPaper (props: { pic: string; blurAmount: number }) {
//     const [image] = useImage(props.pic, "anonymous");
//     const konvaImgRef = useRef(null);
  
//     let scale = 1;
//     let imageCenter = { x: 0, y: 0 };
  
//     if (image) {
//       scale = backgroundImageCalcScale(image);
//       imageCenter = imageGetCenterPoint(image, scale);
//     }
//     // console.log(imageCenter, scale);
  
//     useEffect(() => {
//       if (image) {
//         if (konvaImgRef.current) {
//           let img = konvaImgRef.current as Konva.Image;
//           img.cache();
//         }
//       }
//     }, [image]);
  
//     return (
//       <Img
//         image={image}
//         x={imageCenter.x}
//         y={imageCenter.y}
//         scaleX={scale}
//         scaleY={scale}
//         filters={[Konva.Filters.Blur, Konva.Filters.Brighten]}
//         blurRadius={props.blurAmount}
//         // brightness={0}
//         ref={konvaImgRef}
//       />
//     );
  };

