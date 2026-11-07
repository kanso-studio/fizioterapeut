 document.addEventListener("DOMContentLoaded", function() {
     // 1. Scroll Reveal Animation
     const reveals = document.querySelectorAll('.reveal');
     const revealOnScroll = () => {
         const windowHeight = window.innerHeight;
         const elementVisible = 100;
         reveals.forEach((reveal) => {
             const elementTop = reveal.getBoundingClientRect().top;
             if (elementTop < windowHeight - elementVisible) {
                 reveal.classList.add('active');
             }
         });
     };
     window.addEventListener('scroll', revealOnScroll);
     revealOnScroll();

     // 2. Services Tabs Logic
     const tabBtns = document.querySelectorAll('.tab-btn');
     const serviceGrids = document.querySelectorAll('.services-grid');

     tabBtns.forEach(btn => {
         btn.addEventListener('click', () => {
             tabBtns.forEach(b => b.classList.remove('active'));
             serviceGrids.forEach(g => g.classList.remove('active'));
             btn.classList.add('active');
             const targetId = btn.getAttribute('data-target');
             document.getElementById(targetId).classList.add('active');
         });
     });

     // 3. Service/Package Modal Window Logic
     const modalOverlay = document.getElementById('serviceModal');
     const closeModalBtn = document.getElementById('closeModal');
     const modalImg = document.getElementById('modalImg');
     const modalTitle = document.getElementById('modalTitle');
     const modalDesc = document.getElementById('modalDesc');

     const modalTriggers = document.querySelectorAll('.trigger-modal');

     modalTriggers.forEach(trigger => {
         trigger.addEventListener('click', function(e) {
             e.preventDefault();
             const card = this.closest('[data-title]');

             if (card) {
                 const title = card.getAttribute('data-title');
                 const desc = card.getAttribute('data-desc');
                 const img = card.getAttribute('data-img');

                 if(title && desc) {
                     modalTitle.textContent = title;
                     modalDesc.textContent = desc;
                     modalImg.src = img || 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';

                     modalOverlay.classList.add('active');
                     document.body.style.overflow = 'hidden';
                 }
             }
         });
     });

     const closeModal = () => {
         modalOverlay.classList.remove('active');
         document.body.style.overflow = '';
     };

     closeModalBtn.addEventListener('click', closeModal);
     modalOverlay.addEventListener('click', (e) => {
         if (e.target === modalOverlay) closeModal();
     });

     // 4. Video Modal Logic (Naša priča)
     const btnOurStory = document.getElementById('btnOurStory');
     const videoModal = document.getElementById('videoModal');
     const closeVideoModal = document.getElementById('closeVideoModal');
     const storyVideo = document.getElementById('storyVideo');

     btnOurStory.addEventListener('click', (e) => {
         e.preventDefault();
         videoModal.classList.add('active');
         document.body.style.overflow = 'hidden';
         storyVideo.play().catch(() => {});
     });

     const closeVideo = () => {
         videoModal.classList.remove('active');
         document.body.style.overflow = '';
         storyVideo.pause();
         storyVideo.currentTime = 0;
     };

     closeVideoModal.addEventListener('click', closeVideo);
     videoModal.addEventListener('click', (e) => {
         if (e.target === videoModal) closeVideo();
     });

     document.addEventListener('keydown', (e) => {
         if (e.key === 'Escape') {
             if (modalOverlay.classList.contains('active')) closeModal();
             if (videoModal.classList.contains('active')) closeVideo();
         }
     });

     // 5. Testimonial Slider Logic
     const slides = document.querySelectorAll('.testimonial-item');
     const prevBtn = document.querySelector('.prev');
     const nextBtn = document.querySelector('.next');
     let currentSlide = 0;

     function showSlide(index) {
         slides.forEach(slide => slide.classList.remove('active'));
         if (index >= slides.length) currentSlide = 0;
         if (index < 0) currentSlide = slides.length - 1;
         slides[currentSlide].classList.add('active');
     }

     nextBtn.addEventListener('click', () => {
         currentSlide++;
         showSlide(currentSlide);
     });

     prevBtn.addEventListener('click', () => {
         currentSlide--;
         showSlide(currentSlide);
     });

     setInterval(() => {
         currentSlide++;
         showSlide(currentSlide);
     }, 6000);
 });
