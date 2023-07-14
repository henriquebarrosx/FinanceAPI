import "#/infra/adapters/env-adapter/index.adapter"

import { Router } from "#/infra/router"
import { ExpressAdapter } from "#/infra/adapters/express-adapter"
import { DateFnsAdapter } from "#/infra/adapters/date-fns-adapter"

const httpServer = new ExpressAdapter()
httpServer.init()

const routerSystem = new Router(httpServer)
routerSystem.init()

export const localDate = new DateFnsAdapter()