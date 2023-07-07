import { ExpressAdapter } from "./infra/adapters/express-adapter"
import { DotEnvAdapter } from "./infra/adapters/env-adapter/index.adapter"

const envBootstrap = new DotEnvAdapter()
envBootstrap.init()

const httpServer = new ExpressAdapter()
httpServer.init()
