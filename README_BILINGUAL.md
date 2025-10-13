# Auto-Theme-Button

[English](#english) | [中文](#中文)

---

## 中文

一个轻量级、可定制的主题切换按钮，支持深色/浅色模式一键切换。可以轻松嵌入到任何网站中。

### ✨ 特性

- 🎨 **完全可定制** - 自定义位置、大小、颜色和动画效果
- 📱 **响应式设计** - 在所有设备上都能完美显示
- 💾 **记忆功能** - 自动保存并记住用户的主题偏好
- 🚀 **轻量级** - 零依赖，纯原生JavaScript，文件大小不到5KB
- ⚡ **即插即用** - 只需几行代码即可集成
- 🔧 **灵活控制** - 支持悬浮、固定等多种定位方式
- 🌐 **浏览器兼容** - 支持所有现代浏览器
- ♿ **无障碍访问** - 支持键盘导航和屏幕阅读器

### 🚀 快速开始

#### 最简单的使用方式

```html
<script src="theme-toggle.js"></script>
<script>
  new ThemeToggle();
</script>
```

#### 自定义配置

```html
<script src="theme-toggle.js"></script>
<script>
  new ThemeToggle({
    position: 'bottom-right',  // 位置
    offset: { x: 20, y: 20 },  // 偏移量
    size: 50,                   // 按钮大小
    darkColor: '#1a1a1a',      // 深色模式背景
    lightColor: '#ffffff'       // 浅色模式背景
  });
</script>
```

### 📖 文档

- **[快速开始](button_mode/quickstart.html)** - 最简单的示例
- **[完整演示](button_mode/demo.html)** - 交互式配置演示
- **[使用指南](USAGE_GUIDE.md)** - 详细的使用说明
- **[配置示例](button_mode/config-examples.js)** - 20+ 种配置示例
- **[嵌入代码](button_mode/embed_code.html)** - 复制粘贴即用

### 📂 文件结构

```
Auto-Theme-button/
├── button_mode/
│   ├── theme-toggle.js         # 主要JS文件（开发版）
│   ├── theme-toggle.min.js     # 压缩版（生产环境）
│   ├── demo.html               # 完整演示页面
│   ├── quickstart.html         # 快速开始示例
│   ├── embed_code.html         # 嵌入代码
│   └── config-examples.js      # 配置示例集合
├── USAGE_GUIDE.md              # 详细使用指南
├── README.md                   # 本文件
├── package.json                # 项目配置
└── LICENSE                     # MIT许可证
```

### ⚙️ 配置选项

| 选项 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `position` | String | `'bottom-right'` | 按钮位置：`'top-left'`, `'top-right'`, `'bottom-left'`, `'bottom-right'`, `'fixed'` |
| `offset` | Object | `{ x: 20, y: 20 }` | 距离边缘的偏移量（像素） |
| `size` | Number | `50` | 按钮大小（像素） |
| `darkColor` | String | `'#1a1a1a'` | 深色模式的背景颜色 |
| `lightColor` | String | `'#ffffff'` | 浅色模式的背景颜色 |
| `transition` | String | `'0.3s ease'` | 过渡动画时间和效果 |
| `zIndex` | Number | `9999` | CSS z-index 层级 |

### 🎯 API

#### 方法

```javascript
const toggle = new ThemeToggle();

// 更新按钮位置
toggle.updatePosition('top-left', { x: 30, y: 30 });

// 销毁按钮
toggle.destroy();
```

#### 事件

```javascript
// 监听主题变化
document.addEventListener('themeChanged', (e) => {
  console.log('当前主题:', e.detail.theme); // 'light' 或 'dark'
});
```

#### CSS 变量

```css
:root {
  --bg-color: #ffffff;     /* 背景颜色 */
  --text-color: #1a1a1a;   /* 文本颜色 */
}
```

#### HTML 属性

```html
<html data-theme="dark">  <!-- 或 "light" -->
```

### 💡 使用示例

#### 博客网站

```javascript
new ThemeToggle({
  position: 'top-right',
  size: 45,
  darkColor: '#0d1117',
  lightColor: '#ffffff'
});
```

#### 文档网站

```javascript
new ThemeToggle({
  position: 'bottom-right',
  offset: { x: 30, y: 30 },
  size: 55
});
```

#### 响应式设计

```javascript
const isMobile = window.innerWidth <= 768;

new ThemeToggle({
  size: isMobile ? 40 : 50,
  offset: isMobile ? { x: 10, y: 10 } : { x: 20, y: 20 }
});
```

### 🌐 浏览器支持

- ✅ Chrome/Edge (最新版本)
- ✅ Firefox (最新版本)
- ✅ Safari (最新版本)
- ✅ Opera (最新版本)

### 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的改动 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个 Pull Request

### 📄 许可证

MIT License - 查看 [LICENSE](LICENSE) 文件了解详情

### 🙏 致谢

感谢所有为这个项目做出贡献的开发者！

---

## English

A lightweight, customizable theme toggle button that supports one-click switching between dark and light modes. Can be easily embedded into any website.

### ✨ Features

- 🎨 **Fully Customizable** - Customize position, size, colors, and animations
- 📱 **Responsive Design** - Perfect display on all devices
- 💾 **Memory Function** - Automatically saves and remembers user theme preferences
- 🚀 **Lightweight** - Zero dependencies, pure vanilla JavaScript, file size under 5KB
- ⚡ **Plug and Play** - Integration with just a few lines of code
- 🔧 **Flexible Control** - Supports floating, fixed, and other positioning methods
- 🌐 **Browser Compatible** - Supports all modern browsers
- ♿ **Accessibility** - Supports keyboard navigation and screen readers

### 🚀 Quick Start

#### Simplest Usage

```html
<script src="theme-toggle.js"></script>
<script>
  new ThemeToggle();
</script>
```

#### Custom Configuration

```html
<script src="theme-toggle.js"></script>
<script>
  new ThemeToggle({
    position: 'bottom-right',  // Position
    offset: { x: 20, y: 20 },  // Offset
    size: 50,                   // Button size
    darkColor: '#1a1a1a',      // Dark mode background
    lightColor: '#ffffff'       // Light mode background
  });
</script>
```

### 📖 Documentation

- **[Quick Start](button_mode/quickstart.html)** - Simplest example
- **[Full Demo](button_mode/demo.html)** - Interactive configuration demo
- **[Usage Guide](USAGE_GUIDE.md)** - Detailed usage instructions
- **[Config Examples](button_mode/config-examples.js)** - 20+ configuration examples
- **[Embed Code](button_mode/embed_code.html)** - Copy and paste ready

### 📂 File Structure

```
Auto-Theme-button/
├── button_mode/
│   ├── theme-toggle.js         # Main JS file (development)
│   ├── theme-toggle.min.js     # Minified version (production)
│   ├── demo.html               # Full demo page
│   ├── quickstart.html         # Quick start example
│   ├── embed_code.html         # Embed code
│   └── config-examples.js      # Configuration examples collection
├── USAGE_GUIDE.md              # Detailed usage guide
├── README.md                   # This file
├── package.json                # Project configuration
└── LICENSE                     # MIT License
```

### ⚙️ Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `position` | String | `'bottom-right'` | Button position: `'top-left'`, `'top-right'`, `'bottom-left'`, `'bottom-right'`, `'fixed'` |
| `offset` | Object | `{ x: 20, y: 20 }` | Offset from edge (pixels) |
| `size` | Number | `50` | Button size (pixels) |
| `darkColor` | String | `'#1a1a1a'` | Dark mode background color |
| `lightColor` | String | `'#ffffff'` | Light mode background color |
| `transition` | String | `'0.3s ease'` | Transition animation time and effect |
| `zIndex` | Number | `9999` | CSS z-index level |

### 🎯 API

#### Methods

```javascript
const toggle = new ThemeToggle();

// Update button position
toggle.updatePosition('top-left', { x: 30, y: 30 });

// Destroy button
toggle.destroy();
```

#### Events

```javascript
// Listen to theme changes
document.addEventListener('themeChanged', (e) => {
  console.log('Current theme:', e.detail.theme); // 'light' or 'dark'
});
```

#### CSS Variables

```css
:root {
  --bg-color: #ffffff;     /* Background color */
  --text-color: #1a1a1a;   /* Text color */
}
```

#### HTML Attributes

```html
<html data-theme="dark">  <!-- or "light" -->
```

### 💡 Usage Examples

#### Blog Website

```javascript
new ThemeToggle({
  position: 'top-right',
  size: 45,
  darkColor: '#0d1117',
  lightColor: '#ffffff'
});
```

#### Documentation Site

```javascript
new ThemeToggle({
  position: 'bottom-right',
  offset: { x: 30, y: 30 },
  size: 55
});
```

#### Responsive Design

```javascript
const isMobile = window.innerWidth <= 768;

new ThemeToggle({
  size: isMobile ? 40 : 50,
  offset: isMobile ? { x: 10, y: 10 } : { x: 20, y: 20 }
});
```

### 🌐 Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Opera (latest)

### 🤝 Contributing

Issues and Pull Requests are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### 📄 License

MIT License - see the [LICENSE](LICENSE) file for details

### 🙏 Acknowledgments

Thanks to all developers who contributed to this project!

---

**Made with ❤️ for the web**
