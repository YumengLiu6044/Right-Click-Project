import { useState } from "react";
import { CustomerSelector } from "./customer-selector";
import { EquipmentSelector } from "./equipment-selector";
import { LaborSelector } from "./labor-selector";
import { EstimateSummary } from "./estimate-summary";
import { type FormProps, generateWorkOrderId } from "@/lib/data";
import { toast } from "sonner";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ExternalLink, FileText } from "lucide-react";
import { useNavigate } from "react-router";

export function WorkOrderForm({
	customer,
	setCustomer,
	equipment,
	setEquipment,
	labor,
	setLabor,
	notes,
	setNotes,
	workOrderId,
	setWorkOrderId,
}: FormProps) {
	const [showSuccess, setShowSuccess] = useState(false);

	const handleSubmit = () => {
		const id = generateWorkOrderId();
		setWorkOrderId(id);
		setShowSuccess(true);
		toast.message("Work Order Created", {
			description: `Work order ${id} has been created successfully.`,
		});
	};

	const handleNewWorkOrder = () => {
		setCustomer(null);
		setEquipment([]);
		setLabor([]);
		setNotes("");
		setShowSuccess(false);
		setWorkOrderId("");
	};

	const navigate = useNavigate();

	return (
		<>
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				<div className="lg:col-span-2 space-y-6">
					<CustomerSelector
						selectedCustomer={customer}
						onSelectCustomer={setCustomer}
					/>
					<EquipmentSelector
						selectedEquipment={equipment}
						onUpdateEquipment={setEquipment}
					/>
					<LaborSelector
						selectedLabor={labor}
						onUpdateLabor={setLabor}
					/>
				</div>
				<div className="lg:col-span-1">
					<EstimateSummary
						customer={customer}
						equipment={equipment}
						labor={labor}
						notes={notes}
						onNotesChange={setNotes}
						onSubmit={handleSubmit}
					/>
				</div>
			</div>

			<Dialog open={showSuccess} onOpenChange={setShowSuccess}>
				<DialogContent className="sm:max-w-md">
					<DialogHeader>
						<div className="mx-auto mb-4 h-16 w-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
							<CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
						</div>
						<DialogTitle className="text-center text-xl">
							Work Order Created!
						</DialogTitle>
						<DialogDescription className="text-center">
							Your work order has been successfully created and
							saved.
						</DialogDescription>
					</DialogHeader>
					<div className="flex flex-col items-center gap-4 pt-4">
						<div className="flex items-center gap-2 p-4 bg-secondary rounded-lg w-full justify-center">
							<FileText className="h-5 w-5 text-primary" />
							<span className="font-mono font-bold text-lg">
								{workOrderId}
							</span>
						</div>
						<p className="text-sm text-muted-foreground text-center">
							{customer?.name} • {equipment.length} item(s) •{" "}
							{labor.reduce((sum, l) => sum + l.hours, 0)}h labor
						</p>
						<div className="flex gap-2 w-full">
							<Button
								variant="outline"
								className="flex-1"
								size="lg"
								onClick={() => navigate("/bill")}
							>
								<ExternalLink className="h-4 w-4 mr-2" />
								View Full Bill
							</Button>
							<Button
								className="flex-1"
								size="lg"
								onClick={handleNewWorkOrder}
							>
								New Work Order
							</Button>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
}
