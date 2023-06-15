export const Observer: IntersectionObserver = new IntersectionObserver(
  (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("aos-show");
        entry.target.classList.remove("aos-hide");
      } else {
        entry.target.classList.remove("aos-show");
        entry.target.classList.add("aos-hide");
      }
    });
  }
);

export const DetectIntersection = () => {
  const elements: NodeListOf<HTMLElement> = document.querySelectorAll(".aos-hide");

  elements.forEach((el: HTMLElement) => {
    Observer.observe(el);
  });
};
