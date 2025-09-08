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
    }
  });

// Function to load topic previews
function loadTopic(topicId, topics) {
  const topic = topics.find(t => t.id === topicId);
  if (!topic) return;

  document.getElementById("topicTitle").textContent = topic.name;
  document.getElementById("downloadLink").href = topic.drive;

  const previewContainer = document.getElementById("previewContainer");
  previewContainer.innerHTML = "";

  // Try to load up to 20 PNG slides
  let i = 1;
  function loadNext() {
    const img = new Image();
    img.src = `assets/previews/${topic.id}/${i}.png`;

    img.onload = () => {
      previewContainer.appendChild(img);
      i++;
      loadNext(); // load next image
    };

    img.onerror = () => {
      // stop when no more images
    };
  }
  loadNext();
}
