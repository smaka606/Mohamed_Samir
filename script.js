// فلترة المنتجات حسب الفئة
document.querySelectorAll('.category-button').forEach(function(button) {
    button.addEventListener('click', function() {
        const category = this.getAttribute('data-category');
        const products = document.querySelectorAll('.product');

        products.forEach(function(product) {
            if (category === 'all' || product.getAttribute('data-category') === category) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    });
});

// سلة التسوق
let cart = [];

document.querySelectorAll('.add-to-cart-button').forEach(function(button) {
    button.addEventListener('click', function() {
        const productName = this.parentElement.querySelector('h3').textContent;
        cart.push(productName);
        updateCart();
        alert(`${productName} تم إضافته إلى السلة.`);
    });
});

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    cart.forEach(function(item, index) {
        const listItem = document.createElement('li');
        listItem.textContent = `${item} `;
        const removeButton = document.createElement('button');
        removeButton.textContent = 'إزالة';
        removeButton.addEventListener('click', function() {
            cart.splice(index, 1);
            updateCart();
        });
        listItem.appendChild(removeButton);
        cartItems.appendChild(listItem);
    });
}

// نظام التوصيل
document.getElementById('checkout-button').addEventListener('click', function() {
    const deliveryTime = document.getElementById('delivery-time').value;
    alert(`تم تقديم طلبك وسيتم التوصيل في فترة ${deliveryTime}.`);
});

// مراجعات المستخدمين
document.getElementById('review-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('review-name').value;
    const text = document.getElementById('review-text').value;
    const newReview = document.createElement('div');
    newReview.classList.add('review');
    newReview.innerHTML = `<p><strong>${name}:</strong> ${text}</p>`;
    document.getElementById('reviews-section').appendChild(newReview);
    this.reset();
});

// التعامل مع نموذج "اسأل طبيب"
document.getElementById('ask-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('ask-name').value;
    const email = document.getElementById('ask-email').value;
    const question = document.getElementById('ask-question').value;
    const result = document.getElementById('ask-result');

    result.textContent = `شكراً، ${name}. تم إرسال سؤالك إلى الطبيب. سنرد عليك قريباً على بريدك الإلكتروني: ${email}.`;
    result.style.color = 'green';

    document.getElementById('ask-form').reset();
});

// التعامل مع نموذج "اتصل بنا"
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const message = document.getElementById('contact-message').value;
    const result = document.getElementById('contact-result');

    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
        from_name: name,
        from_email: email,
        message: message
    }).then(function(response) {
        result.textContent = 'شكراً لتواصلك معنا! سيتم الرد عليك قريباً.';
        result.style.color = 'green';
    }, function(error) {
        result.textContent = 'تبا ! حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.';
        result.style.color = 'red';
    });

    document.getElementById('contact-form').reset();
});

// نقل المستخدم إلى خادم Discord عند النقر على الرابط
document.getElementById('discord-link').addEventListener('click', function(event) {
    window.open('https://discord.gg/ZBrqM5a3', '_blank');
});

// إضافة تفاعل عند النقر على صناديق الخدمات
const services = document.querySelectorAll('.service');

services.forEach(service => {
    service.addEventListener('click', () => {
        alert('سيتم توجيهك إلى صفحة تفاصيل الخدمة قريبًا!');
        // يمكنك استخدام window.location.href لتوجيه المستخدم إلى صفحة أخرى
        // مثال: window.location.href = 'service-details.html';
    });
});

// طرق الدفع
document.querySelectorAll('.payment-method').forEach(function(paymentMethod) {
    paymentMethod.addEventListener('click', function() {
        // إزالة التحديد من جميع طرق الدفع
        document.querySelectorAll('.payment-method').forEach(function(pm) {
            pm.classList.remove('selected');
        });

        // تحديد طريقة الدفع الحالية
        this.classList.add('selected');
        const paymentMethodName = this.querySelector('h3').textContent;
        alert(`لقد اخترت طريقة الدفع: ${paymentMethodName}`);
    });
});
