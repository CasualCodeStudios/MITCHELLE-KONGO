/* --- CURSOR --- */
const isFine = window.matchMedia('(pointer:fine)').matches;
if(isFine){
  const cur=document.getElementById('cursor'),fol=document.getElementById('cursorFollower');
  document.addEventListener('mousemove',e=>{
    cur.style.left=e.clientX+'px';cur.style.top=e.clientY+'px';
    setTimeout(()=>{fol.style.left=e.clientX+'px';fol.style.top=e.clientY+'px';},80);
  });
  document.querySelectorAll('a,button,.about-card,.life-item,.agri-gal-item').forEach(el=>{
    el.addEventListener('mouseenter',()=>{cur.style.transform='translate(-50%,-50%) scale(2.5)';cur.style.background='var(--olive)';});
    el.addEventListener('mouseleave',()=>{cur.style.transform='translate(-50%,-50%) scale(1)';cur.style.background='var(--terra)';});
  });
}

/* --- NAV SCROLL --- */
const nav=document.getElementById('mainNav');
window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',window.scrollY>80),{passive:true});

/* --- HAMBURGER --- */
const toggle=document.getElementById('navToggle'),drawer=document.getElementById('navDrawer');
toggle.addEventListener('click',()=>{
  const open=toggle.classList.toggle('open');
  drawer.classList.toggle('open',open);
  document.body.style.overflow=open?'hidden':'';
  toggle.setAttribute('aria-label',open?'Close menu':'Open menu');
});
function closeDrawer(){
  toggle.classList.remove('open');drawer.classList.remove('open');
  document.body.style.overflow='';toggle.setAttribute('aria-label','Open menu');
}

/* --- INTERSECTION OBSERVER --- */
const io=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible');});
},{threshold:0.1});
document.querySelectorAll('.reveal,.timeline-item,.edu-card,.exp-card,.trait-card').forEach((el,i)=>{
  el.style.transitionDelay=(i%5*80)+'ms';io.observe(el);
});

/* --- SKILL BARS --- */
const bIO=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.style.width=e.target.dataset.width+'%';bIO.unobserve(e.target);}});
},{threshold:0.3});
document.querySelectorAll('.skill-bar-fill').forEach(b=>bIO.observe(b));

/* --- PARALLAX HERO (desktop only) --- */
if(isFine){
  window.addEventListener('scroll',()=>{
    const w=document.querySelector('.hero-image-wrap');
    if(w)w.style.transform=`translateY(${window.scrollY*.28}px)`;
  },{passive:true});
}

/* --- MODALS --- */
const modals={
  agri:{
    title:'The Agricultural <em>Journey</em>',tag:'Agricultural Officer · AGED Graduate',
    body:`<p>Mitchelle's love for agriculture didn't start in a lecture hall — it started where she grew up, watching land transform under careful hands. That instinct evolved into purpose when she enrolled in the AGED programme at UoN Kabete.</p><p>Her programme covered everything from crop physiology and soil fertility to water management and integrated pest control. She lived it during field attachments across Kenya's diverse agro-ecological zones.</p><p>Today, as a part-time Agricultural Officer in Nairobi, her work includes:</p><ul><li>Soil testing and fertility management advisory services</li><li>Integrated pest and disease management consultations</li><li>Crop rotation planning for peri-urban farmers</li><li>Training on sustainable irrigation and water harvesting</li><li>Linkage between farmers and government input subsidy programmes</li><li>Climate-smart agriculture adaptation for urban and peri-urban smallholders</li><li>Post-harvest handling and value addition guidance</li></ul><p>Her ambition? To lead extension programmes that transform food security across Kenya — starting at community level, scaling to policy.</p>`
  },
  edu:{
    title:'The Education <em>Story</em>',tag:'Educator · Agricultural Extension Specialist',
    body:`<p>Education is not a secondary passion for Mitchelle — it's the other half of who she is. The AGED programme is built on this dual identity: you cannot be an effective agricultural officer without being a great teacher.</p><p>Her philosophy: meet the farmer where they are, speak their language, and walk with them through change. She has facilitated training sessions, school farm demonstrations, and community workshops.</p><p>Key educational milestones:</p><ul><li>Completed AGED programme at UoN Kabete — Agricultural Education &amp; Extension</li><li>Delivered extension training to smallholder farmers in 3+ counties</li><li>Facilitated secondary school agricultural career outreach programmes</li><li>Developed simple farmer handbooks on organic fertilization and IPM</li><li>Mentored junior AGED students during practical field sessions</li><li>Designed community demonstration plots for climate-smart practices</li></ul><p>Whether in a classroom or squatting in a maize field with a farmer, Mitchelle educates with her whole self — and that's what makes her genuinely remarkable.</p>`
  }
};

function openModal(key){
  const m=modals[key];
  document.getElementById('modalContent').innerHTML=`<button class="modal-close" onclick="closeModal()">✕</button><h2>${m.title}</h2><span class="modal-tag">${m.tag}</span>${m.body}`;
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow='hidden';
}
function closeModal(){
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow='';
}
document.getElementById('modalOverlay').addEventListener('click',function(e){if(e.target===this)closeModal();});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal();});

/* --- FORM --- */
function handleSubmit(e){
  e.preventDefault();const btn=e.target;
  btn.textContent='Message Sent ✓';btn.style.background='var(--olive)';
  setTimeout(()=>{btn.textContent='Send Message →';btn.style.background='var(--terra)';},3500);
}