(() => {
	const flavorNames = ['ORIGINAL', 'BLACK', 'DARK BLUE', 'GREEN', 'LIGHT BLUE', 'ORANGE', 'ORIGINAL ZERO', 'YELLOW'];

	const swiperElement = document.querySelector('.swiper-container');
	if (swiperElement && typeof Swiper !== 'undefined') {
		const slideLabel = swiperElement.querySelector('.slide-label');
		const slideProgress = swiperElement.querySelector('.slide-progress span');
		const updateSlideMeta = (swiper) => {
			const index = swiper.realIndex % flavorNames.length;
			if (slideLabel) {
				slideLabel.textContent = `FLAVOR ${String(index + 1).padStart(2, '0')} / ${flavorNames[index]}`;
			}
			if (slideProgress) {
				slideProgress.style.width = `${((index + 1) / flavorNames.length) * 100}%`;
			}
		};

		const swiper = new Swiper(swiperElement, {
			effect: 'coverflow',
			grabCursor: true,
			centeredSlides: true,
			slidesPerView: 'auto',
			loop: true,
			speed: 850,
			keyboard: { enabled: true },
			autoplay: {
				delay: 3200,
				disableOnInteraction: false,
				pauseOnMouseEnter: true,
			},
			coverflowEffect: {
				rotate: 0,
				stretch: 0,
				depth: 200,
				modifier: 1,
				slideShadows: true,
			},
			pagination: {
				el: swiperElement.querySelector('.swiper-pagination'),
				clickable: true,
			},
			navigation: {
				nextEl: swiperElement.querySelector('.slider-next'),
				prevEl: swiperElement.querySelector('.slider-prev'),
			},
			on: {
				init: updateSlideMeta,
				realIndexChange: updateSlideMeta,
			},
		});

		swiperElement.addEventListener('focusin', () => swiper.autoplay.stop());
		swiperElement.addEventListener('focusout', () => swiper.autoplay.start());
	}

	const revealItems = document.querySelectorAll('.scroll-reveal');
	const revealObserver = new IntersectionObserver((entries, observer) => {
		entries.forEach((entry) => {
			if (!entry.isIntersecting) return;
			entry.target.classList.add('is-visible');
			observer.unobserve(entry.target);
		});
	}, { threshold: 0.15 });

	revealItems.forEach((item) => revealObserver.observe(item));

	const parallaxItems = document.querySelectorAll('.parallax-item');
	const updateParallax = () => {
		parallaxItems.forEach((item) => {
			const speed = Number(item.dataset.speed) || 0;
			const offset = (window.scrollY - item.offsetTop) * speed;
			item.style.transform = `translateY(${offset}px)`;
		});
	};

	window.addEventListener('scroll', updateParallax, { passive: true });
	updateParallax();

	const progressBar = document.querySelector('.scroll-progress span');
	const updateScrollProgress = () => {
		const availableScroll = document.documentElement.scrollHeight - window.innerHeight;
		const progress = availableScroll > 0 ? (window.scrollY / availableScroll) * 100 : 0;
		if (progressBar) progressBar.style.width = `${progress}%`;
	};
	window.addEventListener('scroll', updateScrollProgress, { passive: true });
	updateScrollProgress();

	window.toggleMenu = () => {
		const menuToggle = document.querySelector('.toggle');
		const navigation = document.querySelector('.navigation');
		navigation.classList.toggle('active');
		menuToggle.classList.toggle('active');
	};

	document.querySelectorAll('.navigation a').forEach((link) => {
		link.addEventListener('click', () => {
			document.querySelector('.navigation').classList.remove('active');
			document.querySelector('.toggle').classList.remove('active');
		});
	});
})();
