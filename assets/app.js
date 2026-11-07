/* AI 黑话词典 — 零依赖前端
 * 数据源：data/glossary.js（由 scripts/sync.mjs 生成）
 */
(function () {
  'use strict';

  var D = window.GLOSSARY;
  if (!D) { document.getElementById('results').textContent = '数据加载失败，请检查 data/glossary.js'; return; }

  var CATS = D.categories, TAGS = D.tags, TERMS = D.terms;
  var catById = {}, tagById = {}, termById = {};
  CATS.forEach(function (c, i) { catById[c.id] = c; c._tone = toneFor(i); });
  TAGS.forEach(function (t) { tagById[t.id] = t; });

  function toneFor(i) {
    var m = ['--tone-1','--tone-1','--tone-2','--tone-2','--tone-2',
             '--tone-3','--tone-4','--tone-4','--tone-3','--tone-3',
             '--tone-4','--tone-4'];
    return 'var(' + (m[i] || '--tone-1') + ')';
  }

  var state = { q: '', cat: '', tags: [], sort: 'cat', term: '', anchor: '' };
  var $ = function (s) { return document.querySelector(s); };
  var el = {
    q: $('#q'), clear: $('#clear-q'), catList: $('#cat-list'), tagList: $('#tag-list'),
    reset: $('#reset-btn'), results: $('#results'), count: $('#result-count'),
    filters: $('#active-filters'), sort: $('#sort-toggle'), toast: $('#toast')
  };

  /* ---------- utils ---------- */
  function esc(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function reEsc(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
  function hl(t, qs) {
    if (!qs.length) return t;
    var re = new RegExp('(' + qs.map(function (q) { return reEsc(q); }).join('|') + ')', 'gi');
    return t.replace(re, '<mark>$1</mark>');
  }
  function rich(text, qs) {
    var parts = String(text || '').split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
    return parts.map(function (p) {
      if (!p) return '';
      if (p.slice(0, 2) === '**' && p.slice(-2) === '**')
        return '<strong>' + hl(esc(p.slice(2, -2)), qs) + '</strong>';
      if (p[0] === '`' && p.slice(-1) === '`')
        return '<code>' + hl(esc(p.slice(1, -1)), qs) + '</code>';
      return hl(esc(p), qs);
    }).join('');
  }
  function renderBlocks(text, qs) {
    var src = String(text || '').replace(/\r\n/g, '\n').trim();
    if (!src) return '';
    var lines = src.split('\n'), out = [], i = 0;
    var isUl = /^\s*[-*]\s+/, isOl = /^\s*\d+\.\s+/;
    while (i < lines.length) {
      if (!lines[i].trim()) { i++; continue; }
      if (/^```/.test(lines[i])) {
        var code = []; i++;
        while (i < lines.length && !/^```/.test(lines[i])) code.push(lines[i++]);
        i++;
        out.push('<pre><code>' + esc(code.join('\n')) + '</code></pre>');
        continue;
      }
      if (isUl.test(lines[i])) {
        var ul = [];
        while (i < lines.length && isUl.test(lines[i]))
          ul.push('<li>' + rich(lines[i++].replace(isUl, ''), qs) + '</li>');
        out.push('<ul>' + ul.join('') + '</ul>');
        continue;
      }
      if (isOl.test(lines[i])) {
        var ol = [];
        while (i < lines.length && isOl.test(lines[i]))
          ol.push('<li>' + rich(lines[i++].replace(isOl, ''), qs) + '</li>');
        out.push('<ol>' + ol.join('') + '</ol>');
        continue;
      }
      var para = [];
      while (i < lines.length && lines[i].trim() && !isUl.test(lines[i]) && !isOl.test(lines[i]) && !/^```/.test(lines[i]))
        para.push(lines[i++]);
      out.push('<p>' + para.map(function (l) { return rich(l, qs); }).join('<br>') + '</p>');
    }
    return out.join('');
  }

  function toast(msg) {
    el.toast.textContent = msg; el.toast.classList.add('on');
    clearTimeout(toast._t); toast._t = setTimeout(function () { el.toast.classList.remove('on'); }, 1900);
  }
  function hay(t) {
    return [t.term, t.en, t.zh, t.def, catById[t.cat].name, catById[t.cat].en]
      .concat(t.tags.map(function (x) { return tagById[x] ? tagById[x].name : ''; }))
      .join(' ').toLowerCase();
  }
  TERMS.forEach(function (t) { t._h = hay(t); termById[t.id] = t; });

  /* ---------- state <-> URL ---------- */
  function readHash() {
    var raw = location.hash.slice(1);
    if (raw && raw.indexOf('=') === -1) { state.anchor = raw; return; }
    state.anchor = '';
    var p = new URLSearchParams(raw);
    state.q = p.get('q') || '';
    state.cat = CATS.some(function (c) { return c.id === p.get('cat'); }) ? p.get('cat') : '';
    state.tags = (p.get('tags') || '').split(',').filter(function (x) {
      return TAGS.some(function (t) { return t.id === x; });
    });
    state.sort = p.get('sort') === 'az' ? 'az' : 'cat';
    state.term = p.get('term') || '';
  }
  function scrollToAnchor() {
    var node = document.getElementById(state.anchor);
    if (node) setTimeout(function () { node.scrollIntoView({ block: 'start', behavior: 'instant' }); }, 40);
  }
  function writeHash(replace) {
    var p = new URLSearchParams();
    if (state.q) p.set('q', state.q);
    if (state.cat) p.set('cat', state.cat);
    if (state.tags.length) p.set('tags', state.tags.join(','));
    if (state.sort !== 'cat') p.set('sort', state.sort);
    if (state.term) p.set('term', state.term);
    var h = p.toString() ? '#' + p.toString() : '';
    var url = location.pathname + location.search + h;
    if (replace === false) history.pushState(null, '', url);
    else history.replaceState(null, '', url);
  }

  /* ---------- filtering ---------- */
  function queryParts() {
    return state.q.trim().toLowerCase().split(/\s+/).filter(Boolean).map(esc);
  }
  function matchBase(t, ignoreCat) {
    var parts = state.q.trim().toLowerCase().split(/\s+/).filter(Boolean);
    for (var i = 0; i < parts.length; i++) if (t._h.indexOf(parts[i]) === -1) return false;
    if (!ignoreCat && state.cat && t.cat !== state.cat) return false;
    for (var j = 0; j < state.tags.length; j++) if (t.tags.indexOf(state.tags[j]) === -1) return false;
    return true;
  }
  function filtered(ignoreCat) { return TERMS.filter(function (t) { return matchBase(t, ignoreCat); }); }

  /* ---------- rendering ---------- */
  function card(t, qs) {
    var c = catById[t.cat];
    var tags = t.tags.map(function (x) {
      return '<span class="mini-tag">' + esc(tagById[x].name) + '</span>';
    }).join('');
    return '<article class="card" id="t-' + esc(t.id) + '">' +
      '<button class="anchor" type="button" data-copy="' + esc(t.id) + '" title="复制此词条链接" aria-label="复制此词条链接">#</button>' +
      '<div class="card-top">' +
        '<h4 class="card-term">' + rich(t.term, qs) + '</h4>' +
        (t.zh ? '<span class="card-zh">' + rich(t.zh, qs) + '</span>' : '') +
        (t.en ? '<span class="card-en">' + rich(t.en, qs) + '</span>' : '') +
      '</div>' +
      '<div class="card-def">' + renderBlocks(t.def, qs) + '</div>' +
      '<div class="card-foot">' +
        '<span class="cat-badge" style="--badge:' + c._tone + '">' + esc(c.name) + '</span>' + tags +
      '</div></article>';
  }

  function renderSidebar() {
    var base = filtered(true);
    var counts = {};
    base.forEach(function (t) { counts[t.cat] = (counts[t.cat] || 0) + 1; });

    el.catList.innerHTML =
      '<button class="cat-btn' + (state.cat ? '' : ' active') + '" data-cat="" type="button">' +
        '<span class="dot" style="--dot:var(--text-3)"></span>全部词条<span class="num">' + base.length + '</span></button>' +
      CATS.map(function (c) {
        return '<button class="cat-btn' + (state.cat === c.id ? ' active' : '') + '" data-cat="' + c.id + '" type="button" title="' + esc(c.desc) + '">' +
          '<span class="dot" style="--dot:' + c._tone + '"></span>' + esc(c.name) +
          '<span class="num">' + (counts[c.id] || 0) + '</span></button>';
      }).join('');

    var inCat = TERMS.filter(function (t) {
      if (state.cat && t.cat !== state.cat) return false;
      var parts = state.q.trim().toLowerCase().split(/\s+/).filter(Boolean);
      return parts.every(function (p) { return t._h.indexOf(p) !== -1; });
    });
    el.tagList.innerHTML = TAGS.map(function (t) {
      var n = inCat.filter(function (x) { return x.tags.indexOf(t.id) !== -1; }).length;
      var on = state.tags.indexOf(t.id) !== -1;
      return '<button class="tag-chip' + (on ? ' active' : '') + '" data-tag="' + t.id + '" type="button"' +
        (n === 0 && !on ? ' style="opacity:.42"' : '') + ' title="' + esc(t.desc) + '">' + esc(t.name) + '</button>';
    }).join('');
  }

  function renderFilters() {
    var out = [];
    if (state.cat) out.push('<span class="pill">' + esc(catById[state.cat].name) + ' <button data-rm="cat" type="button" aria-label="移除分类">×</button></span>');
    state.tags.forEach(function (id) {
      out.push('<span class="pill">' + esc(tagById[id].name) + ' <button data-rm="' + id + '" type="button" aria-label="移除标签">×</button></span>');
    });
    el.filters.innerHTML = out.join('');
    var any = state.q || state.cat || state.tags.length;
    el.reset.classList.toggle('on', !!any);
    el.clear.classList.toggle('on', !!state.q);
  }

  function renderResults() {
    var qs = queryParts();
    var list = filtered(false);
    el.count.innerHTML = '共 <b>' + list.length + '</b> 条' + (list.length !== TERMS.length ? ' / ' + TERMS.length + ' 条' : '') +
      (state.q ? ' · 匹配「' + esc(state.q.trim()) + '」' : '');
    el.sort.querySelectorAll('button').forEach(function (b) {
      b.classList.toggle('active', b.dataset.sort === state.sort);
    });

    if (!list.length) {
      el.results.innerHTML = '<div class="empty"><b>没有匹配的词条</b>换个关键词，或清除筛选条件试试。</div>';
      return;
    }

    var html = '';
    if (state.sort === 'cat') {
      CATS.forEach(function (c) {
        var group = list.filter(function (t) { return t.cat === c.id; });
        if (!group.length) return;
        html += '<div class="group-head" id="g-' + c.id + '"><h3>' + esc(c.name) + '</h3>' +
          '<span class="g-en">' + esc(c.en) + '</span><span class="g-line"></span>' +
          '<span class="g-count">' + group.length + ' 条</span></div>';
        html += '<div class="cards">' + group.map(function (t) { return card(t, qs); }).join('') + '</div>';
      });
    } else {
      var sorted = list.slice().sort(function (a, b) {
        return a.term.localeCompare(b.term, 'en', { sensitivity: 'base' });
      });
      html = '<div class="cards">' + sorted.map(function (t) { return card(t, qs); }).join('') + '</div>';
    }
    el.results.innerHTML = html;
  }

  function render() {
    renderSidebar();
    renderFilters();
    renderResults();
  }

  /* ---------- static blocks ---------- */
  function renderStatic() {
    $('#stat-terms').textContent = TERMS.length;
    $('#stat-cats').textContent = CATS.length;
    $('#stat-tags').textContent = TAGS.length;
    $('#stat-confuse').textContent = D.confusions.length;
    $('#foot-updated').textContent = '最后更新 ' + D.meta.updated + ' · ' + D.meta.license;
    $('#hero-intro').textContent = D.meta.description || '';

    $('#confuse-grid').innerHTML = D.confusions.map(function (c) {
      var links = (c.terms || []).map(function (id) {
        var t = termById[id];
        return t ? '<a class="confuse-link" href="#term=' + encodeURIComponent(id) + '">' + esc(t.term) + '</a>' : '';
      }).join('');
      return '<div class="confuse"><h4>' + esc(c.pair) + '</h4><p>' + rich(c.note, []) + '</p>' +
        (links ? '<div class="confuse-links">' + links + '</div>' : '') + '</div>';
    }).join('');

    $('#link-groups').innerHTML = D.links.map(function (g) {
      return '<div class="link-group"><h4>' + esc(g.group) + '</h4><ul>' + g.items.map(function (it) {
        return '<li><div class="link-head"><a href="' + esc(it.url) + '" target="_blank" rel="noopener noreferrer">' +
          esc(it.name) + '</a>' + (it.meta ? '<span class="link-meta">' + esc(it.meta) + '</span>' : '') + '</div>' +
          (it.note ? '<p class="link-note">' + rich(it.note, []) + '</p>' : '') + '</li>';
      }).join('') + '</ul></div>';
    }).join('');
  }

  /* ---------- events ---------- */
  el.q.addEventListener('input', function () {
    state.q = el.q.value; state.term = ''; writeHash(); render();
  });
  el.clear.addEventListener('click', function () {
    state.q = ''; el.q.value = ''; writeHash(); render(); el.q.focus();
  });
  el.catList.addEventListener('click', function (e) {
    var b = e.target.closest('[data-cat]'); if (!b) return;
    state.cat = b.dataset.cat; state.term = ''; writeHash(false); render();
  });
  el.tagList.addEventListener('click', function (e) {
    var b = e.target.closest('[data-tag]'); if (!b) return;
    var id = b.dataset.tag, i = state.tags.indexOf(id);
    if (i === -1) state.tags.push(id); else state.tags.splice(i, 1);
    state.term = ''; writeHash(false); render();
  });
  el.filters.addEventListener('click', function (e) {
    var b = e.target.closest('[data-rm]'); if (!b) return;
    var v = b.dataset.rm;
    if (v === 'cat') state.cat = '';
    else state.tags = state.tags.filter(function (x) { return x !== v; });
    writeHash(false); render();
  });
  el.reset.addEventListener('click', function () {
    state.q = ''; state.cat = ''; state.tags = []; state.term = ''; el.q.value = '';
    writeHash(false); render();
  });
  el.sort.addEventListener('click', function (e) {
    var b = e.target.closest('[data-sort]'); if (!b) return;
    state.sort = b.dataset.sort; writeHash(); render();
  });
  el.results.addEventListener('click', function (e) {
    var b = e.target.closest('[data-copy]'); if (!b) return;
    var url = location.origin + location.pathname + '#term=' + encodeURIComponent(b.dataset.copy);
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(function () { toast('词条链接已复制'); },
        function () { toast('复制失败，请手动复制地址栏链接'); });
    } else { toast('请手动复制：' + url); }
  });

  document.addEventListener('keydown', function (e) {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); el.q.focus(); el.q.select(); }
    if (e.key === 'Escape' && document.activeElement === el.q) {
      if (el.q.value) { el.q.value = ''; state.q = ''; writeHash(); render(); }
      else el.q.blur();
    }
  });
  $('#theme-btn').addEventListener('click', function () {
    var next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('ag-theme', next); } catch (err) {}
  });
  window.addEventListener('hashchange', function () {
    readHash();
    if (state.anchor) { scrollToAnchor(); return; }
    el.q.value = state.q; render();
  });
  window.addEventListener('popstate', function () {
    readHash();
    if (state.anchor) { scrollToAnchor(); return; }
    el.q.value = state.q; render();
  });
  window.addEventListener('scroll', function () {
    $('#searchbar').classList.toggle('stuck', window.scrollY > 4);
    $('#to-top').classList.toggle('on', window.scrollY > 900);
  }, { passive: true });
  $('#to-top').addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  if (!/Mac|iPhone|iPad/.test(navigator.platform)) $('#kbd-mod').textContent = 'Ctrl';

  /* ---------- boot ---------- */
  renderStatic();
  readHash();
  el.q.value = state.q;

  if (state.term) {
    var target = TERMS.filter(function (t) { return t.id === state.term; })[0];
    if (target && !matchBase(target, false)) {
      state.q = ''; state.cat = ''; state.tags = []; el.q.value = '';
    }
  }
  render();

  if (state.anchor) scrollToAnchor();

  if (state.term) {
    var node = document.getElementById('t-' + state.term);
    if (node) {
      node.classList.add('focused');
      setTimeout(function () { node.scrollIntoView({ block: 'center' }); }, 60);
    }
  }
})();
