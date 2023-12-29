import { Box, Flex } from "@chakra-ui/react";
import React, { CanvasHTMLAttributes, useEffect } from "react";

export const Canvas = React.forwardRef(
  (
    props: CanvasHTMLAttributes<any>,
    ref: React.ForwardedRef<HTMLCanvasElement>
  ) => {
    useEffect(() => {
      const canvas: HTMLCanvasElement = document.createElement("canvas");
      const context = canvas.getContext("2d") as CanvasRenderingContext2D;
    }, []);

    return (
      <Flex justify="center" align="center" w="100%" h="100%">
        <canvas ref={ref} {...props} />
      </Flex>
    );
  }
);
