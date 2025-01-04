import * as fs from "fs";
import * as path from "path";
import { globSync } from "glob";

const cwd = path.resolve(__dirname, "../..");

[{ src: "docs/images", rel: "images" }]
  .concat(globSync("*.md", { cwd }).map((src) => ({ src, rel: src })))
  .forEach(({ src, rel }) => {
    fs.cpSync(src, `docs/dist/${rel}`, { recursive: true });
  });
