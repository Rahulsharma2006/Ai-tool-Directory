// Load More + Favorite + Filter + Search + Animate + Dark Mode

// Variables 
const loadMoreBtn = document.getElementById("loadMoreBtn");
const toolsContainer = document.getElementById("tools");
const toolCards = Array.from(toolsContainer.children);
const filterBtns = document.querySelectorAll(".filter-btn");
const searchInput = document.getElementById("searchInput");
const toggleBtn = document.getElementById("theme-toggle");

let visibleCount = 10;
let currentCategory = "All"; // default

//Show Tools Based on Filter
function showTools(count) {
  let shown = 0;

  toolCards.forEach((card) => {
    const cardCategory = card.querySelector(".tool-category").textContent.trim().toLowerCase();
    const matchesCategory = currentCategory === "All" || cardCategory === currentCategory.toLowerCase();

    if (matchesCategory) {
      if (shown < count) {
        card.style.display = "block";
        shown++;
      } else {
        card.style.display = "none";
      }
    } else {
      card.style.display = "none";
    }
  });

  const matchingCards = toolCards.filter(card => {
    const cat = card.querySelector(".tool-category").textContent.trim().toLowerCase();
    return currentCategory === "All" || cat === currentCategory.toLowerCase();
  });

  loadMoreBtn.style.display = (shown >= matchingCards.length) ? "none" : "block";
}

// Load More
loadMoreBtn.addEventListener("click", () => {
  visibleCount += 10;
  showTools(visibleCount);
});

// Filter Buttons 
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    currentCategory = btn.getAttribute("data-category");
    visibleCount = 6;
    showTools(visibleCount);
  });
});

// Favorite Button
document.querySelectorAll(".fav-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.classList.toggle("favorited");
  });
});

// Search 
searchInput.addEventListener("input", () => {
  const searchText = searchInput.value.toLowerCase();

  toolCards.forEach((card) => {
    const name = card.querySelector(".tool-name").textContent.toLowerCase();
    const cardCategory = card.querySelector(".tool-category").textContent.toLowerCase();
    const matchesCategory = currentCategory === "All" || cardCategory === currentCategory.toLowerCase();
    const matchesSearch = name.includes(searchText);

    card.style.display = (matchesCategory && matchesSearch) ? "block" : "none";
  });

  // Hide Load More when searching
  loadMoreBtn.style.display = "none";
});

// Animate on Scroll 
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.1 }
);

toolCards.forEach((card) => {
  observer.observe(card);
});

// Dark Theme Toggle
if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    toggleBtn.textContent = document.body.classList.contains("dark-theme") ? "☀" : "🌙";
  });
}

// Initial Show
showTools(visibleCount);
