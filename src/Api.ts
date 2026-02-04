import * as P from "@effect/platform";
import * as Time from "./Time/Api";

export class ServerApi extends P.HttpApi.make("server-api").add(
	Time.TimeGroup,
) {}
