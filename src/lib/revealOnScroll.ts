export function revealOnScroll(node: HTMLElement, options?: { threshold?: number }) {
  const threshold = options?.threshold ?? 0.15
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          node.classList.add('show')
          observer.unobserve(node)
        }
      }
    },
    { threshold },
  )
  observer.observe(node)
  return {
    destroy() {
      observer.disconnect()
    },
  }
}
