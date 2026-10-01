/**
 * 북싹북싹 놀터 (Book Ssak Ssak Playground) - Interactive Application Script
 */

// Sample Data: Curated Picture Books & After-Reading Play Recipes
const BOOKS_DATA = [
  {
    id: "book-1",
    title: "구름 속 아기 고양이",
    originalTitle: "Kitten in the Clouds",
    author: "Liu Chen 글·그림 | 박미경 옮김",
    ageGroup: "3-4y",
    ageLabel: "3~4세",
    category: "sensory",
    categoryLabel: "오감/촉감",
    tags: ["#오감놀이", "#상상력", "#솜구름", "#잠자리독서"],
    coverImg: "./assets/book_cloud.jpg",
    rating: 4.9,
    reviewsCount: 128,
    readingTip: "폭신폭신한 구름 솜을 조물조물 만지는 흉내를 내며 아이 귓가에 조용조용 억양을 붙여 읽어주세요.",
    activityIdea: "진짜 구름 솜을 도안에 떼어 붙이고, 파스텔로 은은하게 하늘 색칠하기",
    summary: "하늘 위 솜사탕 같은 구름 위에서 펼쳐지는 아기 고양이의 폭신한 모험 이야기. 감성적인 스케치와 따뜻한 문체가 인상적인 그림책입니다.",
    materials: ["화장솜 또는 방울솜", "도화지 / 프린트 도안", "파스텔 또는 수채화 물감", "풀"],
    steps: [
      { num: 1, title: "하늘 배경 스케치", text: "도화지에 파스텔을 문질러 파란 하늘과 분홍빛 노을 하늘을 아이와 함께 부드럽게 배경을 표현해 봅니다." },
      { num: 2, title: "구름 솜 느끼기", text: "화장솜을 여러 겹으로 찢으며 '푹신푹신', '보들보들' 느낌을 말로 표현해보며 오감을 자극합니다." },
      { num: 3, title: "아기 고양이 보금자리 만들기", text: "책 속 아기 고양이가 누워 쉬던 푹신한 구름 모양으로 솜을 풀로 붙여 입체 구름을 완성합니다." }
    ]
  },
  {
    id: "book-2",
    title: "아기 곰의 숲속 밤 산책",
    originalTitle: "The Little Bear's Bright Night",
    author: "Eliza Reed 글·그림",
    ageGroup: "3-4y",
    ageLabel: "3~4세",
    category: "art",
    categoryLabel: "미술/만들기",
    tags: ["#미술놀이", "#낙엽체험", "#자연탐구", "#숲속이야기"],
    coverImg: "./assets/book_bear.jpg",
    rating: 4.8,
    reviewsCount: 95,
    readingTip: "밤 숲속의 풀벌레 소리와 바람 소리를 입으로 소리 내어 보며, 아기 곰의 등불 조명을 향해 손가락을 짚어보게 해주세요.",
    activityIdea: "가을 산책길에서 주운 알록달록 낙엽과 클레이로 숲속 왕관 & 무드등 만들기",
    summary: "깜깜한 밤 숲속이 무섭지 않도록 작은 랜턴을 들고 길을 나선 용감하고 따뜻한 아기 곰의 산책 일기.",
    materials: ["알록달록 산책길 낙엽", "자연색 클레이", "아이스크림 나무막대", "종이컵"],
    steps: [
      { num: 1, title: "숲속 수집가 놀이", text: "아이와 집 앞 공원에서 여러 모양과 색깔의 낙엽을 직접 주워 모아봅니다." },
      { num: 2, title: "클레이 베이스 만들기", text: "클레이를 동글동글 둥글려 바닥에 납작하게 누르고 나무 막대를 고정시킵니다." },
      { num: 3, title: "낙엽 왕관 숲 완성", text: "주운 낙엽을 막대와 클레이 사이에 꽂아 아기 곰이 걸어간 가을 숲 산책길을 입체로 꾸밉니다." }
    ]
  },
  {
    id: "book-3",
    title: "알록달록 색깔 친구들",
    originalTitle: "Monster Paint Party!",
    author: "Anya Sharma 글·그림",
    ageGroup: "5-7y",
    ageLabel: "5~7세",
    category: "emotion",
    categoryLabel: "감정/사회성",
    tags: ["#감정표현", "#색깔놀이", "#수채화", "#친구관계"],
    coverImg: "./assets/book_monster.jpg",
    rating: 5.0,
    reviewsCount: 210,
    readingTip: "기쁨은 노랑, 화는 빨강, 슬픔은 파랑! 각 색깔별 몬스터들의 기분을 아이 자신의 오늘 기분과 연결하여 대화해 보세요.",
    activityIdea: "물감 나뭇잎 스탬프 찍기 & 나의 기분 색깔 카드 그리기",
    summary: "다양한 감정을 귀여운 색깔 몬스터에 비유하여 아이 스스로 자신의 기분을 인지하고 표현할 수 있게 도와주는 감정 가이드 그림책.",
    materials: ["핑거페인트 또는 수채화 물감", "스펀지 / 진짜 나뭇잎", "도화지", "팔레트"],
    steps: [
      { num: 1, title: "오늘의 감정 색깔 고르기", text: "'오늘 우리 아이 마음은 무슨 색일까?' 물어보며 마음에 드는 물감을 팔레트에 짭니다." },
      { num: 2, title: "나뭇잎 스탬프 찍기", text: "나뭇잎 뒷면에 물감을 바르고 도화지에 꾹 찍어 번지는 예쁜 물감 질감을 관찰합니다." },
      { num: 3, title: "몬스터 표정 그리기", text: "찍힌 나뭇잎 자국 위에 눈동자와 웃는 입 모양을 그려 나만의 감정 몬스터를 완성합니다." }
    ]
  },
  {
    id: "book-4",
    title: "통통! 아기 돼지의 소리 여행",
    originalTitle: "Piggy's Sound Adventure",
    author: "김소연 글 | 이진우 그림",
    ageGroup: "0-12m",
    ageLabel: "0~12개월",
    category: "sensory",
    categoryLabel: "오감/촉감",
    tags: ["#0~12개월", "#의성어", "#청각자극", "#헝겊책"],
    coverImg: "./assets/book_cloud.jpg",
    rating: 4.7,
    reviewsCount: 64,
    readingTip: "'통통', '쌕쌕', '토닥토닥' 리듬감 있는 의성어를 엄마의 목소리 톤을 변주해가며 아기 귓가에 들려주세요.",
    activityIdea: "곡물 마라카스 소리 흔들기 & 아기 배 마사지 스킨십 놀이",
    summary: "아기가 가장 좋아하는 리드미컬한 소리 언어와 선명한 원색 그림이 담긴 0~1세 영유아 첫 감각 그림책.",
    materials: ["투명 페트병 또는 마라카스", "쌀, 콩, 팥 등 곡물", "리본 끈"],
    steps: [
      { num: 1, title: "곡물 소리 탐색", text: "투명 용기에 쌀과 콩을 넣고 흔들며 찰랑찰랑 소리의 차이를 들려줍니다." },
      { num: 2, title: "리듬에 맞춰 꿀꿀", text: "그림책을 읽어주며 의성어가 나오는 대목마다 마라카스를 짝짝 흔들어 줍니다." }
    ]
  },
  {
    id: "book-5",
    title: "너도나도 쿵쿵! 말놀이 파티",
    originalTitle: "Word Rhyme Party",
    author: "정다은 글·그림",
    ageGroup: "12-24m",
    ageLabel: "12~24개월",
    category: "language",
    categoryLabel: "언어/말놀이",
    tags: ["#12~24개월", "#단어확장", "#신체놀이", "#의태어"],
    coverImg: "./assets/book_bear.jpg",
    rating: 4.9,
    reviewsCount: 142,
    readingTip: "동물들의 따라 하기 동작을 엄마가 직접 온몸으로 정열적으로 표현해 주면 아이가 폭소를 터뜨립니다!",
    activityIdea: "동물 발자국 도장 찍기 & 동물 몸짓 따라 하기 체육 놀이",
    summary: "동물 친구들이 모여 신나게 발을 굴리고 춤추며 언어발달 시기 아기들의 낱말 인지를 돕는 신나는 놀이책.",
    materials: ["스펀지 도장", "물감", "전지 종이"],
    steps: [
      { num: 1, title: "바닥 거대 캔버스 펴기", text: "거실 바닥에 전지를 펴고 동물 발자국 모양 스펀지에 물감을 묻힙니다." },
      { num: 2, title: "쿵쿵 발도장 찍기", text: "'코끼리는 쿵쿵!', '토끼는 깡총!' 외치며 전지 위를 거닐어 봅니다." }
    ]
  },
  {
    id: "book-6",
    title: "내가 만드는 비밀 숲속 집",
    originalTitle: "My Little Treehouse",
    author: "박서준 글·그림",
    ageGroup: "5-7y",
    ageLabel: "5~7세",
    category: "art",
    categoryLabel: "미술/만들기",
    tags: ["#5~7세", "#공간감각", "#박스재활용", "#창의건축"],
    coverImg: "./assets/book_monster.jpg",
    rating: 4.8,
    reviewsCount: 88,
    readingTip: "'네가 만약 나만의 비밀 공간을 만든다면 무엇을 두고 싶니?' 하며 아이의 욕구와 상상력을 이끌어내 주세요.",
    activityIdea: "택배 상자와 종이컵을 활용한 내 마음대로 미니 숲속 아지트 만들기",
    summary: "숲속 동물들이 힘을 합쳐 모두가 함께 쉬어갈 수 있는 3층 나무집을 완성해가는 협동과 공간 창의력 그림책.",
    materials: ["재활용 택배 상자", "종이컵", "색종이", "가위 및 풀"],
    steps: [
      { num: 1, title: "상자 기둥 서기", text: "상자 날개를 펼쳐 집의 외벽 구조를 세우고 창문 구멍을 뚫어줍니다." },
      { num: 2, title: "가구 만들기", text: "종이컵을 뒤집어 식탁과 의자를 만들고 알록달록 색종이 깃발을 답니다." }
    ]
  }
];

// Sample Data: Community Posts
let COMMUNITY_POSTS = [
  {
    id: "post-1",
    author: "지한이네 (3세)",
    avatarBg: "#E9C9A3",
    avatarColor: "#603C2B",
    timeAgo: "방금 전",
    bookTitle: "구름 속 아기 고양이",
    title: "구름 솜 떼어붙이기 해봤어요! 진짜 20분 순삭이네요 ㅎㅎ",
    content: "책 읽어주고 바로 화장솜 가져와서 붙이기 놀이 했는데 아이가 손끝 느낌이 신기한지 꺄르르 웃네요. 솜 찢을 때 보들보들 소리 내주니 더 좋아해요!",
    photo: "./assets/activity1.jpg",
    likes: 24,
    isLiked: false,
    comments: 5
  },
  {
    id: "post-2",
    author: "서아맘_90 (4세)",
    avatarBg: "#FFF0EC",
    avatarColor: "#FF774C",
    timeAgo: "2시간 전",
    bookTitle: "알록달록 색깔 친구들",
    title: "비 오는 날 집에서 수채화 나뭇잎 찍기 물감 놀이 🎨",
    content: "아이 기분 색깔 고르기 해봤는데 오늘은 노랑이랑 주황이래요! 물감으로 찍어낸 나뭇잎에 표정 그려주는 데 집중력이 엄청났어요.",
    photo: "./assets/activity2.jpg",
    likes: 42,
    isLiked: true,
    comments: 8
  },
  {
    id: "post-3",
    author: "도윤이네 (2세)",
    avatarBg: "#F7EDE1",
    avatarColor: "#603C2B",
    timeAgo: "5시간 전",
    bookTitle: "아기 곰의 숲속 밤 산책",
    title: "잠자리 독서로 완전 강추합니다 🌙",
    content: "밤 산책 이야기 읽어주고 불 끄고 작은 미니 조명 켜주니 아기 곰처럼 랜턴 들었다면서 방 안을 쿵쿵 거니네요. 스킨십하며 잠들기 딱 좋아요.",
    photo: "./assets/hero.jpg",
    likes: 19,
    isLiked: false,
    comments: 3
  }
];

// User Bookmarks Tracker
const bookmarkedIds = new Set();

// DOM Elements Initialization
document.addEventListener("DOMContentLoaded", () => {
  renderBooks(BOOKS_DATA);
  renderCommunityPosts(COMMUNITY_POSTS);
  initEventListeners();
});

// Render Book Cards
function renderBooks(booksList) {
  const container = document.getElementById("booksGrid");
  if (!container) return;

  if (booksList.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
        <i class="fa-solid fa-book-open" style="font-size: 3rem; margin-bottom: 1rem; color: var(--sage-main);"></i>
        <h3>검색 조건에 맞는 그림책이 없습니다</h3>
        <p>다른 키워드나 연령 카테고리를 선택해 보세요.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = booksList.map(book => {
    const isBookmarked = bookmarkedIds.has(book.id);
    return `
      <div class="book-card" data-id="${book.id}">
        <div class="book-cover-wrap">
          <span class="book-age-badge"><i class="fa-solid fa-child"></i> ${book.ageLabel}</span>
          <button class="book-bookmark-btn ${isBookmarked ? 'active' : ''}" onclick="toggleBookmark(event, '${book.id}')" aria-label="북마크 저장">
            <i class="${isBookmarked ? 'fa-solid fa-bookmark' : 'fa-regular fa-bookmark'}"></i>
          </button>
          <img src="${book.coverImg}" alt="${book.title} 표지" class="book-cover-img" loading="lazy">
        </div>
        <div class="book-card-body">
          <div class="book-tags">
            ${book.tags.map(tag => `<span class="book-tag">${tag}</span>`).join('')}
          </div>
          <h3 class="book-title">${book.title}</h3>
          <p class="book-author">${book.author}</p>
          
          <div class="reading-tip-box">
            <strong><i class="fa-solid fa-lightbulb"></i> 엄마의 읽어주기 팁</strong>
            ${book.readingTip}
          </div>

          <div class="activity-idea-box">
            <strong><i class="fa-solid fa-palette"></i> 연계 독후 활동 아이디어</strong>
            ${book.activityIdea}
          </div>

          <div class="book-card-footer">
            <span class="book-rating"><i class="fa-solid fa-star"></i> ${book.rating} (${book.reviewsCount})</span>
            <button class="detail-btn" onclick="openBookDetail('${book.id}')">
              자세히 보기 & 놀이 도안 <i class="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Render Community Posts
function renderCommunityPosts(postsList) {
  const container = document.getElementById("communityGrid");
  if (!container) return;

  container.innerHTML = postsList.map(post => `
    <div class="community-card" data-id="${post.id}">
      <div class="comm-header">
        <div class="comm-avatar" style="background-color: ${post.avatarBg}; color: ${post.avatarColor};">
          ${post.author.charAt(0)}
        </div>
        <div class="comm-user-info">
          <span class="comm-username">${post.author}</span>
          <span class="comm-time">${post.timeAgo}</span>
        </div>
      </div>
      <div class="comm-img-wrap">
        <img src="${post.photo}" alt="${post.title}" class="comm-img">
        <span class="comm-book-tag"><i class="fa-solid fa-book"></i> ${post.bookTitle}</span>
      </div>
      <div class="comm-body">
        <h4 class="comm-title">${post.title}</h4>
        <p class="comm-text">${post.content}</p>
      </div>
      <div class="comm-footer">
        <button class="comm-action-btn ${post.isLiked ? 'liked' : ''}" onclick="toggleLikePost('${post.id}')">
          <i class="${post.isLiked ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}"></i>
          <span>따라해봤어요 (${post.likes})</span>
        </button>
        <span class="comm-action-btn">
          <i class="fa-regular fa-comment"></i> 댓글 (${post.comments})
        </span>
      </div>
    </div>
  `).join('');
}

// Event Listeners Initialization
function initEventListeners() {
  // 1. Search Input Filter
  const searchInput = document.getElementById("searchInput");
  const searchClearBtn = document.getElementById("searchClearBtn");

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const query = e.target.value.trim().toLowerCase();
      if (query.length > 0) {
        searchClearBtn.style.display = "block";
      } else {
        searchClearBtn.style.display = "none";
      }
      filterBooks();
    });

    searchClearBtn.addEventListener("click", () => {
      searchInput.value = "";
      searchClearBtn.style.display = "none";
      filterBooks();
    });
  }

  // 2. Quick Keyword Tag Buttons
  const tagBtns = document.querySelectorAll(".tag-btn");
  tagBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      tagBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const tagVal = btn.dataset.tag;
      if (tagVal === "all") {
        renderBooks(BOOKS_DATA);
      } else if (tagVal.includes("m") || tagVal.includes("y")) {
        const filtered = BOOKS_DATA.filter(b => b.ageGroup === tagVal);
        renderBooks(filtered);
      } else if (tagVal === "sensory" || tagVal === "art" || tagVal === "emotion") {
        const filtered = BOOKS_DATA.filter(b => b.category === tagVal);
        renderBooks(filtered);
      } else {
        const filtered = BOOKS_DATA.filter(b => b.tags.some(t => t.toLowerCase().includes(tagVal)));
        renderBooks(filtered);
      }

      // Smooth scroll to books grid
      document.getElementById("books").scrollIntoView({ behavior: "smooth" });
    });
  });

  // 3. Age Cards Filtering
  const ageCards = document.querySelectorAll(".age-card");
  ageCards.forEach(card => {
    card.addEventListener("click", () => {
      ageCards.forEach(c => c.classList.remove("active"));
      card.classList.add("active");

      const selectedAge = card.dataset.age;
      const filtered = BOOKS_DATA.filter(b => b.ageGroup === selectedAge);
      renderBooks(filtered);

      showToast(`'${card.querySelector(".age-range").textContent}' 추천 그림책이 필터링되었습니다.`);
      document.getElementById("books").scrollIntoView({ behavior: "smooth" });
    });
  });

  // 4. Category Pills Filter
  const filterPills = document.querySelectorAll(".filter-pill");
  filterPills.forEach(pill => {
    pill.addEventListener("click", () => {
      filterPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");

      const category = pill.dataset.cat;
      if (category === "all") {
        renderBooks(BOOKS_DATA);
      } else {
        const filtered = BOOKS_DATA.filter(b => b.category === category);
        renderBooks(filtered);
      }
    });
  });

  // 5. Spotlight Banner Detail Trigger
  const spotlightDetailBtn = document.getElementById("spotlightDetailBtn");
  if (spotlightDetailBtn) {
    spotlightDetailBtn.addEventListener("click", () => {
      openBookDetail("book-2");
    });
  }

  // 6. Community Post Modal Handling
  const postModal = document.getElementById("postModal");
  const openPostModalBtn = document.getElementById("openPostModalBtn");
  const writePostBtn = document.getElementById("writePostBtn");
  const closePostModalBtn = document.getElementById("closePostModalBtn");
  const cancelPostBtn = document.getElementById("cancelPostBtn");
  const communityForm = document.getElementById("communityForm");

  const openPostModal = () => postModal.classList.add("active");
  const closePostModal = () => postModal.classList.remove("active");

  if (openPostModalBtn) openPostModalBtn.addEventListener("click", openPostModal);
  if (writePostBtn) writePostBtn.addEventListener("click", openPostModal);
  if (closePostModalBtn) closePostModalBtn.addEventListener("click", closePostModal);
  if (cancelPostBtn) cancelPostBtn.addEventListener("click", closePostModal);

  // Photo Selector radio buttons visual update
  const photoOptions = document.querySelectorAll(".photo-opt");
  photoOptions.forEach(opt => {
    opt.addEventListener("click", () => {
      photoOptions.forEach(o => o.classList.remove("selected"));
      opt.classList.add("selected");
    });
  });

  if (communityForm) {
    communityForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const author = document.getElementById("postAuthor").value.trim();
      const age = document.getElementById("postAge").value;
      const bookTitle = document.getElementById("postBookTitle").value.trim();
      const title = document.getElementById("postTitle").value.trim();
      const content = document.getElementById("postContent").value.trim();
      const selectedPhoto = document.querySelector('input[name="postPhoto"]:checked').value;

      const newPost = {
        id: "post-" + Date.now(),
        author: `${author} (${age})`,
        avatarBg: "#EBF2EE",
        avatarColor: "#517262",
        timeAgo: "방금 전",
        bookTitle: bookTitle,
        title: title,
        content: content,
        photo: selectedPhoto,
        likes: 1,
        isLiked: true,
        comments: 0
      };

      COMMUNITY_POSTS.unshift(newPost);
      renderCommunityPosts(COMMUNITY_POSTS);

      closePostModal();
      communityForm.reset();
      showToast("놀이 후기가 성공적으로 공유되었습니다! 🎉");

      document.getElementById("community").scrollIntoView({ behavior: "smooth" });
    });
  }

  // 7. Detail Modal Close
  const detailModal = document.getElementById("detailModal");
  const closeDetailModalBtn = document.getElementById("closeDetailModalBtn");
  if (closeDetailModalBtn) {
    closeDetailModalBtn.addEventListener("click", () => {
      detailModal.classList.remove("active");
    });
  }
  if (detailModal) {
    detailModal.addEventListener("click", (e) => {
      if (e.target === detailModal) detailModal.classList.remove("active");
    });
  }

  // 8. Newsletter Form
  const newsletterForm = document.getElementById("newsletterForm");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailInput = document.getElementById("newsletterEmail");
      if (emailInput.value) {
        showToast("구독해 주셔서 감사합니다! 이번 주 목요일에 첫 놀이 레시피가 도착합니다 💌");
        emailInput.value = "";
      }
    });
  }

  // 9. Mobile Menu Toggle
  const mobileToggleBtn = document.getElementById("mobileToggleBtn");
  const mainNav = document.getElementById("mainNav");
  if (mobileToggleBtn && mainNav) {
    mobileToggleBtn.addEventListener("click", () => {
      mainNav.classList.toggle("active");
    });
  }
}

// Search Filter Logic
function filterBooks() {
  const query = document.getElementById("searchInput").value.trim().toLowerCase();
  if (!query) {
    renderBooks(BOOKS_DATA);
    return;
  }

  const filtered = BOOKS_DATA.filter(b => 
    b.title.toLowerCase().includes(query) ||
    b.author.toLowerCase().includes(query) ||
    b.ageLabel.toLowerCase().includes(query) ||
    b.activityIdea.toLowerCase().includes(query) ||
    b.tags.some(t => t.toLowerCase().includes(query))
  );

  renderBooks(filtered);
}

// Toggle Bookmark
function toggleBookmark(event, bookId) {
  event.stopPropagation();
  if (bookmarkedIds.has(bookId)) {
    bookmarkedIds.delete(bookId);
    showToast("북마크에서 삭제되었습니다.");
  } else {
    bookmarkedIds.add(bookId);
    showToast("나의 그림책 보관함에 저장되었습니다! 📚");
  }

  const targetBtn = event.currentTarget;
  targetBtn.classList.toggle("active");
  const icon = targetBtn.querySelector("i");
  if (icon) {
    icon.className = bookmarkedIds.has(bookId) ? 'fa-solid fa-bookmark' : 'fa-regular fa-bookmark';
  }
}

// Toggle Like in Community
function toggleLikePost(postId) {
  const post = COMMUNITY_POSTS.find(p => p.id === postId);
  if (!post) return;

  if (post.isLiked) {
    post.isLiked = false;
    post.likes -= 1;
  } else {
    post.isLiked = true;
    post.likes += 1;
    showToast("‘따라해봤어요!’ 응원을 보냈습니다 ❤️");
  }

  renderCommunityPosts(COMMUNITY_POSTS);
}

// Open Detailed Modal with Recipe
function openBookDetail(bookId) {
  const book = BOOKS_DATA.find(b => b.id === bookId);
  if (!book) return;

  const modalBody = document.getElementById("modalBodyContent");
  const detailModal = document.getElementById("detailModal");

  modalBody.innerHTML = `
    <div class="modal-detail-header">
      <img src="${book.coverImg}" alt="${book.title}" class="modal-cover-img">
      <div class="modal-detail-info">
        <div class="modal-badge-row">
          <span class="sub-heading"><i class="fa-solid fa-child"></i> ${book.ageLabel}</span>
          <span class="sub-heading" style="background-color: var(--terracotta-light); color: var(--terracotta-dark);">
            <i class="fa-solid fa-tag"></i> ${book.categoryLabel}
          </span>
        </div>
        <h2>${book.title}</h2>
        <p class="modal-author">${book.author}</p>
        <p class="modal-description">${book.summary}</p>
      </div>
    </div>

    <div class="reading-tip-box" style="padding: 1.25rem; font-size: 0.95rem; margin-bottom: 2rem;">
      <strong style="font-size: 1rem; color: var(--sage-dark); margin-bottom: 0.4rem;">
        <i class="fa-solid fa-heart"></i> 엄마표 그림책 읽어주기 꿀팁
      </strong>
      ${book.readingTip}
    </div>

    <h3 class="modal-section-title"><i class="fa-solid fa-cubes"></i> 이번 놀이 준비물</h3>
    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 2rem;">
      ${book.materials.map(m => `
        <span style="background: var(--bg-cream-alt); padding: 0.5rem 1rem; border-radius: 999px; font-size: 0.875rem; font-weight: 500; border: 1px solid var(--border-light);">
          ✓ ${m}
        </span>
      `).join('')}
    </div>

    <h3 class="modal-section-title"><i class="fa-solid fa-list-check"></i> 15분 독후활동 순서</h3>
    <div class="step-list" style="margin-bottom: 2rem;">
      ${book.steps.map(step => `
        <div class="step-item">
          <div class="step-num">${step.num}</div>
          <div class="step-text">
            <h5>${step.title}</h5>
            <p>${step.text}</p>
          </div>
        </div>
      `).join('')}
    </div>

    <div style="display: flex; justify-content: space-between; align-items: center; background: var(--sage-light); padding: 1.25rem; border-radius: var(--radius-md);">
      <div>
        <strong style="color: var(--sage-dark); font-size: 0.95rem;">이 놀이를 집에서 아이와 따라해보셨나요?</strong>
        <p style="font-size: 0.85rem; color: var(--text-secondary); margin: 0;">사진과 함께 엄마들과 후기를 나눠보세요!</p>
      </div>
      <button class="btn btn-primary" onclick="closeModalAndOpenPost('${book.title}')">
        <i class="fa-solid fa-camera"></i> 인증샷 남기기
      </button>
    </div>
  `;

  detailModal.classList.add("active");
}

function closeModalAndOpenPost(bookTitle) {
  document.getElementById("detailModal").classList.remove("active");
  const postBookInput = document.getElementById("postBookTitle");
  if (postBookInput) postBookInput.value = bookTitle;
  document.getElementById("postModal").classList.add("active");
}

// Toast Notification System
function showToast(message) {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast success";
  toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${message}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
