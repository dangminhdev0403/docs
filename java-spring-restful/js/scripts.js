// Navigation data structure
const navigation = [
  { id: "intro", title: "Về tài liệu", file: "intro.html" },
  {
    id: "chapter1",
    title: "Cài đặt dự án, Hello World với Spring ",
    file: "chapter1.html",
  },
  { id: "chapter2", title: "Các khái niệm về Spring", file: "chapter2.html" },
  { id: "chapter4", title: "Kiến trúc ứng dụng web ", file: "chapter4.html" },
  { id: "chapter3", title: "Spring Security ", file: "chapter3.html" },
  { id: "chapter5", title: "Restful API với Spring ", file: "chapter5.html" },
  {
    id: "chapter6",
    title: "Spring Data với JPA và Hibernate ",
    file: "chapter6.html",
  },
  { id: "chapter8", title: "Về phong cách code", file: "chapter8.html" },
  { id: "chapter7", title: "CRUD User ", file: "chapter7.html" },
  { id: "chapter9", title: "ResponseEntity ", file: "chapter9.html" },
  { id: "chapter10", title: "Xử lí Exception ", file: "chapter10.html" },
  { id: "chapter11", title: "Spring Security với JWT", file: "chapter11.html" },
  { id: "chapter12", title: "Login với JWT", file: "chapter12.html" },
  { id: "chapter15", title: "Xử lí resfresh ,Logout", file: "chapter15.html" },

  { id: "chapter13", title: "Swagger", file: "chapter13.html" },
  { id: "chapter14", title: "Rennder Fontend với API", file: "chapter14.html" },
  {
    id: "chapter16",
    title: "Phân trang với Pagination ",
    file: "chapter16.html",
  },
  {
    id: "chapter17",
    title: "Filter dữ liệu với Specifications",
    file: "chapter17.html",
  },
  { id: "chapter18", title: "Relationships ", file: "chapter18.html" },
  { id: "chapter19", title: "Interceptor ", file: "chapter19.html" },
  { id: "chapter20", title: "DataBaseInitializer ", file: "chapter20.html" },
];

const updatedNavigation = navigation.map((item, index) => {
  const newTitle = `${index + 1}. ${item.title}`; // Thêm số thứ tự
  return { ...item, title: newTitle }; // Trả về object mới với title cập nhật
});
// Load navigation
function loadNavigation() {
  const navContainer = document.getElementById("nav-container");
  updatedNavigation.forEach((item) => {
    const navItem = document.createElement("div");
    navItem.className = "nav-item";
    navItem.onclick = () => loadContent(item.file);
    navItem.innerHTML = `
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                    </svg>
                    ${item.title}
                `;
    navContainer.appendChild(navItem);
  });
  const navItem = document.querySelectorAll("nav div.nav-item");
  // console.log(navItem);

  navItem.forEach((nav) => {
    nav.addEventListener("click", function () {
      navItem.forEach((item) => {
        item.classList.remove("active");
      });
      nav.classList.add("active");
      document.querySelector(".sidebar").classList.add("active");
    });
  });
}

// Load content from HTML files
async function loadContent(filename) {
  const content = document.getElementById("content");

  // Animation out
  await anime({
    targets: content,
    opacity: [1, 0],
    translateY: [0, 20],
    duration: 300,
    easing: "easeInOutQuad",
  }).finished;

  try {
    const response = await fetch(`content/${filename}`);
    if (!response.ok) throw new Error("Content not found");
    const html = await response.text();
    content.innerHTML = html;
    // const imgs = document.querySelectorAll('img');
    // imgs.forEach(img => {
    //     let currentSrc = img.getAttribute('src');

    //     let newSrc = "/docs-teach-javaspring-mvc"+currentSrc;

    //     if (window.location.hostname !== 'localhost' && window.location.hostname !== "127.0.0.1" ) {
    //         img.setAttribute('src', newSrc);
    //     }
    // });
  } catch (error) {
    content.innerHTML = `
                    <h1>Error</h1>
                    <p>Could not load content. Please make sure the file exists in the content folder.</p>
                `;
  }

  // Animation in
  anime({
    targets: content,
    opacity: [0, 1],
    translateY: [20, 0],
    duration: 300,
    easing: "easeInOutQuad",
  });
}

// Theme switching
function toggleTheme() {
  document.body.dataset.theme =
    document.body.dataset.theme === "dark" ? "light" : "dark";
  localStorage.setItem("theme", document.body.dataset.theme);
}

// Mobile menu toggle
function toggleSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.classList.toggle("active");
}

// Search functionality
document.querySelector(".search-bar").addEventListener("input", function (e) {
  const searchTerm = e.target.value.toLowerCase();
  const navItems = document.querySelectorAll(".nav-item");

  navItems.forEach((item) => {
    const text = item.textContent.toLowerCase();
    item.style.display = text.includes(searchTerm) ? "flex" : "none";
  });

  // Optionally hide sidebar during search
  const sidebar = document.querySelector(".sidebar");
  if (searchTerm) {
    sidebar.classList.remove("active"); // Ẩn sidebar khi tìm kiếm
  }
});

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  loadNavigation();
  document.body.dataset.theme = localStorage.getItem("theme") || "light";
});

function copyCode(button) {
  const codeBlock = button.nextElementSibling;
  const text = codeBlock.textContent || codeBlock.innerText;

  // Create temporary textarea
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);

  // Select and copy
  textarea.select();
  try {
    // Modern way
    navigator.clipboard.writeText(text).then(() => {
      button.textContent = "Đã sao chép!";
      // Add animation using anime.js
      anime({
        targets: button,
        scale: [1, 1.2, 1],
        duration: 600,
        easing: "easeInOutQuad",
      });
    });
  } catch (err) {
    // Fallback for older browsers
    document.execCommand("copy");
    button.textContent = "Đã sao chép!";
  }

  // Cleanup
  document.body.removeChild(textarea);

  // Reset button text with animation
  setTimeout(() => {
    button.textContent = "Sao chép";
    anime({
      targets: button,
      scale: [1, 0.9, 1],
      duration: 400,
      easing: "easeInOutQuad",
    });
  }, 2000);
}

// Add click event listeners to all copy buttons
document.addEventListener("DOMContentLoaded", () => {
  const copyButtons = document.querySelectorAll(".copy-button");
  copyButtons.forEach((button) => {
    button.addEventListener("click", () => copyCode(button));
  });
});

anime({
  targets: ".welcome-text",
  opacity: [0, 1],
  translateY: [-20, 0],
  easing: "easeOutExpo",
  duration: 1000,
  delay: 300,
});

// Animation for author name
anime({
  targets: ".author",
  opacity: [0, 1],
  translateY: [-20, 0],
  easing: "easeOutExpo",
  duration: 1000,
  delay: 600,
});

// Continuous animation for instruction text

function runAnime() {
  // Animation for instruction text
  anime({
    targets: ".instruction",
    opacity: [0, 1],
    translateY: [-20, 0],
    easing: "easeOutExpo",
    duration: 100,
    delay: 90,
  });
  anime({
    targets: ".instruction",
    translateX: [-5, 5],
    direction: "alternate",
    loop: true,
    easing: "easeInOutSine",
    duration: 1500,
  });
}
