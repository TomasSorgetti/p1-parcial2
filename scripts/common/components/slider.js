export class Slider {
  constructor(container, interval = 3000) {
    this.container = container;
    this.slider = container.querySelector(".slider");
    this.slides = Array.from(container.querySelectorAll(".slide"));
    this.dots = Array.from(container.querySelectorAll(".slider-dots .dot"));
    this.prevButton = container.querySelector("#prev");
    this.nextButton = container.querySelector("#next");

    this.currentIndex = 0;
    this.interval = interval;
    this.autoplayTimer = null;

    this.bindEvents();
    this.updateUI();
    this.startAutoplay();
  }

  updateUI() {
    this.slides.forEach((slide, index) => {
      slide.style.display = index === this.currentIndex ? "block" : "none";
    });

    this.dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === this.currentIndex);
    });
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    this.updateUI();
  }

  prevSlide() {
    this.currentIndex =
      (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    this.updateUI();
  }

  startAutoplay() {
    this.autoplayTimer = setInterval(() => this.nextSlide(), this.interval);
  }

  stopAutoplay() {
    clearInterval(this.autoplayTimer);
    this.autoplayTimer = null;
  }

  bindEvents() {
    this.nextButton.addEventListener("click", () => {
      this.nextSlide();
      this.stopAutoplay();
    });

    this.prevButton.addEventListener("click", () => {
      this.prevSlide();
      this.stopAutoplay();
    });

    this.dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        this.currentIndex = index;
        this.updateUI();
        this.stopAutoplay();
      });
    });

    this.container.addEventListener("mouseenter", () => this.stopAutoplay());

    this.container.addEventListener("mouseleave", () => this.startAutoplay());
  }
}
