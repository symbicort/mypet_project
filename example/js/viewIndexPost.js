function getPostToIndex(){
    const request = indexedDB.open("myPetDB",1);

    request.onsuccess = function(event){
        const db = event.target.result;

        // 트랜잭션 시작 (읽기 전용)
        const transaction = db.transaction(["posts"], "readonly");

        // 객체 스토어에 접근
        const objectStore = transaction.objectStore("posts");

        // index를 이용하여 timestamp를 기준으로 내림차순으로 정렬된 cursor를 가져옴
        // autoincrement 이므로 최근 글에는 최근 키값이 들어가게 되어 최신 데이터를 가져옴
        const index = objectStore.index("timestamp");
        const request1 = index.openCursor(null, "prev"); 

        // 최근 3개의 데이터를 저장할 배열
        const recentPosts = [];

        request1.onsuccess = function(event) {
            const cursor = event.target.result;

            if (cursor && recentPosts.length < 4) {
                recentPosts.push(cursor.value);
                cursor.continue();
            } else {
                console.log(recentPosts);
                // else 절은 위에 가져온 배열 표시 하는 부분으로 지정(글이 들어가야 할 위치 보고 적용 예정)
                const container = document.querySelector('#postIncommunity');

                const htmlString = recentPosts.map(item => `
                    <div class="your-item-class" onclick="moveTocommunity()">
                    <h4>${item.title}</h4>
                    <p>${item.content}</p>
                    <div>${item.author}</div>
                    <div>${item.timestamp}</div>
                    </div>
                    `).join('');

        // HTML 문자열을 container에 할당
        container.innerHTML = htmlString;

            }


        request.onerror = function(event) {
            console.error("Error fetching recent posts:", event.target.error);
        };

    }
}
}
function moveTocommunity(){
    window.location.href = 'community.html'
}