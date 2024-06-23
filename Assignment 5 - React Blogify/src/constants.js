export const BASE_URL = import.meta.env.VITE_BASE_URL

// for email validation in register and log in
export const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

// random jokes that are added in the not found page
export const WEB_DEV_JOKES = [
  'Why did the web developer go broke? Because he used up all his cache!',
  'Why do programmers prefer dark mode? Because light attracts bugs!',
  "Why was the JavaScript developer sad? Because he didn't know how to 'null' his feelings.",
  'Why was the CSS developer so good at yoga? Because they mastered the art of flexbox!',
  "Why don't programmers like nature? It has too many bugs.",
  "Why did the developer go broke? Because he used up all his 'cache' flow!",
  'Why did the web developer stay home? Because he lost his domain!',
  "Why did the HTML and CSS files have a fight? Because they couldn't agree on stylesheets!",
  'Why did the developer go to therapy? Because he had too many issues.',
  "Why did the JavaScript developer break up with React? It wasn't his type(script) anymore.",
]

// blog actions
export const SET_BLOGS = 'set_blogs'
export const INCREMENT_PAGE = 'increment_page'
export const SET_HAS_MORE = 'set_has_more'
export const SET_LOADING = 'set_loading'
export const SET_ERROR = 'set_error'
export const DELETE_BLOG = 'delete_blog'
