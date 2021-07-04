import useSWR, { useSWRInfinite } from "swr";

const fetcher = async (...args) => {
  const response = await fetch(...args);
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return await response.json();
};

function getSpaceXUrl(path, options) {
  const searchParams = new URLSearchParams();
  for (const property in options) {
    searchParams.append(property, options[property]);
  }

  const spaceXApiBase = process.env.REACT_APP_SPACEX_API_URL;
  return `${spaceXApiBase}${path}?${searchParams.toString()}`;
}

export function useSpaceX(path, options) {
  const endpointUrl = getSpaceXUrl(path, options);
  return useSWR(path ? endpointUrl : null, fetcher);
}

export function useSpaceXMulti(path, ids, options) {
  const data = [];
  ids.forEach((id) => {
    const endpointUrl = getSpaceXUrl(`${path}/${id}`, options);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data: partData } = useSWR(path ? endpointUrl : null, fetcher);
    partData && data.push(partData);
  });
  return data;
}

export function useSpaceXConditional(path, options, query, filter) {
  let data;
  const { data: allData, ...rest } = useSpaceXPaginated(path, options);
  switch (path) {
    case "/launches/past":
      if (query) {
        data = allData[0].filter((i) => i.mission_name.toLowerCase().includes(query.toLowerCase()));
      } else {
        data = allData;
      }
      console.log(data, filter);
      if (filter !== "all") {
        data = allData[0].filter((i) => i.launch_success === (filter === "success" ? true : null));
      }
      break;
    default:
      break;
  }
  return { data, ...rest };
}

export function useSpaceXPaginated(path, options) {
  return useSWRInfinite((pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.length) {
      return null;
    }
    return getSpaceXUrl(path, {
      ...options,
      offset: options.limit * pageIndex,
    });
  }, fetcher);
}
