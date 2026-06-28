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

/* ============================================================
   CONTACT FORM VALIDATION
   Only runs on contact.html
   ============================================================ */
if (document.getElementById('submitBtn')) {

    const submitBtn = document.getElementById('submitBtn');
    const successAlert = document.getElementById('successAlert');

    /* Validate email format using regex */
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    /* Clear validation state from a field */
    function clearValidation(field) {
        field.classList.remove('is-invalid', 'is-valid');
    }

    /* Mark field as invalid and show error */
    function setInvalid(field, errorId) {
        field.classList.add('is-invalid');
        field.classList.remove('is-valid');
        document.getElementById(errorId).style.display = 'block';
    }

    /* Mark field as valid and hide error */
    function setValid(field, errorId) {
        field.classList.add('is-valid');
        field.classList.remove('is-invalid');
        document.getElementById(errorId).style.display = 'none';
    }

    /* Main form validation on submit */
    submitBtn.addEventListener('click', function () {
        const name = document.getElementById('fullName');
        const email = document.getElementById('email');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');
        let valid = true;

        /* Validate name field */
        if (name.value.trim().length < 3) {
            setInvalid(name, 'nameError');
            valid = false;
        } else {
            setValid(name, 'nameError');
        }

        /* Validate email field */
        if (!isValidEmail(email.value.trim())) {
            setInvalid(email, 'emailError');
            valid = false;
        } else {
            setValid(email, 'emailError');
        }

        /* Validate subject dropdown */
        if (subject.value === '') {
            setInvalid(subject, 'subjectError');
            valid = false;
        } else {
            setValid(subject, 'subjectError');
        }

        /* Validate message length */
        if (message.value.trim().length < 20) {
            setInvalid(message, 'messageError');
            valid = false;
        } else {
            setValid(message, 'messageError');
        }

        /* If all valid show success alert and reset form */
        if (valid) {
            successAlert.style.display = 'block';
            name.value = '';
            email.value = '';
            document.getElementById('phone').value = '';
            subject.value = '';
            message.value = '';
            [name, email, subject, message].forEach(f => clearValidation(f));
            successAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });

    /* Live validation on input for better UX */
    document.getElementById('fullName').addEventListener('input', function () {
        if (this.value.trim().length >= 3) setValid(this, 'nameError');
    });
    document.getElementById('email').addEventListener('input', function () {
        if (isValidEmail(this.value.trim())) setValid(this, 'emailError');
    });
    document.getElementById('subject').addEventListener('change', function () {
        if (this.value !== '') setValid(this, 'subjectError');
    });
    document.getElementById('message').addEventListener('input', function () {
        if (this.value.trim().length >= 20) setValid(this, 'messageError');
    });
}

/* ============================================================
   DISTRIBUTOR FORM VALIDATION
   Only runs on distributors.html
   ============================================================ */
if (document.getElementById('distributorForm')) {

    const distBtn = document.getElementById('distSubmitBtn');
    const distSuccess = document.getElementById('distSuccessAlert');

    distBtn.addEventListener('click', function () {
        const inputs = document.querySelectorAll('#distributorForm input');
        let valid = true;

        /* Check all inputs are filled */
        inputs.forEach(function (input) {
            if (input.value.trim() === '') {
                input.style.border = '2px solid #dc3545';
                valid = false;
            } else {
                input.style.border = '2px solid #1a5c2a';
            }
        });

        /* Show success and reset if valid */
        if (valid) {
            distSuccess.style.display = 'block';
            inputs.forEach(function (input) {
                input.value = '';
                input.style.border = '';
            });
            distSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });

    /* Live border reset on input */
    document.querySelectorAll('#distributorForm input').forEach(function (input) {
        input.addEventListener('input', function () {
            if (this.value.trim() !== '') {
                this.style.border = '2px solid #1a5c2a';
            }
        });
    });
}

/* ============================================================
   NEWSLETTER FORM
   Runs on any page with a newsletter form
   ============================================================ */
if (document.getElementById('newsletterForm')) {

    const newsletterBtn = document.getElementById('newsletterBtn');
    const newsletterInput = document.getElementById('newsletterEmail');
    const newsletterMsg = document.getElementById('newsletterMsg');

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    newsletterBtn.addEventListener('click', function () {
        const email = newsletterInput.value.trim();

        if (!isValidEmail(email)) {
            newsletterInput.style.border = '2px solid #dc3545';
            newsletterMsg.textContent = '⚠️ Please enter a valid email address.';
            newsletterMsg.style.color = '#dc3545';
            newsletterMsg.style.display = 'block';
        } else {
            newsletterInput.style.border = '2px solid #1a5c2a';
            newsletterMsg.textContent = '✅ Subscribed! Welcome to the Ngao community.';
            newsletterMsg.style.color = '#f4c842';
            newsletterMsg.style.display = 'block';
            newsletterInput.value = '';
        }
    });
}/* ============================================================
   PRODUCT FILTER
   Only runs on products.html
   ============================================================ */
if (document.querySelector('.filter-btn')) {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productItems = document.querySelectorAll('.product-item');
    const noResults = document.getElementById('noResults');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');
            let visible = 0;

            productItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    visible++;
                } else {
                    item.style.display = 'none';
                }
            });

            noResults.style.display = visible === 0 ? 'block' : 'none';
        });
    });
}