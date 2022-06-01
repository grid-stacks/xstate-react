import { createMachine } from "xstate";

type trafficLightEvents =
	| { type: "NEXT" }
	| { type: "TURN_ON" }
	| { type: "TURN_OFF" };
type trafficLightStates =
	| { value: { ON: "red" }; context: undefined }
	| { value: { ON: "yellow" }; context: undefined }
	| { value: { ON: "green" }; context: undefined }
	| { value: "OFF"; context: undefined };

export const trafficLightMachine = createMachine<
	undefined,
	trafficLightEvents,
	trafficLightStates
>({
	id: "trafficLight",
	initial: "OFF",
	context: undefined,
	states: {
		ON: {
			initial: "red",
			on: {
				TURN_OFF: "OFF",
			},
			states: {
				red: {
					on: {
						NEXT: "yellow",
					},
					after: { 2000: "yellow" },
				},
				yellow: {
					on: {
						NEXT: "green",
					},
					after: { 2000: "green" },
				},
				green: {
					on: {
						NEXT: "red",
					},
					after: { 2000: "red" },
				},
			},
		},
		OFF: {
			on: {
				TURN_ON: "ON",
			},
		},
	},
});
