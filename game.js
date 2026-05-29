let gold = 200, castleLevel = 1, victoryCount = 0, soldiers = 0, currentRank = "سەرباز";

function updateUI() {
    document.getElementById('gold').innerText = gold;
    document.getElementById('castle-level').innerText = castleLevel;
    document.getElementById('rank').innerText = currentRank;
    document.getElementById('soldiers').innerText = soldiers;
}

function updateRank() {
    let newRank = currentRank;
    let bonusGold = 0, newSoldiers = 0;

    if (castleLevel >= 15) { newRank = "نەقیب"; bonusGold = 500; newSoldiers = 5; }
    else if (castleLevel >= 10) { newRank = "ملازم یەکەم"; bonusGold = 300; newSoldiers = 5; }
    else if (castleLevel >= 5) { newRank = "ملازم"; bonusGold = 100; newSoldiers = 5; }

    if (newRank !== currentRank) {
        currentRank = newRank;
        gold += bonusGold;
        soldiers += newSoldiers;
        alert("پیرۆزبێت! تۆ بوویت بە " + currentRank + "\nدیاری: " + bonusGold + " زێڕ و " + newSoldiers + " سەربازی نوێ!");
    }
}

function launchAttack() {
    gold += 50;
    victoryCount++;
    updateUI();
    saveGame();
}

function startUpgrade() {
    if (gold >= 250) {
        gold -= 250;
        castleLevel++;
        updateRank();
        updateUI();
        saveGame();
        alert("قەڵاکەت گەیشتە ئاستی " + castleLevel);
    } else alert("زێڕی پێویستت نییە!");
}

function saveGame() {
    localStorage.setItem('gameData', JSON.stringify({gold, castleLevel, victoryCount, soldiers, currentRank}));
}

function loadGame() {
    let data = JSON.parse(localStorage.getItem('gameData'));
    if (data) {
        gold = data.gold; castleLevel = data.castleLevel; victoryCount = data.victoryCount;
        soldiers = data.soldiers; currentRank = data.currentRank;
        updateUI();
    }
}

function resetGame() {
    if(confirm("دڵنیاییت هەموو شتێک دەسڕیتەوە؟")) { localStorage.clear(); location.reload(); }
}

loadGame();
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let x = 50, y = 150; // شوێنی سەرەتایی قەڵاکە
const castle = new Image();
castle.src = "castle.png";

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // پاککردنەوەی شاشە
    ctx.drawImage(castle, x, y, 100, 100);
}

// جوڵاندن بە کلیک یان کیبۆرد
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") x += 10;
    if (e.key === "ArrowLeft") x -= 10;
    draw();
});

castle.onload = draw;
