# 渔夫的小站

部署在 GitHub Pages 的个人静态站点。首页按分类列出文章；使用原生 HTML、CSS、SVG 和交互所需的 JavaScript，无框架、第三方依赖或构建步骤。

## 目录

```text
index.html             首页与文章目录
learning/              学习文章与图形面积题库
assets/css/            共享样式、文章样式与响应式规则
assets/js/             分步讲解与拉窗帘交互演示
assets/images/         直接维护的练习题 SVG 图源
assets/favicon.svg     站点图标
.nojekyll              跳过 GitHub Pages 的 Jekyll 处理
AGENTS.md              统一开发规范与交付要求
```

旧 Hexo / NexT 生成页面及附带资源已移除，历史版本保留在 Git 提交记录中。

## 本地查看与验证

直接用浏览器打开 `index.html` 即可查看，无需安装 Node.js 或启动开发服务器。

[拉窗帘图形题库](./learning/curtain-area.html)包含 16 个可拖动演示和 17 道分层练习。演示需要 JavaScript；题面、静态练习图、提示和完整解答可以直接阅读。所有资源均在仓库内，不需要外部字体、脚本或接口。

[小学方程图解教程](./learning/elementary-equations.html)面向刚接触方程的五、六年级同学，包含 8 个分步天平与线段图演示、16 道分层练习。启用 JavaScript 后可逐步前进、后退和复位；未启用时直接展示全部图解步骤，提示与解答使用原生折叠面板。

修改后按 [AGENTS.md](./AGENTS.md) 的验证清单检查。当前没有自动化测试、格式化工具或构建命令；不要将未运行的检查描述为已通过。

## GitHub Pages

本项目适合使用分支发布：在仓库 **Settings → Pages → Build and deployment** 中选择：

- Source：`Deploy from a branch`
- Branch：`master`
- Folder：`/ (root)`

开启上述设置后，将更新推送到远程 `master` 会触发发布。本地保存、提交或合并不会更新线上站点。当前仓库没有自定义 GitHub Actions 工作流，实际 Pages 开关和发布结果以 GitHub 后台为准。

官方文档：[配置发布源](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)。

## 资源版本与在线验收

用户通过已发布的页面验收本项目。用户已持续授权：任务修改完成并检查通过后，直接提交并推送到远程 `master`，无需再次确认；用户明确要求仅分析、暂不提交或暂不推送时，以当次要求为准。只提交当前任务的改动，推送前核对工作区、实际 diff 和远程状态。

修改 JS、CSS 后，计算文件内容的 SHA-256，取前 12 位作为 `?v=<内容哈希>`，同步更新所有引用该资源的 HTML。共享资源变更时也要检查其他页面的引用；内容未变的资源保留原版本号。这样新页面会请求新的资源地址，减少继续使用旧缓存的情况。

每次推送后的交付信息应包含提交短 SHA 和带版本参数的页面链接，例如 `learning/curtain-area.html?v=<提交短SHA>#demo-two-roads`。版本参数放在章节锚点之前，用于区分页面请求；它不能消除 GitHub Pages 的发布延迟。区分“已推送”和“已发布”，只有实际核验线上内容后才报告发布完成；尚未生效或未核验时如实说明。

## 后续开发

常规改动按上述规则在 `master` 完成检查、提交和推送。需要隔离开发时，从 `master` 创建范围明确的功能分支；创建分支和合并仍需明确授权。先维护当前静态结构；确有文章管理或复杂交互需求时，再评估生成工具或框架。
