const fs = require("fs");
const crypto = require("crypto");
const argv = process.argv.slice(2);
const input = argv[0];
const pathLib = require("path");

fs.writeFileSync("output.txt", "--- Generating Fresh Output file ----\n");

if (input != null) {
  const stat = fs.statSync(input);
  if (stat.isDirectory()) {
    readDirectory(input);
  } else {
    console.log("Not a directory");
  }
} else {
  console.log("No input");
}

function readDirectory(dirName) {
  const dir = fs.readdirSync(dirName);
  dir.forEach(async function (dirent) {
    const path = pathLib.join(dirName, dirent);
    if (fs.statSync(path).isDirectory()) {
      readDirectory(path);
    } else {
      let output =
        path +
        "\t-[MD5]-> " +
        calculateHash(path, "md5") +
        " -[SHA1]-> " +
        calculateHash(path, "sha1") +
        "\n";
      await writtingOutputFile(output);
    }
  });
}

function calculateHash(filePath, algorithm) {
  let file_buffer = fs.readFileSync(filePath);
  let sum = crypto.createHash(algorithm);
  sum.update(file_buffer);
  return sum.digest("hex");
}

async function writtingOutputFile(data) {
  fs.appendFileSync("output.txt", data);
}
