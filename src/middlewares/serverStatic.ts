import staticPlugin from "@elysiajs/static";

const Static = staticPlugin({
  assets: "public",
  prefix: "",
  indexHTML: true,
});

export default Static;
