/* ============================================================
         CASA MOMO — interaction layer
         Everything is guarded: if a CDN fails, the page stays fully
         readable and every control still works with vanilla JS.
         ============================================================ */
(function () {
  "use strict";
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hasGsap = typeof window.gsap !== "undefined";
  var hasST = hasGsap && typeof window.ScrollTrigger !== "undefined";
  if (hasST) gsap.registerPlugin(ScrollTrigger);

  /* ---------------- Data ---------------- */
  var APARTMENTS = [
    {
      id: "b1",
      name: "Boutique N°1",
      size: 60,
      guests: 3,
      img: "assets/card-images/card1.jpg",
      aspect: "aspect-[4/5]",
      alt: "Boutique N°1 living room with herringbone parquet, tall windows and vintage chairs",
      tag: "Living Room",
      desc: "A grand old-town living room with herringbone parquet, ceiling stucco and windows that flood the space with light. Vintage chairs, a proper reading corner and room to breathe — the apartment that feels like a small salon.",
      amenities: [
        "Fully equipped kitchen",
        "Workspace",
        "Fast Wi-Fi",
        "Washing machine",
      ],
    },
    {
      id: "b2",
      name: "Boutique N°2",
      size: 45,
      guests: 3,
      img: "assets/card-images/card2.jpg",
      aspect: "aspect-[4/5]",
      alt: "Boutique N°2 sunlit room with a daybed, wooden chair and green plants",
      tag: "Sun Room",
      desc: "Morning light, warm wood and a daybed made for slow starts. Boutique N°2 is compact but generous where it counts — a calm retreat two minutes from the Hauptplatz buzz.",
      amenities: [
        "Fully equipped kitchen",
        "Daybed lounge",
        "Fast Wi-Fi",
        "Record player",
      ],
    },
    {
      id: "b3",
      name: "Boutique N°3",
      size: 120,
      guests: 6,
      img: "assets/card-images/card3.jpg",
      aspect: "aspect-[4/5]",
      alt: "Boutique N°3 spacious golden-lit living room with high ceilings and parquet floors",
      tag: "The Grand One",
      desc: "Our largest apartment: 120 m² of old-building elegance with rooms that flow into one another, golden evening light and space for the whole family — or for working, dining and living in separate corners.",
      amenities: ["3 rooms", "Dining for six", "Fast Wi-Fi", "Washing machine"],
    },
    {
      id: "b4",
      name: "Boutique N°4",
      size: 45,
      guests: 4,
      img: "assets/card-images/card4.jpg",
      aspect: "aspect-[3/4]",
      alt: "Boutique N°4 cozy living room with a rust-red sofa, patterned rug and many plants",
      tag: "Living Room",
      desc: "A rust-red sofa, a patterned rug and plants in every corner. Boutique N°4 is the cozy one — made for evenings in, board games on the rug and nowhere else to be.",
      amenities: [
        "Fully equipped kitchen",
        "Sofa bed",
        "Fast Wi-Fi",
        "Board games",
      ],
    },
    {
      id: "l1",
      name: "Loft N°1",
      size: 45,
      guests: 4,
      img: "assets/card-images/card5.jpg",
      aspect: "aspect-[3/4]",
      alt: "Loft N°1 attic bedroom with a skylight and warm wooden built-ins",
      tag: "Attic Bedroom",
      desc: "Under the roof, above the city. A skylight over the bed for stargazing, warm wooden built-ins and the quiet that only the top floor knows.",
      amenities: [
        "Skylight",
        "Fully equipped kitchen",
        "Fast Wi-Fi",
        "Workspace",
      ],
    },
    {
      id: "l2",
      name: "Loft N°2",
      size: 60,
      guests: 4,
      img: "assets/card-images/card6.jpg",
      aspect: "aspect-[4/5]",
      alt: "Loft N°2 bright attic bedroom with large skylights and a low wooden bed",
      tag: "Attic Loft",
      desc: "White beams, huge skylights and a low bed that catches the first sun. Loft N°2 is minimal in the best way — everything you need, nothing you don't.",
      amenities: [
        "Skylight",
        "Fully equipped kitchen",
        "Fast Wi-Fi",
        "Washing machine",
      ],
    },
    {
      id: "l3",
      name: "Loft N°3",
      size: 80,
      guests: 5,
      img: "assets/card-images/card7.jpg",
      aspect: "aspect-[4/3]",
      alt: "Loft N°3 elegant living room with an arched window and antique wooden furniture",
      tag: "Living Room",
      desc: "An arched window, antique wood and afternoon sun across the parquet. At 80 m², Loft N°3 gives families and longer stays the space of a real home.",
      amenities: ["2 bedrooms", "Dining area", "Fast Wi-Fi", "Washing machine"],
    },
    {
      id: "g1",
      name: "Garden N°1",
      size: 40,
      guests: 3,
      img: "assets/card-images/card9.jpg",
      aspect: "aspect-[4/3]",
      alt: "Garden N°1 warm living room with orange sofas, framed prints and soft lamplight",
      tag: "Garden Side",
      desc: "On the quiet garden side of the house: warm colours, soft lamplight and green views from every window. The apartment for slow mornings and long evenings.",
      amenities: [
        "Garden view",
        "Fully equipped kitchen",
        "Fast Wi-Fi",
        "Breakfast nook",
      ],
    },
    {
      id: "u1",
      name: "Urban N°1",
      size: 55,
      guests: 4,
      img: "assets/card-images/card8.jpg",
      aspect: "aspect-[3/4]",
      alt: "Urban N°1 city apartment with terracotta walls, tall windows and mid-century chairs",
      tag: "City Pad",
      desc: "Terracotta walls, tall windows and mid-century pieces — Urban N°1 is the city pad of the collection, made for market mornings and gallery afternoons.",
      amenities: [
        "Fully equipped kitchen",
        "Workspace",
        "Fast Wi-Fi",
        "City view",
      ],
    },
  ];

  var REVIEWS = [
    {
      name: "Jiyon",
      meta: "Guest · Boutique Apartment",
      tint: "#A75D3B",
      text: "“Moritz is such a gentle and wonderful host! The apartment is absolutely beautiful, cozy, and stylish. It was so lovely that I almost preferred staying in rather than exploring the city. If I return to Graz, I will definitely choose this place again!”",
    },
    {
      name: "Gary",
      meta: "Guest · Two-week family stay",
      tint: "#5B6B57",
      text: "“A family of three adults and one infant stayed at Moritz's Graz apartment for 2 weeks. We were very happy with the amount of space. Moritz made our stay a pleasure with his thoughtfulness and helpfulness — we have already recommended this property to others.”",
    },
    {
      name: "Monika",
      meta: "Guest · Work & leisure",
      tint: "#8C6D4F",
      text: "“A beautifully renovated, spacious, and airy apartment with phenomenal views; great location close to the old town, train station, and multiple grocery stores. Suitable not only for vacation, but also for remote working. I want to come back to Graz just to stay in this apartment again!”",
    },
    {
      name: "Abhishek",
      meta: "Guest · City trip",
      tint: "#4F6157",
      text: "“I had a truly wonderful experience staying at this flat. The space was clean, well-maintained, and had everything I needed during my time in Graz. The host was responsive and helpful throughout my stay. I'd definitely recommend this place to anyone visiting Graz.”",
    },
    {
      name: "Holke",
      meta: "Guest · Return visitor",
      tint: "#96503A",
      text: "“Moritz's apartment is fantastic! The location couldn't be better; you can leave your car in the parking space for the entire stay since everything is perfectly within walking distance. Communication was seamless, and his recommendations were outstanding. We'll be back!”",
    },
  ];

  /* ---------------- Render: apartments ---------------- */
  function starRow() {
    var s = "";
    for (var i = 0; i < 5; i++)
      s += '<i data-lucide="star" class="h-3.5 w-3.5 fill-rust text-rust"></i>';
    return s;
  }

  var grid = document.getElementById("apt-grid");
  APARTMENTS.forEach(function (a, i) {
    var offset = i % 2 === 1 ? " md:mt-28" : "";
    var card = document.createElement("article");
    card.className = "apt-card group cursor-pointer" + offset;
    card.setAttribute("data-id", a.id);
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", a.name + " — view apartment details");
    card.innerHTML =
      '<div class="apt-frame relative overflow-hidden rounded-md bg-forest2">' +
      '<img src="' +
      a.img +
      '" alt="' +
      a.alt +
      '" loading="lazy" ' +
      'class="apt-img ' +
      a.aspect +
      ' w-full scale-[1.16] object-cover will-change-transform" />' +
      '<div class="apt-veil absolute inset-0 bg-gradient-to-t from-forest/45 via-transparent to-transparent"></div>' +
      '<span class="absolute left-4 top-4 rounded-full bg-forest/45 px-3.5 py-1.5 text-[11px] uppercase tracking-[0.16em] backdrop-blur-md">' +
      a.tag +
      "</span>" +
      "</div>" +
      '<div class="mt-4 flex items-start justify-between gap-4">' +
      '<h3 class="font-display text-[26px] font-light leading-tight tracking-tight md:text-[30px]">' +
      a.name +
      "</h3>" +
      '<div class="flex shrink-0 items-center gap-1.5 pt-1">' +
      '<span class="inline-flex items-center gap-1.5 rounded-md bg-forest3 px-2.5 py-1.5 text-[13px] text-cream/85"><i data-lucide="maximize" class="h-3.5 w-3.5"></i>' +
      a.size +
      " m²</span>" +
      '<span aria-hidden="true" class="pt-1 text-cream/35">·</span>' +
      '<span class="inline-flex items-center gap-1.5 rounded-full bg-forest3 px-2.5 py-1.5 text-[13px] text-cream/85"><i data-lucide="person-standing" class="h-3.5 w-3.5"></i>' +
      a.guests +
      " Guests</span>" +
      "</div>" +
      "</div>";
    grid.appendChild(card);
  });

  /* ---------------- Render: reviews (duplicated x2 for the seamless loop) ---------------- */
  var rtrack = document.getElementById("review-track");
  function reviewCard(r, hidden) {
    var el = document.createElement("article");
    el.className =
      "rev-card mr-4 flex w-[82vw] shrink-0 flex-col rounded-md bg-[#FFFDF7] p-7 text-forest shadow-[0_18px_40px_-24px_rgba(18,24,20,0.35)] ring-1 ring-forest/10 sm:w-[400px] md:p-8";
    if (hidden) el.setAttribute("aria-hidden", "true");
    el.innerHTML =
      '<div class="flex items-center justify-between">' +
      '<div class="flex gap-0.5">' +
      starRow() +
      "</div>" +
      '<span class="text-sm font-medium text-forest/60">5.00 <span class="text-forest/40">/ 5</span></span>' +
      "</div>" +
      '<p class="mt-5 flex-1 text-[15px] leading-relaxed text-forest/85">' +
      r.text +
      "</p>" +
      '<div class="mt-7 flex items-center gap-3">' +
      '<span class="flex h-11 w-11 items-center justify-center rounded-full font-serif text-lg italic text-cream" style="background:' +
      r.tint +
      '">' +
      r.name.charAt(0) +
      "</span>" +
      "<div>" +
      '<p class="text-[15px] font-medium leading-tight">' +
      r.name +
      "</p>" +
      '<p class="text-[12.5px] text-forest/50">' +
      r.meta +
      "</p>" +
      "</div>" +
      "</div>";
    return el;
  }
  REVIEWS.forEach(function (r) {
    rtrack.appendChild(reviewCard(r, false));
  });
  REVIEWS.forEach(function (r) {
    rtrack.appendChild(reviewCard(r, true));
  });

  /* ---------------- Icons ---------------- */
  if (typeof window.lucide !== "undefined") lucide.createIcons();

  /* ---------------- Preloader ---------------- */
  var preloader = document.getElementById("preloader");
  function hidePreloader() {
    if (preloader && !preloader.classList.contains("done")) {
      /* Phase 1: CASA slides left, MOMO slides right — then the curtain lifts */
      preloader.classList.add("split");
      setTimeout(
        function () {
          preloader.classList.add("done");
          document.body.classList.add("loaded");
          if (hasGsap && !reduced) heroIntro();
        },
        reduced ? 0 : 480,
      );
    }
  }
  window.addEventListener("load", function () {
    setTimeout(hidePreloader, 1300);
  });
  setTimeout(hidePreloader, 3800); /* absolute safety */

  /* ---------------- Lenis smooth scroll ---------------- */
  var lenis = null;
  if (typeof window.Lenis !== "undefined" && !reduced) {
    lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, smoothWheel: true });
    if (hasGsap) {
      lenis.on("scroll", function () {
        if (hasST) ScrollTrigger.update();
      });
      gsap.ticker.add(function (time) {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    } else {
      (function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      })(0);
    }
  }

  /* ---------------- Header state ---------------- */
  var header = document.getElementById("site-header");
  function onScrollPos(y) {
    header.classList.toggle("scrolled", y > 60);
  }
  if (lenis)
    lenis.on("scroll", function (e) {
      onScrollPos(e.scroll);
    });
  window.addEventListener(
    "scroll",
    function () {
      onScrollPos(window.scrollY);
    },
    { passive: true },
  );

  /* ---------------- Smooth anchors ---------------- */
  document.querySelectorAll("[data-scroll]").forEach(function (link) {
    link.addEventListener("click", function (ev) {
      var href = link.getAttribute("href");
      if (!href || href.charAt(0) !== "#") return;
      var target = document.querySelector(href === "#top" ? "body" : href);
      if (!target) return;
      ev.preventDefault();
      closeMenu();
      if (lenis)
        lenis.scrollTo(href === "#top" ? 0 : target, {
          offset: href === "#top" ? 0 : -70,
          duration: 1.4,
        });
      else target.scrollIntoView({ behavior: "smooth" });
    });
  });

  /* ---------------- Mobile menu ---------------- */
  var menu = document.getElementById("mobile-menu");
  var menuBtn = document.getElementById("menu-btn");
  function openMenu() {
    menu.classList.add("open");
    menu.setAttribute("aria-hidden", "false");
    menuBtn.setAttribute("aria-expanded", "true");
    if (lenis) lenis.stop();
  }
  function closeMenu() {
    if (!menu.classList.contains("open")) return;
    menu.classList.remove("open");
    menu.setAttribute("aria-hidden", "true");
    menuBtn.setAttribute("aria-expanded", "false");
    if (lenis) lenis.start();
  }
  menuBtn.addEventListener("click", openMenu);
  document.getElementById("menu-close").addEventListener("click", closeMenu);

  /* ---------------- Apartment modal ---------------- */
  var modal = document.getElementById("apt-modal");
  var lastFocus = null;
  function openModal(a) {
    lastFocus = document.activeElement;
    document.getElementById("modal-img").src = a.img;
    document.getElementById("modal-img").alt = a.alt;
    document.getElementById("modal-name").textContent = a.name;
    document.getElementById("modal-desc").textContent = a.desc;
    document.getElementById("modal-tags").innerHTML =
      '<span class="inline-flex items-center gap-1.5 rounded-md bg-forest px-3 py-1.5 text-[13px] text-cream"><i data-lucide="maximize" class="h-3.5 w-3.5"></i>' +
      a.size +
      " m²</span>" +
      '<span class="inline-flex items-center gap-1.5 rounded-full bg-forest px-3 py-1.5 text-[13px] text-cream"><i data-lucide="person-standing" class="h-3.5 w-3.5"></i>' +
      a.guests +
      " Guests</span>" +
      '<span class="inline-flex items-center gap-1.5 rounded-full border border-forest/25 px-3 py-1.5 text-[13px]">' +
      a.tag +
      "</span>";
    document.getElementById("modal-amenities").innerHTML = a.amenities
      .map(function (x) {
        return (
          '<div class="rounded-md bg-[#EFE7D8] px-4 py-3.5 text-[13.5px] font-medium">' +
          x +
          "</div>"
        );
      })
      .join("");
    if (typeof window.lucide !== "undefined") lucide.createIcons();
    modal.classList.remove("hiddenx");
    if (lenis) lenis.stop();
    document.getElementById("modal-close").focus();
  }
  function closeModal() {
    modal.classList.add("hiddenx");
    if (lenis) lenis.start();
    if (lastFocus) lastFocus.focus();
  }
  grid.addEventListener("click", function (ev) {
    var card = ev.target.closest(".apt-card");
    if (!card) return;
    var a = APARTMENTS.find(function (x) {
      return x.id === card.getAttribute("data-id");
    });
    if (a) openModal(a);
  });
  grid.addEventListener("keydown", function (ev) {
    if (ev.key !== "Enter" && ev.key !== " ") return;
    var card = ev.target.closest(".apt-card");
    if (!card) return;
    ev.preventDefault();
    var a = APARTMENTS.find(function (x) {
      return x.id === card.getAttribute("data-id");
    });
    if (a) openModal(a);
  });
  document.getElementById("modal-close").addEventListener("click", closeModal);
  document
    .getElementById("modal-backdrop")
    .addEventListener("click", closeModal);
  document.addEventListener("keydown", function (ev) {
    if (ev.key === "Escape") {
      closeModal();
      closeMenu();
    }
  });

  /* ---------------- Cursor-following details badge ---------------- */
  var badge = document.getElementById("cursor-badge");
  var fine = window.matchMedia("(pointer: fine)").matches;
  if (fine && !reduced) {
    badge.classList.add("hidden", "md:inline-flex");
    var bx = 0,
      by = 0,
      tx = 0,
      ty = 0,
      badgeOn = false;
    grid.addEventListener("mousemove", function (ev) {
      tx = ev.clientX;
      ty = ev.clientY;
    });
    grid.addEventListener("mouseover", function (ev) {
      if (ev.target.closest(".apt-card")) {
        badgeOn = true;
        badge.classList.add("on");
      }
    });
    grid.addEventListener("mouseout", function (ev) {
      if (
        ev.target.closest(".apt-card") &&
        !ev.relatedTarget.closest(".apt-card")
      ) {
        badgeOn = false;
        badge.classList.remove("on");
      }
    });
    (function badgeLoop() {
      bx += (tx - bx) * 0.16;
      by += (ty - by) * 0.16;
      if (badgeOn)
        badge.style.transform =
          "translate(" + bx + "px," + by + "px) translate(-50%,-140%)";
      requestAnimationFrame(badgeLoop);
    })();
  }

  /* ---------------- Manifesto word split ---------------- */
  var manifesto = document.getElementById("manifesto-text");
  var words = manifesto.textContent.trim().split(/\s+/);
  manifesto.innerHTML = words
    .map(function (w) {
      return '<span class="mword">' + w + "</span>";
    })
    .join(" ");

  /* ---------------- GSAP motion ---------------- */
  function heroIntro() {
    var tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(
      ".hero-line > span",
      { yPercent: 115, duration: 1.25, stagger: 0.12 },
      0,
    )
      .from(
        ".hero-fade",
        { y: 26, opacity: 0, duration: 1, stagger: 0.15 },
        0.35,
      )
      .from("#site-header", { y: -24, opacity: 0, duration: 0.9 }, 0.4);
  }

  function splitWords(el) {
    var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    var textNodes = [];

    while (walker.nextNode()) textNodes.push(walker.currentNode);

    textNodes.forEach(function (node) {
      var parts = node.nodeValue.match(/\S+|\s+/g);
      if (!parts) return;

      var fragment = document.createDocumentFragment();
      parts.forEach(function (part) {
        if (/^\s+$/.test(part)) {
          fragment.appendChild(document.createTextNode(part));
        } else {
          var word = document.createElement("span");
          word.className = "split-word";
          word.textContent = part;
          fragment.appendChild(word);
        }
      });
      node.parentNode.replaceChild(fragment, node);
    });

    return el.querySelectorAll(".split-word");
  }

  if (hasST && !reduced) {
    /* Hero: parallax zoom-out from ~1.15 on scroll */
    gsap.fromTo(
      "#hero-img",
      { scale: 1.15 },
      {
        scale: 1,
        yPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: "#hero-frame",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      },
    );

    /* Manifesto: section pins while words illuminate word-by-word (scrubbed) */
    var mtl = gsap.timeline({
      scrollTrigger: {
        trigger: "#manifesto",
        start: "top top",
        end: "+=110%",
        pin: true,
        scrub: 0.6,
      },
    });
    mtl.to(".mword", { opacity: 1, ease: "none", stagger: 0.05 });

    /* Generic reveals */
    gsap.utils.toArray(".reveal").forEach(function (el) {
      if (el.matches("h2")) {
        gsap.from(splitWords(el), {
          y: -100,
          opacity: 0,
          duration: 0.9,
          stagger: 0.055,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
        return;
      }

      gsap.from(el, {
        y: 44,
        opacity: 0,
        duration: 1.05,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%" },
      });
    });

    /* Apartment cards: entrance + inner-image parallax at varied speeds */
    gsap.utils.toArray(".apt-card").forEach(function (card, i) {
      gsap.from(card, {
        y: 70,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
        delay: (i % 2) * 0.08,
        scrollTrigger: { trigger: card, start: "top 92%" },
      });
      var img = card.querySelector(".apt-img");
      var speed = 6 + (i % 3) * 2.5; /* 6 / 8.5 / 11 — subtle depth variance */
      gsap.fromTo(
        img,
        { yPercent: -speed / 2 },
        {
          yPercent: speed / 2,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
      /* Clip-path window wipe as the image scrolls into view */
      var frame = card.querySelector(".apt-frame");
      gsap.fromTo(
        frame,
        { clipPath: "inset(45% 69% 66% 9% round 10px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 6px)",
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top 96%",
            end: "top 42%",
            scrub: true,
          },
        },
      );
    });

    /* Host: paragraphs illuminate one by one; portrait drifts */
    gsap.utils.toArray(".host-para").forEach(function (p) {
      gsap.fromTo(
        p,
        { opacity: 0.22 },
        {
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: p,
            start: "top 78%",
            end: "top 38%",
            scrub: true,
          },
        },
      );
    });
    gsap.fromTo(
      "#host-img",
      { yPercent: -5, scale: 1.12 },
      {
        yPercent: 5,
        scale: 1.12,
        ease: "none",
        scrollTrigger: {
          trigger: "#about",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      },
    );

    /* Philosophy: floating objects drift by data-speed (0.8 slow … 1.2 fast) */
    gsap.utils.toArray(".float-el").forEach(function (el) {
      var speed = parseFloat(el.getAttribute("data-speed")) || 1;
      var drift = (1 - speed) * 260;
      gsap.fromTo(
        el,
        { y: -drift },
        {
          y: drift,
          rotation: (speed - 1) * 7,
          ease: "none",
          scrollTrigger: {
            trigger: "#philosophy",
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        },
      );
    });

    /* Statement image drift */
    gsap.fromTo(
      "#statement-img",
      { yPercent: -6, scale: 1.14 },
      {
        yPercent: 6,
        scale: 1.14,
        ease: "none",
        scrollTrigger: {
          trigger: "#statement",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      },
    );

    /* Locations image drift */
    gsap.fromTo(
      "#graz-img",
      { yPercent: -6, scale: 1.14 },
      {
        yPercent: 6,
        scale: 1.14,
        ease: "none",
        scrollTrigger: {
          trigger: "#locations",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      },
    );

    /* Footer: terracotta wipes in with a scroll-driven colour shift */
    gsap.fromTo(
      "#contact",
      { backgroundColor: "#7E452A" },
      {
        backgroundColor: "#A75D3B",
        ease: "none",
        scrollTrigger: {
          trigger: "#contact",
          start: "top 98%",
          end: "top 30%",
          scrub: true,
        },
      },
    );
    gsap.from("#watermark", {
      yPercent: 42,
      opacity: 0.25,
      ease: "none",
      scrollTrigger: {
        trigger: "#contact",
        start: "top 30%",
        end: "bottom bottom",
        scrub: true,
      },
    });

    window.addEventListener("load", function () {
      ScrollTrigger.refresh();
    });
  } else {
    /* No GSAP / reduced motion: everything simply visible */
    document.querySelectorAll(".mword").forEach(function (w) {
      w.style.opacity = "1";
    });
  }
})();
