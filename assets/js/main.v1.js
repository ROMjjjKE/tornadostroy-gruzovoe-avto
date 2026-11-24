/* Солохин: меню, выбор узла, FAQ, форма */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var WA = 'https://wa.me/375295618073';

  var drw = $('#drawer'), burger = $('#burger'), x = $('#drawerClose');
  function openM() { if (!drw) return; drw.classList.add('on'); document.body.style.overflow = 'hidden'; burger.setAttribute('aria-expanded', 'true'); var f = $('a,button', drw); if (f) f.focus(); }
  function closeM() { if (!drw) return; drw.classList.remove('on'); document.body.style.overflow = ''; if (burger) { burger.setAttribute('aria-expanded', 'false'); burger.focus(); } }
  if (burger) burger.addEventListener('click', openM);
  if (x) x.addEventListener('click', closeM);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && drw && drw.classList.contains('on')) closeM();
    if (e.key === 'Tab' && drw && drw.classList.contains('on')) {
      var it = $$('a,button', drw), first = it[0], last = it[it.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  $$('.faq__q').forEach(function (q) {
    q.addEventListener('click', function () {
      var open = q.getAttribute('aria-expanded') === 'true';
      q.setAttribute('aria-expanded', open ? 'false' : 'true');
      var a = q.nextElementSibling; if (a) a.classList.toggle('on', !open);
    });
  });

  var U = window.SOL_UNITS, box = $('.pick');
  if (U && box) {
    var ti = $('#uTitle'), tx = $('#uText'), me = $('#uMeta'), li = $('#uList'), wa = $('#uWa');
    function show(k) {
      var u = U[k]; if (!u) return;
      $$('.pick__l button', box).forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-u') === k ? 'true' : 'false'); });
      ti.textContent = u.t; tx.textContent = u.d;
      me.innerHTML = u.m.map(function (m) { return '<span>' + m + '</span>'; }).join('');
      li.innerHTML = u.l.map(function (i) { return '<li>' + i + '</li>'; }).join('');
      wa.href = WA + '?text=' + encodeURIComponent('Здравствуйте! Нужен ремонт: ' + u.t + '. Пришлю фото, подскажите по срокам и цене.');
    }
    $$('.pick__l button', box).forEach(function (b) { b.addEventListener('click', function () { show(b.getAttribute('data-u')); }); });
    show(Object.keys(U)[0]);
  }

  var form = $('form.form'), msg = $('#formMsg');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var d = new FormData(form), name = (d.get('name') || '').toString().trim(), phone = (d.get('phone') || '').toString().trim(), m = (d.get('msg') || '').toString().trim();
      if (name.length < 2 || phone.length < 6) { msg.textContent = 'Нужны имя и телефон, иначе не перезвонить.'; return; }
      var lines = ['Заявка с сайта: ' + document.title, 'Имя: ' + name, 'Телефон: ' + phone];
      if (m) lines.push('Техника и повреждение: ' + m);
      msg.textContent = 'Открываю WhatsApp с готовым сообщением.';
      window.open(WA + '?text=' + encodeURIComponent(lines.join('\n')), '_blank');
    });
  }
})();
