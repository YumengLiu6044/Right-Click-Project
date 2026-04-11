"use client";

import { FileText, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
	type Customer,
	type WorkOrderEquipment,
	type WorkOrderLabor,
	formatCurrency,
} from "@/lib/data";

interface EstimateSummaryProps {
	customer: Customer | null;
	equipment: WorkOrderEquipment[];
	labor: WorkOrderLabor[];
	notes: string;
	onNotesChange: (notes: string) => void;
	onSubmit: () => void;
}

export function EstimateSummary({
	customer,
	equipment,
	labor,
	notes,
	onNotesChange,
	onSubmit,
}: EstimateSummaryProps) {
	const equipmentTotal = equipment.reduce(
		(sum, item) => sum + item.equipment.baseCost * item.quantity,
		0,
	);

	const laborTotal = labor.reduce(
		(sum, item) => sum + item.labor.hourlyRate * item.hours,
		0,
	);

	const subtotal = equipmentTotal + laborTotal;
	const taxRate = 0.0825;
	const tax = subtotal * taxRate;
	const total = subtotal + tax;

	const totalHours = labor.reduce((sum, item) => sum + item.hours, 0);

	const isValid = customer && (equipment.length > 0 || labor.length > 0);

	return (
		<Card className="sticky top-4">
			<CardHeader className="pb-3">
				<CardTitle className="text-lg flex items-center gap-2">
					<FileText className="h-5 w-5 text-primary" />
					Estimate Summary
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				{/* Customer */}
				{customer ? (
					<div className="p-3 bg-secondary/50 rounded-lg">
						<p className="font-medium text-sm">{customer.name}</p>
						<p className="text-xs text-muted-foreground">
							{customer.address}
						</p>
					</div>
				) : (
					<div className="p-3 bg-muted/50 rounded-lg border-2 border-dashed border-muted">
						<p className="text-sm text-muted-foreground text-center">
							No customer selected
						</p>
					</div>
				)}

				<Separator />

				{/* Equipment Breakdown */}
				<div className="space-y-2">
					<div className="flex items-center justify-between text-sm">
						<span className="text-muted-foreground">
							Equipment & Parts
						</span>
						<span className="font-medium">
							{formatCurrency(equipmentTotal)}
						</span>
					</div>
					{equipment.length > 0 ? (
						<div className="space-y-1 pl-2 border-l-2 border-muted">
							{equipment.map((item) => (
								<div
									key={item.equipment.id}
									className="flex justify-between text-xs text-muted-foreground"
								>
									<span className="truncate pr-2">
										{item.equipment.name} ×{item.quantity}
									</span>
									<span className="shrink-0">
										{formatCurrency(
											item.equipment.baseCost *
												item.quantity,
										)}
									</span>
								</div>
							))}
						</div>
					) : (
						<p className="text-xs text-muted-foreground pl-2">
							No equipment added
						</p>
					)}
				</div>

				{/* Labor Breakdown */}
				<div className="space-y-2">
					<div className="flex items-center justify-between text-sm">
						<span className="text-muted-foreground">
							Labor ({totalHours}h total)
						</span>
						<span className="font-medium">
							{formatCurrency(laborTotal)}
						</span>
					</div>
					{labor.length > 0 ? (
						<div className="space-y-1 pl-2 border-l-2 border-muted">
							{labor.map((item) => (
								<div
									key={item.labor.id}
									className="flex justify-between text-xs text-muted-foreground"
								>
									<span className="truncate pr-2 capitalize">
										{item.labor.jobType} -{" "}
										{item.labor.level} ({item.hours}h)
									</span>
									<span className="shrink-0">
										{formatCurrency(
											item.labor.hourlyRate * item.hours,
										)}
									</span>
								</div>
							))}
						</div>
					) : (
						<p className="text-xs text-muted-foreground pl-2">
							No labor added
						</p>
					)}
				</div>

				<Separator />

				{/* Totals */}
				<div className="space-y-2">
					<div className="flex items-center justify-between text-sm">
						<span className="text-muted-foreground">Subtotal</span>
						<span className="font-medium">
							{formatCurrency(subtotal)}
						</span>
					</div>
					<div className="flex items-center justify-between text-sm">
						<span className="text-muted-foreground">
							Tax (8.25%)
						</span>
						<span className="font-medium">
							{formatCurrency(tax)}
						</span>
					</div>
					<div className="flex items-center justify-between text-lg font-semibold pt-2 border-t">
						<span>Total</span>
						<span className="text-primary">
							{formatCurrency(total)}
						</span>
					</div>
				</div>

				<Separator />

				{/* Notes */}
				<div className="space-y-2">
					<label className="text-sm font-medium">Notes</label>
					<Textarea
						placeholder="Add any notes or special instructions..."
						value={notes}
						onChange={(e) => onNotesChange(e.target.value)}
						rows={3}
						className="resize-none"
					/>
				</div>

				{/* Actions */}
				<div className="flex flex-col gap-2">
					<Button
						className="w-full"
						size="lg"
						disabled={!isValid}
						onClick={onSubmit}
					>
						<CheckCircle2 className="h-4 w-4 mr-2" />
						Create Work Order
					</Button>
				</div>

				{!isValid && (
					<p className="text-xs text-center text-muted-foreground">
						Select a customer and add at least one item to create a
						work order
					</p>
				)}
			</CardContent>
		</Card>
	);
}
