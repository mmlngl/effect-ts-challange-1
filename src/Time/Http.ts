import * as P from "@effect/platform";
import * as Api from "../Api";

export const TimeGroup = P.HttpApiBuilder.group(
	Api.ServerApi,
	"time",
	(handlers) =>
		handlers.handle("getTime", () => {
			return P.HttpServerResponse.text("yo");
		}),
);
