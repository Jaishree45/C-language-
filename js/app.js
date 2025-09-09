// Hide home button on homepage
if (window.location.pathname.endsWith("index.html") || window.location.pathname === "/") {
  const homeBtn = document.getElementById("homeBtn");
  if (homeBtn) homeBtn.style.display = "none";
}

// Load topics list
fetch("topics.json")
  .then(response => response.json())
  .then(data => {
    const topicsList = document.getElementById("topicsList");
    data.topics.forEach(topic => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="c-language.html?topic=${topic.id}">${topic.name}</a>`;
      topicsList.appendChild(li);
    });

    // Load topic if query param exists
    const urlParams = new URLSearchParams(window.location.search);
    const topicId = urlParams.get("topic");
    if (topicId) {
      loadTopic(topicId, data.topics);
    } else {
      // Hide download button if no topic selected
      const dlBtn = document.getElementById("downloadLink");
      if (dlBtn) dlBtn.style.display = "none";
    }
  });

// Function to load topic previews
function loadTopic(topicId, topics) {
  const topic = topics.find(t => t.id === topicId);
  if (!topic) return;

  document.getElementById("topicTitle").textContent = topic.name;

  // ✅ Handle download button visibility
  const downloadBtn = document.getElementById("downloadLink");
  if (downloadBtn) {
    if (topic.drive && topic.drive.trim() !== "") {
      downloadBtn.href = topic.drive;
      downloadBtn.style.display = "inline-block"; // show it
    } else {
      downloadBtn.style.display = "none"; // hide if no link
    }
  }

  const previewContainer = document.getElementById("previewContainer");
  previewContainer.innerHTML = "";

  // Try to load up to 50 PNG slides
  let i = 1;
  function loadNext() {
    const img = new Image();
    img.src = `assets/previews/${topic.id}/${i}.png`;

    img.onload = () => {
      previewContainer.appendChild(img);
      i++;
      loadNext(); // keep loading until no more
    };

    img.onerror = () => {
      // stop when no more images
    };
  }
  loadNext();
}
