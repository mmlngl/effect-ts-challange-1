import * as P from "@effect/platform";
import * as N from "@effect/platform-node";
import * as Layer from "effect/Layer";
import * as Http from "./Http";
import { createServer } from "node:http";

const HttpLive = P.HttpApiBuilder.serve().pipe(
	Layer.provide(Http.layer),
	Layer.provide(N.NodeHttpServer.layer(createServer, { port: 3000 })),
);

N.NodeRuntime.runMain(Layer.launch(HttpLive));
