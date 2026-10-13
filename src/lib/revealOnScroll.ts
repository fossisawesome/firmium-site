import type { Attachment } from 'svelte/attachments'

export function revealOnScroll(options?: { threshold?: number }): Attachment<HTMLElement> {
  return node => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            node.classList.add('show')
            observer.unobserve(node)
          }
        }
      },
      { threshold: options?.threshold ?? 0 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }
}
