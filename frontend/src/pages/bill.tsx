import { BillView } from "@/components/bill-vew";
import { Button } from "@/components/ui/button";
import type { FormProps } from "@/lib/data";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

export default function Bill({
	customer,
	equipment,
	labor,
	notes,
	workOrderId,
}: FormProps) {
	const navigate = useNavigate();

	if (!customer) {
		return (
			<div className="min-h-screen bg-background flex items-center justify-center p-4">
				<div className="text-center space-y-4">
					<h1 className="text-2xl font-bold text-foreground">
						No Bill Data Found
					</h1>
					<p className="text-muted-foreground">
						Please create a work order first to view the bill.
					</p>
					<Button onClick={() => navigate("/")}>
						<ArrowLeft className="h-4 w-4 mr-2" />
						Create Work Order
					</Button>
				</div>
			</div>
		);
	}

	return (
		<BillView
			customer={customer}
			equipment={equipment}
			labor={labor}
			notes={notes}
			workOrderId={workOrderId}
		/>
	);
}
