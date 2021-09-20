const container = require("markdown-it-container");

module.exports = (options) => {
  const events = options.events || [];
  const eventsAttr = "[" + events.map((e) => `'${e}'`).join(",") + "]";
  const tabsPlugin = (md, app) => {
    md.use(container, "tabs", {
      render: (tokens, idx) => {
        const token = tokens[idx];
        const attributes = getTabsAttributes(token.info);
        if (token.nesting === 1) {
          return `<Tabs ${attributes} :events="${eventsAttr}">\n`;
        } else {
          return `</Tabs>\n`;
        }
      },
    });

    md.use(container, "tab", {
      render: (tokens, idx) => {
        const token = tokens[idx];
        const attributes = getTabAttributes(token.info);

        if (token.nesting === 1) {
          return `<Tab ${attributes}>\n`;
        } else {
          return `</Tab>\n`;
        }
      },
    });
  };
  return tabsPlugin;
};

function getTabsAttributes(info) {
  var arr = info.split(" ");
  var result = "";
  if (arr.length > 2) {
    arr.forEach((item) => {
      if (item !== "" && item !== "tabs") {
        var attribute = item.split(":");
        result += `${attribute[0]}="${attribute[1]}" `;
      }
    });
  }
  return result;
}

function getTabAttributes(info) {
  var arr = info.split(" ");
  var last = arr.length - 1;
  if (arr[last].trim() != "eager") {
    return `label="${arr
      .slice(2, last + 1)
      .join(" ")
      .trim()}"`;
  }
  if (arr[last].trim() == "eager") {
    return `label="${arr.slice(2, last).join(" ").trim()}" ${arr[last].trim()}`;
  }
  return "";
}
