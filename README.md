# Auto-Theme-Button 🌓

一个轻量级、可嵌入任何网站的深色/浅色模式切换按钮

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/CQHcharlie/Auto-Theme-button.svg)](https://github.com/CQHcharlie/Auto-Theme-button/stargazers)

[📺 在线及详细文档演示](https://cqhcharlie.github.io/Auto-Theme-button/button_mode/demo)
---

## ✨ 特性

<table>
<tr>
<td width="33%">

### 🎨 高度个性化
自定义位置、大小、颜色和动画效果

</td>
<td width="33%">

### 📱 响应式设计
在所有设备上都能完美显示

</td>
<td width="33%">

### 💾 记忆功能
自动保存用户的主题偏好

</td>
</tr>
<tr>
<td width="33%">

### ⚡ 原生,轻量
无依赖，只需2行代码即可集成

</td>
<td width="33%">

### 🔧 事件联动
支持 EventListener 监听主题变化

</td>
<td width="33%">

### 🎯 选择性排除
可指定元素不受深色模式影响

</td>
</tr>
</table>

---

## 🚀 快速开始

在你的页面里引入脚本，并实例化一个按钮：

```html
<script src="https://cqhcharlie.github.io/Auto-Theme-button/button_mode/theme-toggle.js"></script>
<script>
	new ThemeToggle();
	// 或：
	// new ThemeToggle({ position: 'top-right', defaultTheme: 'system' });
</script>
```

按钮会出现在右上角，可一键切换深浅色，并自动记忆用户偏好。

---

## ⚙️ 配置项

支持以下可选配置：

- position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'fixed'（默认 'top-right'）
- offset: { x: number, y: number }（默认 { x: 20, y: 20 }）
- size: number 按钮尺寸，默认 50
- darkColor: string 深色背景色（默认 '#1a1a1a'）
- lightColor: string 浅色背景色（默认 '#ffffff'）
- transition: string 主题切换过渡（默认 '0.3s ease'）
- zIndex: number 层级（默认 9999）
- defaultTheme: 'light' | 'dark' | 'system'（默认 'system'）
- excludeSelectors: string[] 传统模式下的“排除不变暗”选择器
- useFilter: boolean 是否启用过滤器深色模式（默认 false）
- filterValue: string 过滤器值（默认 'invert(1) hue-rotate(180deg)'）
- filterExcludeSelectors: string[] 当 useFilter=true 时需要保留原色的元素（默认 ['img','video','picture','canvas','iframe','svg']）

示例：

```js
new ThemeToggle({
	position: 'top-right',
	offset: { x: 20, y: 20 },
	size: 50,
	defaultTheme: 'system',
	// 若遇到“某些网站部分内容不变暗”，可以尝试：
	useFilter: true,
	filterValue: 'invert(1) hue-rotate(180deg)',
	filterExcludeSelectors: ['img','video','picture','canvas','iframe','svg']
});
```

说明：
- 传统模式使用 CSS 变量和颜色覆盖，细粒度可控，并支持 `excludeSelectors` 保持浅色。
- 过滤器模式通过在 html[data-theme="dark"] 上应用 `filter` 来“整体反色”，对于难以覆盖的站点更通用；同时对图片/视频等再次应用相同 filter 抵消，保持原色。

---

## 🧩 事件联动

通过自定义事件监听主题改变：

```js
document.addEventListener('themeChanged', (e) => {
	console.log('主题已切换为:', e.detail.theme);
});
```

---

## 🧪 在线演示

访问 Demo 页面，查看可视化配置与示例代码：

https://cqhcharlie.github.io/Auto-Theme-button/button_mode/demo

## Stars
[![Stargazers over time](https://starchart.cc/CQHcharlie/Auto-Theme-button.svg?background=%2300000000&axis=%23d3c8c8&line=%2300990f)](#)
