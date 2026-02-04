import * as P from "@effect/platform";
import { it, expect } from "@effect/vitest"
import { Effect, TestClock, Layer } from "effect"
import * as HTTP from "../src/Http";

// Test that the time endpoint returns the current time from TestClock
it.effect("returns current time from TestClock", () =>
  Effect.gen(function* () {
    const when = new Date("2027-01-01T00:00:00.000Z")
    const whenStr = when.toISOString()
    yield* TestClock.setTime(when)

    const handlerLayer = Layer.mergeAll(
      P.HttpServer.layerContext,
      HTTP.layer,
      P.HttpApiBuilder.Router.Live,
      P.HttpApiBuilder.Middleware.layer
    )

    const app = yield* P.HttpApiBuilder.httpApp.pipe(Effect.provide(handlerLayer))

    const request = P.HttpServerRequest.fromWeb(new Request("http://localhost:3000/time"))
    const response = yield* app.pipe(
      Effect.provideService(P.HttpServerRequest.HttpServerRequest, request),
      Effect.scoped
    )

    expect(response.status).toBe(200)

    const webResponse = P.HttpServerResponse.toWeb(response)
    const content = yield* Effect.promise(() => webResponse.text())
    expect(content).toBe(`\"${whenStr}\"`)
  })
)
