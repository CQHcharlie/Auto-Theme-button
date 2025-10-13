# Auto-Theme-button

一个轻量级、可定制的主题切换按钮，支持深色/浅色模式一键切换。可以轻松嵌入到任何网站中。

## ✨ 特性

- 🎨 **完全可定制** - 自定义位置、大小、颜色和动画效果
- 📱 **响应式设计** - 在所有设备上都能完美显示
- 💾 **记忆功能** - 自动保存并记住用户的主题偏好
- 🚀 **轻量级** - 零依赖，纯原生JavaScript，文件大小不到5KB
- ⚡ **即插即用** - 只需几行代码即可集成
- 🔧 **灵活控制** - 支持悬浮、固定等多种定位方式

## 🚀 快速开始

### 方法1：使用外部JS文件

```html
<script src="theme-toggle.js"></script>
<script>
  new ThemeToggle({
    position: 'bottom-right',
    offset: { x: 20, y: 20 },
    size: 50
  });
</script>
```

### 方法2：内联代码（一键复制）

直接复制 `button_mode/embed_code.html` 中的代码到你的网页中即可。

## 📖 使用说明

### 基本用法

```javascript
// 最简单的使用方式
new ThemeToggle();
```

### 完整配置

```javascript
new ThemeToggle({
  position: 'bottom-right',  // 按钮位置
  offset: { x: 20, y: 20 },  // 偏移量（像素）
  size: 50,                   // 按钮大小（像素）
  darkColor: '#1a1a1a',      // 深色模式背景色
  lightColor: '#ffffff',     // 浅色模式背景色
  transition: '0.3s ease',   // 过渡动画
  zIndex: 9999                // 层级
});
```

### 配置选项

| 选项 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `position` | String | `'bottom-right'` | 按钮位置：`'top-left'`, `'top-right'`, `'bottom-left'`, `'bottom-right'`, `'fixed'` |
| `offset` | Object | `{ x: 20, y: 20 }` | 距离边缘的偏移量（像素） |
| `size` | Number | `50` | 按钮大小（像素） |
| `darkColor` | String | `'#1a1a1a'` | 深色模式的背景颜色 |
| `lightColor` | String | `'#ffffff'` | 浅色模式的背景颜色 |
| `transition` | String | `'0.3s ease'` | 过渡动画时间和效果 |
| `zIndex` | Number | `9999` | CSS z-index 层级 |

## 🎯 高级功能

### 监听主题变化事件

```javascript
document.addEventListener('themeChanged', (e) => {
  console.log('当前主题:', e.detail.theme); // 'light' 或 'dark'
  
  // 在这里添加你的自定义逻辑
  if (e.detail.theme === 'dark') {
    // 深色模式的自定义处理
  } else {
    // 浅色模式的自定义处理
  }
});
```

### 动态更新按钮位置

```javascript
const toggle = new ThemeToggle();

// 更新位置
toggle.updatePosition('top-left', { x: 30, y: 30 });
```

### 销毁按钮

```javascript
const toggle = new ThemeToggle();

// 移除按钮
toggle.destroy();
```

## 📂 文件结构

```
Auto-Theme-button/
├── button_mode/
│   ├── theme-toggle.js    # 主要JS文件
│   ├── demo.html          # 演示页面
│   └── embed_code.html    # 嵌入代码示例
├── LICENSE
└── README.md
```

## 🎨 演示

打开 `button_mode/demo.html` 查看完整的演示和实时配置调整功能。

在演示页面中，你可以：
- 实时调整按钮的位置
- 修改按钮大小
- 调整偏移量
- 查看不同配置的效果

## 🌐 浏览器支持

- Chrome/Edge (最新版本)
- Firefox (最新版本)
- Safari (最新版本)
- Opera (最新版本)

## 📝 CSS 变量

按钮会自动设置以下CSS变量，你可以在你的样式中使用：

```css
:root {
  --bg-color: #ffffff;    /* 背景颜色 */
  --text-color: #1a1a1a;  /* 文本颜色 */
}
```

同时，`<html>` 标签会获得 `data-theme` 属性：

```html
<html data-theme="dark">  <!-- 或 "light" -->
```

你可以在CSS中使用它：

```css
[data-theme="dark"] .my-element {
  background: #333;
}

[data-theme="light"] .my-element {
  background: #fff;
}
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

## 💡 使用技巧

1. **与现有主题系统集成**：监听 `themeChanged` 事件来触发你自己的主题切换逻辑
2. **自定义样式**：使用CSS变量 `--bg-color` 和 `--text-color` 来适配你的网站配色
3. **移动端优化**：在移动设备上使用较小的按钮尺寸（推荐 40-45px）
4. **无障碍访问**：按钮包含正确的 `aria-label` 属性，支持屏幕阅读器

## 🎓 示例场景

### 个人博客
```javascript
new ThemeToggle({
  position: 'top-right',
  size: 45,
  darkColor: '#0d1117',
  lightColor: '#ffffff'
});
```

### 文档网站
```javascript
new ThemeToggle({
  position: 'bottom-right',
  offset: { x: 30, y: 30 },
  size: 55
});
```

### 单页应用
```javascript
const toggle = new ThemeToggle({ position: 'top-left' });

// 在路由变化时保持主题
router.afterEach(() => {
  // 主题会自动从localStorage恢复
});
```


