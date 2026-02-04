import * as P from "@effect/platform";
import * as Layer from "effect/Layer";
import * as Api from "./Api";
import * as Time from "./Time/Http";

const ModulesLayer = Layer.mergeAll(Time.TimeGroup);

export const layer = Layer.provide(
	P.HttpApiBuilder.api(Api.ServerApi),
	ModulesLayer,
);
