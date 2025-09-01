import mysql from 'mysql2/promise';

// 数据库连接配置
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '034654',
    database: 'vidio',
    port: 3306,
    connectionLimit: 10,
    acquireTimeout: 60000,
    timeout: 60000
};

// 创建连接池
const pool = mysql.createPool(dbConfig);

// 数据库连接测试
async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('数据库连接成功');
        connection.release();
        return true;
    } catch (error) {
        console.error('数据库连接失败:', error.message);
        return false;
    }
}

// 用户认证函数
async function authenticateUser(username, password) {
    try {
        const [rows] = await pool.execute(
            'SELECT id, username, email FROM users WHERE username = ? AND password = ?',
            [username, password]
        );
        
        if (rows.length > 0) {
            return {
                success: true,
                user: rows[0]
            };
        } else {
            return {
                success: false,
                message: '用户名或密码错误'
            };
        }
    } catch (error) {
        console.error('认证错误:', error);
        return {
            success: false,
            message: '服务器错误'
        };
    }
}

// 用户注册函数
async function registerUser(username, password, email) {
    try {
        // 检查用户是否已存在
        const [existingUsers] = await pool.execute(
            'SELECT id FROM users WHERE username = ? OR email = ?',
            [username, email]
        );
        
        if (existingUsers.length > 0) {
            return {
                success: false,
                message: '用户名或邮箱已存在'
            };
        }
        
        // 创建新用户
        const [result] = await pool.execute(
            'INSERT INTO users (username, password, email, created_at) VALUES (?, ?, ?, NOW())',
            [username, password, email]
        );
        
        return {
            success: true,
            userId: result.insertId,
            message: '注册成功'
        };
    } catch (error) {
        console.error('注册错误:', error);
        return {
            success: false,
            message: '注册失败'
        };
    }
}

// 获取用户信息
async function getUserById(userId) {
    try {
        const [rows] = await pool.execute(
            'SELECT id, username, email, created_at FROM users WHERE id = ?',
            [userId]
        );
        
        return rows[0] || null;
    } catch (error) {
        console.error('获取用户信息错误:', error);
        return null;
    }
}

// 数据库初始化（创建表）
async function initializeDatabase() {
    try {
        const connection = await pool.getConnection();
        
        // 创建用户表
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);
        
        // 创建观看历史表
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS watch_history (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                video_id INT NOT NULL,
                watched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                progress INT DEFAULT 0,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `);
        
        // 创建收藏表
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS favorites (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                video_id INT NOT NULL,
                added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `);
        
        console.log('数据库表初始化完成');
        connection.release();
        
    } catch (error) {
        console.error('数据库初始化错误:', error);
    }
}

export {
    pool,
    testConnection,
    authenticateUser,
    registerUser,
    getUserById,
    initializeDatabase
};