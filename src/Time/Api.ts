import * as P from "@effect/platform";
import * as S from "effect/Schema";

export class TimeGroup extends P.HttpApiGroup.make("time")
	.add(P.HttpApiEndpoint.get("getTime", "/").addSuccess(S.String))
	.prefix("/time")
	.annotate(P.OpenApi.Title, "Time") {}
