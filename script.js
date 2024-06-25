window.addEventListener("DOMContentLoaded", (e) => {
  const loaderCircle = document.getElementById("loader");
  const introLogo = document.getElementById("introLogo");
  const percentageText = document.getElementById("timer");
  const startBtn = document.getElementById("startBtn");
  const radius = loaderCircle.r.baseVal.value;
  const circumference = 2 * Math.PI * radius;

  function loader() {
    loaderCircle.style.strokeDasharray = circumference;
    loaderCircle.style.strokeDashoffset = circumference;

    let i = 0;
    const interval = setInterval(() => {
      i++;
      const offset = circumference - (i / 100) * circumference;
      loaderCircle.style.strokeDashoffset = offset;
      loaderCircle.style.stroke = "#b7ab98";
      percentageText.textContent = `${i}%`;

      if (i >= 100) {
        clearInterval(interval);
        gsap.to(loaderCircle, {
          opacity: 0,
          duration: 0.3,
        });
        gsap.to(percentageText, {
          opacity: 0,
          duration: 0.3,
        });

        gsap.to(introLogo, {
          y: -50,
          scale: 1,
          duration: 1,
          delay: 1,
          ease: "power.out",
        });
        gsap.to(startBtn, {
          visibility: "visible",
          y: -120,
          scale: 1,
          duration: 1,
          delay: 1,
          ease: "power.out",
        });
      }
    }, 10);
  }

  setTimeout(() => {
    loader();
  }, 1000);
});

function opening() {
  let startBtn = document.getElementById("startBtn");
  let welcomeScreen = document.getElementById("welcome");

  startBtn.addEventListener("click", (e) => {
    gsap.to(welcomeScreen, {
      display: "none",
      opacity: 0,
      duration: 1,
      delay: 1,
    });

    setTimeout(() => {
      main();
    }, 1000);
  });
}

opening();

function main() {
  let mainScreen = document.getElementById("main");
  let header = document.querySelector("header");
  let footer = document.querySelector("footer");
  let mouse = document.getElementById("mouse_follwer");

  gsap.to(mainScreen, {
    visibility: "visible",
  });
  gsap.to(header, {
    display: "flex",
    duration: 1,
  });
  gsap.to(footer, {
    display: "flex",
    duration: 1,
  });
  gsap.to(mouse, {
    display: "flex",
    duration: 1,
  });

  function locoScroll() {
    gsap.registerPlugin(ScrollTrigger);

    // --- SETUP START ---
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
          ? locoScroll.scrollTo(value, { duration: 0, disableLerp: true })
          : locoScroll.scroll.instance.scroll.y;
      },

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
    ScrollTrigger.defaults({ scroller: "#main" });
    // --- SETUP END ---

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
  }

  locoScroll();

  function mouseFollower() {
    let body = document.querySelector("body");
    let mouse = document.querySelector("#mouse_follower");

    body.addEventListener("mousemove", (e) => {
      gsap.to(mouse, {
        x: e.x - 17,
        y: e.y - 17,
        duration: 0.3,
      });
    });
  }

  mouseFollower();

  function videoPlayer() {
    let videoBox = document.querySelector("#page1_bg video");
    setTimeout(() => {
      videoBox.play();
      videoBox.style.visibility = "visible";
    }, 2000);
  }

  videoPlayer();

  function navBarAnimation() {
    let navigator = document.querySelector("#navigators ul");
    let socials = document.getElementById("socials");
    let mouse = document.querySelector("#mouse_follower");
    let soundBox = document.querySelector("#sound_div");
    let logo = document.getElementById("logo");
    let logoOverlay = document.getElementById("logo_overlay");
    let logoSvg = document.querySelector("#logo svg");
    let logoSvgPath = document.querySelector("#logo svg path");
    let workNav = document.getElementById("work");
    let aboutNav = document.getElementById("about");
    let page3 = document.getElementById("page3");
    let logoX = logo.clientLeft;
    let logoY = logo.clientTop;

    let navigators = Array.from(navigator.children);

    gsap.from(logo, {
      x: -120,
      duration: 0.8,
    });
    gsap.from(socials, {
      x: -120,
      duration: 0.8,
    });

    gsap.from("#navigators", {
      x: 200,
      duration: 0.8,
    });

    gsap.from(soundBox, {
      x: 200,
      duration: 0.8,
    });

    logo.addEventListener("click", (e) => {
      window.location.reload();
    });

    navigator.addEventListener("mouseenter", (e) => {
      gsap.to(mouse, {
        scale: 0,
        duration: 0.3,
      });
    });
    navigator.addEventListener("mouseleave", (e) => {
      gsap.to(mouse, {
        scale: 1,
        duration: 0.8,
      });
    });

    soundBox.addEventListener("mouseenter", (e) => {
      gsap.to(mouse, {
        scale: 0,
        duration: 0.3,
      });
    });
    soundBox.addEventListener("mouseleave", (e) => {
      gsap.to(mouse, {
        scale: 1,
        duration: 0.7,
      });
    });

    logoOverlay.addEventListener("mouseenter", (e) => {
      gsap.to(logoSvg, {
        height: 45,
        width: 45,
        fill: "#eb5939",
        mixBlendMode: "multiply",
      });
      gsap.to(mouse, {
        background: "black",
      });
      logoOverlay.addEventListener("mousemove", (e) => {
        gsap.to(logoSvg, {
          x: e.x - 75,
          y: e.y - 75,
          duration: 0.3,
        });
      });
    });
    logoOverlay.addEventListener("mouseleave", (e) => {
      gsap.to(mouse, {
        mixBlendMode: "normal",
        scale: 1,
        duration: 0.3,
        background: "#ea5939",
      });
      gsap.to(logoSvg, {
        height: 40,
        width: 40,
        fill: "#b7ab98",
        x: logoX,
        y: logoY,
      });
    });

    workNav.addEventListener("click", (e) => {
      page3.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    workNav.removeEventListener("click", (e) => {});
    aboutNav.addEventListener("click", (e) => {
      page3.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    aboutNav.removeEventListener("click", (e) => {});
  }

  navBarAnimation();

  function footerAnimation() {
    let mouse = document.getElementById("mouse_follower");
    let socials = Array.from(document.getElementById("socials").children);
    socials.map((elem, idx) => {
      let elemChildern = Array.from(elem.children);
      let svg = elemChildern[1];
      let overlayDiv = elemChildern[0];
      let boundinRect = overlayDiv.getBoundingClientRect();
      let svgX = boundinRect.left;
      let svgY = boundinRect.top;

      overlayDiv.addEventListener("mouseenter", (e) => {
        gsap.to(svg, {
          fill: "#000",
          duration: 0.3,
        });
        gsap.to(mouse, {
          scale: 1.4,
          duration: 0.3,
        });
        overlayDiv.addEventListener("mousemove", (e2) => {
          gsap.to(svg, {
            x: e2.x - svgX - 23,
            y: e2.y - svgY - 23,
            duration: 0.5,
          });
        });
      });
      overlayDiv.addEventListener("mouseleave", (e) => {
        gsap.to(mouse, {
          scale: 1,
          duration: 0.3,
        });

        gsap.to(svg, {
          fill: "#b7ab98",
          x: 0,
          y: 0,
          duration: 0.3,
        });
        overlayDiv.removeEventListener("mousemove", (e2) => {
          gsap.to(svg, {
            x: e2.x - svgX - 23,
            y: e2.y - svgY - 23,
            duration: 0.5,
          });
        });
      });
    });
  }

  footerAnimation();

  function page1TextAnimation() {
    let mouse = document.getElementById("mouse_follower");
    let page1Bg = document.querySelector("#page1_bg");
    let page1VsblCntntOvrly = document.querySelector(
      "#page1_content_visible_overlay"
    );
    let page1HdeCntnt = document.querySelector("#page1_content_hided");

    page1VsblCntntOvrly.addEventListener("mouseenter", (e) => {
      gsap.to(mouse, {
        scale: 0,
        duration: 0.3,
      });
      page1HdeCntnt.style.clipPath = `circle(150px at ${e.x}% ${e.y}%)`;

      page1VsblCntntOvrly.addEventListener("mousemove", onMouseMove);
    });

    page1VsblCntntOvrly.addEventListener("mouseleave", (e) => {
      gsap.to(mouse, {
        scale: 1,
        duration: 0.3,
      });
      page1HdeCntnt.style.clipPath = `circle(0px at ${50}% ${50}%)`;
      page1VsblCntntOvrly.removeEventListener("mousemove", (e) => {});
    });

    gsap.from("#page1_content_visible div h1", {
      delay: 2,
      y: 100,
      duration: 1,
    });
    gsap.from("#page1_content_hided div h1", {
      delay: 2,
      y: 105,
      duration: 1,
    });

    gsap.from("#making span", {
      delay: 2,
      y: 2,
      duration: 0.5,
      stagger: 0.3,
    });
    gsap.from("#good span", {
      delay: 2,
      y: 2,
      duration: 0.5,
      stagger: 0.3,
    });

    gsap.from("#shit span", {
      delay: 2,
      y: 2,
      duration: 0.5,
      stagger: 0.3,
    });

    gsap.from("#since span", {
      delay: 2,
      y: 2,
      duration: 0.5,
      stagger: 0.3,
    });

    gsap.from("#year span", {
      delay: 2,
      y: 2,
      duration: 0.5,
      stagger: 0.3,
    });

    gsap.from(page1Bg, {
      opacity: 0,
      scale: 1.3,
      duration: 1.5,
    });

    function onMouseMove(e) {
      const rect = document.querySelector("body").getBoundingClientRect();
      const x = e.x - rect.left - 150;
      const y = e.y - rect.top;
      page1HdeCntnt.style.clipPath = `circle(160px at ${x}px ${y}px)`;
    }
  }

  page1TextAnimation();

  function page2Animation() {
    let mouse = document.getElementById("mouse_follower");
    let page2vsblAboutOverlay = document.getElementById(
      "page2_visible_about_overlay"
    );
    let page2HidedAbout = document.getElementById("page2_hided_about");

    gsap.to("#page2_visible_about div div", {
      x: 1150,
      duration: 2,
      stagger: 1,
      scrollTrigger: {
        trigger: "#page2_visible_about",
        scroller: "#main",
        // markers: true,
        start: "0% 80%",
        end: "0% 0%",
        scrub: 2,
      },
    });

    page2vsblAboutOverlay.addEventListener("mouseenter", (e) => {
      gsap.to(mouse, {
        scale: 0,
      });

      page2vsblAboutOverlay.addEventListener("mousemove", onMouseMove);
    });

    page2vsblAboutOverlay.addEventListener("mouseleave", (e) => {
      gsap.to(mouse, {
        duration: 0.3,
        scale: 1,
      });

      page2HidedAbout.style.clipPath = `circle(0px at ${e.x}px ${e.y}px)`;
      page2vsblAboutOverlay.removeEventListener("mousemove", onMouseMove);
    });
    function onMouseMove(e) {
      const rect = document.querySelector("body").getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      page2HidedAbout.style.clipPath = `circle(150px at ${x - 135}px ${
        y - 195
      }px)`;
    }
  }

  page2Animation();

  function page3Animation() {
    let changableValue = "100% 0%, 100% 100%, 0% 100%, 0% 0%";
    let initialValue = "100% 50%, 100% 50%, 0% 50%, 0% 50%";

    let mouse = document.getElementById("mouse_follower");
    let overlayDivs = document.getElementsByClassName("page3_text_overlay_div");
    let page3InnerDivs = Array.from(document.querySelectorAll(".page3_inner"));

    gsap.to(overlayDivs, {
      x: 1300,
      duration: 10,
      stagger: 1.3,
      scrollTrigger: {
        trigger: ".page3_inner",
        scroller: "#main",
        // markers: true,
        start: "0% 80%",
        end: "0% -25%",
        scrub: 1,
      },
    });

    page3InnerDivs.map((elem, idx) => {
      let vsblCntnt = elem.querySelector(".page3_visible_content h1 div");
      let hdnCntnt = elem.querySelector(".page3_hidden_content");
      vsblCntnt.addEventListener("mouseenter", (e) => {
        gsap.to(mouse, {
          scale: 0,
          duration: 0.3,
        });
        hdnCntnt.style.clipPath = `polygon(${changableValue})`;
      });
      vsblCntnt.addEventListener("mouseleave", (e) => {
        gsap.to(mouse, {
          scale: 1,
          duration: 0.3,
        });

        hdnCntnt.style.clipPath = `polygon(${initialValue})`;
      });
    });
  }

  page3Animation();

  function page4Animation() {
    let mouse = document.getElementById("mouse_follower");
    let mouseText = document.querySelector("#mouse_follower div");
    let page4VdoCntnr = document.getElementById("page4_video_container");

    gsap.from(page4VdoCntnr, {
      scale: 0.4,
      duration: 3,
      scrollTrigger: {
        trigger: page4VdoCntnr,
        scoller: "main",
        // markers: true,
        start: "0% 90%",
        end: "0% 30%",
        scrub: 1,
      },
    });

    page4VdoCntnr.addEventListener("mouseenter", (e) => {
      gsap.to(mouseText, {
        fontSize: "2vmin",
        duration: 0.2,
      });
      gsap.to(mouse, {
        padding: "1.3rem 1.4rem",
        left: -20,
        top: -20,
      });
    });
    page4VdoCntnr.addEventListener("mouseleave", (e) => {
      gsap.to(mouseText, {
        fontSize: "0vmin",
        duration: 0.2,
      });
      gsap.to(mouse, {
        padding: "1.3rem",
        left: 0,
        top: 0,
      });
    });
  }

  page4Animation();

  function page5Animation() {
    let mouse = document.getElementById("mouse_follower");
    let page5VsblCntnt1 = document.getElementById(
      "page5_inner_content1_visible"
    );
    let page5VsblCntnt2 = document.getElementById(
      "page5_inner_content2_visible"
    );
    let page5VsblCntnt3 = document.getElementById(
      "page5_inner_content3_visible"
    );
    let page5HidnCntnt1 = document.getElementById(
      "page5_inner_content1_hidden"
    );
    let page5HidnCntnt2 = document.getElementById(
      "page5_inner_content2_hidden"
    );
    let page5HidnCntnt3 = document.getElementById(
      "page5_inner_content3_hidden"
    );

    let overlayDiv;

    Array.from({ length: 3 }).forEach((i, idx) => {
      if (idx === 0) {
        overlayDiv = Array.from(
          page5VsblCntnt1.getElementsByClassName("page5_inner_content_overlay")
        );

        overlayDiv.map((elem, idx) => {
          elem.addEventListener("mouseenter", (e) => {
            gsap.to(mouse, {
              scale: 0,
              duration: 0.3,
            });
            console.log();
            elem.addEventListener("mousemove", (e2) => {
              console.log("Moving");
              // console.log(e2)
              page5HidnCntnt1.style.clipPath = `circle(100px at ${
                e2.clientX
              }px ${e2.clientY - 100}px)`;
            });
          });
          elem.addEventListener("mouseleave", (e) => {
            gsap.to(mouse, {
              scale: 1,
              duration: 0.3,
            });

            page5HidnCntnt1.style.clipPath = `circle(0px at ${e.x}px ${e.y}px)`;
          });
        });
      } else if (idx === 1) {
        console.log(idx);
        overlayDiv = Array.from(
          page5VsblCntnt2.getElementsByClassName("page5_inner_content_overlay")
        );
        overlayDiv.map((elem, idx) => {
          elem.addEventListener("mouseenter", (e) => {
            gsap.to(mouse, {
              scale: 0,
              duration: 0.3,
            });
            console.log(elem);
            elem.addEventListener("mousemove", (e2) => {
              console.log("Moving");
              // console.log(e2)
              page5HidnCntnt2.style.clipPath = `circle(100px at ${e2.x}px ${
                e2.y - 100
              }px)`;
            });
          });
          elem.addEventListener("mouseleave", (e) => {
            gsap.to(mouse, {
              scale: 1,
              duration: 0.3,
            });

            page5HidnCntnt2.style.clipPath = `circle(0px at ${e.x}px ${e.y}px)`;
          });
        });
      } else if (idx === 2) {
        overlayDiv = Array.from(
          page5VsblCntnt3.getElementsByClassName("page5_inner_content_overlay")
        );

        overlayDiv.map((elem, idx) => {
          elem.addEventListener("mouseenter", (e) => {
            gsap.to(mouse, {
              scale: 0,
              duration: 0.3,
            });
            console.log();
            elem.addEventListener("mousemove", (e2) => {
              console.log("Moving");
              page5HidnCntnt3.style.clipPath = `circle(100px at ${e2.x}px ${
                e2.y - 160
              }px)`;
            });
          });
          elem.addEventListener("mouseleave", (e) => {
            gsap.to(mouse, {
              scale: 1,
              duration: 0.3,
            });

            page5HidnCntnt3.style.clipPath = `circle(0px at ${e.x}px ${e.y}px)`;
          });
        });
      }
    });

    gsap.to(".page5_content1_text_overlay", {
      x: 900,
      duration: 4,
      stagger: 1.5,
      scrollTrigger: {
        trigger: ".page5_content1_text_overlay",
        scroller: "#main",
        // markers: true,
        start: "0% 90%",
        end: "0% -10%",
        scrub: 1.5,
      },
    });
    gsap.to(".page5_content2_text_overlay", {
      x: 900,
      duration: 4,
      stagger: 1.5,
      scrollTrigger: {
        trigger: ".page5_content2_text_overlay",
        scroller: "#main",
        // markers: true,
        start: "0% 90%",
        end: "0% -10%",
        scrub: 1.5,
      },
    });
    gsap.to(".page5_content3_text_overlay", {
      x: 900,
      duration: 4,
      stagger: 1.5,
      scrollTrigger: {
        trigger: ".page5_content3_text_overlay",
        scroller: "#main",
        // markers: true,
        start: "0% 90%",
        end: "0% 10%",
        scrub: 1.5,
      },
    });
  }

  page5Animation();

  let main = document.getElementById("main");
  let page1 = document.getElementById("page3");

  // let mLeft = main.getBoundingClientRect().left;
  // let mTop = main.getBoundingClientRect().top;
  // console.log(page1.getBoundingClientRect().left - mLeft);

  window.addEventListener("scroll", (e) => {
    console.log(page1.getBoundingClientRect());
    console.log(main.getBoundingClientRect());
    // console.log(main.clientHeight);
    console.log(e);
  });
}
