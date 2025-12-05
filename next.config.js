const path = require("path");
const fs = require("fs");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  webpack: (config, { dev, webpack }) => {
    if (dev) {
      // Create a custom plugin to watch markdown files
      class WatchMarkdownPlugin {
        apply(compiler) {
          compiler.hooks.afterCompile.tap(
            "WatchMarkdownPlugin",
            (compilation) => {
              const entriesDir = path.join(process.cwd(), "src/entries");
              const worksDir = path.join(process.cwd(), "src/works");

              // Add markdown files as file dependencies
              const addMarkdownFiles = (dir) => {
                if (fs.existsSync(dir)) {
                  const files = fs.readdirSync(dir);
                  files.forEach((file) => {
                    if (file.endsWith(".md")) {
                      const filePath = path.join(dir, file);
                      compilation.fileDependencies.add(filePath);
                    }
                  });
                }
              };

              addMarkdownFiles(entriesDir);
              addMarkdownFiles(worksDir);
            },
          );
        }
      }

      config.plugins.push(new WatchMarkdownPlugin());
    }
    return config;
  },
};

module.exports = nextConfig;
