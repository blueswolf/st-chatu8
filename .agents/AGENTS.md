# 项目部署与服务器授权规则

## 远程部署服务器配置

- **服务器 IP**: `156.238.229.214`
- **SSH 用户名**: `root`
- **SSH 密码**: `8ucKz9h4ngdBhTA`
- **插件部署目标路径**: `/data/st_data/default-user/extensions/zinao-chatu`

### 部署说明
- 当用户要求更新/部署插件时，将项目文件同步传输至上述服务器的该目标路径。
- 同步时过滤 `.git`、`git_history.txt`、`scratch`、`node_modules` 等无关文件。
