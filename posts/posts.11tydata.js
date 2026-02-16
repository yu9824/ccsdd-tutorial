module.exports = {
  layout: "post.njk",
  // Exclude drafts from build output: no HTML emitted (permalink: false)
  permalink: (data) => {
    if (data.draft) return false;
    return (
      "/posts/" + (data.slug || data.page?.fileSlug || "post") + "/"
    );
  },
};
