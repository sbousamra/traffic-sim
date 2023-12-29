import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";

const element = document.getElementById("app");

if (element) {
  const root = createRoot(element);
  root.render(
    <ChakraProvider>
      <App />
    </ChakraProvider>
  );
}
