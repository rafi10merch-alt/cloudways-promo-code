// CloudSavings — main.js
// Mobile nav toggle + copy-to-clipboard. No dependencies, no build step.

(function () {
  var toggle = document.querySelector('.nav-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var isOpen = document.body.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  var copyButtons = document.querySelectorAll('.copy-btn[data-copy]');
  copyButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var value = btn.getAttribute('data-copy');
      var done = function () {
        var original = btn.textContent;
        btn.textContent = 'COPIED';
        btn.classList.add('copied');
        setTimeout(function () {
          btn.textContent = original;
          btn.classList.remove('copied');
        }, 1800);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(value).then(done).catch(function () {
          fallbackCopy(value, done);
        });
      } else {
        fallbackCopy(value, done);
      }
    });
  });

  function fallbackCopy(text, cb) {
    var el = document.createElement('textarea');
    el.value = text;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    try { document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(el);
    cb();
  }
})();
