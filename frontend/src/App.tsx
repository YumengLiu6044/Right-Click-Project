import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/home";
import { useState } from "react";
import type { Customer, WorkOrderEquipment, WorkOrderLabor } from "./lib/data";
import Bill from "./pages/bill";

function App() {
	const [customer, setCustomer] = useState<Customer | null>(null);
	const [equipment, setEquipment] = useState<WorkOrderEquipment[]>([]);
	const [labor, setLabor] = useState<WorkOrderLabor[]>([]);
	const [notes, setNotes] = useState("");
	const [workOrderId, setWorkOrderId] = useState("");

	return (
		<BrowserRouter>
			<Routes>
				<Route
					index
					element={
						<Home
							customer={customer}
							setCustomer={setCustomer}
							equipment={equipment}
							setEquipment={setEquipment}
							labor={labor}
							setLabor={setLabor}
							notes={notes}
							setNotes={setNotes}
							workOrderId={workOrderId}
							setWorkOrderId={setWorkOrderId}
						/>
					}
				/>
				<Route
					path="/bill"
					element={
						<Bill
							customer={customer}
							setCustomer={setCustomer}
							equipment={equipment}
							setEquipment={setEquipment}
							labor={labor}
							setLabor={setLabor}
							notes={notes}
							setNotes={setNotes}
							workOrderId={workOrderId}
							setWorkOrderId={setWorkOrderId}
						/>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
