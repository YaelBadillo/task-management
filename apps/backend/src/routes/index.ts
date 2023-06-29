import { Router } from 'express'
import { glob } from 'glob'

export function registerRoutes(router: Router) {
  const routes = glob.sync(__dirname + '/**/*.routes.*')
  const staticRouteIndex = routes.findIndex(route =>
    route.endsWith('static.routes.ts'),
  )

  if (staticRouteIndex !== -1) {
    const staticRoute = routes.splice(staticRouteIndex, 1)[0]
    routes.push(staticRoute)
  }

  routes.map(route => register(route, router))
}

function register(routePath: string, app: Router) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const route = require(routePath)
  route.register(app)
}
