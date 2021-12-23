import { quadInOut } from 'svelte/easing'

export default function (node, options) {
  const opacity = getComputedStyle(node).opacity
  return {
    delay: options.delay || 0,
    duration: options.duration || 300,
    easing: options.easing || quadInOut,
    css: (time) =>
      `opacity: ${time * Number(opacity)}; transform: scale(${time});`,
  }
}
