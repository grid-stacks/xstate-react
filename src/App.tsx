import { useMachine } from "@xstate/react";
import "./App.css";
import { trafficLightMachine } from "./machines/trafficLightMachine";

function App() {
	const [current, send] = useMachine(trafficLightMachine);

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
