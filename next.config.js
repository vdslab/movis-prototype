// eslint-disable-next-line @typescript-eslint/no-var-requires
// const withTM = require('next-transpile-modules')(['react-children-utilities'])
/* eslint-disable @typescript-eslint/no-var-requires, no-undef */

const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

function generateIncludes(modules) {
  return [
    new RegExp(`(${modules.join("|")})$`),
    new RegExp(`(${modules.join("|")})/(?!.*node_modules)`),
  ];
}

const includes = generateIncludes([
  "d3",
  "d3-array",
  "d3-axis",
  "d3-brush",
  "d3-chord",
  "d3-color",
  "d3-contour",
  "d3-delaunay",
  "d3-dispatch",
  "d3-drag",
  "d3-dsv",
  "d3-ease",
  "d3-fetch",
  "d3-force",
  "d3-format",
  "d3-geo",
  "d3-hierarchy",
  "d3-interpolate",
  "d3-path",
  "d3-polygon",
  "d3-quadtree",
  "d3-random",
  "d3-scale",
  "d3-scale-chromatic",
  "d3-selection",
  "d3-shape",
  "d3-time",
  "d3-time-format",
  "d3-timer",
  "d3-transition",
  "d3-zoom",
  "internmap",
  "delaunator",
  "robust-predicates",
  "react-children-utilities",
]);

const config = {
  webpack: (config) => {
    // ここは関係ない
    // config.module.rules.push({
    //  test: /\.css$/,
    //  use: 'raw-loader',
    //})
    config.externals = config.externals.map((external) => {
      if (typeof external !== "function") return external;
      return (context, request, callback) => {
        return includes.find((i) =>
          i.test(
            request.startsWith(".") ? path.resolve(context, request) : request
          )
        )
          ? callback() // i.e., not an external
          : external(context, request, callback);
      };
    });

    return config;
  },
};

// module.exports = withTM(config)
module.exports = {
  config,
  future: {
    webpack5: true,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.plugins.push(
      new CopyPlugin({
        patterns: ["prisma/dev.db"],
      })
    );
    return config;
  },
};
