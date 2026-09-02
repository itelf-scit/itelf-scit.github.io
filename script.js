(function(){
  'use strict';
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const header = document.querySelector('.site-header');
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');

  // Hanging navigation: visible near the top, hides on downward scroll,
  // and returns when the user scrolls upward.
  if (header) {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateNav = function(){
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY;

      if (currentY <= 24) {
        header.classList.remove('nav-hidden');
      } else if (delta > 8) {
        header.classList.add('nav-hidden');
        if (menu) menu.classList.remove('open');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
      } else if (delta < -8) {
        header.classList.remove('nav-hidden');
      }

      lastScrollY = currentY;
      ticking = false;
    };

    window.addEventListener('scroll', function(){
      if (!ticking) {
        window.requestAnimationFrame(updateNav);
        ticking = true;
      }
    }, { passive:true });
  }

  if(toggle && menu){
    toggle.addEventListener('click', function(){
      const open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    menu.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const board = document.getElementById('board');
  if(board){
    const threads = Array.from(board.querySelectorAll('.thread'));
    const cards = Array.from(board.querySelectorAll('.board-card'));
    function reveal(){
      threads.forEach(function(thread){
        thread.style.transition = 'stroke-dashoffset 1.15s cubic-bezier(.22,1,.36,1)';
        thread.style.strokeDashoffset = '0';
      });
      cards.forEach(function(card,index){
        window.setTimeout(function(){ card.classList.add('settled'); }, reduced ? 0 : 220 + index * 90);
      });
    }
    requestAnimationFrame(reveal);
    function active(index){
      board.classList.add('dimming');
      cards.forEach(function(card){card.classList.toggle('card-active', card.dataset.card === index);});
      threads.forEach(function(thread){thread.classList.toggle('active', (thread.dataset.pair || '').split('-').includes(index));});
    }
    function clear(){
      board.classList.remove('dimming');
      cards.forEach(function(card){card.classList.remove('card-active');});
      threads.forEach(function(thread){thread.classList.remove('active');});
    }
    cards.forEach(function(card){
      card.tabIndex = 0;
      card.addEventListener('mouseenter', function(){active(card.dataset.card);});
      card.addEventListener('mouseleave', clear);
      card.addEventListener('focus', function(){active(card.dataset.card);});
      card.addEventListener('blur', clear);
    });
  }

  if(reduced || !window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray('.sprout-step').forEach(function(step,index){
    gsap.fromTo(step,{x:70,opacity:.15},{x:0,opacity:1,ease:'none',scrollTrigger:{trigger:step,start:'top 88%',end:'top 55%',scrub:true}});
  });

  gsap.utils.toArray('.stream-line').forEach(function(line){
    gsap.fromTo(line,{x:50,opacity:.2},{x:0,opacity:1,ease:'none',scrollTrigger:{trigger:line,start:'top 88%',end:'top 55%',scrub:true}});
  });

  gsap.from('.tedx-word',{x:-120,opacity:.1,duration:1.1,ease:'power3.out',scrollTrigger:{trigger:'.tedx',start:'top 75%',toggleActions:'play none none reverse'}});
  gsap.utils.toArray('.gallery-tile').forEach(function(tile){
    gsap.fromTo(tile,{scale:.88,opacity:.25},{scale:1,opacity:1,ease:'none',scrollTrigger:{trigger:tile,start:'top 95%',end:'bottom 30%',scrub:true}});
  });

  gsap.from('.about-manifesto',{opacity:.1,y:35,duration:1.1,ease:'power3.out',scrollTrigger:{trigger:'.about',start:'top 75%',toggleActions:'play none none reverse'}});
})();
