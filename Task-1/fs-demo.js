const fs = require("fs");
const crypto = require("crypto");
const argv = process.argv.slice(2);
const input = argv[0];
fs.writeFileSync("output.txt", "--- Generating Fresh Output file ----\n");
if (input != null) {
  const stat = fs.statSync(input);
  if (stat.isDirectory()) {
    readdirectory(input);
  } else {
    console.log("Not a directory");
  }
} else {
  console.log("No input");
}

function readdirectory(dirName) {
  const dir = fs.readdirSync(dirName);
  dir.forEach(async function(dirent) {
    const path = dirName + "/" + dirent;
    if (fs.statSync(path).isDirectory()) {
      readdirectory(path);
    } else {
      let output =
        path +
        "\t-[MD5]-> " +
        calculateHash(path, "md5") +
        " -[SHA1]-> " +
        calculateHash(path, "sha1") +
        "\n";
      writtingoutputfile(output);
    }
  });
}

function calculateHash(filePath, algorithm) {
  let file_buffer = fs.readFileSync(filePath);
  let sum = crypto.createHash(algorithm);
  sum.update(file_buffer);
  return sum.digest("hex");
}

async function writtingoutputfile(data) {
  fs.appendFileSync("output.txt", data);
}
