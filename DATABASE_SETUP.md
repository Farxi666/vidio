# 数据库设置指南

## 数据库配置

### 1. 创建数据库
首先需要在MySQL中创建数据库：

```sql
CREATE DATABASE vidio;
USE vidio;
```

### 2. 创建用户表
数据库会自动创建所需的表，但您也可以手动执行：

```sql
-- 用户表
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 观看历史表
CREATE TABLE watch_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    video_id INT NOT NULL,
    watched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    progress INT DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 收藏表
CREATE TABLE favorites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    video_id INT NOT NULL,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### 3. 添加测试用户
```sql
INSERT INTO users (username, password, email) VALUES 
('admin', '034654', 'admin@vidio.com'),
('user1', 'password123', 'user1@vidio.com'),
('user2', 'password123', 'user2@vidio.com');
```

## 服务器设置

### 1. 安装依赖
```bash
cd d:\360MoveData\Users\Lenovo\Desktop\新建文件夹\vidio
npm install express cors mysql2 bcrypt
```

### 2. 启动服务器
```bash
npm run server
```

服务器将在 http://localhost:3001 启动

### 3. API端点

- `POST /api/login` - 用户登录
- `POST /api/register` - 用户注册
- `GET /api/user/:id` - 获取用户信息
- `GET /api/health` - 健康检查

## 数据库连接配置

配置文件位于 `config/database.js`：

```javascript
const dbConfig = {
    host: 'localhost',
    user: 'root',           // 您的MySQL用户名
    password: '034654',     // 您的MySQL密码
    database: 'vidio',      // 数据库名称
    port: 3306,            // MySQL端口
    connectionLimit: 10,
    acquireTimeout: 60000,
    timeout: 60000,
    reconnect: true
};
```

## 故障排除

### 1. 数据库连接失败
- 检查MySQL服务是否运行
- 确认用户名和密码正确
- 检查数据库名称是否为'vidio'

### 2. 表创建失败
- 确保有足够的权限创建表
- 检查SQL语法是否正确

### 3. 服务器启动失败
- 检查端口3001是否被占用
- 确认所有依赖已安装

## 安全注意事项

1. 在生产环境中，不要使用默认密码
2. 建议使用环境变量存储数据库凭据
3. 启用SSL连接数据库
4. 对密码进行哈希处理（已实现）

## 开发建议

1. 使用nodemon进行开发热重载：
```bash
npm install -g nodemon
nodemon server/server.js
```

2. 使用Postman测试API端点
3. 查看服务器日志了解运行状态

## 下一步计划

1. 添加视频管理功能
2. 实现用户权限系统
3. 添加支付集成
4. 实现推荐算法