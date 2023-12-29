import React from "react";
import { Car } from "./components/Car";
import { Canvas } from "./components/Canvas";

const symbolMap = {
  "-": Car,
};

const radian = (n: number) => n * (Math.PI / 180);

const draw = (canvas: HTMLCanvasElement, rotation: number) => {
  const context = canvas.getContext("2d");

  if (!context) {
    return;
  }

  const hehe = new Image();
  hehe.src =
    "https://cdn.discordapp.com/emojis/828367695846047804.webp?size=240&quality=lossless";

  context.rotate(rotation);
  const imageWidth = hehe.width;
  const imageHeight = hehe.height;

  const canvasCenterX = canvas.width / 2;
  const canvasCenterY = canvas.height / 2;

  const imageX = canvasCenterX - imageWidth / 2;
  const imageY = canvasCenterY - imageHeight / 2;

  context.drawImage(hehe, imageX, imageY, imageWidth, imageHeight);
};

export const App = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setRotation((r) => r + radian(1));
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  React.useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    draw(canvasRef.current, rotation);
  }, [rotation]);

  return <Canvas ref={canvasRef} width="800px" height="600px" />;
};
