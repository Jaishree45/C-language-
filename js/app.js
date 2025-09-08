// Simple app to load topics.json and render UI
function renderTopics(list){
const ul = document.getElementById('topicsList');
ul.innerHTML = '';
list.forEach(t => {
const li = document.createElement('li');
li.textContent = t.title;
li.dataset.id = t.id;
li.addEventListener('click', ()=> selectTopic(t.id));
ul.appendChild(li);
});
}


function selectTopic(id){
const t = topics.find(x=>x.id===id);
if(!t) return;
// highlight
document.querySelectorAll('#topicsList li').forEach(li=> li.classList.toggle('active', li.dataset.id===id));
document.getElementById('topicTitle').textContent = t.title;
// build slides (images stored at assets/previews/{id}/{n}.jpg)
const slidesContainer = document.getElementById('slidesContainer');
slidesContainer.innerHTML = '';
for(let i=1;i<=t.slides;i++){
const card = document.createElement('div'); card.className='slide-card';
const img = document.createElement('img');
img.src = `assets/previews/${t.id}/${i}.jpg`;
img.alt = `${t.title} - Slide ${i}`;
img.loading = 'lazy';
// fallback if image not found: show placeholder
img.onerror = ()=>{ img.src='https://via.placeholder.com/900x506?text=Slide+not+found'; };
card.appendChild(img);
slidesContainer.appendChild(card);
}
// download button
const dl = document.getElementById('downloadArea');
dl.innerHTML = '';
const a = document.createElement('a');
a.className='download-btn';
a.href = t.drive;
a.target = '_blank';
a.rel='noopener';
a.textContent = '⬇️ Download PPT';
dl.appendChild(a);
// update url
history.replaceState(null, '', `?topic=${id}`);
}


// Search
function setupSearch(){
const inp = document.getElementById('search');
inp.addEventListener('input', ()=>{
const q = inp.value.trim().toLowerCase();
const filtered = topics.filter(t => t.title.toLowerCase().includes(q) || t.id.includes(q));
renderTopics(filtered);
});
}


// sidebar toggle
function setupToggle(){
const btn = document.getElementById('toggleSidebar');
if(!btn) return;
btn.addEventListener('click', ()=>{
const sb = document.getElementById('sidebar');
sb.style.display = sb.style.display === 'none' ? 'block' : 'none';
});
}


window.addEventListener('DOMContentLoaded', ()=>{
loadTopics().catch(err=> console.error(err));
setupSearch();
setupToggle();
});
