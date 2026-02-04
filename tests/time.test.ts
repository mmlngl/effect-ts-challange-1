import * as P from "@effect/platform";
import { it, expect } from "@effect/vitest"
import { Effect, TestClock, TestContext, Layer } from "effect"
import * as HTTP from "../src/Http";

// Test that the time endpoint returns the current time from TestClock
it.effect("returns current time from TestClock", () =>
  Effect.gen(function* () {

    const handlerLayer = Layer.mergeAll(
      P.HttpServer.layerContext,
      HTTP.layer,
      TestContext.TestContext
    )

    // Create the handler within an effect that provides the layer
    const handlerEffect = Effect.gen(function* () {
      const { handler, dispose } = P.HttpApiBuilder.toWebHandler(handlerLayer)

      const request = new Request("http://localhost:3000/time")
      const response = yield* Effect.promise(() => handler(request))

      yield* Effect.promise(() => dispose())
      return response
    }).pipe(Effect.provide(handlerLayer))

    // yield* TestClock.setTime(testTime)

    const response = yield* handlerEffect

    expect(response.status).toBe(200)

    const content = yield* Effect.promise(() => response.text())
    expect(content).toBe('1970-01-01T00:00:00.000Z')
  }).pipe(Effect.provide(TestContext.TestContext))
)
