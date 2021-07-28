export const forceSerialize = (target: any) => {
  return JSON.parse(JSON.stringify(target));
};
