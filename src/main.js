import './styles.css'
import '@fortawesome/fontawesome-free/js/all.js'

// 模拟数据
const videoData = {
  movies: [
    { id: 1, title: '沙丘2', category: '科幻', rating: 9.2, year: 2024, image: 'https://via.placeholder.com/800x450/1A1A1A/FFFFFF?text=沙丘2', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
    { id: 2, title: '奥本海默', category: '传记', rating: 8.8, year: 2023, image: 'https://via.placeholder.com/800x450/1A1A1A/FFFFFF?text=奥本海默', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
    { id: 3, title: '宇宙探索编辑部', category: '喜剧', rating: 8.3, year: 2023, image: 'https://via.placeholder.com/800x450/1A1A1A/FFFFFF?text=宇宙探索编辑部', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
    { id: 4, title: '寄生虫', category: '剧情', rating: 9.0, year: 2019, image: 'https://via.placeholder.com/800x450/1A1A1A/FFFFFF?text=寄生虫', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
    { id: 5, title: '瞬息全宇宙', category: '奇幻', rating: 8.1, year: 2022, image: 'https://via.placeholder.com/800x450/1A1A1A/FFFFFF?text=瞬息全宇宙', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
    { id: 6, title: '流浪地球2', category: '科幻', rating: 8.5, year: 2023, image: 'https://via.placeholder.com/800x450/1A1A1A/FFFFFF?text=流浪地球2', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  ],
  tvshows: [
    { id: 7, title: '黑镜 第六季', category: '科幻', rating: 8.4, year: 2023, image: 'https://via.placeholder.com/800x450/1A1A1A/FFFFFF?text=黑镜+第六季', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
    { id: 8, title: '三体', category: '科幻', rating: 7.9, year: 2023, image: 'https://via.placeholder.com/800x450/1A1A1A/FFFFFF?text=三体', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
    { id: 9, title: '漫长的季节', category: '悬疑', rating: 9.4, year: 2023, image: 'https://via.placeholder.com/800x450/1A1A1A/FFFFFF?text=漫长的季节', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
    { id: 10, title: '绝命毒师', category: '犯罪', rating: 9.7, year: 2008, image: 'https://via.placeholder.com/800x450/1A1A1A/FFFFFF?text=绝命毒师', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
    { id: 11, title: '狂飙', category: '犯罪', rating: 8.5, year: 2023, image: 'https://via.placeholder.com/800x450/1A1A1A/FFFFFF?text=狂飙', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
    { id: 12, title: '权力的游戏', category: '奇幻', rating: 9.2, year: 2011, image: 'https://via.placeholder.com/800x450/1A1A1A/FFFFFF?text=权力的游戏', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  ],
  anime: [
    { id: 13, title: '鬼灭之刃 锻刀村篇', category: '动画', rating: 9.3, year: 2023, image: 'https://via.placeholder.com/800x450/1A1A1A/FFFFFF?text=鬼灭之刃+锻刀村篇', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
    { id: 14, title: '进击的巨人 最终季', category: '动画', rating: 9.5, year: 2020, image: 'https://via.placeholder.com/800x450/1A1A1A/FFFFFF?text=进击的巨人+最终季', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
    { id: 15, title: '三体 动画版', category: '科幻', rating: 6.5, year: 2022, image: 'https://via.placeholder.com/800x450/1A1A1A/FFFFFF?text=三体+动画版', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
    { id: 16, title: '灵能百分百 III', category: '动画', rating: 9.4, year: 2022, image: 'https://via.placeholder.com/800x450/1A1A1A/FFFFFF?text=灵能百分百+III', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
    { id: 17, title: '灌篮高手 剧场版', category: '动画', rating: 8.9, year: 2022, image: 'https://via.placeholder.com/800x450/1A1A1A/FFFFFF?text=灌篮高手+剧场版', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
    { id: 18, title: '海贼王', category: '冒险', rating: 9.0, year: 1999, image: 'https://via.placeholder.com/800x450/1A1A1A/FFFFFF?text=海贼王', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  ]
};

// 当前选中的分类
let currentCategory = 'movies';
let searchQuery = '';

// 初始化页面
function init() {
  renderHeader();
  renderMain();
  setupEventListeners();
}

// 渲染头部
function renderHeader() {
  const app = document.querySelector('#app');
  app.innerHTML = `
    <!-- 导航栏 -->
    <header id="navbar" class="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <nav class="container mx-auto px-4 py-4 flex items-center justify-between">
        <div class="flex items-center space-x-8">
          <a href="#" class="text-primary text-3xl font-bold">影享家</a>
          <div class="hidden md:flex space-x-6">
            <a href="#" class="text-white hover:text-primary transition-colors">首页</a>
            <a href="#" class="text-white hover:text-primary transition-colors">电影</a>
            <a href="#" class="text-white hover:text-primary transition-colors">电视剧</a>
            <a href="#" class="text-white hover:text-primary transition-colors">动漫</a>
          </div>
        </div>
        
        <div class="flex items-center space-x-4">
          <div class="relative">
            <input 
              type="text" 
              id="search-input" 
              placeholder="搜索电影、电视剧、动漫..." 
              class="bg-secondary border border-gray-700 rounded-full px-4 py-2 pl-10 text-sm focus:outline-none focus:border-primary w-48 md:w-64 transition-all"
            >
            <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </div>
          <button class="bg-primary hover:bg-hover text-white px-4 py-2 rounded-full transition-colors">
            <i class="fas fa-user mr-2"></i>登录
          </button>
        </div>
      </nav>
    </header>

    <!-- 主内容区 -->
    <main class="container mx-auto px-4 pt-24 pb-16">
      <!-- 分类切换 -->
      <div class="flex justify-between items-center mb-8">
        <div class="flex space-x-2">
          <button id="movies-btn" class="category-btn bg-primary text-white px-4 py-2 rounded-full">电影</button>
          <button id="tvshows-btn" class="category-btn bg-secondary text-white px-4 py-2 rounded-full hover:bg-gray-700 transition-colors">电视剧</button>
          <button id="anime-btn" class="category-btn bg-secondary text-white px-4 py-2 rounded-full hover:bg-gray-700 transition-colors">动漫</button>
        </div>
        
        <div class="hidden md:block">
          <select id="sort-select" class="bg-secondary border border-gray-700 text-white px-4 py-2 rounded-full focus:outline-none focus:border-primary">
            <option value="rating-desc">评分从高到低</option>
            <option value="rating-asc">评分从低到高</option>
            <option value="year-desc">年份最新</option>
            <option value="year-asc">年份最早</option>
          </select>
        </div>
      </div>

      <!-- 视频列表 -->
      <div id="video-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- 视频卡片将在这里动态生成 -->
      </div>

      <!-- 视频播放器模态框 -->
      <div id="video-modal" class="fixed inset-0 bg-black bg-opacity-90 z-50 hidden flex items-center justify-center p-4">
        <div class="w-full max-w-5xl">
          <div class="flex justify-between items-center mb-4">
            <h3 id="modal-title" class="text-xl font-bold"></h3>
            <button id="close-modal" class="text-white text-2xl hover:text-primary transition-colors">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="video-player">
            <iframe id="video-iframe" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>
          </div>
        </div>
      </div>
    </main>

    <!-- 页脚 -->
    <footer class="bg-secondary py-12">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="mb-6 md:mb-0">
            <h2 class="text-primary text-2xl font-bold mb-4">影享家</h2>
            <p class="text-gray-400">发现精彩影视内容，享受观影乐趣</p>
          </div>
          
          <div class="flex space-x-6 mb-6 md:mb-0">
            <a href="#" class="text-gray-400 hover:text-primary transition-colors text-xl"><i class="fab fa-weixin"></i></a>
            <a href="#" class="text-gray-400 hover:text-primary transition-colors text-xl"><i class="fab fa-weibo"></i></a>
            <a href="#" class="text-gray-400 hover:text-primary transition-colors text-xl"><i class="fab fa-tiktok"></i></a>
            <a href="#" class="text-gray-400 hover:text-primary transition-colors text-xl"><i class="fab fa-bilibili"></i></a>
          </div>
        </div>
        
        <div class="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>© 2024 影享家. 保留所有权利.</p>
        </div>
      </div>
    </footer>
  `;
}

// 渲染主内容
function renderMain() {
  renderVideoGrid();
}

// 渲染视频网格
function renderVideoGrid() {
  const videoGrid = document.querySelector('#video-grid');
  let videos = videoData[currentCategory];
  
  // 应用搜索过滤
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    videos = videos.filter(video => 
      video.title.toLowerCase().includes(query) || 
      video.category.toLowerCase().includes(query)
    );
  }
  
  // 应用排序
  const sortSelect = document.querySelector('#sort-select');
  if (sortSelect) {
    const sortValue = sortSelect.value;
    videos.sort((a, b) => {
      if (sortValue === 'rating-desc') return b.rating - a.rating;
      if (sortValue === 'rating-asc') return a.rating - b.rating;
      if (sortValue === 'year-desc') return b.year - a.year;
      if (sortValue === 'year-asc') return a.year - b.year;
      return 0;
    });
  }
  
  // 清空网格
  videoGrid.innerHTML = '';
  
  // 如果没有结果
  if (videos.length === 0) {
    videoGrid.innerHTML = `
      <div class="col-span-full text-center py-16">
        <i class="fas fa-search text-6xl text-gray-600 mb-4"></i>
        <p class="text-xl text-gray-400">没有找到相关内容</p>
      </div>
    `;
    return;
  }
  
  // 渲染视频卡片
  videos.forEach(video => {
    const card = document.createElement('div');
    card.className = 'movie-card bg-secondary rounded-xl overflow-hidden';
    card.innerHTML = `
      <div class="relative">
        <img src="${video.image}" alt="${video.title}" class="w-full aspect-video object-cover">
        <div class="absolute top-2 right-2 bg-primary text-white text-sm font-bold px-2 py-1 rounded">${video.rating}</div>
        <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-50 transition-all">
          <button class="play-btn text-white text-5xl opacity-0 hover:opacity-100 transition-opacity transform hover:scale-110" data-id="${video.id}">
            <i class="fas fa-play-circle"></i>
          </button>
        </div>
      </div>
      <div class="p-4">
        <h3 class="text-lg font-bold mb-2 line-clamp-1">${video.title}</h3>
        <div class="flex justify-between items-center text-sm text-gray-400">
          <span>${video.category}</span>
          <span>${video.year}</span>
        </div>
      </div>
    `;
    videoGrid.appendChild(card);
  });
}

// 设置事件监听器
function setupEventListeners() {
  // 分类切换
  document.querySelector('#movies-btn').addEventListener('click', () => switchCategory('movies'));
  document.querySelector('#tvshows-btn').addEventListener('click', () => switchCategory('tvshows'));
  document.querySelector('#anime-btn').addEventListener('click', () => switchCategory('anime'));
  
  // 排序
  const sortSelect = document.querySelector('#sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', renderVideoGrid);
  }
  
  // 搜索
  const searchInput = document.querySelector('#search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderVideoGrid();
    });
  }
  
  // 播放按钮点击
  document.querySelector('#video-grid').addEventListener('click', (e) => {
    const playBtn = e.target.closest('.play-btn');
    if (playBtn) {
      const videoId = parseInt(playBtn.dataset.id);
      playVideo(videoId);
    }
  });
  
  // 关闭模态框
  document.querySelector('#close-modal').addEventListener('click', closeVideoModal);
  
  // 点击模态框外部关闭
  document.querySelector('#video-modal').addEventListener('click', (e) => {
    if (e.target === document.querySelector('#video-modal')) {
      closeVideoModal();
    }
  });
  
  // 导航栏滚动效果
  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('#navbar');
    if (window.scrollY > 50) {
      navbar.classList.add('nav-scrolled');
    } else {
      navbar.classList.remove('nav-scrolled');
    }
  });
}

// 切换分类
function switchCategory(category) {
  currentCategory = category;
  
  // 更新按钮样式
  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.classList.remove('bg-primary');
    btn.classList.add('bg-secondary', 'hover:bg-gray-700');
  });
  
  const activeBtn = document.querySelector(`#${category}-btn`);
  activeBtn.classList.remove('bg-secondary', 'hover:bg-gray-700');
  activeBtn.classList.add('bg-primary');
  
  // 重新渲染视频网格
  renderVideoGrid();
}

// 播放视频
function playVideo(videoId) {
  // 查找视频
  let video = null;
  for (const category in videoData) {
    const found = videoData[category].find(v => v.id === videoId);
    if (found) {
      video = found;
      break;
    }
  }
  
  if (video) {
    const modal = document.querySelector('#video-modal');
    const modalTitle = document.querySelector('#modal-title');
    const videoIframe = document.querySelector('#video-iframe');
    
    modalTitle.textContent = video.title;
    videoIframe.src = video.videoUrl;
    
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

// 关闭视频模态框
function closeVideoModal() {
  const modal = document.querySelector('#video-modal');
  const videoIframe = document.querySelector('#video-iframe');
  
  videoIframe.src = '';
  modal.classList.add('hidden');
  document.body.style.overflow = '';
}

// 初始化应用
init();
