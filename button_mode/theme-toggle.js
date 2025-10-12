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
      position: options.position || 'bottom-right',
      offset: options.offset || { x: 20, y: 20 },
      size: options.size || 50,
      darkColor: options.darkColor || '#1a1a1a',
      lightColor: options.lightColor || '#ffffff',
      transition: options.transition || '0.3s ease',
      zIndex: options.zIndex || 9999,
      ...options
    };

    this.theme = this.getSavedTheme() || 'light';
    this.init();
  }

  init() {
    this.createButton();
    this.applyTheme(this.theme);
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
      borderRadius: '50%',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: `${size * 0.5}px`,
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      transition: `all ${transition}`,
      zIndex: zIndex,
      outline: 'none',
      background: this.theme === 'dark' ? '#f0f0f0' : '#2d2d2d',
      color: this.theme === 'dark' ? '#2d2d2d' : '#f0f0f0'
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
    if (theme === 'dark') {
      // 太阳图标 (浅色模式)
      return `
        <svg width="60%" height="60%" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      `;
    } else {
      // 月亮图标 (深色模式)
      return `
        <svg width="60%" height="60%" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      `;
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

  applyTheme(theme) {
    const { darkColor, lightColor } = this.options;
    
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

    // 触发自定义事件
    const event = new CustomEvent('themeChanged', { detail: { theme } });
    document.dispatchEvent(event);
  }

  updateButton() {
    this.button.innerHTML = this.getIcon(this.theme);
    this.button.style.background = this.theme === 'dark' ? '#f0f0f0' : '#2d2d2d';
    this.button.style.color = this.theme === 'dark' ? '#2d2d2d' : '#f0f0f0';
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
