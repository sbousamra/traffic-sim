import { Box, Flex, HStack, Stack } from "@chakra-ui/react";
import React from "react";
import { Canvas } from "./components/Canvas";
import rawMap from "./public/map.txt?raw";

interface Cell {
  type: "empty" | "road" | "traffic-light" | "car";
  component: React.ReactNode;
}

type Map = Cell[][];

interface Car {
  x: number;
  y: number;
}

const symbolToCell = (symbol: string): Cell => {
  switch (symbol) {
    case " ":
      return {
        type: "empty",
        component: <Box w={10} h={10} bg="white" />,
      };
    case "-":
      return {
        type: "road",
        component: <Box w={10} h={10} bg="blue.200" />,
      };
    case "|":
      return {
        type: "road",
        component: <Box w={10} h={10} bg="blue.200" />,
      };
    case "+":
      return {
        type: "traffic-light",
        component: <Box w={10} h={10} bg="red.200" />,
      };
    case "*": {
      return {
        type: "car",
        component: <Box w={10} h={10} bg="green.200" />,
      };
    }
    default:
      throw new Error(`Symbol ${symbol} in map not supported`);
  }
};

const draw = (map: Map, car: Car): Map => {
  return map.map((row, y) => {
    return row.map((cell, x) => {
      if (y === car.y && x === car.x) {
        return symbolToCell("*");
      }

      return cell;
    });
  });
};

const getNewCar = (car: Car): Car => {
  return { ...car, x: car.x + 1 };
};

export const App = () => {
  const initialMap = rawMap.split("\n").map((line) =>
    line.split("").map((symbol) => {
      return symbolToCell(symbol);
    })
  );

  const [map, setMap] = React.useState<Map>(initialMap);
  const [car, setCar] = React.useState<Car>({ x: 0, y: 9 });

  React.useEffect(() => {
    const interval = setInterval(() => {
      const newCar = { ...car, x: car.x + 1 };
      const newMap = draw(initialMap, newCar);

      console.log({ newCar });

      setCar(newCar);
      setMap(newMap);
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [car]);

  const rows = map.map((row, index) => {
    const rowComponents = row.map((cell) => cell.component);
    return (
      <Stack direction="row" w="full" h="full" key={index}>
        {rowComponents}
      </Stack>
    );
  });

  return (
    <Stack w="full" h="full">
      {rows}
    </Stack>
  );
};
