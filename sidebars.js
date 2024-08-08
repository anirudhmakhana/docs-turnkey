/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // Autogenerate sidebars for each documentation section
  sdksSidebar: [
    {
      type: "autogenerated",
      dirName: "sdks",
    },
  ],
  solutionsSidebar: [
    {
      type: "autogenerated",
      dirName: "solutions",
    },
  ],
  documentationSidebar: [
    {
      type: "doc",
      id: "overview",
      label: "Overview",
    },
    {
      type: "autogenerated",
      dirName: "documentation",
    },
  ],
};

module.exports = sidebars;