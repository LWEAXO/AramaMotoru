const searchInput = document.getElementById('searchInput');
const searchType = document.getElementById('searchType');
const fileType = document.getElementById('fileType');
const voiceSearchBtn = document.getElementById('voiceSearch');
// https://github.com/LWEAXO
if ('webkitSpeechRecognition' in window) {
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'tr-TR';

    voiceSearchBtn.addEventListener('click', () => {
        recognition.start();
        voiceSearchBtn.classList.add('listening');
        voiceSearchBtn.innerHTML = '<i class="fas fa-microphone-slash"></i>';
        
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            searchInput.value = transcript;
            voiceSearchBtn.classList.remove('listening');
            voiceSearchBtn.innerHTML = '<i class="fas fa-microphone"></i>';
        };
        
        recognition.onerror = (event) => {
            voiceSearchBtn.classList.remove('listening');
            voiceSearchBtn.innerHTML = '<i class="fas fa-microphone"></i>';
        };
        
        recognition.onend = () => {
            voiceSearchBtn.classList.remove('listening');
            voiceSearchBtn.innerHTML = '<i class="fas fa-microphone"></i>';
        };
    });
} else {
    voiceSearchBtn.style.display = 'none';
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        performSearch();
    }
}

function performSearch() {
    const query = searchInput.value.trim();
    const type = searchType.value;
    const fileTypeValue = fileType.value;
    
    if (!query) {
        showAlert('⚠️ Lütfen arama terimi giriniz', 'error');
        return;
    }
    
    let searchQuery = query;
    if (fileTypeValue) {
        searchQuery += ` filetype:${fileTypeValue}`;
    }
    
    switch(type) {
        case 'web':
            performSearchEngine('google', searchQuery);
            break;
        case 'images':
            performImageSearch('google', searchQuery);
            break;
        case 'videos':// https://github.com/LWEAXO
            performVideoSearch('youtube', searchQuery);
            break;
        case 'shopping':
            performShoppingSearch('hepsiburada', searchQuery);
            break;
        default:
            performSearchEngine('google', searchQuery);
    }
}// https://github.com/LWEAXO

function performSearchEngine(engine, query = '') {
    if (!query) query = searchInput.value.trim();
    if (!query) {
        showAlert('⚠️ Lütfen arama terimi giriniz', 'error');
        return;
    }

    const encodedQuery = encodeURIComponent(query);
    let searchUrl = '';
    
    switch(engine) {
        case 'google':
            searchUrl = `https://www.google.com/search?q=${encodedQuery}`;
            break;
        case 'yandex':
            searchUrl = `https://yandex.com/search/?text=${encodedQuery}`;
            break;
        case 'bing':
            searchUrl = `https://www.bing.com/search?q=${encodedQuery}`;
            break;
        case 'duckduckgo':
            searchUrl = `https://duckduckgo.com/?q=${encodedQuery}`;
            break;
        case 'brave':
            searchUrl = `https://search.brave.com/search?q=${encodedQuery}`;
            break;
        case 'startpage':
            searchUrl = `https://www.startpage.com/do/search?query=${encodedQuery}`;
            break;
        case 'lilo':// https://github.com/LWEAXO
            searchUrl = `https://search.lilo.org/searchweb.php?q=${encodedQuery}`;
            break;
        case 'github':
            searchUrl = `https://github.com/search?q=${encodedQuery}`;
            break;
        case 'wikipedia':
            searchUrl = `https://tr.wikipedia.org/w/index.php?search=${encodedQuery}`;
            break;
        default:
            searchUrl = `https://www.google.com/search?q=${encodedQuery}`;
    }
    
    window.open(searchUrl, '_blank');
}

function performImageSearch(engine, query = '') {
    if (!query) query = searchInput.value.trim();
    if (!query) {
        showAlert('⚠️ Lütfen arama terimi giriniz', 'error');
        return;
    }

    const encodedQuery = encodeURIComponent(query);
    let searchUrl = '';
    
    switch(engine) {
        case 'google':
            searchUrl = `https://www.google.com/search?tbm=isch&q=${encodedQuery}`;
            break;
        case 'yandex':
            searchUrl = `https://yandex.com/images/search?text=${encodedQuery}`;
            break;
        case 'bing':
            searchUrl = `https://www.bing.com/images/search?q=${encodedQuery}`;
            break;
        case 'pinterest':
            searchUrl = `https://www.pinterest.com/search/pins/?q=${encodedQuery}`;
            break;
        default:
            searchUrl = `https://www.google.com/search?tbm=isch&q=${encodedQuery}`;
    }
    
    window.open(searchUrl, '_blank');
}
// https://github.com/LWEAXO
function performVideoSearch(engine, query = '') {
    if (!query) query = searchInput.value.trim();
    if (!query) {
        showAlert('⚠️ Lütfen arama terimi giriniz', 'error');
        return;
    }

    const encodedQuery = encodeURIComponent(query);
    let searchUrl = '';
    // https://github.com/LWEAXO
    switch(engine) {
        case 'youtube':
            searchUrl = `https://www.youtube.com/results?search_query=${encodedQuery}`;
            break;
        case 'twitch':
            searchUrl = `https://www.twitch.tv/search?term=${encodedQuery}`;
            break;
        case 'kick':
            searchUrl = `https://kick.com/search?query=${encodedQuery}`;
            break;
        default:
            searchUrl = `https://www.youtube.com/results?search_query=${encodedQuery}`;
    }
    
    window.open(searchUrl, '_blank');
}

function performShoppingSearch(engine, query = '') {
    if (!query) query = searchInput.value.trim();
    if (!query) {
        showAlert('⚠️ Lütfen arama terimi giriniz', 'error');
        return;
    }

    const encodedQuery = encodeURIComponent(query);
    let searchUrl = '';
    
    switch(engine) {
        case 'hepsiburada':
            searchUrl = `https://www.hepsiburada.com/ara?q=${encodedQuery}`;
            break;
        case 'trendyol':
            searchUrl = `https://www.trendyol.com/sr?q=${encodedQuery}`;
            break;
        case 'n11':
            searchUrl = `https://www.n11.com/arama?q=${encodedQuery}`;
            break;
        case 'amazon':
            searchUrl = `https://www.amazon.com.tr/s?k=${encodedQuery}`;
            break;
        // case 'gittigidiyor':
        //     searchUrl = `https://www.gittigidiyor.com/arama/?k=${encodedQuery}`;
        //     break;
        case 'ciceksepeti':
            searchUrl = `https://www.ciceksepeti.com/arama?query=${encodedQuery}`;
            break;
        // case 'morhipo':
        //     searchUrl = `https://www.morhipo.com/arama/${encodedQuery}`;
        //     break;
        // case 'ebay':
        //     searchUrl = `https://www.ebay.com/sch/i.html?_nkw=${encodedQuery}`;
        //     break;
        default:
            searchUrl = `https://www.hepsiburada.com/ara?q=${encodedQuery}`;
    }
    
    window.open(searchUrl, '_blank');
}

function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('tr-TR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    document.getElementById('currentTime').textContent = timeString;
}

function copyTime() {
    const timeText = document.getElementById('currentTime').textContent;
    navigator.clipboard.writeText(timeText).then(() => {
        showAlert('Saat panoya kopyalandı: ' + timeText, 'success');
    });
}

function showAlert(message, type) {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    
    document.body.appendChild(alert);
    
    setTimeout(() => {
        alert.classList.add('fade-out');
        setTimeout(() => {
            alert.remove();
        }, 300);
    }, 3000);
}// https://github.com/LWEAXO

setInterval(updateClock, 1000);
updateClock();

const style = document.createElement('style');
style.textContent = `
    .alert {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        opacity: 1;
        transition: opacity 0.3s ease;
    }
    
    .alert-success {
        background: #2ecc71;
    }
    
    .alert-error {
        background: #e74c3c;
    }
    
    .fade-out {
        opacity: 0;
    }
`;
document.head.appendChild(style);

function detectDevice() {
    const userAgent = navigator.userAgent;
    const body = document.body;
    
    if (/Mobi|Android|iPhone|iPad|iPod/i.test(userAgent)) {
        body.classList.add('mobile-device');
    } else if (/Tablet|iPad/i.test(userAgent)) {
        body.classList.add('tablet-device');
    } else {
        body.classList.add('desktop-device');
    }
}// https://github.com/LWEAXO

window.addEventListener('load', detectDevice);