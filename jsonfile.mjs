import fs from "fs";

export const read = (path) =>
  JSON.parse(fs.readFileSync(path, { encoding: "utf8" }));

export const save = (path, data) =>
  fs.writeFileSync(path, JSON.stringify(data), { encoding: "utf8" });

export default { read, save };
