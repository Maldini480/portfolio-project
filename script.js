document.addEventListener("DOMContentLoaded", () => {
  // 1. Мобильное меню
  const burger = document.getElementById("burger");
  const nav = document.getElementById("nav");
  const navLinks = document.querySelectorAll(".nav a");

  burger.addEventListener("click", () => {
    nav.classList.toggle("active");
  });

  // Закрытие меню при клике на ссылку
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("active");
    });
  });

  // 2. Анимация появления секций при скролле (Scroll Reveal)
  const revealElements = document.querySelectorAll(".section-reveal");

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // 3. Подсветка активного пункта меню при скролле
  const sections = document.querySelectorAll("section[id]");

  window.addEventListener("scroll", () => {
    let current = "";
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  // 4. Копирование контактов (Toast уведомление)
  const toast = document.getElementById("toast");

  window.copyToClipboard = function (text) {
    // Так как контакты еще не готовы, мы просто показываем уведомление
    toast.textContent = text + " (Скопировано)";
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 2500);
  };
});
