import * as P from "@effect/platform";
import * as Bun from "@effect/platform-bun";
import * as Layer from "effect/Layer";
import * as Fn from "effect/Function";
import * as Http from "./Http";

const MainLive = Layer.mergeAll(
	Http.layer,
	Bun.BunHttpServer.layer({ port: 3000 }),
);

const HttpServerLive = P.HttpApiBuilder.serve(
	Fn.flow(P.HttpMiddleware.logger, P.HttpMiddleware.cors()),
).pipe(Layer.provide(MainLive));

Bun.BunRuntime.runMain(Layer.launch(HttpServerLive));
