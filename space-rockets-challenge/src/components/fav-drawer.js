import React from "react";
import { Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent } from "@chakra-ui/core";
import { LSSet } from "../utils/use-local";

export default function FavDrawer({ onClose, isOpen }) {
  const favLaunchPads = new LSSet("flp");
  const favLaunches = new LSSet("fl");

  return (
    <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px">Favorites</DrawerHeader>
        <DrawerBody>
          {[...favLaunchPads.get()].map((flp) => (
            <p key={flp}>{flp}</p>
          ))}
          {[...favLaunches.get()].map((fl) => (
            <p key={fl}>{fl}</p>
          ))}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
