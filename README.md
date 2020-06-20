<h1 align="center">vuepress-plugin-code-gen-box</h1>

> code-gen-box plugin for vuepress.

With this plugin, you can both display demo and code via following syntax.

```md
::: demo
<div @click="onClick">Click me!</div>

<script>
export default {
  methods: {
    onClick: () => { window.alert(1) },
  },
}
</script>
:::
```

## Features

- Only one source code
- Foldable code

## Install

- First of all, install [vuepress v1.x](https://github.com/vuejs/vuepress)

- Then install the plugin

```bash
$ npm i vuepress-plugin-code-gen-box -D
# OR
$ yarn add vuepress-plugin-code-gen-box -D
```

## Usage

Write vuepress config

```js
module.exports = {
  plugins: ["code-gen-box"],
};
```

## Options

This plugin supports the following configurations.

```js
module.exports = {
  plugins: [
    [
      "demo-code",
      {
        showText: "show code",
        hideText: "hide",
        styleStr: "text-decoration: underline;",
        demoCodeMark: "demo-code",
      },
    ],
  ],
};
```

### showText

- Type: `String`
- Default: `显示代码`

The display text of unfold code button.

### hideText

- Type: `String`
- Default: `隐藏代码`

The display text of fold code button.

### minHeight

- Type: `Number`
- Default: `0`(px)

The height of the code when it is folded.

## License

[MIT](http://opensource.org/licenses/MIT)
