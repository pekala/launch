import React, { useState } from "react";
import {
  Flex,
  Box,
  Text,
  Image,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/core";
import { Link as BrowserLink } from "react-router-dom";
import launches from "../assets/launches.svg";
import launchPads from "../assets/launchpads.svg";
import favorites from "../assets/favorites.svg";
import { useSpaceXMulti } from "../utils/use-space-x";
import { LSSet } from "../utils/use-local";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();

  const checkFav = (e) => {
    const favLaunchPads = new LSSet("flp");
    const favLaunches = new LSSet("fl");

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const lpData = useSpaceXMulti("/launchpads", [...favLaunchPads.get()]);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const lData = useSpaceXMulti("/launches", [...favLaunches.get()]);

    if (lpData.length === 0 && lData.length === 0) {
      setIsOpen(true);
      e.preventDefault();
    }
  };

  return (
    <Flex justify="space-around" m={6}>
      <Box maxW="sm" borderWidth="1px" rounded="lg" overflow="hidden" size="xs" as={BrowserLink} to="/launches">
        <Image src={launches} alt="Launches" />
        <Text fontSize="2xl" textAlign="center" mt={2}>
          Launches
        </Text>
      </Box>
      <Box borderWidth="1px" rounded="lg" overflow="hidden" size="xs" as={BrowserLink} to="/launch-pads">
        <Image src={launchPads} alt="LaunchPads" style={{ maxWidth: "100%", maxHeight: "75%", margin: "auto" }} />
        <Text fontSize="2xl" textAlign="center" mt={2}>
          LaunchPads
        </Text>
      </Box>
      <Box
        maxW="sm"
        borderWidth="1px"
        rounded="lg"
        overflow="hidden"
        size="xs"
        as={BrowserLink}
        to="/favorites"
        onClick={checkFav}
      >
        <Image src={favorites} alt="Favorites" style={{ maxWidth: "100%", maxHeight: "75%", margin: "auto" }} />
        <Text fontSize="2xl" textAlign="center" mt={2}>
          Favorites
        </Text>
      </Box>
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Favorite
          </AlertDialogHeader>
          <AlertDialogBody>
            You have not added any Launch or Launchpad as your favorite yet. Please click on &#9734; to add them in
            favorite and access them from here.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Close
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Flex>
  );
}
