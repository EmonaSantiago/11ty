module.exports = (eleventyConfig) => {
  function configureMarkdownIt() {
    return require("markdown-it")({ html: true }).use(
      require("markdown-it-container"),
      "dynamic",
      {
        validate: function () {
          return true;
        },
        render: function (tokens, idx) {
          const token = tokens[idx];
          if (token.nesting === 1) {
            return "<section>";
          } else {
            return "</section>";
          }
        },
      }
    );
  }

  eleventyConfig.setLibrary("md", configureMarkdownIt());
  eleventyConfig.addPassthroughCopy("./css/");
  eleventyConfig.addPassthroughCopy("./content/images/");

  eleventyConfig.addWatchTarget("./css/");
  eleventyConfig.addWatchTarget("./content/images/");

  return {
    dir: {
      input: "content",
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
  };
};
