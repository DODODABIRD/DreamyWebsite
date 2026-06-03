document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initNewsletterForm();
});
function initNewsletterForm() {
    const form = document.getElementById('newsletter-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim(); //Error cek
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const topic = document.getElementById('topic').value;
        const frequency = form.querySelector('input[name="frequency"]:checked');

        let isValid = true;
        clearErrors();

        //Nama
        if (name === '') {
            showError('name-error', 'Full name is required.');
            isValid = false;
        } else if (name.length < 3) {
            showError('name-error', 'Name must be at least 3 characters long.');
            isValid = false;
        }

        //Email
        if (email === '') {
            showError('email-error', 'Email address is required.');
            isValid = false;
        } else {
            const atIndex = email.indexOf('@');
            const dotIndex = email.lastIndexOf('.');
            
            if (atIndex === -1 || dotIndex === -1) {
                showError('email-error', 'Please enter a valid email address (missing @ or .)');
                isValid = false;
            } else if (atIndex === 0 || atIndex === email.length - 1) {
                showError('email-error', '@ cannot be at the start or end.');
                isValid = false;
            } else if (dotIndex <= atIndex + 1 || dotIndex === email.length - 1) {
                showError('email-error', 'Invalid domain structure.');
                isValid = false;
            }
        }

        //hp
        if (phone === '') {
            showError('phone-error', 'Phone number is required.');
            isValid = false;
        } else {
            let isNumeric = true;
            for (let i = 0; i < phone.length; i++) {
                if (phone[i] < '0' || phone[i] > '9') {
                    isNumeric = false;
                    break;
                }
            }
            
            if (!isNumeric) {
                showError('phone-error', 'Phone number must contain digits only.');
                isValid = false;
            } else if (phone.length < 10 || phone.length > 13) {
                showError('phone-error', 'Phone number must be between 10 and 13 digits.');
                isValid = false;
            }
        }

        //topik
        if (topic === '') {
            showError('topic-error', 'Please select a topic of interest.');
            isValid = false;
        }

        //frek
        if (!frequency) {
            showError('frequency-error', 'Please select an update frequency.');
            isValid = false;
        }
        //debug
        if (isValid) {
            const submitBtn = form.querySelector('button');
            submitBtn.innerText = 'Processing...';
            submitBtn.disabled = true;

            setTimeout(() => {
                alert('Thank you for subscribing to FontDale Updates!\nA confirmation has been sent to ' + email);
                form.reset();
                submitBtn.innerText = 'Subscribe Now';
                submitBtn.disabled = false;
            }, 1500);
        }
    });
}


// Todo:
// Tes interaksi
// Ganti nama id lebih formal
// Cari cara validasi nomor spesiall
function showError(id, message) {
    const errorEl = document.getElementById(id);
    if (errorEl) {
        errorEl.innerText = message;
    }
}

function clearErrors() {
    const errors = document.querySelectorAll('.error-message');
    errors.forEach(err => {
        err.innerText = '';
    });
}
