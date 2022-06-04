import { assign, createMachine } from "xstate";

type pizzaBakingContext = {
	status: string;
	type: string;
	toppings: string;
	address: string;
};
type pizzaBakingEvents =
	| { type: "NEXT" }
	| { type: "PREV" }
	| { type: "TYPES_UPDATE"; payload: string };
type pizzaBakingStates =
	| { value: "SET_TYPE"; context: pizzaBakingContext }
	| { value: "SET_TOPPINGS"; context: pizzaBakingContext }
	| { value: "SET_ADDRESS"; context: pizzaBakingContext }
	| { value: "START_BAKING"; context: pizzaBakingContext };

export const pizzaBakingMachine =
	/** @xstate-layout N4IgpgJg5mDOIC5QAcCWAvdBDAQlg1qgHZQB0AygKIAqA+tQJoAKlAxAHKUAa1iKA9rFQAXVPyJ8QAD0QBaAIwBWUgBYAbAGYATCoDsK7YvkAODQAZ5AGhABPRPIeljATkXHFZ45vlqVOgL7+1miYuATEZFR0jCysMZTktACqTAAiAILUlJLIgiJiEkjS9ma6qg76xroavorOpdZ2CLJaJqRqrWbOarryZhoaitWBwRjYeIQkFDT0APJMTACS7ADi5BzcvEW5QqLikjLNSqoa8s4uurpmeuY6jYhapU6uVVrG13pDKiMgIePhUyicwWyzWrCYACVKAA1HJ5PaFUCHBTKdTaPQGLRGUwWe4ITTPNxqHx1NTGLTEtQ-P5hSaRGbpVKpKHkdacHhw3YFA5yY5onT6QwmcxWWyIcwaQnueSteQGerfIK-Ma0iLTOiM5kJdaQmGc-L7IrIvmaAWY7EivFKZxS0xqMxdZwqeQaakqiZq8jUdIQug4dIAaVB4KhsO28O5Rt5qNNGKFONFTSxyhcRMepVc1SpPyI-AgcBy7oB9OizGy4a5hqRvOcZQ00o86i89bUeO6pDMHUUWl0Q3kvY0zi0btCHsBM2o8yWq3I+oRPIQVVIim79f6ihq71xYoQcrKKheunq9bqKkVo1HxfVtE1LNnFYNiOKzS0Wht1xdaidula5I6eLeeRSDONx1CHXQ1DqJQR3+OkKG9X1aH9INVjnSNq0XMoVy0NdBk3B1Eweeply7F0VE8IYh2zC9YIiNCq2fFoNw7Z0am-X8KS0PEWmcICOj6VxTh-Gps0CIA */
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
					TYPES_UPDATE: {
						actions: assign({
							type: (context, event) => {
								console.log(event);
								console.log(context);
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
				on: {
					PREV: {
						target: "SET_ADDRESS",
					},
				},
			},
		},
	});
