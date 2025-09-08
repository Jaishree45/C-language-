// Load topics dynamically from topics.json
fetch("topics.json")
  .then(response => response.json())
  .then(data => {
    const topicList = document.getElementById("topicList");
    const urlParams = new URLSearchParams(window.location.search);
    const currentTopic = urlParams.get("topic");

    data.topics.forEach(topic => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.textContent = topic.name;
      a.href = `c-language.html?topic=${topic.id}`;
      li.appendChild(a);
      topicList.appendChild(li);

      // Load topic if matches
      if (currentTopic === topic.id) {
        loadTopic(topic);
      }
    });
  });

function loadTopic(topic) {
  document.getElementById("topicTitle").textContent = topic.name;
  const slidesDiv = document.getElementById("slides");
  slidesDiv.innerHTML = "";

  // Assume images named 1.png, 2.png, ...
  for (let i = 1; i <= 10; i++) {
    const img = document.createElement("img");
    img.src = `assets/previews/${topic.id}/${i}.png`;
    img.alt = `Slide ${i}`;
    img.onerror = () => img.remove(); // remove if image not found
    slidesDiv.appendChild(img);
  }

  document.getElementById("downloadBtn").href = topic.drive;
}
