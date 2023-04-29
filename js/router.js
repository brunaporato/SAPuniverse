export default class Router {
  routes = {}

  add(routeName, page) {
    this.routes[routeName] = page
  }

  changeBackground() {
    const {pathname} = window.location
    const page = document.querySelector('body')
    let currentBackground
  
    switch (pathname) {
      case "/": currentBackground = "/assets/mountains-universe-1.png"
      break;
      case "/universe": currentBackground = "/assets/mountains-universe02.png"
      break;
      case "/explore": currentBackground = "/assets/mountains-universe-3.png"
      break;
      default: currentBackground = "/assets/mountains-universe-1.png"
      break;
    }
  
    page.style.setProperty("background-image", `url(${currentBackground})`)
  }

  route(event) {
    event = event || window.event
    event.preventDefault()

    window.history.pushState({}, "", event.target.href)

    this.handle()
  }

  handle() {
    const pathname = window.location.pathname
    const route = this.routes[pathname] || this.routes[404]

    this.changeBackground()

    if(pathname == '/' || pathname == '/universe' || pathname == '/explore') {
      document.querySelector(`a[href="${pathname}"]`).classList.add('active')
    }

    fetch(route)
    .then(data => data.text())
    .then(html => document.querySelector('#app').innerHTML = html)
  }
}