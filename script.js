const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#site-nav');

menuButton.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navigation.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

document.querySelectorAll('.video-shell').forEach((shell) => {
  const video = shell.querySelector('video');

  const playVideo = () => {
    video.muted = true;
    video.play().then(() => shell.classList.add('is-playing')).catch(() => {});
  };

  const pauseVideo = () => {
    video.pause();
    shell.classList.remove('is-playing');
  };

  if (window.matchMedia('(hover: hover)').matches) {
    shell.addEventListener('mouseenter', playVideo);
    shell.addEventListener('mouseleave', pauseVideo);
  }

  shell.addEventListener('click', () => {
    document.querySelectorAll('.video-shell video').forEach((otherVideo) => {
      if (otherVideo !== video) {
        otherVideo.pause();
        otherVideo.closest('.video-shell').classList.remove('is-playing');
      }
    });

    if (video.paused) playVideo();
    else pauseVideo();
  });

  video.addEventListener('ended', () => shell.classList.remove('is-playing'));
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
document.querySelector('#year').textContent = new Date().getFullYear();
