/* ============================================================
   main.js — Ngao Beverages Ltd
   Global JavaScript for all pages
   ============================================================ */

/* ── Smooth scroll for anchor links ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

/* ── Navbar scroll shadow effect ── */
window.addEventListener('scroll', function () {
    const nav = document.getElementById('mainNav');
    if (nav) {
        if (window.scrollY > 50) {
            nav.style.boxShadow = '0 4px 20px rgba(0,0,0,0.25)';
        } else {
            nav.style.boxShadow = 'none';
        }
    }
});

/* ── Animate progress bars on scroll (sustainability page) ── */
function animateProgressBars() {
    const bars = document.querySelectorAll('.progress-bar');
    if (bars.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const targetWidth = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = targetWidth;
                }, 100);
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.3 });

    bars.forEach(bar => observer.observe(bar));
}

/* ── Run on DOM ready ── */
document.addEventListener('DOMContentLoaded', function () {
    animateProgressBars();
});