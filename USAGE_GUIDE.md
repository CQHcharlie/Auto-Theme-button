# 主题切换按钮使用指南

## 📋 目录

1. [快速开始](#快速开始)
2. [安装方式](#安装方式)
3. [配置选项](#配置选项)
4. [API文档](#api文档)
5. [示例代码](#示例代码)
6. [常见问题](#常见问题)

---

## 🚀 快速开始

### 最简单的方式

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>我的网站</title>
</head>
<body>
  <h1>欢迎来到我的网站</h1>
  
  <!-- 在页面底部添加以下代码 -->
  <script src="theme-toggle.js"></script>
  <script>
    new ThemeToggle();
  </script>
</body>
</html>
```

就这么简单！现在你的网站右下角会出现一个主题切换按钮。

---

## 📦 安装方式

### 方式1：下载文件

1. 下载 `theme-toggle.js` 或 `theme-toggle.min.js`
2. 将文件放到你的项目中
3. 在HTML中引入

```html
<script src="path/to/theme-toggle.js"></script>
```

### 方式2：内联代码

复制 `embed_code.html` 中的完整代码，直接粘贴到你的HTML中。

### 方式3：CDN（推荐用于生产环境）

```html
<!-- 即将推出 -->
<script src="https://cdn.example.com/theme-toggle@1.0.0/theme-toggle.min.js"></script>
```

---

## ⚙️ 配置选项

### 完整配置示例

```javascript
new ThemeToggle({
  // 按钮位置
  position: 'bottom-right',  // 可选值见下表
  
  // 偏移量
  offset: { x: 20, y: 20 },
  
  // 按钮大小（像素）
  size: 50,
  
  // 深色模式背景色
  darkColor: '#1a1a1a',
  
  // 浅色模式背景色
  lightColor: '#ffffff',
  
  // 过渡动画
  transition: '0.3s ease',
  
  // 层级
  zIndex: 9999
});
```

### 位置选项

| 值 | 说明 | 示意图 |
|---|------|--------|
| `'top-left'` | 左上角 | ↖️ |
| `'top-right'` | 右上角 | ↗️ |
| `'bottom-left'` | 左下角 | ↙️ |
| `'bottom-right'` | 右下角（默认）| ↘️ |
| `'fixed'` | 页面中央固定 | 🎯 |

### 自定义偏移

```javascript
// 距离右边30px，距离底部50px
new ThemeToggle({
  position: 'bottom-right',
  offset: { x: 30, y: 50 }
});
```

---

## 📚 API 文档

### 构造函数

```javascript
const toggle = new ThemeToggle(options);
```

### 方法

#### updatePosition(position, offset)

动态更新按钮位置

```javascript
toggle.updatePosition('top-left', { x: 10, y: 10 });
```

**参数：**
- `position` (String): 新的位置
- `offset` (Object, 可选): 新的偏移量

#### destroy()

移除按钮

```javascript
toggle.destroy();
```

### 事件

#### themeChanged

主题切换时触发

```javascript
document.addEventListener('themeChanged', (event) => {
  const currentTheme = event.detail.theme; // 'light' 或 'dark'
  console.log('主题已切换为:', currentTheme);
});
```

### CSS 变量

按钮会自动设置以下CSS变量：

```css
:root {
  --bg-color: #ffffff;     /* 或 #1a1a1a */
  --text-color: #1a1a1a;   /* 或 #ffffff */
}
```

### HTML 属性

```html
<html data-theme="dark">  <!-- 或 "light" -->
```

---

## 💡 示例代码

### 示例1：博客网站

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>我的博客</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
      transition: all 0.3s ease;
    }
    
    /* 使用CSS变量 */
    body {
      background-color: var(--bg-color, #ffffff);
      color: var(--text-color, #1a1a1a);
    }
    
    /* 或使用data-theme属性 */
    [data-theme="dark"] .article {
      border-color: #444;
    }
    
    [data-theme="light"] .article {
      border-color: #ddd;
    }
  </style>
</head>
<body>
  <h1>我的博客</h1>
  <article class="article">
    <h2>文章标题</h2>
    <p>文章内容...</p>
  </article>

  <script src="theme-toggle.js"></script>
  <script>
    new ThemeToggle({
      position: 'top-right',
      size: 45,
      darkColor: '#0d1117',
      lightColor: '#ffffff'
    });
  </script>
</body>
</html>
```

### 示例2：文档网站

```javascript
// 创建按钮
const toggle = new ThemeToggle({
  position: 'bottom-right',
  offset: { x: 30, y: 80 }, // 避开聊天按钮
  size: 50
});

// 监听主题变化，同步到代码高亮
document.addEventListener('themeChanged', (e) => {
  if (e.detail.theme === 'dark') {
    // 切换到深色代码主题
    hljs.setTheme('monokai');
  } else {
    // 切换到浅色代码主题
    hljs.setTheme('github');
  }
});
```

### 示例3：单页应用（SPA）

```javascript
// Vue.js 示例
export default {
  mounted() {
    this.themeToggle = new ThemeToggle({
      position: 'bottom-right',
      size: 50
    });
    
    // 监听主题变化
    document.addEventListener('themeChanged', this.onThemeChange);
  },
  
  beforeDestroy() {
    // 清理
    this.themeToggle.destroy();
    document.removeEventListener('themeChanged', this.onThemeChange);
  },
  
  methods: {
    onThemeChange(e) {
      // 更新Vuex状态或其他全局状态
      this.$store.commit('setTheme', e.detail.theme);
    }
  }
}
```

### 示例4：React应用

```jsx
import { useEffect, useRef } from 'react';

function App() {
  const toggleRef = useRef(null);
  
  useEffect(() => {
    // 创建主题切换按钮
    toggleRef.current = new ThemeToggle({
      position: 'bottom-right',
      size: 50
    });
    
    // 监听主题变化
    const handleThemeChange = (e) => {
      console.log('Theme changed to:', e.detail.theme);
      // 更新React状态
    };
    
    document.addEventListener('themeChanged', handleThemeChange);
    
    // 清理
    return () => {
      toggleRef.current?.destroy();
      document.removeEventListener('themeChanged', handleThemeChange);
    };
  }, []);
  
  return (
    <div className="App">
      <h1>我的React应用</h1>
    </div>
  );
}
```

### 示例5：WordPress集成

在主题的 `footer.php` 或 `functions.php` 中添加：

```php
<?php
// 在footer.php中
?>
<script src="<?php echo get_template_directory_uri(); ?>/js/theme-toggle.js"></script>
<script>
new ThemeToggle({
  position: 'bottom-right',
  offset: { x: 20, y: 20 },
  size: 50
});
</script>
<?php

// 或在functions.php中使用wp_enqueue_script
function add_theme_toggle() {
    wp_enqueue_script('theme-toggle', get_template_directory_uri() . '/js/theme-toggle.js', array(), '1.0.0', true);
    wp_add_inline_script('theme-toggle', 'new ThemeToggle();');
}
add_action('wp_enqueue_scripts', 'add_theme_toggle');
?>
```

---

## ❓ 常见问题

### Q1: 如何自定义按钮样式？

虽然按钮是通过JavaScript动态创建的，但你可以通过CSS覆盖样式：

```css
#theme-toggle-button {
  /* 自定义样式 */
  box-shadow: 0 2px 8px rgba(0,0,0,0.3) !important;
  background: linear-gradient(45deg, #667eea 0%, #764ba2 100%) !important;
}
```

### Q2: 如何在移动端使用？

按钮已经是响应式的，但你可能想在移动端使用较小的尺寸：

```javascript
const isMobile = window.innerWidth <= 768;

new ThemeToggle({
  size: isMobile ? 40 : 50,
  offset: isMobile ? { x: 10, y: 10 } : { x: 20, y: 20 }
});
```

### Q3: 如何禁用自动应用主题到body？

默认情况下，按钮会自动改变body的背景色。如果你想完全控制样式：

```javascript
// 只监听事件，不使用自动样式
document.addEventListener('themeChanged', (e) => {
  // 自己控制样式
  document.body.className = e.detail.theme;
});
```

### Q4: 如何设置默认主题？

按钮会自动从localStorage读取用户之前的选择。如果是首次访问，默认是浅色模式。你可以通过修改源码或监听事件来改变：

```javascript
// 如果没有保存的主题，设置为深色
if (!localStorage.getItem('theme-preference')) {
  localStorage.setItem('theme-preference', 'dark');
}

new ThemeToggle();
```

### Q5: 按钮遮挡了其他元素怎么办？

调整偏移量或改变位置：

```javascript
new ThemeToggle({
  position: 'bottom-right',
  offset: { x: 20, y: 80 } // 增加垂直偏移
});
```

或调整z-index：

```javascript
new ThemeToggle({
  zIndex: 999 // 降低层级
});
```

### Q6: 如何在多个页面间保持主题一致？

主题偏好自动保存在localStorage中，所以在同一域名下的所有页面都会保持一致。只需在每个页面都引入按钮即可。

### Q7: 可以有多个按钮吗？

技术上可以，但不推荐。如果确实需要：

```javascript
const toggle1 = new ThemeToggle({ position: 'top-left' });
const toggle2 = new ThemeToggle({ position: 'bottom-right' });

// 注意：它们会同步切换主题
```

### Q8: 如何支持系统主题自动切换？

```javascript
// 检测系统主题
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

if (!localStorage.getItem('theme-preference')) {
  localStorage.setItem('theme-preference', prefersDark.matches ? 'dark' : 'light');
}

new ThemeToggle();

// 监听系统主题变化
prefersDark.addEventListener('change', (e) => {
  const theme = e.matches ? 'dark' : 'light';
  localStorage.setItem('theme-preference', theme);
  location.reload(); // 或手动更新
});
```

---

## 🎨 高级定制

### 更改图标

修改源码中的 `getIcon()` 方法，使用你自己的SVG或字体图标。

### 添加动画效果

```css
#theme-toggle-button {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}
```

### 集成分析工具

```javascript
document.addEventListener('themeChanged', (e) => {
  // Google Analytics
  gtag('event', 'theme_toggle', {
    'theme': e.detail.theme
  });
  
  // 或其他分析工具
  analytics.track('Theme Changed', {
    theme: e.detail.theme
  });
});
```

---

## 📞 支持

如有问题或建议，请访问：
- GitHub Issues: [提交问题](https://github.com/yourusername/Auto-Theme-button/issues)
- Email: your.email@example.com

---

**祝你使用愉快！** 🎉
