import React from "react";
import { Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, SimpleGrid, Text } from "@chakra-ui/core";
import { LSSet } from "../utils/use-local";

import { useSpaceXMulti } from "../utils/use-space-x";
import { LaunchPadItem } from "./launch-pads";
import { LaunchItem } from "./launches";

export default function FavDrawer({ onClose, isOpen }) {
  const favLaunchPads = new LSSet("flp");
  const favLaunches = new LSSet("fl");

  const lpData = useSpaceXMulti("/launchpads", [...favLaunchPads.get()]);
  const lData = useSpaceXMulti("/launches", [...favLaunches.get()]);

  return (
    <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px">Favorites</DrawerHeader>
        <DrawerBody style={{ overflowY: "auto" }}>
          <Text fontSize="lg" mb={2}>{`Launches (${lData.length})`}</Text>
          <SimpleGrid columns={1} spacing="4">
            {lData && lData.flat().map((launch) => <LaunchItem launch={launch} key={launch.flight_number} />)}
          </SimpleGrid>
          <Text fontSize="lg" my={2}>{`Launchpads (${lpData.length})`}</Text>
          <SimpleGrid columns={1} spacing="4">
            {lpData &&
              lpData.flat().map((launchPad) => <LaunchPadItem key={launchPad.site_id} launchPad={launchPad} />)}
          </SimpleGrid>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
