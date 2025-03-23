const nodePath = require("node:path");
const fs = require("node:fs/promises");

const frontMatter = require("front-matter");

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://jonnity.com",
  generateRobotsTxt: true,
  outDir: "./out",
  sitemapSize: 7000,
  exclude: ["/server-sitemap.xml"],
  transform: async (config, path) => {
    if (isIgnoredPath(path)) {
      return null;
    }
    return { loc: path, lastmod: await customLastmod(path) };
  },
};

const isIgnoredPath = (path) => {
  return /^[\/]blog[\/]monthly-\d{4}-\d{2}$/.test(path);
};

const customLastmod = async (path) => {
  const monthlyPathRegExp = /^[\/]monthly[\/](\d{4}-\d{2})$/;
  if (monthlyPathRegExp.test(path)) {
    const filePath = nodePath.resolve(
      __dirname,
      path.replace(monthlyPathRegExp, "src/entries/monthly-$1.md"),
    );
    return getLatestDateString(filePath);
  }
  const blogPathRegExp = /^[\/]blog[\/](.*)$/;
  if (blogPathRegExp.test(path)) {
    const filePath = nodePath.resolve(
      __dirname,
      path.replace(blogPathRegExp, "src/entries/$1.md"),
    );
    return getLatestDateString(filePath);
  }

  const workPathRegExp = /^[\/]work[\/](.*)$/;
  if (workPathRegExp.test(path)) {
    const filePath = nodePath.resolve(
      __dirname,
      path.replace(workPathRegExp, "src/works/$1.md"),
    );
    return getLatestDateString(filePath);
  }

  return date2yyyymmdd(new Date());
};

const getLatestDateString = async (filePath) => {
  const mdContents = await fs.readFile(filePath, { encoding: "utf-8" });
  const parsedData = frontMatter(mdContents);
  const date = new Date(
    parsedData.attributes.updatedAt || parsedData.attributes.createdAt,
  );
  return date2yyyymmdd(date);
};

const date2yyyymmdd = (date) => {
  return date.toISOString().split("T")[0];
};
