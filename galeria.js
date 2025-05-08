document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.galeria-img');
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modal-image');
    const captionText = document.getElementById('caption');
    const closeButton = document.querySelector('.close-button');

    images.forEach(img => {
        img.addEventListener('click', function() {
            modal.style.display = 'block';
            modalImage.src = this.src;
            captionText.innerHTML = this.alt;
        });
    });

    closeButton.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});