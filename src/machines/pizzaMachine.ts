import { createMachine } from "xstate";

type pizzaBakingContext = {
	status: string;
	type: string;
	toppings: string;
	address: string;
};
type pizzaBakingEvents = { type: "NEXT" } | { type: "PREV" };
type pizzaBakingStates =
	| { value: "SET_TYPE"; context: pizzaBakingContext }
	| { value: "SET_TOPPINGS"; context: pizzaBakingContext }
	| { value: "SET_ADDRESS"; context: pizzaBakingContext }
	| { value: "START_BAKING"; context: pizzaBakingContext };

const pizzaBakingMachine =
	/** @xstate-layout N4IgpgJg5mDOIC5QAcCWAvdBDAQlg1qgHZQB0AygKIAqA+tQJoAKlAxAHKUAa1iKA9rFQAXVPyJ8QAD0QBaAIwBWUgBYAbAGYATCoDsK7YvkAODQAZ5AGhABPRPIeljATkXHFZ45vlqVOgL7+1miYuATEZFR01ADyTEwAkuwA4uQc3LxIIMiCImISWTIICsoG8s4uurpmeuY61nYIWma6Tq7GulrGNXqK+oHBGNh4hCQUNPRxiSlpTABKlABqkjlCouKSRSWqmjr6hibmVraImm1uaj6KzmrGWpdqA9lDYaOREwCCACJfC+RpnB4K1y6wKoC2Sh22j0Bi0RlMFgaiHMGnO7nkWgcBmcNSeIWG4TGUVo31+lH+rHmS2Ba3ymzkkPU0P2cMOiJOCCUzjRpjUZjMzmcKnkGjxLxGEQo1A+czoOA+AGkkslKQtlllVnkNoUGaVdjCDgjjo04coXBdmi1XLoNI8nkR+BA4CtxYT3tFmJQaVqwdIGc5Whp0R51F4g2okQgbqQzGo4VpdH15ImNM4tGLQhKiRNYvFleRvaD6QgOqRFIotEGzBpFLbuuzGvI9Kp2rocUHrioVBmCW9xnRSX8CxqQXSdcUtFpuTURWohZ0TPctJGuvJSOU3Oo07o1NclD3XpLyNLZbR5UqUoWx+DEKXy5XujW6-zjYgp2Yy3GjBoVJ4+mm7UGTM3SvbUbwnWsY2FW150xO440jWRuXkGcYL0OCdG7QJ-CAA */
	createMachine<pizzaBakingContext, pizzaBakingEvents, pizzaBakingStates>({
		context: {
			status: "Deciding",
			type: "Pepperoni",
			toppings: "New Toppings",
			address: "My address",
		},
		id: "pizzaBaking",
		initial: "SET_TYPE",
		states: {
			SET_TYPE: {
				on: {
					NEXT: {
						target: "SET_TOPPINGS",
					},
				},
			},
			SET_TOPPINGS: {
				on: {
					NEXT: {
						target: "SET_ADDRESS",
					},
					PREV: {
						target: "SET_TYPE",
					},
				},
			},
			SET_ADDRESS: {
				on: {
					NEXT: {
						target: "START_BAKING",
					},
					PREV: {
						target: "SET_TOPPINGS",
					},
				},
			},
			START_BAKING: {
				on: {
					PREV: {
						target: "SET_ADDRESS",
					},
				},
			},
		},
	});
