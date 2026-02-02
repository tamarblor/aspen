/* --- script.js --- */

function showPage(pageId) {
    // 1. הסתרת כל העמודים הרגילים
    document.querySelectorAll('.center-content').forEach(page => {
        page.classList.add('hidden');
    });

    // 2. הצגת העמוד שנבחר
    const pageToOpen = document.getElementById(pageId);
    if (pageToOpen) {
        pageToOpen.classList.remove('hidden');
    }

    // 3. איפוס: הסרת Active מכל כפתורי התפריט השמאלי
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });

    // 4. איפוס: הסרת Active מכותרת ה-ASPEN
    const menuHeader = document.querySelector('.menu-header');
    if (menuHeader) {
        menuHeader.classList.remove('active');
    }

    // 5. איפוס: הסרת הדגשה מכפתור ה-Index
    const indexHeader = document.querySelector('.index-header');
    if (indexHeader) {
        indexHeader.style.textDecoration = 'none';
        indexHeader.style.fontWeight = 'normal';
    }

    // --- לוגיקת הפעלה לפי עמוד ---

    if (pageId === 'page-home') {
        if (menuHeader) menuHeader.classList.add('active');
        
    } else if (pageId === 'page-index') {
        if (indexHeader) {
            indexHeader.style.textDecoration = 'underline';
            indexHeader.style.textUnderlineOffset = '4px';
        }

} else if (pageId === 'page-01') {
        // חדש: מדליק את הכפתור הראשון בתפריט (אינדקס 0)
        document.querySelectorAll('.menu-item')[0].classList.add('active');

    } else if (pageId === 'page-02' || pageId === 'page-02-item-06') {
        document.querySelectorAll('.menu-item')[1].classList.add('active');

        } else if (pageId === 'page-03') {
        // מדליק את הכפתור השלישי בתפריט (אינדקס 2)
        document.querySelectorAll('.menu-item')[2].classList.add('active');

        } else if (pageId === 'page-04') {
        // מדליק את הכפתור הרביעי בתפריט (אינדקס 3)
        document.querySelectorAll('.menu-item')[3].classList.add('active');

    } else if (pageId === 'page-films' || pageId === 'page-0506-item-24') {
        document.querySelectorAll('.menu-item')[4].classList.add('active');
        } else if (pageId === 'page-06a') {
        // מדליק את הכפתור השישי בתפריט (אינדקס 5)
        // (0=1, 1=2, 2=3, 3=4, 4=5+6, 5=6A)
        document.querySelectorAll('.menu-item')[5].classList.add('active');
    } else if (pageId === 'page-07' || pageId === 'page-07-item-08') {
        document.querySelectorAll('.menu-item')[6].classList.add('active');
        } else if (pageId === 'page-08') {
        // מדליק את הכפתור השמיני בתפריט (אינדקס 7)
        document.querySelectorAll('.menu-item')[7].classList.add('active');
        } else if (pageId === 'page-09') {
        // מדליק את הכפתור התשיעי בתפריט (אינדקס 8)
        document.querySelectorAll('.menu-item')[8].classList.add('active');
        } else if (pageId === 'page-10') {
        // מדליק את הכפתור העשירי בתפריט (אינדקס 9)
        document.querySelectorAll('.menu-item')[9].classList.add('active');
    }



    
}


/* --- פונקציות לחלונית הקופצת (Modal) - זה מה שהיה חסר --- */

function openModal() {
    const modal = document.getElementById('subscribe-modal');
    if (modal) {
        modal.classList.remove('hidden'); // מציג את החלונית
        
        // אופציונלי: הוספת הדגשה לכפתור ה-Subscribe בסרגל
        const subLink = document.querySelector('.subscribe-link');
        if (subLink) subLink.classList.add('active');
    }
}

function closeModal() {
    const modal = document.getElementById('subscribe-modal');
    if (modal) {
        modal.classList.add('hidden'); // מסתיר את החלונית
        
        // אופציונלי: הסרת ההדגשה מהכפתור
        const subLink = document.querySelector('.subscribe-link');
        if (subLink) subLink.classList.remove('active');
    }
}

// סגירה בלחיצה מחוץ לתוכן (על הרקע הכהה)
window.onclick = function(event) {
    const modal = document.getElementById('subscribe-modal');
    if (event.target == modal) {
        closeModal();
    }
}


/* --- אתחול האתר --- */
document.addEventListener("DOMContentLoaded", function() {
    
    // 1. הפעלת עמוד הבית כברירת מחדל
    showPage('page-home');

    // הוספנו את #page-flipbook img לרשימה
const imagesToEffect = document.querySelectorAll('.item img, .cell-image img, .cell-film-image img, #page-flipbook img');

    imagesToEffect.forEach(img => {
        if (!img.parentElement.classList.contains('halftone-wrap')) {
            const wrapper = document.createElement('div');
            wrapper.classList.add('halftone-wrap');
            img.parentNode.insertBefore(wrapper, img);
            wrapper.appendChild(img);
        }
    });
});


/* --- נגן אודיו מותאם אישית --- */

function toggleAudio(trackId) {
    const audioElement = document.getElementById('audio-' + trackId);
    const buttonElement = document.getElementById('btn-' + trackId);
    
    // בדיקה: אם האודיו כבר מנגן, נעצור אותו
    if (!audioElement.paused) {
        audioElement.pause();
        // איפוס הכפתור למצב התחלתי
        buttonElement.innerHTML = '▶ PLAY ' + trackId.replace('track-', 'TRACK ').toUpperCase();
        buttonElement.style.backgroundColor = 'transparent';
        buttonElement.style.color = '#000';
    } else {
        // צעד 1: לעצור את כל השירים האחרים לפני שמפעילים חדש
        stopAllAudio();

        // צעד 2: הפעלת השיר הנוכחי
        audioElement.play();
        
        // צעד 3: שינוי עיצוב הכפתור למצב "פעיל" (שחור)
        buttonElement.innerHTML = '■ STOP ' + trackId.replace('track-', 'TRACK ').toUpperCase();
        buttonElement.style.backgroundColor = '#000';
        buttonElement.style.color = '#fff';
    }
}

function stopAllAudio() {
    // רשימת כל האודיו והכפתורים שיש בדף הזה
    const tracks = ['track-a', 'track-b'];

    tracks.forEach(id => {
        const audio = document.getElementById('audio-' + id);
        const btn = document.getElementById('btn-' + id);
        
        if (audio) {
            audio.pause();
            audio.currentTime = 0; // מחזיר להתחלה
        }
        if (btn) {
            // החזרת הכפתור למצב רגיל
            btn.innerHTML = '▶ PLAY ' + id.replace('track-', 'TRACK ').toUpperCase();
            btn.style.backgroundColor = 'transparent';
            btn.style.color = '#000';
        }
    });
}

// תוספת קטנה לפונקציית showPage הקיימת שלך:
// כשעוברים דף, חשוב לעצור את המוזיקה כדי שלא תמשיך לנגן ברקע
// תוסיפי את השורה הזו בתחילת הפונקציה showPage ב-JS הקיים:
// stopAllAudio();