/**
 * Auto Theme Toggle Button
 * 一个独立的主题切换按钮，可嵌入任何网站
 * 
 * 使用方法：
 * <script src="theme-toggle.js"></script>
 * <script>
 *   new ThemeToggle({
 *     position: 'bottom-right', // 'top-left', 'top-right', 'bottom-left', 'bottom-right', 'fixed'
 *     offset: { x: 20, y: 20 },
 *     size: 50,
 *     darkColor: '#1a1a1a',
 *     lightColor: '#ffffff'
 *   });
 * </script>
 */

class ThemeToggle {
  constructor(options = {}) {
    this.options = {
      position: options.position || 'top-right',
      offset: options.offset || { x: 20, y: 20 },
      size: options.size || 50,
      darkColor: options.darkColor || '#1a1a1a',
      lightColor: options.lightColor || '#ffffff',
      transition: options.transition || '0.3s ease',
      zIndex: options.zIndex || 9999,
      defaultTheme: options.defaultTheme || 'system',  // 可选值: 'light', 'dark', 'system'
      excludeSelectors: options.excludeSelectors || [],
      ...options
    };

    // 处理默认主题
    let defaultTheme = this.options.defaultTheme;
    if (defaultTheme === 'system') {
      // 如果设置为 'system'，则检测系统主题
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      defaultTheme = prefersDark ? 'dark' : 'light';
    }
    
    this.theme = this.getSavedTheme() || defaultTheme;
    this.init();
  }

  init() {
    // 在创建按钮前先应用主题，避免闪烁
    this.applyTheme(this.theme, true);
    this.createButton();
    this.attachEventListeners();
  }

  createButton() {
    // 创建按钮容器
    this.button = document.createElement('button');
    this.button.id = 'theme-toggle-button';
    this.button.setAttribute('aria-label', '切换主题');
    this.button.innerHTML = this.getIcon(this.theme);

    // 应用样式
    this.applyButtonStyles();

    // 添加到页面
    document.body.appendChild(this.button);
  }

  applyButtonStyles() {
    const { position, offset, size, zIndex, transition } = this.options;
    
    const baseStyles = {
      position: 'fixed',
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: '12px',  // 圆角方形
      border: this.theme === 'dark' ? '2px solid rgba(255, 255, 255, 0.2)' : '2px solid rgba(0, 0, 0, 0.1)',  // 细边框
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: `${size * 0.6}px`,  // 调整字体大小以适配emoji
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      transition: `all ${transition}`,
      zIndex: zIndex,
      outline: 'none',
      background: this.theme === 'dark' ? '#2d2d2d' : '#f0f0f0',  // 深色时深色背景，浅色时浅色背景
      color: this.theme === 'dark' ? '#f0f0f0' : '#2d2d2d'
    };

    // 根据位置设置偏移
    const positionStyles = this.getPositionStyles(position, offset);

    Object.assign(this.button.style, baseStyles, positionStyles);
  }

  getPositionStyles(position, offset) {
    const positions = {
      'top-left': { top: `${offset.y}px`, left: `${offset.x}px` },
      'top-right': { top: `${offset.y}px`, right: `${offset.x}px` },
      'bottom-left': { bottom: `${offset.y}px`, left: `${offset.x}px` },
      'bottom-right': { bottom: `${offset.y}px`, right: `${offset.x}px` },
      'fixed': { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }
    };

    return positions[position] || positions['bottom-right'];
  }

  getIcon(theme) {
    if (theme === 'light') {
      // 浅色模式显示太阳图标
      return '🔆';
    } else {
      // 深色模式显示月亮图标
      return '🌙';
    }
  }

  attachEventListeners() {
    this.button.addEventListener('click', () => this.toggleTheme());
    
    // 添加悬停效果
    this.button.addEventListener('mouseenter', () => {
      this.button.style.transform = this.options.position === 'fixed' 
        ? 'translate(-50%, -50%) scale(1.1)' 
        : 'scale(1.1)';
    });
    
    this.button.addEventListener('mouseleave', () => {
      this.button.style.transform = this.options.position === 'fixed' 
        ? 'translate(-50%, -50%) scale(1)' 
        : 'scale(1)';
    });
  }

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    this.applyTheme(this.theme);
    this.saveTheme(this.theme);
    this.updateButton();
  }

  applyTheme(theme, immediate = false) {
    const { darkColor, lightColor, excludeSelectors } = this.options;
    
    // 如果是立即应用（初始化时），暂时禁用过渡动画
    if (immediate) {
      const style = document.createElement('style');
      style.id = 'theme-toggle-no-transition';
      style.textContent = '* { transition: none !important; }';
      document.head.appendChild(style);
      
      // 强制重排
      document.body.offsetHeight;
    }
    
    if (theme === 'dark') {
      document.documentElement.style.setProperty('--bg-color', darkColor);
      document.documentElement.style.setProperty('--text-color', lightColor);
      document.documentElement.setAttribute('data-theme', 'dark');
      document.body.style.backgroundColor = darkColor;
      document.body.style.color = lightColor;
    } else {
      document.documentElement.style.setProperty('--bg-color', lightColor);
      document.documentElement.style.setProperty('--text-color', darkColor);
      document.documentElement.setAttribute('data-theme', 'light');
      document.body.style.backgroundColor = lightColor;
      document.body.style.color = darkColor;
    }

    // 为排除的元素添加特殊样式
    this.applyExcludeStyles(theme);

    // 移除禁用过渡的样式
    if (immediate) {
      setTimeout(() => {
        const noTransStyle = document.getElementById('theme-toggle-no-transition');
        if (noTransStyle) {
          noTransStyle.remove();
        }
      }, 10);
    }

    // 触发自定义事件
    const event = new CustomEvent('themeChanged', { detail: { theme } });
    document.dispatchEvent(event);
  }

  applyExcludeStyles(theme) {
    const { excludeSelectors, lightColor, darkColor } = this.options;
    
    // 移除旧的排除样式
    const oldStyle = document.getElementById('theme-toggle-exclude-styles');
    if (oldStyle) {
      oldStyle.remove();
    }

    // 如果没有排除选择器，直接返回
    if (!excludeSelectors || excludeSelectors.length === 0) {
      return;
    }

    // 创建新的排除样式
    const style = document.createElement('style');
    style.id = 'theme-toggle-exclude-styles';
    
    const cssRules = excludeSelectors.map(selector => {
      // 为排除的元素保持原始的浅色样式
      return `${selector} {
        background-color: ${lightColor} !important;
        color: ${darkColor} !important;
      }`;
    }).join('\n');
    
    style.textContent = cssRules;
    document.head.appendChild(style);
  }

  updateButton() {
    this.button.innerHTML = this.getIcon(this.theme);
    this.button.style.background = this.theme === 'dark' ? '#2d2d2d' : '#f0f0f0';
    this.button.style.color = this.theme === 'dark' ? '#f0f0f0' : '#2d2d2d';
    this.button.style.border = this.theme === 'dark' ? '2px solid rgba(255, 255, 255, 0.2)' : '2px solid rgba(0, 0, 0, 0.1)';
  }

  saveTheme(theme) {
    try {
      localStorage.setItem('theme-preference', theme);
    } catch (e) {
      console.warn('无法保存主题偏好:', e);
    }
  }

  getSavedTheme() {
    try {
      return localStorage.getItem('theme-preference');
    } catch (e) {
      console.warn('无法读取主题偏好:', e);
      return null;
    }
  }

  // 公共方法：更新位置
  updatePosition(position, offset) {
    this.options.position = position;
    if (offset) this.options.offset = offset;
    const positionStyles = this.getPositionStyles(position, this.options.offset);
    Object.assign(this.button.style, positionStyles);
  }

  // 公共方法：销毁按钮
  destroy() {
    if (this.button && this.button.parentNode) {
      this.button.parentNode.removeChild(this.button);
    }
  }
}

// 如果是在浏览器环境中，暴露到全局
if (typeof window !== 'undefined') {
  window.ThemeToggle = ThemeToggle;
}

// 如果是模块环境
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ThemeToggle;
}
