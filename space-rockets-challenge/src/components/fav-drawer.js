import React from "react";
import { SimpleGrid, Text, Stack } from "@chakra-ui/core";
import Breadcrumbs from "./breadcrumbs";

import { LSSet } from "../utils/use-local";

import { useSpaceXMulti } from "../utils/use-space-x";
import { LaunchPadItem } from "./launch-pads";
import { LaunchItem } from "./launches";

export default function FavDrawer() {
  const favLaunchPads = new LSSet("flp");
  const favLaunches = new LSSet("fl");

  const lpData = useSpaceXMulti("/launchpads", [...favLaunchPads.get()]);
  const lData = useSpaceXMulti("/launches", [...favLaunches.get()]);

  return (
    <div>
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Favorites" }]} />
      <Stack m={6}>
        <Text fontSize="lg" mb={2}>{`Launches (${lData.length})`}</Text>
        <SimpleGrid columns={1} spacing="4">
          {lData.length > 0 && lData.flat().map((launch) => <LaunchItem launch={launch} key={launch.flight_number} />)}
        </SimpleGrid>
        <Text fontSize="lg" my={2}>{`Launchpads (${lpData.length})`}</Text>
        <SimpleGrid columns={1} spacing="4">
          {lpData && lpData.flat().map((launchPad) => <LaunchPadItem key={launchPad.site_id} launchPad={launchPad} />)}
        </SimpleGrid>
      </Stack>
    </div>
  );
}
