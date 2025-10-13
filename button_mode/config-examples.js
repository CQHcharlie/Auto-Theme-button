/**
 * 主题切换按钮配置示例集合
 * 
 * 这个文件包含了各种常见使用场景的配置示例
 * 复制你需要的配置并粘贴到你的项目中
 * 这个文件尚在测试阶段
 */

// ============================================
// 示例1: 默认配置（右下角）
// ============================================
new ThemeToggle();

// ============================================
// 示例2: 左上角显示
// ============================================
new ThemeToggle({
  position: 'top-left',
  offset: { x: 20, y: 20 }
});

// ============================================
// 示例3: 较大的按钮（适合移动端）
// ============================================
new ThemeToggle({
  size: 60,
  position: 'bottom-right',
  offset: { x: 15, y: 15 }
});

// ============================================
// 示例4: 较小的按钮（简约风格）
// ============================================
new ThemeToggle({
  size: 40,
  position: 'top-right',
  offset: { x: 30, y: 30 }
});

// ============================================
// 示例5: 自定义颜色主题
// ============================================
new ThemeToggle({
  darkColor: '#0d1117',      // GitHub 深色
  lightColor: '#ffffff',
  position: 'bottom-right'
});

// ============================================
// 示例6: 博客风格
// ============================================
new ThemeToggle({
  position: 'top-right',
  offset: { x: 30, y: 80 },  // 避开导航栏
  size: 45,
  darkColor: '#1e1e1e',
  lightColor: '#fafafa'
});

// ============================================
// 示例7: 文档网站风格
// ============================================
new ThemeToggle({
  position: 'bottom-right',
  offset: { x: 30, y: 80 },  // 避开"回到顶部"按钮
  size: 48,
  darkColor: '#1a202c',
  lightColor: '#ffffff',
  zIndex: 1000
});

// ============================================
// 示例8: 页面中央固定
// ============================================
new ThemeToggle({
  position: 'fixed',
  size: 70,
  darkColor: '#121212',
  lightColor: '#f5f5f5'
});

// ============================================
// 示例9: 响应式配置（根据屏幕大小调整）
// ============================================
const isMobile = window.innerWidth <= 768;
const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;

new ThemeToggle({
  position: 'bottom-right',
  size: isMobile ? 40 : isTablet ? 50 : 55,
  offset: isMobile 
    ? { x: 10, y: 10 } 
    : { x: 20, y: 20 }
});

// ============================================
// 示例10: 监听主题变化
// ============================================
new ThemeToggle({
  position: 'bottom-right',
  size: 50
});

document.addEventListener('themeChanged', (e) => {
  console.log('主题已切换为:', e.detail.theme);
  
  // 更新其他UI元素
  if (e.detail.theme === 'dark') {
    document.querySelector('.logo').src = 'logo-dark.png';
  } else {
    document.querySelector('.logo').src = 'logo-light.png';
  }
});

// ============================================
// 示例11: 与代码高亮库集成
// ============================================
new ThemeToggle({
  position: 'top-right',
  size: 45
});

document.addEventListener('themeChanged', (e) => {
  // 假设使用 highlight.js
  const codeBlocks = document.querySelectorAll('pre code');
  codeBlocks.forEach(block => {
    if (e.detail.theme === 'dark') {
      block.className = 'hljs monokai';
    } else {
      block.className = 'hljs github';
    }
    hljs.highlightBlock(block);
  });
});

// ============================================
// 示例12: 支持系统主题自动检测
// ============================================
// 检测系统主题偏好
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

// 如果用户没有保存过偏好，使用系统主题
if (!localStorage.getItem('theme-preference')) {
  localStorage.setItem(
    'theme-preference', 
    prefersDark.matches ? 'dark' : 'light'
  );
}

new ThemeToggle({
  position: 'bottom-right',
  size: 50
});

// ============================================
// 示例13: 多语言支持
// ============================================
const lang = document.documentElement.lang || 'en';
const labels = {
  'zh-CN': '切换主题',
  'en': 'Toggle Theme',
  'ja': 'テーマ切り替え',
  'es': 'Cambiar tema'
};

new ThemeToggle({
  position: 'bottom-right',
  size: 50
});

// 更新aria-label
const button = document.getElementById('theme-toggle-button');
if (button) {
  button.setAttribute('aria-label', labels[lang] || labels['en']);
}

// ============================================
// 示例14: 避免Flash of Unstyled Content (FOUC)
// ============================================
// 在页面加载前应用保存的主题
(function() {
  const savedTheme = localStorage.getItem('theme-preference');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    if (savedTheme === 'dark') {
      document.body.style.backgroundColor = '#1a1a1a';
      document.body.style.color = '#ffffff';
    }
  }
})();

// 然后初始化按钮
new ThemeToggle();

// ============================================
// 示例15: 动态创建和销毁
// ============================================
let themeToggle = null;

function initThemeToggle() {
  if (themeToggle) {
    themeToggle.destroy();
  }
  
  themeToggle = new ThemeToggle({
    position: 'bottom-right',
    size: 50
  });
}

function removeThemeToggle() {
  if (themeToggle) {
    themeToggle.destroy();
    themeToggle = null;
  }
}

// 根据某些条件显示/隐藏按钮
if (userIsLoggedIn) {
  initThemeToggle();
}

// ============================================
// 示例16: 与分析工具集成
// ============================================
new ThemeToggle({
  position: 'bottom-right',
  size: 50
});

document.addEventListener('themeChanged', (e) => {
  // Google Analytics
  if (typeof gtag !== 'undefined') {
    gtag('event', 'theme_toggle', {
      'theme': e.detail.theme,
      'event_category': 'UI',
      'event_label': 'Theme Toggle'
    });
  }
  
  // 或者 Plausible Analytics
  if (typeof plausible !== 'undefined') {
    plausible('Theme Toggle', {
      props: { theme: e.detail.theme }
    });
  }
});

// ============================================
// 示例17: WordPress 集成
// ============================================
// 在 WordPress 主题的 functions.php 中添加：
/*
function enqueue_theme_toggle() {
    wp_enqueue_script(
        'theme-toggle',
        get_template_directory_uri() . '/js/theme-toggle.js',
        array(),
        '1.0.0',
        true
    );
    
    wp_add_inline_script('theme-toggle', '
        new ThemeToggle({
            position: "bottom-right",
            size: 50,
            darkColor: "#1a1a1a",
            lightColor: "#ffffff"
        });
    ');
}
add_action('wp_enqueue_scripts', 'enqueue_theme_toggle');
*/

// ============================================
// 示例18: React 集成
// ============================================
/*
import { useEffect, useRef } from 'react';

function ThemeToggleComponent() {
  const toggleRef = useRef(null);
  
  useEffect(() => {
    // 创建按钮
    toggleRef.current = new ThemeToggle({
      position: 'bottom-right',
      size: 50
    });
    
    // 监听主题变化
    const handleThemeChange = (e) => {
      console.log('Theme:', e.detail.theme);
    };
    
    document.addEventListener('themeChanged', handleThemeChange);
    
    // 清理
    return () => {
      toggleRef.current?.destroy();
      document.removeEventListener('themeChanged', handleThemeChange);
    };
  }, []);
  
  return null;
}

export default ThemeToggleComponent;
*/

// ============================================
// 示例19: Vue.js 集成
// ============================================
/*
export default {
  name: 'App',
  data() {
    return {
      themeToggle: null
    }
  },
  mounted() {
    this.themeToggle = new ThemeToggle({
      position: 'bottom-right',
      size: 50
    });
    
    document.addEventListener('themeChanged', this.onThemeChange);
  },
  beforeDestroy() {
    this.themeToggle?.destroy();
    document.removeEventListener('themeChanged', this.onThemeChange);
  },
  methods: {
    onThemeChange(e) {
      this.$store.commit('setTheme', e.detail.theme);
    }
  }
}
*/

// ============================================
// 示例20: 自定义动画
// ============================================
new ThemeToggle({
  position: 'bottom-right',
  size: 50,
  transition: '0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)' // 弹性动画
});

// 添加额外的CSS动画
const style = document.createElement('style');
style.textContent = `
  #theme-toggle-button {
    animation: fadeIn 0.5s ease-in;
  }
  
  #theme-toggle-button:active {
    animation: bounce 0.3s ease;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0); }
    to { opacity: 1; transform: scale(1); }
  }
  
  @keyframes bounce {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(0.9); }
  }
`;
document.head.appendChild(style);
