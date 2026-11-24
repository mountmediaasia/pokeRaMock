(() => {
  "use strict";

  const config = window.POKE_RA;
  const { page, base } = document.body.dataset;
  const main = document.querySelector("#main");
  const cardDialog = document.querySelector("#card-dialog");
  const bagDialog = document.querySelector("#bag-dialog");
  const toast = document.querySelector("#toast");
  const money = new Intl.NumberFormat("en-MY", { style: "currency", currency: "MYR", maximumFractionDigits: 2 });
  const cards = new Map(config.cards.map(card => [card.id, card]));
  const pages = { home: "Home", shop: "Shop", trade: "Trade", visit: "Visit & Events", about: "About", contact: "Contact" };
  const paths = {
    bag: '<path d="M5 8h14l1 13H4L5 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/>',
    star: '<path d="M12 2c0 6-4 10-10 10 6 0 10 4 10 10 0-6 4-10 10-10-6 0-10-4-10-10Z"/>',
    heart: '<path d="M20.8 5.9a5.1 5.1 0 0 0-7.2 0L12 7.5l-1.6-1.6a5.1 5.1 0 1 0-7.2 7.2L12 22l8.8-8.9a5.1 5.1 0 0 0 0-7.2Z"/>',
    pin: '<path d="M20 10c0 6-8 11-8 11s-8-5-8-11a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18M8 15h2m4 0h2"/>',
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>',
    tiktok: '<path d="M14 3v12.5a4.5 4.5 0 1 1-4.5-4.5H11m3-8c0 3.3 2.7 6 6 6"/>',
    message: '<path d="M21 11.5a8.5 8.5 0 0 1-12.1 7.7L4 21l1.5-4.6A8.5 8.5 0 1 1 21 11.5Z"/><path d="M8 12h.01m4 0h.01m4 0h.01"/>',
    close: '<path d="m6 6 12 12M6 18 18 6"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    search: '<circle cx="10.5" cy="10.5" r="5.5"/><path d="m15 15 5 5"/>',
    cards: '<rect x="8" y="5" width="12" height="16" rx="2"/><path d="M5 17H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10m-3 8 3-3 3 3-3 3-3-3Z"/>',
    trade: '<path d="M3 8h16l-4-4m6 12H5l4 4"/>',
    phone: '<path d="M8 3H5a2 2 0 0 0-2 2c0 9 7 16 16 16a2 2 0 0 0 2-2v-3l-5-2-2 2c-3-1-5-3-6-6l2-2-2-5Z"/>',
    chevron: '<path d="m6 9 6 6 6-6"/>'
  };

  const icon = (name, className = "") => `<svg class="${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]}</svg>`;
  const url = (name = "home") => name === "home" ? `${base}index.html` : `${base}${name}/index.html`;
  const asset = file => `${base}assets/${file}`;
  const escapeHtml = (value = "") => String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
  const newTab = 'target="_blank" rel="noopener noreferrer"';
  const whatsApp = (message = "") => `https://wa.me/${config.whatsapp}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
  const telephone = `tel:+${config.whatsapp}`;
  const social = (name, label, className = "") => `<a class="${className}" href="${config[name]}" ${newTab}>${icon(name)}${label}</a>`;
  const logo = `<span class="brand-mark"><img src="${asset("logo.jpg")}" alt="" width="690" height="620"></span><span class="wordmark">poke<span>.</span>ra</span>`;
  const divider = `<span class="section-mark">${icon("star")}</span>`;

  function renderHeader() {
    const event = config.nextPopUp;
    document.querySelector("#site-header").innerHTML = `
      <div class="announcement"><a href="${url("visit")}">${icon(event ? "calendar" : "pin")} ${event ? `Next pop-up · ${escapeHtml(event.name)}` : "Find us in Bandar Utama, Petaling Jaya"}</a></div>
      <header class="site-header">
        <div class="container nav-wrap">
          <a href="${url()}" class="brand" aria-label="poke.ra home">${logo}</a>
          <nav id="site-nav" aria-label="Main navigation">
            ${Object.entries(pages).map(([key, label]) => `<a href="${url(key)}"${page === key ? ' aria-current="page"' : ""}>${label}</a>`).join("")}
          </nav>
          <div class="nav-actions">
            <button class="icon-button bag-button" type="button" data-bag aria-label="Open shopping bag">${icon("bag")}<span id="bag-count">0</span></button>
            <button class="icon-button menu-button" type="button" aria-label="Toggle navigation" aria-expanded="false" aria-controls="site-nav">${icon("menu")}</button>
          </div>
        </div>
      </header>`;
  }

  function renderFooter() {
    document.querySelector("#site-footer").innerHTML = `
      <footer class="footer">
        <div class="container footer-grid">
          <div><a class="brand" href="${url()}" aria-label="poke.ra home">${logo}</a><p>Pokémon cards and good company in Petaling Jaya, Malaysia.</p></div>
          <div><h2>Explore</h2><a href="${url("shop")}">Shop cards</a><a href="${url("trade")}">Trade with us</a><a href="${url("visit")}">Visit & events</a></div>
          <div><h2>Say hi</h2><a href="${url("contact")}">Contact us</a>${social("instagram", "Instagram")}${social("tiktok", "TikTok")}</div>
          <div><h2>Find us</h2><p>Lot F05, First Floor<br>Village Shop @ The Club<br>Bandar Utama, Petaling Jaya</p><a href="${config.store.maps}" ${newTab}>Get directions</a></div>
        </div>
        <div class="container footer-bottom"><span>© ${new Date().getFullYear()} poke.ra</span><span>Independent Pokémon TCG retailer.</span></div>
      </footer>`;
  }

  function sectionHeading(title, copy = "") {
    return `<div class="section-heading">${divider}<h2>${title}</h2>${copy && `<p>${copy}</p>`}</div>`;
  }

  function eventPanel() {
    const event = config.nextPopUp;
    return `
      <article class="event-panel" id="next-pop-up">
        <div class="calendar-tile">${icon("calendar")}</div>
        <div class="event-copy">
          <p class="eyebrow">Next pop-up</p>
          <h2>${event ? escapeHtml(event.name) : "See you at the next card show"}</h2>
          ${event ? `<p>${[event.date, event.hours, event.venue].filter(Boolean).map(escapeHtml).join(" · ")}</p>${event.details ? `<p>${escapeHtml(event.details)}</p>` : ""}` : "<p>Follow us for the next date and booth details.</p>"}
        </div>
        ${event?.maps ? `<a class="button button-white" href="${escapeHtml(event.maps)}" ${newTab}>${icon("pin")} Event directions</a>` : social("instagram", "Event updates", "button button-white")}
      </article>`;
  }

  function productCard(card) {
    return `
      <article class="product">
        <button class="product-art ${card.color}" type="button" data-card="${card.id}" aria-label="View ${escapeHtml(card.name)} details">
          <span class="product-rarity">${escapeHtml(card.rarity)}</span>
          <img src="${asset(card.id + ".png")}" alt="${escapeHtml(card.name)} Pokémon card" width="245" height="342" loading="lazy">
        </button>
        <div class="product-info">
          <div><h3><button class="product-name" type="button" data-card="${card.id}">${escapeHtml(card.name)}</button></h3><p>${escapeHtml(card.set)} · ${escapeHtml(card.number)}</p></div>
          <div class="product-bottom"><strong>${money.format(card.price)}</strong><button class="icon-button add-button" type="button" data-add="${card.id}" aria-label="Add ${escapeHtml(card.name)} to bag">${icon("plus")}</button></div>
        </div>
      </article>`;
  }

  function brandSeal() {
    return `<div class="brand-seal" aria-hidden="true"><img src="${asset("logo.jpg")}" alt="" width="690" height="620"></div>`;
  }

  function tiktokPanel() {
    return `
      <section class="section tiktok-section" id="tiktok">
        <div class="container tiktok-layout">
          <div class="tiktok-copy">
            ${sectionHeading("Behind the binder", "Pack openings, Pokémon finds and a look at what’s happening at poke.ra.")}
            ${social("tiktok", "Follow @poke.ra_", "button button-dark")}
          </div>
          <div class="tiktok-frame">
            <blockquote class="tiktok-embed" cite="${config.tiktok}" data-unique-id="${config.tiktokHandle}" data-embed-type="creator" data-embed-from="oembed">
              <section><a href="${config.tiktok}" ${newTab}>${icon("tiktok")} Watch @poke.ra_ on TikTok</a></section>
            </blockquote>
            <p class="tiktok-fallback" hidden>Video feed unavailable. <a href="${config.tiktok}" ${newTab}>Watch on TikTok</a>.</p>
          </div>
        </div>
      </section>`;
  }

  function home() {
    return `
      <section class="hero">
        <div class="container hero-layout">
          <div class="hero-copy">
            <p class="eyebrow">${icon("star")} Pokémon TCG · Petaling Jaya</p>
            <h1>Good pulls.<br><em>Great company.</em></h1>
            <p>Chase cards, trade favourites and meet fellow Pokémon collectors at poke.ra.</p>
            <div class="button-row"><a class="button button-dark" href="${url("shop")}">${icon("bag")} Shop cards</a><a class="button button-outline" href="${url("visit")}">${icon("pin")} Find us</a></div>
          </div>
          <div class="hero-art">
            <div class="hero-orbit" aria-hidden="true"></div>
            ${icon("star", "hero-spark spark-one")}${icon("star", "hero-spark spark-two")}${icon("star", "hero-spark spark-three")}
            <div class="polaroid hero-photo"><img src="${asset("founder.jpg")}" alt="One of the collectors behind poke.ra holding cards at the shop booth" width="369" height="474" fetchpriority="high"><span>See you at poke.ra! ${icon("heart")}</span></div>
            <img class="hero-card hero-card-back" src="${asset("eevee.png")}" alt="" width="245" height="342">
            <img class="hero-card hero-card-front" src="${asset("sylveon.png")}" alt="" width="245" height="342">
            ${brandSeal()}
          </div>
        </div>
      </section>
      <div class="container event-wrap">${eventPanel()}</div>
      <section class="section container home-shop">
        <div class="section-top">${sectionHeading("The card showcase", "Browse a sample of singles and chase cards for your binder.")}<a class="button button-outline" href="${url("shop")}">Browse all cards</a></div>
        <div class="product-grid">${config.cards.slice(0, 4).map(productCard).join("")}</div>
      </section>
      <section class="story-section">
        <div class="container story-grid">
          <div class="story-visual"><img src="${asset("logo.jpg")}" alt="The poke.ra logo with Sylveon" width="690" height="620" loading="lazy"></div>
          <div class="story-copy">${sectionHeading("Bring your trade binder", "Have a card to swap or sell? Tell us what’s in your binder, or bring it along when you visit.")}<a class="button button-dark" href="${url("trade")}">${icon("trade")} Start a trade</a></div>
        </div>
      </section>
      ${tiktokPanel()}`;
  }

  function pageHeading(title, copy, art = "") {
    return `<section class="page-hero"><div class="container page-hero-inner"><div>${divider}<h1>${title}</h1><p>${copy}</p></div>${art ? `<div class="page-hero-art" aria-hidden="true">${icon(art)}</div>` : ""}</div></section>`;
  }

  function shop() {
    return `
      ${pageHeading("Shop Pokémon cards", "Explore singles and chase cards from across the Pokémon TCG.", "cards")}
      <section class="section container catalog" aria-label="Card catalog">
        <div class="notice">${icon("bag")} <p><strong>Demo shop.</strong> The cards and prices shown are examples. For stock and pricing, message us on <a href="${config.instagram}" ${newTab}>Instagram</a>.</p></div>
        <div class="shop-controls">
          <div class="filters" role="group" aria-label="Card type">${["All cards", "Singles", "Chase cards"].map((name, i) => `<button type="button" class="filter" data-filter="${name}" aria-pressed="${i === 0}">${name}</button>`).join("")}</div>
          <div class="search-tools"><label class="card-search">${icon("search")}<span class="sr-only">Search cards</span><input id="card-search" type="search" placeholder="Search cards or sets"></label><label class="sort-control"><span class="sr-only">Sort cards</span><select id="card-sort"><option value="featured">Featured</option><option value="low">Price low to high</option><option value="high">Price high to low</option><option value="name">Name A–Z</option></select>${icon("chevron")}</label></div>
        </div>
        <p id="result-count" class="result-count" aria-live="polite"></p>
        <div class="product-grid" id="catalog-results"></div>
      </section>`;
  }

  function faq(items) {
    return `<div class="faq">${items.map(([question, answer]) => `<details><summary>${question}${icon("chevron")}</summary><p>${answer}</p></details>`).join("")}</div>`;
  }

  function trade() {
    return `
      ${pageHeading("Trade with poke.ra", "Make room in your binder for the cards you’ve been chasing.", "trade")}
      <section class="section container split-layout">
        <div>${sectionHeading("From your binder to ours")}
          <ol class="trade-steps">
            <li><strong>Pick the cards you want to trade or sell</strong><p>Note the set, card number, language and condition.</p></li>
            <li><strong>Send us your list</strong><p>Include what you’re looking for. Have clear photos of both sides ready to attach in WhatsApp.</p></li>
            <li><strong>Agree on the details</strong><p>We’ll discuss the cards and arrange a time to meet if there’s a match.</p></li>
          </ol>
        </div>
        <form class="form-panel" data-inquiry="trade">
          <h2>Start a trade enquiry</h2>
          <label>Your name<input name="name" autocomplete="name" required maxlength="80" placeholder="Name"></label>
          <label>What would you like to do?<select name="topic"><option>Trade cards</option><option>Sell cards</option></select></label>
          <label>Cards you’re offering<textarea name="cards" rows="4" required maxlength="700" placeholder="Card name, set, condition and language"></textarea></label>
          <label>Your wishlist, if you have one<input name="wishlist" maxlength="200" placeholder="Any card or set you’re after"></label>
          <button class="button button-dark" type="submit">${icon("message")} Continue to WhatsApp</button>
          <p class="form-note">Attach photos and send the message in WhatsApp.</p>
        </form>
      </section>
      <section class="section container narrow faq-section">${sectionHeading("Trading FAQs")}
        ${faq([["Can I bring my binder to the shop?", "Yes. Message us before visiting to check that someone is available to discuss a trade."], ["What photos should I take?", "Take a clear photo of the front and back in good light. If there is any wear, include a close-up."], ["Can I ask about a specific card?", "Yes. Include the name, set, card number and language in your enquiry."]])}
      </section>`;
  }

  function visit() {
    return `
      ${pageHeading("Find us in Petaling Jaya", "Visit our Bandar Utama shop or catch us at an upcoming card show.", "pin")}
      <section class="section container split-layout visit-layout">
        <div>${sectionHeading(config.store.name)}
          <p class="address">${icon("pin")} <span>${escapeHtml(config.store.address)}</span></p>
          <p class="address">${icon("phone")} <a href="${telephone}">${config.phone}</a></p>
          <p>Check with us for current opening hours, especially around event weekends.</p>
          <div class="button-row"><a class="button button-dark" href="${config.store.maps}" ${newTab}>${icon("pin")} Get directions</a><a class="button button-outline" href="${whatsApp()}" ${newTab}>${icon("message")} Ask about hours</a></div>
        </div>
        <figure class="store-card"><img src="${asset("store.jpg")}" alt="Storefront at Village Shop @ The Club" width="248" height="306"><figcaption>Lot F05 · First Floor</figcaption></figure>
      </section>
      <section class="section container visit-events" aria-label="Next pop-up">${eventPanel()}</section>`;
  }

  function about() {
    return `
      ${pageHeading("Meet poke.ra", "Two collectors who turned a shared love of Pokémon cards into a shop in Petaling Jaya.", "heart")}
      <section class="section container split-layout about-layout">
        <figure class="polaroid about-photo"><img src="${asset("founder.jpg")}" alt="One of the two collectors behind poke.ra, with Pokémon cards at the booth" width="369" height="474"><figcaption>At the poke.ra booth ${icon("heart")}</figcaption></figure>
        <div>${sectionHeading("Made by collectors")}
          <p>We’re two Pokémon collectors who love everything from cute pulls to chase cards. At poke.ra, you can browse singles, bring your trade binder and talk about what you’re collecting.</p>
          <p>You can find us at our Bandar Utama shop and at card shows. Say hi if you see us behind the table.</p>
          <div class="button-row"><a class="button button-dark" href="${url("visit")}">Come visit</a>${social("instagram", "Follow us", "button button-outline")}</div>
        </div>
      </section>`;
  }

  function contact() {
    return `
      ${pageHeading("Say hi", "Questions about a card, a trade or a visit? We’d love to hear from you.", "message")}
      <section class="section container split-layout">
        <div>${sectionHeading("Get in touch")}
          <div class="contact-list">
            <a href="${whatsApp()}" ${newTab}>${icon("message")}<span><strong>WhatsApp</strong><small>${config.phone}</small></span></a>
            <a href="${config.instagram}" ${newTab}>${icon("instagram")}<span><strong>Instagram</strong><small>@poke.ra_</small></span></a>
            <a href="${telephone}">${icon("phone")}<span><strong>Call the shop</strong><small>${config.phone}</small></span></a>
          </div>
        </div>
        <form class="form-panel" data-inquiry="contact">
          <h2>Write a message</h2>
          <label>Your name<input name="name" autocomplete="name" required maxlength="80" placeholder="Name"></label>
          <label>Topic<select name="topic"><option>Card availability</option><option>Trade enquiry</option><option>Shop or pop-up visit</option><option>Collaboration</option><option>Something else</option></select></label>
          <label>Message<textarea name="message" rows="5" required maxlength="1000" placeholder="How can we help?"></textarea></label>
          <button type="submit" class="button button-dark">${icon("message")} Continue to WhatsApp</button>
          <p class="form-note">Review your message in WhatsApp before sending.</p>
        </form>
      </section>
      <section class="section container narrow faq-section">${sectionHeading("Good to know")}
        ${faq([["Can I buy cards through the website?", "The online shop is currently a demo. Message us for real prices and availability."], ["Where can I find pop-up announcements?", `Check <a href="${url("visit")}">Visit & Events</a> or follow our <a href="${config.instagram}" ${newTab}>Instagram</a> for announcements.`], ["How do I ask about a trade?", `Use the <a href="${url("trade")}">trade enquiry form</a> to prepare your message and attach card photos in WhatsApp.`]])}
      </section>`;
  }

  let bag = {};
  let toastTimer;
  const storageKey = "poke-ra-demo-bag-v1";
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey)) || {};
    bag = Object.fromEntries(Object.entries(saved).filter(([id, quantity]) => cards.has(id) && Number.isInteger(quantity) && quantity > 0 && quantity <= 99));
  } catch {
    // Keep the current session usable when browser storage is unavailable.
  }

  function updateBagCount() {
    const total = Object.values(bag).reduce((sum, count) => sum + count, 0);
    document.querySelector("#bag-count").textContent = total;
    document.querySelector("[data-bag]").setAttribute("aria-label", `Open shopping bag, ${total} ${total === 1 ? "item" : "items"}`);
  }

  function changeBag(id, change) {
    if (!cards.has(id)) return;
    const quantity = Math.min(99, Math.max(0, (bag[id] || 0) + change));
    if (quantity) bag[id] = quantity;
    else delete bag[id];
    try { localStorage.setItem(storageKey, JSON.stringify(bag)); } catch { /* Storage is optional. */ }
    updateBagCount();
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("visible"), 2500);
  }

  const closeButton = `<button class="icon-button close-button" type="button" data-close aria-label="Close">${icon("close")}</button>`;

  function showCard(id) {
    const card = cards.get(id);
    if (!card) return;
    cardDialog.innerHTML = `
      ${closeButton}<div class="dialog-product">
        <div class="dialog-art ${card.color}"><img src="${asset(id + ".png")}" alt="${escapeHtml(card.name)} Pokémon card" width="245" height="342"></div>
        <div><p class="eyebrow">${escapeHtml(card.rarity)}</p><h2>${escapeHtml(card.name)}</h2><p>${escapeHtml(card.set)} · ${escapeHtml(card.number)}</p><p class="dialog-price">${money.format(card.price)}</p><p class="form-note">Sample listing and demo price.</p>
        <button class="button button-dark" data-add="${id}" type="button">${icon("bag")} Add to bag</button></div>
      </div>`;
    cardDialog.showModal();
  }

  function renderBag(checkout = false) {
    const entries = Object.entries(bag);
    const total = entries.reduce((sum, [id, count]) => sum + count * cards.get(id).price, 0);
    const title = checkout ? "Demo checkout" : "Your bag";
    const items = entries.map(([id, count]) => {
      const card = cards.get(id);
      return `<li class="bag-line"><img src="${asset(id + ".png")}" alt="" width="245" height="342"><div><strong>${escapeHtml(card.name)}</strong><small>${money.format(card.price)} each</small>
        ${checkout ? `<span>Quantity ${count}</span>` : `<div class="quantity"><button class="icon-button" type="button" data-quantity="-1" data-id="${id}" aria-label="Decrease ${escapeHtml(card.name)} quantity">${icon("minus")}</button><span>${count}</span><button class="icon-button" type="button" data-quantity="1" data-id="${id}" aria-label="Increase ${escapeHtml(card.name)} quantity">${icon("plus")}</button></div>`}
        </div><strong>${money.format(card.price * count)}</strong></li>`;
    }).join("");
    bagDialog.innerHTML = `
      ${closeButton}<div class="bag-heading"><h2>${title}</h2><p>Sample products and prices</p></div>
      ${entries.length ? `<ul class="bag-list">${items}</ul>
        <div class="bag-total"><span>Subtotal</span><strong>${money.format(total)}</strong></div>
        ${checkout ? `<p class="notice">${icon("bag")} Checkout is for preview only. For live availability, <a href="${whatsApp()}" ${newTab}>message the shop</a>.</p><button class="button button-outline" type="button" data-bag>Back to bag</button>`
          : '<button class="button button-dark" type="button" data-checkout>Preview checkout</button>'}`
        : `<div class="empty-state">${icon("bag")}<p>Your bag is empty.</p><a class="button button-dark" href="${url("shop")}">Explore the cards</a></div>`}`;
  }

  function setupCatalog() {
    const list = document.querySelector("#catalog-results");
    const search = document.querySelector("#card-search");
    const sort = document.querySelector("#card-sort");
    const filters = Array.from(document.querySelectorAll("[data-filter]"));
    let active = "All cards";
    function render() {
      const terms = search.value.toLowerCase().trim().split(/\s+/).filter(Boolean);
      const selection = config.cards.filter(card => {
        const text = `${card.name} ${card.set} ${card.number} ${card.rarity}`.toLowerCase();
        return (active === "All cards" || card.type === active) && terms.every(term => text.includes(term));
      });
      const order = { low: (a, b) => a.price - b.price, high: (a, b) => b.price - a.price, name: (a, b) => a.name.localeCompare(b.name) };
      if (order[sort.value]) selection.sort(order[sort.value]);
      document.querySelector("#result-count").textContent = `${selection.length} ${selection.length === 1 ? "card" : "cards"}`;
      list.innerHTML = selection.length ? selection.map(productCard).join("") : `<div class="empty-state catalog-empty">${icon("search")}<p>No cards match your filters.</p><button class="button button-outline" type="button" id="reset-filters">Reset filters</button></div>`;
    }
    function activate(value) {
      active = value;
      filters.forEach(filter => filter.setAttribute("aria-pressed", String(filter.dataset.filter === active)));
      render();
    }
    filters.forEach(filter => filter.addEventListener("click", () => activate(filter.dataset.filter)));
    search.addEventListener("input", render);
    sort.addEventListener("change", render);
    list.addEventListener("click", event => {
      if (event.target.closest("#reset-filters")) {
        search.value = "";
        sort.value = "featured";
        activate("All cards");
        search.focus();
      }
    });
    render();
  }

  function setupTikTok() {
    const frame = document.querySelector(".tiktok-frame");
    const script = document.createElement("script");
    const fallback = frame.querySelector(".tiktok-fallback");
    script.src = "https://www.tiktok.com/embed.js";
    script.async = true;
    script.onerror = () => { fallback.hidden = false; };
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        frame.append(script);
        observer.disconnect();
      }
    }, { rootMargin: "300px" });
    observer.observe(frame);
  }

  function setupMenu() {
    const menu = document.querySelector(".menu-button");
    const nav = document.querySelector("#site-nav");
    const navWrap = menu.closest(".nav-wrap");
    function setOpen(open) {
      nav.classList.toggle("open", open);
      menu.setAttribute("aria-expanded", String(open));
      menu.innerHTML = icon(open ? "close" : "menu");
    }
    menu.addEventListener("click", () => setOpen(menu.getAttribute("aria-expanded") === "false"));
    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && nav.classList.contains("open")) {
        setOpen(false);
        menu.focus();
      }
    });
    document.addEventListener("click", event => {
      if (!event.composedPath().includes(navWrap) && nav.classList.contains("open")) setOpen(false);
    });
  }

  renderHeader();
  const renderPage = { home, shop, trade, visit, about, contact };
  main.innerHTML = renderPage[page]();
  renderFooter();
  updateBagCount();
  setupMenu();
  if (page === "shop") setupCatalog();
  if (page === "home") setupTikTok();

  document.addEventListener("click", event => {
    const button = event.target.closest("button");
    if (!button) {
      if (event.target instanceof HTMLDialogElement) event.target.close();
      return;
    }
    const data = button.dataset;
    if (data.card) showCard(data.card);
    if (data.add) {
      changeBag(data.add, 1);
      if (cardDialog.open) cardDialog.close();
      showToast(`${cards.get(data.add).name} added to your bag`);
    }
    if ("bag" in data) {
      renderBag();
      if (!bagDialog.open) bagDialog.showModal();
      else bagDialog.querySelector("[data-close]").focus();
    }
    if ("checkout" in data) {
      renderBag(true);
      bagDialog.querySelector("[data-close]").focus();
    }
    if (data.quantity) {
      changeBag(data.id, Number(data.quantity));
      renderBag();
      const replacement = bagDialog.querySelector(`[data-id="${data.id}"][data-quantity="${data.quantity}"]`);
      (replacement || bagDialog.querySelector("[data-close]")).focus();
    }
    if ("close" in data) button.closest("dialog").close();
  });

  document.querySelectorAll("[data-inquiry]").forEach(form => form.addEventListener("submit", event => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get("name")).trim();
    const topic = data.get("topic");
    const trading = form.dataset.inquiry === "trade";
    const detailsField = form.elements.namedItem(trading ? "cards" : "message");
    const details = detailsField.value.trim();
    for (const [field, value] of [[form.elements.namedItem("name"), name], [detailsField, details]]) {
      if (!value) {
        field.value = "";
        field.reportValidity();
        return;
      }
    }
    const wish = String(data.get("wishlist") || "").trim();
    const message = trading
      ? `Hi poke.ra! I’m ${name}.\n\nEnquiry: ${topic}\nCards: ${details}${wish ? `\nWishlist: ${wish}` : ""}`
      : `Hi poke.ra! I’m ${name}.\n\nTopic: ${topic}\n\n${details}`;
    window.open(whatsApp(message), "_blank", "noopener,noreferrer");
  }));
})();
