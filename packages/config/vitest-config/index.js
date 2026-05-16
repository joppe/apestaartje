import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const moduleNameMapper = JSON.parse(
  fs.readFileSync(path.join(__dirname, "moduleNameMapper.json"), "utf8"),
);

// Convert Jest moduleNameMapper to Vitest alias format using regex
// This supports deep imports like @apestaartje/iterator/range/range
const alias = Object.entries(moduleNameMapper).map(([key]) => {
  // Extract package name from key: "@apestaartje/array/(.*)" -> "array"
  const packageName = key.match(/@apestaartje\/([^/]+)/)[1];

  return {
    find: new RegExp(`^@apestaartje/${packageName}/(.*)$`),
    replacement: path.join(__dirname, `../../lib/${packageName}/src/$1`),
  };
});

const config = {
  test: {
    globals: true,
    environment: "node",
  },
  resolve: {
    alias,
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
  },
};

export default config;
