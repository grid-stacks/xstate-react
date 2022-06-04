import { useMachine } from "@xstate/react";
import "./App.css";
import { trafficLightMachine } from "./machines/trafficLightMachine";
import { pizzaBakingMachine } from "./machines/pizzaBakingMachine";
import { useEffect } from "react";

function App() {
	const [current, send] = useMachine(trafficLightMachine);
	const [currentPizza, sendPizza] = useMachine(pizzaBakingMachine);

	useEffect(() => {
		console.log("Pizza Baking Machine ==============");
		// console.log(pizzaBakingMachine.initialState);
		console.log("Current value:", currentPizza.value);
		// console.log("Current context:", currentPizza.context);
		// console.log("Current transitions:", currentPizza.transitions);

		sendPizza({ type: "TYPES_UPDATE", payload: "Chilli" }); // way 1
		// sendPizza("TYPES_UPDATE", { payload: "Motor" }); // way 2

		sendPizza("NEXT");

		console.log("Pizza Baking Machine ==============");
	}, [currentPizza]);

	return (
		<div className="App">
			<h1>Xstate</h1>
			<br />

			<div>
				<input
					type="radio"
					readOnly
					name="light"
					id="red"
					value="red"
					checked={current.matches({ ON: "red" })}
				/>
				<label htmlFor="red">Red</label>
			</div>
			<div>
				<input
					type="radio"
					readOnly
					name="light"
					id="yellow"
					value="yellow"
					checked={current.matches({ ON: "yellow" })}
				/>
				<label htmlFor="yellow">Yellow</label>
			</div>
			<div>
				<input
					type="radio"
					readOnly
					name="light"
					id="green"
					value="green"
					checked={current.matches({ ON: "green" })}
				/>
				<label htmlFor="green">Green</label>
			</div>
			<button onClick={() => send("TURN_OFF")}>Off</button>
			<button onClick={() => send("TURN_ON")}>On</button>
			<button onClick={() => send("NEXT")}>Next</button>
		</div>
	);
}

export default App;
