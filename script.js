// 在文件开头添加音乐播放相关代码
const musicList = [
    'music/Dior Sauvage - 邓典果DDG.mp3',
    'music/失眠 - 邓典果DDG&Bingoo.mp3',
    'music/If I Die - 邓典果DDG.mp3',
    'music/好耍得很 - 邓典果DDG.mp3',
    'music/Interlude - 邓典果DDG.mp3',
    'music/川崎 - 邓典果DDG.mp3',
    'music/Intro - 邓典果DDG&Nemo.mp3',
    'music/我听不到 - 邓典果DDG.mp3',
    'music/二号航站楼 - 邓典果DDG.mp3',
    'music/武候区三娃儿 - 邓典果DDG.mp3',
    'music/在乎 - 邓典果DDG.mp3',
    'music/满钻卡地亚 - 邓典果DDG.mp3'
];

let currentMusicIndex = 0;
const audio = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
const prevSong = document.getElementById('prevSong');
const nextSong = document.getElementById('nextSong');
const showPlaylist = document.getElementById('showPlaylist');
const playlistModal = document.getElementById('playlistModal');
const closePlaylist = document.getElementById('closePlaylist');
const playlist = document.getElementById('playlist');
let isPlaying = false;

// 初始化音乐播放器
function initMusicPlayer() {
    audio.src = musicList[currentMusicIndex];
    audio.loop = false;
    
    // 当一首歌播放完时，播放下一首
    audio.addEventListener('ended', playNextSong);
    
    // 音乐控制按钮点击事件
    musicToggle.addEventListener('click', toggleMusic);
    prevSong.addEventListener('click', playPrevSong);
    nextSong.addEventListener('click', playNextSong);
    showPlaylist.addEventListener('click', togglePlaylist);
    closePlaylist.addEventListener('click', togglePlaylist);
    
    // 初始化播放列表
    initPlaylist();
}

// 初始化播放列表
function initPlaylist() {
    playlist.innerHTML = '';
    musicList.forEach((song, index) => {
        const songName = song.split('/').pop().replace('.mp3', '');
        const div = document.createElement('div');
        div.className = 'playlist-item';
        div.textContent = songName;
        div.addEventListener('click', () => {
            currentMusicIndex = index;
            // 点击后立即播放
            isPlaying = true;
            loadAndPlaySong();
            togglePlaylist(); // 播放后关闭列表
        });
        playlist.appendChild(div);
    });
    updatePlaylistUI();
}

// 更新播放列表UI
function updatePlaylistUI() {
    const items = playlist.getElementsByClassName('playlist-item');
    Array.from(items).forEach((item, index) => {
        item.classList.toggle('playing', index === currentMusicIndex);
    });
}

// 切换播放列表显示
function togglePlaylist() {
    if (playlistModal.style.display === 'flex') {
        playlistModal.style.display = 'none';
    } else {
        playlistModal.style.display = 'flex';
    }
}

// 播放/暂停音乐
function toggleMusic() {
    if (isPlaying) {
        audio.pause();
        musicToggle.classList.remove('playing');
        // 显示播放图标，隐藏暂停图标
        musicToggle.querySelector('.play-path').style.display = 'block';
        musicToggle.querySelector('.pause-path').style.display = 'none';
    } else {
        audio.play();
        musicToggle.classList.add('playing');
        // 显示暂停图标，隐藏播放图标
        musicToggle.querySelector('.play-path').style.display = 'none';
        musicToggle.querySelector('.pause-path').style.display = 'block';
    }
    isPlaying = !isPlaying;
    updateCurrentSongName();
}

// 加载并播放歌曲
function loadAndPlaySong() {
    audio.src = musicList[currentMusicIndex];
    if (isPlaying) {
        audio.play();
        // 确保按钮状态正确
        musicToggle.classList.add('playing');
        musicToggle.querySelector('.play-path').style.display = 'none';
        musicToggle.querySelector('.pause-path').style.display = 'block';
    }
    updatePlaylistUI();
    updateCurrentSongName();
}

// 播放上一首歌
function playPrevSong() {
    currentMusicIndex = (currentMusicIndex - 1 + musicList.length) % musicList.length;
    loadAndPlaySong();
}

// 播放下一首歌
function playNextSong() {
    currentMusicIndex = (currentMusicIndex + 1) % musicList.length;
    loadAndPlaySong();
}

// 初始化音乐播放器
initMusicPlayer();

// 倒计时功能
function updateCountdown() {
    // 设置目标日期（这里需要修改为实际的生日日期）
    const birthday = new Date('2025-12-17 00:00:00').getTime();
    const now = new Date().getTime();
    const distance = birthday - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

// 每秒更新倒计时
setInterval(updateCountdown, 1000);
updateCountdown(); 

// 添加点击空白处关闭列表的功能
playlistModal.addEventListener('click', (event) => {
    // 如果点击的是模态框本身（而不是其内容）
    if (event.target === playlistModal) {
        togglePlaylist();
    }
});

// 阻止播放列表内容的点击事件冒泡
document.querySelector('.playlist-content').addEventListener('click', (event) => {
    event.stopPropagation();
}); 

// 添加更新当前播放歌曲名称的函数
function updateCurrentSongName() {
    const currentSongElement = document.getElementById('currentSongName');
    const songName = musicList[currentMusicIndex].split('/').pop().replace('.mp3', '');
    currentSongElement.textContent = isPlaying ? `正在播放：${songName}` : songName;
    
    // 添加滚动效果
    if (currentSongElement.scrollWidth > currentSongElement.offsetWidth) {
        currentSongElement.style.animation = 'none';
        setTimeout(() => {
            currentSongElement.style.animation = 'scrollText 15s linear infinite';
        }, 10);
    }
}

// 添加文字滚动动画
const style = document.createElement('style');
style.textContent = `
@keyframes scrollText {
    0% { transform: translateX(0); }
    45% { transform: translateX(calc(-100% + 200px)); }
    50% { transform: translateX(calc(-100% + 200px)); }
    95% { transform: translateX(0); }
    100% { transform: translateX(0); }
}
`;
document.head.appendChild(style); 

// 在适当的时机移除提示框
document.addEventListener('DOMContentLoaded', () => {
    const tipModal = document.querySelector('.tip-modal');
    // 6秒后移除提示框
    setTimeout(() => {
        tipModal.remove();
    }, 6000);
}); 

// 在文件开头添加密码验证相关代码
document.addEventListener('DOMContentLoaded', () => {
    const passwordModal = document.getElementById('passwordModal');
    const mainContent = document.getElementById('mainContent');
    const passwordInput = document.getElementById('passwordInput');
    const submitButton = document.getElementById('submitPassword');
    const errorMessage = document.getElementById('errorMessage');
    const correctPassword = '1217';

    // 检查是否已验证过密码
    if (sessionStorage.getItem('passwordVerified') === 'true') {
        passwordModal.style.display = 'none';
        mainContent.style.display = 'block';
        return;
    }

    function verifyPassword() {
        if (passwordInput.value === correctPassword) {
            // 密码正确
            sessionStorage.setItem('passwordVerified', 'true');
            passwordModal.style.display = 'none';
            mainContent.style.display = 'block';
            errorMessage.textContent = '';
        } else {
            // 密码错误
            errorMessage.textContent = '密码错误，请重试';
            passwordInput.value = '';
            // 添加摇动效果
            passwordInput.classList.add('shake');
            setTimeout(() => {
                passwordInput.classList.remove('shake');
            }, 500);
        }
    }

    // 点击确认按钮验证密码
    submitButton.addEventListener('click', verifyPassword);

    // 按回车键验证密码
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            verifyPassword();
        }
    });
}); 

// 添加复制域名功能
function copyDomain() {
    const domain = '小黑生日快乐.fun';
    navigator.clipboard.writeText(domain).then(() => {
        const btn = document.querySelector('.copy-btn');
        btn.textContent = '已复制！';
        setTimeout(() => {
            btn.textContent = '复制';
        }, 2000);
    });
} 