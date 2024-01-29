
## 项目介绍

这是一个基于vite的vue3项目模板，集成常见的项目规范。

## 项目技术栈

包管理工具：pnpm \
前端框架：Vue3 \
状态管理器：Pinia \
UI组件库：Element-Plus \
Css样式：Sass、Postcss \
代码规范：Eslint、Prettier、StyleLInt StyleLint \
提交规范：CommitLint、Husky、LintStaged \
打包优化最佳配置：chunk分包和拆包 \
图标库的依赖加载：unplugin-icons/vite \
依赖按需加载：unplugin-auto-import/vite \
组件按需导入：unplugin-vue-components \

## 项目启动

```bash

# 切换目录
cd vue3-element-admin

# 安装 pnpm
npm install pnpm -g

# 安装依赖
pnpm install

# 启动运行
pnpm run dev
```

## 开启Mock

项目同时支持在线和 Mock 接口，默认使用线上接口，如需替换为 Mock 接口，只需在 `vite.config.ts` 文件的 `plugins` 配置中取消对 `mockDevServerPlugin()` 的注释**即可**。

## 项目部署

```bash
# 项目打包
pnpm run build:prod

# 上传文件至远程服务器
将打包生成在 `dist` 目录下的文件拷贝至 `/usr/share/nginx/html` 目录

```

## 注意事项

- **自动导入插件自动生成默认关闭**

  模板项目的组件类型声明已自动生成。如果添加和使用新的组件，请按照图示方法开启自动生成。在自动生成完成后，记得将其设置为 `false`，避免重复执行引发冲突。

  ![](https://foruda.gitee.com/images/1687755823137387608/412ea803_716974.png)

- **项目启动浏览器访问空白**

  请升级浏览器尝试，低版本浏览器内核可能不支持某些新的 JavaScript 语法，比如可选链操作符 `?.`。

- **项目同步仓库更新升级**

  项目同步仓库更新升级之后，建议 `pnpm install` 安装更新依赖之后启动 。

- **项目组件、函数和引用爆红**

 重启 VSCode 尝试

## 提交规范

执行 `pnpm run commit` 唤起 git commit 交互，根据提示完成信息的输入和选择。
