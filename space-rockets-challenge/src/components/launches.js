import React, { useState } from "react";
import {
  Badge,
  Box,
  Image,
  Text,
  Flex,
  IconButton,
  Stack,
  Input,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  Icon,
  Select,
} from "@chakra-ui/core";
import { format as timeAgo } from "timeago.js";
import { Link } from "react-router-dom";
import { Star } from "react-feather";

import { useSpaceXConditional } from "../utils/use-space-x";
import { formatDate } from "../utils/format-date";
import Error from "./error";
import Breadcrumbs from "./breadcrumbs";
import LoadMoreButton from "./load-more-button";
import { LSSet } from "../utils/use-local";

const PAGE_SIZE = 12;

export default function Launches() {
  const [query, setQuery] = useState();
  const [filter, setFilter] = useState("all");

  const { data, error, isValidating, setSize, size } = useSpaceXConditional(
    "/launches/past",
    {
      limit: PAGE_SIZE,
      order: "desc",
      sort: "launch_date_utc",
    },
    query,
    filter
  );

  return (
    <div>
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Launches" }]} />
      <Flex m="6" justify="space-between">
        <InputGroup size="md" style={{ width: "50%" }}>
          <InputLeftElement children={<Icon name="search" color="gray.300" />} />

          <Input placeholder="Search by mission names" onChange={(e) => setQuery(e.target.value)} />
          <InputRightElement></InputRightElement>
        </InputGroup>
        <div>
          <Select onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All launches</option>
            <option value="success">Successful</option>
            <option value="fail">Failed</option>
          </Select>
        </div>
      </Flex>
      <Stack m="6" spacing="10">
        {error && <Error />}
        {data && data.flat().map((launch) => <LaunchItem launch={launch} key={launch.flight_number} />)}
      </Stack>
      <LoadMoreButton
        loadMore={() => setSize(size + 1)}
        data={data}
        pageSize={PAGE_SIZE}
        isLoadingMore={isValidating}
      />
    </div>
  );
}

export function LaunchItem({ launch }) {
  const favLaunches = new LSSet("fl");
  const [fls, setFLs] = useState(favLaunches.get());

  return (
    <Box
      as={Link}
      to={`/launches/${launch.flight_number.toString()}`}
      boxShadow="md"
      borderWidth="1px"
      rounded="lg"
      overflow="hidden"
      position="relative"
    >
      <Flex justify="space-between">
        <Box size="3xs" style={{ height: "100px" }}>
          <Image
            src={launch.links.flickr_images[0]?.replace("_o.jpg", "_z.jpg") ?? launch.links.mission_patch_small}
            alt={`${launch.mission_name} launch`}
            style={{ minHeight: "100%" }}
          />
        </Box>
        <Box p="6">
          <Box d="flex" alignItems="baseline">
            {launch.launch_success ? (
              <Badge px="2" variant="solid" variantColor="green">
                Successful
              </Badge>
            ) : (
              <Badge px="2" variant="solid" variantColor="red">
                Failed
              </Badge>
            )}
            <Box
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              textTransform="uppercase"
              ml="2"
            >
              {launch.rocket.rocket_name} &bull; {launch.launch_site.site_name}
            </Box>
          </Box>

          <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
            {launch.mission_name}
          </Box>

          <Flex>
            <Text fontSize="sm">{formatDate(launch.launch_date_utc)} </Text>
            <Text color="gray.500" ml="2" fontSize="sm">
              {timeAgo(launch.launch_date_utc)}
            </Text>
          </Flex>
        </Box>
        <IconButton
          variant="ghost"
          aria-label="Favorite icon"
          icon={Star}
          color={fls.has(launch.flight_number) ? "yellow.500" : null}
          onClick={(e) => {
            fls.has(launch.flight_number)
              ? favLaunches.delete(launch.flight_number)
              : favLaunches.add(launch.flight_number);
            setFLs(favLaunches.get());
            e.preventDefault();
          }}
        />
      </Flex>
    </Box>
  );
}
