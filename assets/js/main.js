// Mobile nav toggle
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var mobileNav = document.querySelector('.mobile-nav');
  if (toggle && mobileNav) {
    toggle.addEventListener('click', function () {
      var open = mobileNav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Copy-to-clipboard for promo code widgets
  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var text = btn.getAttribute('data-copy');
      navigator.clipboard.writeText(text).then(function () {
        var original = btn.textContent;
        btn.textContent = 'COPIED';
        setTimeout(function () { btn.textContent = original; }, 1800);
      });
    });
  });
});
