// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "React Native Reanimated",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://your-docusaurus-test-site.com",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "facebook", // Usually your GitHub org/user name.
  projectName: "docusaurus", // Usually your repo name.

  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          sidebarCollapsible: false,
        },
        theme: {
          customCss: require.resolve("./src/css/index.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: "img/docusaurus-social-card.jpg",
      navbar: {
        title: "React Native Reanimated",
        logo: {
          alt: "My Site Logo",
          src: "img/logo.svg",
          srcDark: "img/logo-dark.svg",
        },
        items: [
          {
            type: "doc",
            docId: "fundamentals/getting-started",
            position: "left",
            label: "Docs",
          },
          {
            href: "https://github.com/facebook/docusaurus",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "light",
        links: [],
        copyright:
          "All trademarks and copyrights belong to their respective owners.",
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
  plugins: [
    ...[
      process.env.NODE_ENV === "production" && "@docusaurus/plugin-debug",
    ].filter(Boolean),
    async function reanimatedDocusaurusPlugin(context, options) {
      return {
        name: "react-native-reanimated/docusaurus-plugin",
        configureWebpack(config, isServer, utils) {
          const processMock = !isServer ? { process: { env: {} } } : {};

          const raf = require("raf");
          raf.polyfill();

          return {
            mergeStrategy: {
              "resolve.extensions": "prepend",
            },
            plugins: [
              new webpack.DefinePlugin({
                ...processMock,
                __DEV__: "false",
                setImmediate: () => {},
              }),
            ],
            module: {
              rules: [
                {
                  test: /\.txt/,
                  type: "asset/source",
                },
              ],
            },
            resolve: {
              alias: { "react-native$": "react-native-web" },
              extensions: [".web.js", "..."],
            },
          };
        },
      };
    },
  ],
};

module.exports = config;
