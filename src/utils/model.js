import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { createHash } from "crypto";

function read(fileName) {
  return JSON.parse(readFileSync(resolve("database", `${fileName}.json`)));
}

function write(fileName, data) {
  writeFileSync(
    resolve("database", `${fileName}.json`),
    JSON.stringify(data, null, 2)
  );
  return true;
}

function hashPasswd(password) {
  return (password = createHash("sha256").update(password).digest("hex"));
}

function queryFilter(queryObj, data) {
  return data.filter((item) => {
    let isValid = true;
    for (let key in queryObj) {
      isValid = isValid && queryObj[key] == item[key];
    }
    return isValid;
  });
}

export { read, write, hashPasswd, queryFilter };
