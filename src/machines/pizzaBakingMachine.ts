import { assign, createMachine } from "xstate";

type pizzaBakingContext = {
	status: string;
	type: string;
	toppings: string;
	address: string;
	baking_time: number;
};
type pizzaBakingEvents =
	| { type: "NEXT" }
	| { type: "PREV" }
	| { type: "TYPES_UPDATE"; payload: string }
	| { type: "BAKING_TICK" };
type pizzaBakingStates =
	| { value: "SET_TYPE"; context: pizzaBakingContext }
	| { value: "SET_TOPPINGS"; context: pizzaBakingContext }
	| { value: "SET_ADDRESS"; context: pizzaBakingContext }
	| { value: "START_BAKING"; context: pizzaBakingContext };

export const pizzaBakingMachine =
	/** @xstate-layout N4IgpgJg5mDOIC5QAcCWAvdBDAQlg1qgHZQB0AygKIAqA+tQJoAKlAxAHKUAa1iKA9rFQAXVPyJ8QAD0QBaAIwBmAKykATAE41ABgBsigCzaNujYoDsygDQgAnnLXnSG7QYOG3KowYAcAXz8bNExcAmIyKjpGFlZoynJaAFUmABEAQWpKSWRBETEJJGk5eTVSA3lzPXM1I3N5fS0bewRZFR8ytSUfHQrXV10AoIxsPEISChp6AHkmJgBJdgBxcg5uXkKcoVFxSRkWpVU1XW0fbWVzA3NdX18mxF1242VlHwuNcw-5bTVBkGCRsLjSLTWYLZasJgAJUoADVsrltgVQHsFCp1Fo9IZjKYLNY7HJLM5XAY1IprpU1J1fv9QmMIpM0ikUtDyCtODx4Vt8rtimjNDp9EYTGZLHcEPUDKQnspdMoXJdDIp5NThrTwhM6IzmfEVlDYZy8jtCiiDuiBVjhbixTopRpnhpuhoST4nd8VSFRuryNQ0pC6Dg0gBpMEQ6FwjYI7nG3mHDGC7EivHNeT1W3PK6VErKI4Gd0AukUH1+2gB4NLVilsH0OYAYUDBsRPIQlO06lJym0ikMSl8ijF8g7pCulLUPi+8leBmUud+RH4EDg2VVnqBkziDajyLkSqcnUUJmuU7H5TFsncQ4slg+hjtJ1cebVq6iM3mS3IG6NW5ailKjmuKl0UkDDtAxdDFJxTHtCwlR8F0HnMB8V3pTUmRZd8Iy5T8im-XxSFebQJ2nYC2nkftylIfdnl0eodBAklEMBCIi39IMwQ-JFsNaX8rncGUgJAsD8XFQdh0pMcCMnacGLpdim1aao8MzHwiLMF5SKEs8lQ6Lo9FJJ0lEUAIAiAA */
	createMachine<pizzaBakingContext, pizzaBakingEvents, pizzaBakingStates>(
		{
			context: {
				status: "Deciding",
				type: "Pepperoni",
				toppings: "New Toppings",
				address: "My address",
				baking_time: 0,
			},
			id: "pizzaBaking",
			initial: "SET_TYPE",
			states: {
				SET_TYPE: {
					on: {
						NEXT: {
							target: "SET_TOPPINGS",
						},
						TYPES_UPDATE: {
							actions: assign({
								type: (context, event) => {
									console.log(event);
									// console.log(context);
									return event.payload;
								},
							}),
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
					entry: "startBaking",
					invoke: {
						src: () => (cb) => {
							window.setInterval(() => {
								cb("BAKING_TICK");
							}, 5000);
						},
					},
					on: {
						PREV: {
							target: "SET_ADDRESS",
						},
						BAKING_TICK: {
							actions: assign({
								baking_time: (context, event) => {
									console.log(event);
									console.log(context);
									return context.baking_time + 5;
								},
							}),
						},
					},
				},
			},
		},
		{
			actions: {
				// updateType: assign({
				// 	type: (context, event) => {
				// 		console.log(event);
				// 		console.log(context);
				// 		return event.payload; // Todo: Have to fix event payload type
				// 	},
				// }),
				startBaking: (context, event) => {
					console.log("Start baking");
					console.log(event);
					// console.log(context);
					return (context.status = "Baking!!!"); // Assign new value to context and return it
				},
			},
		}
	);
