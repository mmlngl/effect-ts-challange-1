import * as P from "@effect/platform";
import * as Api from "../Api";
import * as Effect from 'effect/Effect'
import * as DateTime from 'effect/DateTime'

export const TimeGroup = P.HttpApiBuilder.group(
  Api.ServerApi,
  "time",
  (handlers) =>
    handlers.handle("getTime", () => Effect.gen(function* () {
      const now = yield* DateTime.now.pipe(Effect.andThen(d => DateTime.formatIso(d)));
      return P.HttpServerResponse.text(now)
    })))
