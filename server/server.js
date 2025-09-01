import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import { authenticateUser, registerUser, initializeDatabase, getUserById } from '../config/database.js';

const app = express();
const PORT = 3001;

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 初始化数据库
initializeDatabase();

// 登录接口
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: '用户名和密码不能为空'
      });
    }
    
    const result = await authenticateUser(username, password);
    
    if (result.success) {
      res.json({
        success: true,
        message: '登录成功',
        user: result.user
      });
    } else {
      res.status(401).json({
        success: false,
        message: result.message
      });
    }
  } catch (error) {
    console.error('登录错误:', error);
    res.status(500).json({
      success: false,
      message: '服务器错误'
    });
  }
});

// 注册接口
app.post('/api/register', async (req, res) => {
  try {
    const { username, password, email } = req.body;
    
    if (!username || !password || !email) {
      return res.status(400).json({
        success: false,
        message: '所有字段都必须填写'
      });
    }
    
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: '密码长度至少6位'
      });
    }
    
    const result = await registerUser(username, password, email);
    
    if (result.success) {
      res.json({
        success: true,
        message: result.message,
        userId: result.userId
      });
    } else {
      res.status(400).json({
        success: false,
        message: result.message
      });
    }
  } catch (error) {
    console.error('注册错误:', error);
    res.status(500).json({
      success: false,
      message: '服务器错误'
    });
  }
});

// 获取用户信息接口
app.get('/api/user/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await getUserById(userId);
    
    if (user) {
      res.json({
        success: true,
        user: user
      });
    } else {
      res.status(404).json({
        success: false,
        message: '用户不存在'
      });
    }
  } catch (error) {
    console.error('获取用户信息错误:', error);
    res.status(500).json({
      success: false,
      message: '服务器错误'
    });
  }
});

// 健康检查接口
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: '服务器运行正常',
    timestamp: new Date().toISOString()
  });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
  console.log('API端点:');
  console.log('  POST /api/login - 用户登录');
  console.log('  POST /api/register - 用户注册');
  console.log('  GET /api/user/:id - 获取用户信息');
  console.log('  GET /api/health - 健康检查');
});

// 优雅关闭
process.on('SIGINT', () => {
  console.log('\n正在关闭服务器...');
  process.exit(0);
});

// 视频数据API接口
app.get('/api/videos', async (req, res) => {
  try {
    const { category, search, sort } = req.query;
    
    // 这里应该从数据库获取真实数据，暂时返回模拟数据
    const videoData = {
      movies: [
        { id: 1, title: '肖申克的救赎', category: '剧情', year: 1994, rating: 9.7, image: '/images/movie1.jpg', videoUrl: 'https://www.youtube.com/embed/6hB3S9bIaco' },
        { id: 2, title: '阿甘正传', category: '剧情', year: 1994, rating: 9.5, image: '/images/movie2.jpg', videoUrl: 'https://www.youtube.com/embed/bLvqoHBptjg' },
        { id: 3, title: '泰坦尼克号', category: '爱情', year: 1997, rating: 9.4, image: '/images/movie3.jpg', videoUrl: 'https://www.youtube.com/embed/zCy5WQ9S4c0' }
      ],
      tvshows: [
        { id: 4, title: '权力的游戏', category: '奇幻', year: 2011, rating: 9.3, image: '/images/tvshow1.jpg', videoUrl: 'https://www.youtube.com/embed/gcTkNV5Vg1E' },
        { id: 5, title: '绝命毒师', category: '犯罪', year: 2008, rating: 9.5, image: '/images/tvshow2.jpg', videoUrl: 'https://www.youtube.com/embed/HhesaQXLuRY' },
        { id: 6, title: '黑镜', category: '科幻', year: 2011, rating: 8.8, image: '/images/tvshow3.jpg', videoUrl: 'https://www.youtube.com/embed/jDiYGjp5iFg' }
      ],
      anime: [
        { id: 7, title: '进击的巨人', category: '动作', year: 2013, rating: 9.1, image: '/images/anime1.jpg', videoUrl: 'https://www.youtube.com/embed/M_U8D2K1Ksw' },
        { id: 8, title: '鬼灭之刃', category: '奇幻', year: 2019, rating: 8.7, image: '/images/anime2.jpg', videoUrl: 'https://www.youtube.com/embed/VQGCKyvzIM4' },
        { id: 9, title: '咒术回战', category: '动作', year: 2020, rating: 8.6, image: '/images/anime3.jpg', videoUrl: 'https://www.youtube.com/embed/2ZRY4C6e1QQ' }
      ]
    };
    
    let videos = category ? videoData[category] || [] : [];
    
    // 搜索过滤
    if (search) {
      const query = search.toLowerCase();
      videos = videos.filter(video => 
        video.title.toLowerCase().includes(query) || 
        video.category.toLowerCase().includes(query)
      );
    }
    
    // 排序
    if (sort) {
      videos.sort((a, b) => {
        if (sort === 'rating-desc') return b.rating - a.rating;
        if (sort === 'rating-asc') return a.rating - b.rating;
        if (sort === 'year-desc') return b.year - a.year;
        if (sort === 'year-asc') return a.year - b.year;
        return 0;
      });
    }
    
    res.json({
      success: true,
      data: videos,
      total: videos.length
    });
    
  } catch (error) {
    console.error('获取视频数据错误:', error);
    res.status(500).json({
      success: false,
      message: '获取视频数据失败'
    });
  }
});

// 静态文件服务 - 提供本地图片
app.use('/images', express.static('public/images'));