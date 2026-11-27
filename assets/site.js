(function () {
  var PHONE = '0431 185 183', TEL = '0431185183';
  var IG = 'https://www.instagram.com/frank_windscreens_tint/';
  var FB = 'https://www.facebook.com/profile.php?id=100068637372931';
  var MAPS = 'https://www.google.com/maps/search/?api=1&query=209+Bunda+Street+Parramatta+Park+QLD+4870';
  var BOOK = 'https://book.servicem8.com/request_service_online_booking?strVendorUUID=01a1d9bd-eef0-7040-ba52-909918bd473b';
  var here = location.pathname.split('/').pop() || 'index.html';
  var links = [
    ['/windscreen-replacement.html', 'Windscreens'],
    ['/chip-repair.html', 'Chip repair'],
    ['/window-tinting.html', 'Tinting'],
    ['/side-rear-windows.html', 'Side windows'],
    ['/contact.html', 'Contact']
  ];
  var cur = function (h) { return h === '/' + here ? ' aria-current="page"' : ''; };
  var icon = '<svg viewBox="0 0 42 34" aria-hidden="true"><path d="M5 2h32l3 26q-19 6-38 0z" fill="none" stroke="#fff" stroke-width="2.2" stroke-linejoin="round"/><path d="M12 9l-3 9M18 8l-2 6" stroke="#e3262b" stroke-width="1.8" stroke-linecap="round"/></svg>';
  var igSvg = '<svg viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 4.7a5.1 5.1 0 1 0 0 10.2 5.1 5.1 0 0 0 0-10.2zm0 8.4a3.3 3.3 0 1 1 0-6.6 3.3 3.3 0 0 1 0 6.6zm5.3-9.8a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4z"/></svg>';
  var fbSvg = '<svg viewBox="0 0 24 24"><path d="M14 8.5V6.8c0-.8.5-1 1-1h2.3V2.2L14.1 2.2C10.6 2.2 10 4.8 10 6.5v2H7.7v3.7H10V22h4v-9.8h3l.4-3.7z"/></svg>';

  var nav = document.querySelector('[data-nav]');
  if (nav) {
    var isHome = document.body.classList.contains('home');
    nav.innerHTML =
      '<div class="nav-left"><button class="burger" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="navLinks"><span></span></button>' +
      '<nav class="nav-links" id="navLinks" aria-label="Main">' + links.map(function (l) { return '<a href="' + l[0] + '"' + cur(l[0]) + '>' + l[1] + '</a>'; }).join('') + '</nav></div>' +
      '<a class="logo" href="/" aria-label="Frank Windscreens & Tint home">' + icon + '<b>FRANK<span>.</span></b></a>' +
      '<div class="nav-right"><a class="nav-phone" href="tel:' + TEL + '">Call ' + PHONE + '</a></div>';

    var burger = nav.querySelector('.burger'), menu = nav.querySelector('.nav-links');
    burger.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    menu.addEventListener('click', function (e) { if (e.target.closest('a')) { menu.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); } });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { menu.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); } });

    var tog = nav.querySelector('.toggle');
    if (tog) tog.addEventListener('click', function () {
      var on = tog.getAttribute('aria-pressed') !== 'true';
      tog.setAttribute('aria-pressed', String(on));
      if (window.__studioLights) window.__studioLights(on);
    });
    var onScroll = function () { nav.classList.toggle('scrolled', scrollY > 40); };
    addEventListener('scroll', onScroll, { passive: true }); onScroll();
  }

  /* floating booking button: one tap straight to online booking */
  var fab = document.createElement('div');
  fab.className = 'fab';
  fab.innerHTML =
    '<a class="fab-btn" href="' + BOOK + '" target="_blank" rel="noopener">' +
      '<span class="fab-ic" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="5" width="17" height="15.5" rx="2.5" stroke="#0a0b0d" stroke-width="1.9"/><path d="M3.5 10h17M8 3v4M16 3v4" stroke="#0a0b0d" stroke-width="1.9"/><path class="tick" d="M8.6 14.8l2.3 2.3 4.5-4.6" stroke="#e3262b" stroke-width="2"/></svg></span>' +
      '<span class="fab-t"><b>Book online</b><small>Choose a service and time</small></span>' +
    '</a>';
  document.body.appendChild(fab);
  // visible on every page; on the home page it slides in once the opening has finished
  setTimeout(function () { fab.classList.add('on'); }, document.body.classList.contains('home') ? 2600 : 300);

  /* analytics (GA4): loads only when an ID is set; tracks calls, texts, directions and booking taps */
  var GA_ID = 'G-LN0RWZTGZS';
  var track = function () {};
  if (GA_ID && !/localhost|127\.0\.0\.1/.test(location.hostname)) {
    var gs = document.createElement('script'); gs.async = true; gs.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(gs);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag('js', new Date()); gtag('config', GA_ID);
    track = function (name, params) { gtag('event', name, params || {}); };
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a'); if (!a) return;
    var h = a.getAttribute('href') || '', where = a.closest('.fab') ? 'quote_button' : a.closest('.nav') ? 'menu' : a.closest('.foot') ? 'footer' : 'page';
    if (h.indexOf('tel:') === 0) track('generate_lead', { method: 'phone_call', placement: where });
    else if (h.indexOf('sms:') === 0) track('generate_lead', { method: 'text_message', placement: where });
    else if (/book\.servicem8\.com/.test(h)) track('book_online', { placement: where });
    else if (/g\.page\/r\//.test(h)) track('review_click', { action: 'leave_review', placement: where });
    else if (/maps\?cid=/.test(h)) track('review_click', { action: 'read_reviews', placement: where });
    else if (/google\.com\/maps/.test(h)) track('get_directions', { placement: where });
    else if (/instagram\.com|facebook\.com/.test(h)) track('social_click', { network: /instagram/.test(h) ? 'instagram' : 'facebook', placement: where });
    else if (/contact\.html$/.test(h)) track('quote_page', { placement: where });
  }, true);

  var foot = document.querySelector('[data-foot]');
  if (foot) {
    foot.innerHTML =
      '<div class="foot-grid">' +
        '<div class="foot-brand"><a class="logo" href="/" aria-label="Frank Windscreens & Tint home" style="justify-content:start">' + icon + '<b>FRANK<span>.</span></b></a>' +
          '<p>Windscreens, stone chip repairs, side windows and window tinting in Cairns. All makes and models.</p>' +
          '<a class="foot-phone" href="tel:' + TEL + '">' + PHONE + '</a></div>' +
        '<div><p class="foot-h">Services</p><ul>' + links.slice(0, 4).map(function (l) { return '<li><a href="' + l[0] + '">' + l[1] + '</a></li>'; }).join('') + '</ul></div>' +
        '<div><p class="foot-h">Workshop</p><ul><li><a href="' + MAPS + '" target="_blank" rel="noopener">209 Bunda Street<br>Parramatta Park QLD 4870</a></li><li>Next to Lifeline, opposite Cairns Central</li></ul></div>' +
        '<div><p class="foot-h">Follow</p><ul><li><a href="' + IG + '" target="_blank" rel="noopener">Instagram</a></li><li><a href="' + FB + '" target="_blank" rel="noopener">Facebook</a></li><li><a href="https://www.google.com/maps?cid=11645218612399860823" target="_blank" rel="noopener">Google reviews</a></li><li><a href="' + BOOK + '" target="_blank" rel="noopener">Book online</a></li><li><a href="/contact.html">Get a quote</a></li><li><a href="/privacy.html">Privacy</a></li></ul></div>' +
      '</div>' +
      '<div class="foot-base"><span>© 2026 Frank Windscreens &amp; Tint · Cairns, Queensland</span><span>Windscreens · Chip repairs · Tinting</span></div>';
  }
})();
