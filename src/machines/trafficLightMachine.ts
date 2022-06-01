import { createMachine } from "xstate";

type trafficLightEvents = { type: "NEXT" };
type trafficLightStates =
	| { value: "red"; context: undefined }
	| { value: "yellow"; context: undefined }
	| { value: "green"; context: undefined };

export const trafficLightMachine = createMachine<
	undefined,
	trafficLightEvents,
	trafficLightStates
>({
	id: "trafficLight",
	initial: "red",
	context: undefined,
	states: {
		red: {
			on: {
				NEXT: "yellow",
			},
		},
		yellow: {
			on: {
				NEXT: "green",
			},
		},
		green: {
			on: {
				NEXT: "red",
			},
		},
	},
});
