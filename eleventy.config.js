/** @type {import('@11ty/eleventy').UserConfig} */
module.exports = function (eleventyConfig) {
  // Input: project root; post source files in posts/ (*.md) are processed
  // Ignore non-blog paths so only posts/ and public/ drive the site
  eleventyConfig.ignores.add(".kiro/**");
  eleventyConfig.ignores.add(".cursor/**");
  eleventyConfig.ignores.add("node_modules/**");
  eleventyConfig.ignores.add("AGENTS.md");
  eleventyConfig.ignores.add("README.md");
  eleventyConfig.ignores.add("CONTENT-CONVENTION.md");
  eleventyConfig.ignores.add("package.json");
  eleventyConfig.ignores.add("package-lock.json");
  eleventyConfig.ignores.add("eleventy.config.js");
  eleventyConfig.ignores.add(".gitignore");

  eleventyConfig.addPassthroughCopy("public");

  eleventyConfig.addFilter("date", function (dateInput, format) {
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) return "";
    if (format === "YYYY-MM-DD") return d.toISOString().slice(0, 10);
    return d.toISOString().slice(0, 10);
  });

  // Collection of non-draft posts, sorted by date (newest first)
  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("posts/*.md")
      .filter((p) => !p.data.draft)
      .sort((a, b) => (b.data.date || 0) - (a.data.date || 0));
  });

  return {
    dir: {
      input: ".",
      output: "_site",
    },
  };
};
