function loco() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
loco();


//dot moves with cursor
var cursor = document.querySelector("#cursor");
var main = document.querySelector("#main");
document.addEventListener("mousemove",function(dets){
   cursor.style.left =dets.x+ 10 + "px";
   cursor.style.top =dets.y+ 10 + "px";
})


//page 2
var clutter = "";

document
  .querySelector("#page2>h1")
  .textContent.split("")
  .forEach(function (dets) {
    clutter += `<span>${dets}</span>`;

    document.querySelector("#page2>h1").innerHTML = clutter;
  });

gsap.to("#page2>h1>span", {
  scrollTrigger: {
    trigger: `#page2>h1>span`,
    start: `top bottom`,
    end: `bottom top`,
    scroller: `#main`,
    scrub: 1,
  },
  stagger: 0.1,
  color: `#fff`,
});

// stagger animations
const observer = new IntersectionObserver((entries)=>{
  entries.forEach((entry)=>{
    console.log(entry);
    if(entry.isIntersecting){
      entry.target.classList.add('show')
    }
  });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el)=> observer.observe(el));

// link to specific websites
document.getElementById('openmart').addEventListener('click', function(){
  window.open("https://open-mart.vercel.app/", "_blank").focus();
});
document.getElementById('chathub').addEventListener('click', function(){
  window.open("https://chat-hub-uct8.onrender.com/", "_blank").focus();
});
document.getElementById('sorting').addEventListener('click', function(){
  window.open("https://sorting-visualizer-next.vercel.app/", "_blank").focus();
});
document.getElementById("cox-mason").addEventListener("click", function () {
  window
    .open(
      "https://geekypartha.github.io/cox-mason-modern-web-fronend/",
      "_blank"
    )
    .focus();
});
document.getElementById("magma").addEventListener("click", function () {
  window.open("https://geekypartha.github.io/magma-clone/", "_blank").focus();
});
document.getElementById("aerocast").addEventListener("click", function () {
  window.open("https://aero-cast.onrender.com/", "_blank").focus();
});
document.getElementById("ephemeral").addEventListener("click", function () {
  window
    .open(
      "https://geekypartha.github.io/Modern-website-landing-page/",
      "_blank"
    )
    .focus();
});
// profile link
document.getElementById("repo").addEventListener("click", function () {
  window.open("https://github.com/geekypartha", "_blank").focus();
});
document.getElementById("leetcode").addEventListener("click", function () {
  window.open("https://leetcode.com/u/geekypartha/", "_blank").focus();
});

// contact opening
var tl = gsap.timeline({
  scrollTrigger: {
    trigger: "#open",
    // markers:true,
    start: "50% 50%",
    end: "100% 50%",
    scrub: 2,
    pin: true,
    scroller: "#main"
  },
});
tl.to("#top",{
  top:"-50%"
}, 'a')
tl.to("#bottom",{
  bottom:"-50%"
}, 'a')
tl.to("#top-h",{
  bottom:"-13%"
}, 'a')
tl.to("#bottom-h",{
  bottom:"25%"
}, 'a')
tl.to(".social",{
  marginTop: "0%"
}, 'a')

//social links
document.getElementById("mail").addEventListener("click", function () {
  window.open("mailto:parthageek1@gmail.com", "_blank").focus();
});
document.getElementById("x").addEventListener("click", function () {
  window.open("https://x.com/geeky_partha", "_blank").focus();
});
document.getElementById("linkedin").addEventListener("click", function () {
  window
    .open("https://www.linkedin.com/in/partha-pratim-mazumdar", "_blank")
    .focus();
});
document.getElementById("github").addEventListener("click", function () {
  window.open("https://github.com/geekypartha", "_blank").focus();
});

// Menu
document.addEventListener("DOMContentLoaded", function(){
  let activeItemIndicator = CSSRulePlugin.getRule(".menu-item p#active::after");
  const toggleButton = document.querySelector(".burger");
  let isOpen = false;

  gsap.set(".menu-item p", { y: 225 });

  const timeline = gsap.timeline({paused: true});

  timeline.to(".overlay",{
    duration: 1.5,
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    ease: "power4.inOut"
  });

  timeline.to(".menu-item p",{
    duration: 1.5,
    y: 0,
    stagger: 0.2,
    ease: "power4.out"
  }, "-=1");
  
  timeline.to(activeItemIndicator, {
    width: "100%",
    duration: 1,
    ease: "power4.out",
    dealy: 0.5
  }, "<");

  timeline.to(".sub-nav", {
    bottom: "10%",
    opacity: 1,
    duration: 0.5,
    delay: 0.5
  }, "<");

  toggleButton.addEventListener("click", function(){
    if(isOpen){
      timeline.reverse();
    }else{
      timeline.play();
    }
    isOpen = !isOpen;
  })
})