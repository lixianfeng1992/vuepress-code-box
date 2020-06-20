const path = require("path");
const markdownItContainer = require("markdown-it-container");
const getHighlightCodeHtml = require("./highlight");

module.exports = (options = {}) => {
  const { demoCodeMark = "demo" } = options;
  const END_TYPE = `container_${demoCodeMark}_close`;

  return {
    name: "vuepress-plugin-demo-code",
    enhanceAppFiles: [path.resolve(__dirname, "enhanceAppFile.js")],
    extendMarkdown: (md) => {
      md.use(markdownItContainer, demoCodeMark, { render });
    },
  };

  function render(tokens, idx) {
    const { nesting, info } = tokens[idx];

    if (nesting === -1) {
      return "</template></DemoAndCode>\n";
    }

    let htmlStr = "";
    let lastLine = 0;
    const language = (info.split(demoCodeMark)[1] || "vue").trim();

    for (let index = idx; index < tokens.length; index++) {
      const { map, type, content } = tokens[index];

      if (type === END_TYPE) break;
      if (type === "html_block") {
        const delta = map[0] - (lastLine || map[1]);

        if (delta > 0) {
          htmlStr += "\n".repeat(delta);
        }

        htmlStr += content;
        lastLine = map[1];
      }
    }

    const { showText = "显示代码", hideText = "隐藏代码", minHeight } = options;

    return `
			<DemoAndCode
				showText="${showText}"
				hideText="${hideText}"
				:minHeight="${minHeight}"
			>
				<div slot="code" class="language-${language} extra-class">
					${getHighlightCodeHtml(htmlStr, language)}
				</div>
				<template slot="demo">
		`;
  }
};
