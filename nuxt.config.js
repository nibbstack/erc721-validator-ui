let meta = {
  title: 'ERC721 Validator',
  description: 'Validates ERC721 smart contracts and tokens'
}

module.exports = {
  head: {
    title: meta.title,
    meta: [
      { charset: "utf-8" },
      { hid: "title", property: "og:title", content: meta.title },
      { property: "og:description", content: meta.description },
      { hid: "twitterTitle", property: "twitter:title", content: meta.title },
      { property: "twitter:description", content: meta.description },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: meta.description }
    ],
    link: [{ rel: "icon", type: "image/png", href: "/favicon.png" }]
  },
  css: [
    { src: "~/assets/scss/styles.scss" }
  ],
  sassResources: [
    '@/assets/scss/_config.scss'
  ],
  loading: {
    color: "#0971FF"
  },
  plugins: [
    { src: "~plugins/ga.js", ssr: false },
    { src: "~plugins/vee-validate.js" }
  ],
  modules: [
    '@nuxtjs/axios',
    'nuxt-sass-resources-loader'
  ],
  env: {
    API_BASE_URL: process.env.API_BASE_URL || 'https://api-staging.0xcert.org'
  },
  axios: {
    baseURL: 'https://api.erc721validator.org'
  },
  build: {
    vendor: [
      'axios'
    ],
  }
}