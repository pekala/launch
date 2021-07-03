import React from "react";
import { Routes, Route } from "react-router-dom";
import { Flex, Text, useDisclosure, IconButton } from "@chakra-ui/core";

import Launches from "./launches";
import Launch from "./launch";
import Home from "./home";
import LaunchPads from "./launch-pads";
import LaunchPad from "./launch-pad";
import FavDrawer from "./fav-drawer";

export default function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/launches" element={<Launches />} />
        <Route path="/launches/:launchId" element={<Launch />} />
        <Route path="/launch-pads" element={<LaunchPads />} />
        <Route path="/launch-pads/:launchPadId" element={<LaunchPad />} />
      </Routes>
    </div>
  );
}

function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex as="nav" align="center" justify="space-between" wrap="wrap" padding="6" bg="gray.800" color="white">
        <Text fontFamily="mono" letterSpacing="2px" fontWeight="bold" fontSize="lg">
          ¡SPACE·R0CKETS!
        </Text>
        <IconButton aria-label="Open favorite drawer" icon="arrow-left" onClick={onOpen} variantColor="black"/>
      </Flex>
      <FavDrawer isOpen={isOpen} onClose={onClose} />
    </>
  );
}
