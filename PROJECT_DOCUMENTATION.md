# Image Merge Tools - 完整项目文档

## 📋 项目概览

**Image Merge Tools** 是一个完整的线上图片编辑工具网站，提供两个核心功能：
1. **图片合并工具** - 支持多种格式的图片合并
2. **文字合并到图片** - 为图片添加定制文字

## 🏗️ 项目结构

```
主菜单（导航栏）
├── 首页 (/)
├── 图片合并 (/tools/image-merge)
├── 文字合并图片 (/tools/text-to-image)
└── 关于 (/about)

底部菜单
├── 隐私政策 (/privacy-policy)
└── 关于我们 (/about)

内容结构
├── 首页特性
├── 工具文档（指南、使用场景、常见问题）
├── 关于页面
└── 隐私政策
```

## 🔧 核心功能

### 1. 图片合并工具 (`/tools/image-merge`)

**文件位置**: `/src/pages/tools/image-merge.astro`

**功能**:
- 支持多种合并格式：
  - 横向合并 (Horizontal)
  - 纵向合并 (Vertical)
  - 网格合并 (2×2, 3×3等)
  - 长图合并 (Long Image)
- 可调节图片间距 (0-50px)
- 支持JPG, PNG, WebP, GIF格式
- 高质量输出

**相关组件**: `/src/layouts/helpers/ImageMergeEditor.tsx` (React)

**内容资源**:
- 操作指南: `/src/content/tools/image-merge-guide.md`
- 使用场景: `/src/content/tools/image-merge-use-cases.md`
- 常见问题: `/src/content/tools/image-merge-faq.md`

### 2. 文字合并到图片工具 (`/tools/text-to-image`)

**文件位置**: `/src/pages/tools/text-to-image.astro`

**功能**:
- 50+专业字体选择
- 自定义文字颜色和效果
- 8种文字位置预设
- 拖拽式画布定位
- 支持多行文本
- 实时预览

**相关组件**: `/src/layouts/helpers/TextToImageEditor.tsx` (React)

**内容资源**:
- 操作指南: `/src/content/tools/text-to-image-guide.md`
- 使用场景: `/src/content/tools/text-to-image-use-cases.md`
- 常见问题: `/src/content/tools/text-to-image-faq.md`

## 🌍 多语言支持

**支持语言**: 英语、西班牙语、中文、法语、德语、日语

**文件位置**:
- 翻译配置: `/src/lib/i18n.ts`
- 语言上下文: `/src/lib/useLanguage.tsx`
- 语言切换器: `/src/layouts/helpers/LanguageSwitcher.tsx`

**使用方法**:
```typescript
import { useLanguage } from '@/lib/useLanguage';

export function MyComponent() {
  const { language, setLanguage, translate } = useLanguage();
  
  return (
    <div>
      <p>{translate('nav.home')}</p>
      <LanguageSwitcher />
    </div>
  );
}
```

## 📱 页面结构

### 主要页面

1. **首页** (`/`)
   - 自定义英雄横幅
   - 功能特性展示
   - CTA按钮
   - FAQ部分
   - 统计数字展示

2. **图片合并页** (`/tools/image-merge`)
   - 图片上传区域
   - 合并格式选择
   - 间距调整
   - 实时预览
   - 快速链接到资源

3. **文字合并页** (`/tools/text-to-image`)
   - 图片上传
   - 文字管理界面
   - 属性编辑器
   - 实时预览
   - 下载功能

4. **关于页** (`/about`)
   - 完整的公司信息
   - 团队介绍
   - 产品路线图
   - 联系信息

5. **隐私政策** (`/privacy-policy`)
   - GDPR合规
   - CCPA合规
   - 数据保护说明

## 📝 内容配置

### 菜单配置
**文件**: `/src/config/menu.json`
```json
{
  "main": [
    { "name": "Home", "url": "/" },
    { "name": "Image Merge", "url": "/tools/image-merge" },
    { "name": "Text to Image", "url": "/tools/text-to-image" },
    { "name": "About", "url": "/about" }
  ],
  "footer": [
    { "name": "Privacy Policy", "url": "/privacy-policy" },
    { "name": "About Us", "url": "/about" }
  ]
}
```

### 主配置文件
**文件**: `/src/config/config.json`

关键设置:
- `site.title`: 网站标题 (SEO友好)
- `site.base_url`: 基础URL
- `settings.language_switcher`: 启用多语言切换
- `settings.default_language`: 默认语言

## 🔍 SEO优化

### SEO特性

1. **结构化数据** (`/src/lib/seo.ts`):
   - SoftwareApplication Schema
   - Organization Schema
   - FAQ Schema
   - Breadcrumb Schema

2. **元标签优化**:
   - 自定义meta_title
   - 详细的meta描述
   - og:image标签
   - twitter:card标签

3. **性能优化**:
   - 响应式设计
   - 图片优化
   - CSS/JS压缩
   - Sitemap自动生成

4. **关键词优化**:
   - 页面特定关键词
   - 自然的关键词分布
   - 相关内容链接

## 🚀 部署

### Netlify部署

配置文件已包含: `netlify.toml`

**部署步骤**:
```bash
# 1. 安装依赖
yarn install

# 2. 本地开发
yarn dev

# 3. 构建
yarn build

# 4. 部署到Netlify
# 连接GitHub仓库到Netlify，自动部署
```

### Cloudflare Workers部署

使用Wrangler配置: `wrangler.jsonc`

```bash
# 部署到Cloudflare Workers
npm run deploy:cf-workers
```

## 📊 内容集合

### 集合架构

`/src/content.config.ts`:
- `homepage`: 首页内容
- `pages`: 通用页面（隐私政策等）
- `about`: 关于页面
- `tools`: 工具文档（指南、场景、FAQ）

### 内容文件位置

```
src/content/
├── homepage/
│   └── -index.md (首页内容)
├── pages/
│   └── privacy-policy.md
├── about/
│   └── index.md
└── tools/
    ├── image-merge-guide.md
    ├── image-merge-use-cases.md
    ├── image-merge-faq.md
    ├── text-to-image-guide.md
    ├── text-to-image-use-cases.md
    └── text-to-image-faq.md
```

## 🛠️ 技术栈

- **框架**: Astro 6.0
- **样式**: Tailwind CSS
- **交互**: React (组件)
- **图片处理**: Canvas API, Sharp
- **部署**: Netlify, Cloudflare Workers
- **SEO**: 结构化数据、元标签优化

## 📋 开发命令

```bash
# 安装依赖
yarn install

# 开发模式（含热刷新和主题生成）
yarn dev

# 构建生产版本
yarn build

# 预览生产构建
yarn preview

# 类型检查
yarn check

# 代码格式化
yarn format

# 生成JSON数据
yarn generate-json

# 移除深色模式
yarn remove-darkmode
```

## 🎨 自定义指南

### 修改菜单

编辑 `/src/config/menu.json`:
```json
{
  "main": [
    { "name": "自定义链接", "url": "/custom-path" }
  ]
}
```

### 修改颜色主题

编辑 `/src/config/theme.json`:
- `colors.primary`: 主色调
- `colors.secondary`: 辅助色
- `fonts.font_family`: 字体设置

### 修改首页内容

编辑 `/src/content/homepage/-index.md`:
- `banner`: 英雄区域
- `features`: 特性展示

### 添加新工具文档

在 `/src/content/tools/` 创建新文件:
```markdown
---
title: "..."
description: "..."
draft: false
tool: "image-merge" // 或 "text-to-image"
section: "guide" // "use-cases" 或 "faq"
---
```

## 📧 联系信息配置

编辑 `/src/config/config.json`:
- `params.contact_form_action`: 联系表单提交地址
- `metadata.meta_author`: 页面作者

## 🔐 隐私和安全

- GDPR 合规
- CCPA 合规
- 自动数据删除
- SSL/TLS 加密
- 无第三方数据共享

## ✅ SEO检查清单

- [x] 元标签优化
- [x] 结构化数据
- [x] Sitemap生成
- [x] 响应式设计
- [x] 页面速度优化
- [x] 移动友好
- [x] 多语言支持
- [x] 内部链接优化
- [x] 关键词优化
- [x] 社交分享标签

## 🚨 常见问题

**Q: 如何添加新的图片合并格式?**
A: 编辑 `ImageMergeEditor.tsx` 中的格式选项并添加相应的处理逻辑

**Q: 如何支持更多语言?**
A: 在 `/src/lib/i18n.ts` 的 `translations` 对象中添加新语言

**Q: 图片处理在前端还是后端?**
A: 当前使用Canvas API在前端处理，可扩展为后端API处理

**Q: 如何自定义工具界面?**
A: 编辑 `/src/layouts/helpers/` 中的React组件

## 📞 支持和反馈

- 支持邮箱：support@imagemergetools.com
- 隐私查询：privacy@imagemergetools.com
- 数据主体请求：dpo@imagemergetools.com

## 📄 许可证

MIT License - 免费使用和修改

---

**项目完成日期**: 2024年3月
**最后更新**: 2024年3月
