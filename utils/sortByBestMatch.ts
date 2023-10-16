import { deburr, lowerCase, sortBy } from "lodash";

const sortObjectsByBestMatch = <T extends Record<any, any>>(
  objs: T[],
  key: keyof T,
  query: string
) => {
  const normalizedQuery = deburr(lowerCase(query));
  return sortBy(objs, (obj) => {
    const normalizedString = deburr(lowerCase(obj[key]));
    const index = normalizedString.indexOf(normalizedQuery);
    return index === -1 ? Infinity : index;
  });
};

export default sortObjectsByBestMatch;
