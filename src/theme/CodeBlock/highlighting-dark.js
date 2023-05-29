const darkTheme = require("prism-react-renderer/themes/github");

module.exports = {
  ...darkTheme,
  plain: {
    color: "var(--swm-navy-light-40)",
  },
  styles: [
    ...darkTheme.styles,
    {
      types: ["comment", "prolog", "doctype", "cdata"],
      style: {
        color: "var(--swm-navy-light-40)",
        fontStyle: "italic",
      },
    },
    {
      types: ["namespace"],
      style: {
        opacity: 0.7,
      },
    },
    {
      types: [
        "string",
        "attr-value",
        "property",
        "atrule",
        "attr-name",
        "selector",
        "tag",
      ],
      style: {
        color: "var(--swm-navy-light-40)",
      },
    },
    {
      types: ["punctuation"],
      style: {
        color: "var(--swm-green-light-80)",
      },
    },
    {
      types: [
        "entity",
        "url",
        "symbol",
        "number",
        "boolean",
        "variable",
        "constant",
        "regex",
        "inserted",
        "operator",
      ],
      style: {
        color: "var(--swm-red-light-80)",
      },
    },
    {
      types: ["function", "function-variable", "deleted"],
      style: {
        color: "var(--swm-purple-light-80)",
      },
    },
    {
      types: ["selector", "keyword"],
      style: {
        color: "var(--swm-blue-light-80)",
      },
    },
  ],
};
