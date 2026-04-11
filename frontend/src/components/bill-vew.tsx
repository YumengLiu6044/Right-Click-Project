import {
	ArrowLeft,
	Printer,
	Building2,
	Phone,
	MapPin,
	Calendar,
	Wrench,
	Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
	type Customer,
	type WorkOrderEquipment,
	type WorkOrderLabor,
	formatCurrency,
	formatDate,
} from "@/lib/data";
import { useNavigate } from "react-router";

interface BillData {
	workOrderId: string;
	customer: Customer;
	equipment: WorkOrderEquipment[];
	labor: WorkOrderLabor[];
	notes: string;
}

export function BillView({
	workOrderId,
	customer,
	equipment,
	labor,
	notes,
}: BillData) {
	const navigate = useNavigate();

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

	const handlePrint = () => {
		window.print();
	};

	return (
		<div className="min-h-screen bg-background">
			{/* Header Actions - Hidden on Print */}
			<div className="print:hidden sticky top-0 z-10 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border-b">
				<div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
					<Button
						size={"lg"}
						variant="ghost"
						onClick={() => navigate("/")}
					>
						<ArrowLeft className="h-4 w-4 mr-2" />
						Back to Work Orders
					</Button>
					<div className="flex items-center gap-2">
						<Button variant="outline" onClick={handlePrint} size={"lg"}>
							<Printer className="h-4 w-4 mr-2" />
							Print
						</Button>
					</div>
				</div>
			</div>

			{/* Bill Content */}
			<div className="max-w-4xl mx-auto p-4 md:p-8">
				<Card
					className="shadow-lg print:shadow-none print:border-0"
					id="bill-print-area"
				>
					<CardContent className="p-6 md:p-10">
						{/* Invoice Header */}
						<div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
							<div>
								<h1 className="text-3xl font-bold text-primary mb-1">
									HVAC Pro Services
								</h1>
								<p className="text-muted-foreground">
									Professional HVAC Solutions
								</p>
								<div className="mt-3 text-sm text-muted-foreground space-y-1">
									<p>123 Service Center Drive</p>
									<p>Springfield, IL 62701</p>
									<p>(217) 555-1234</p>
								</div>
							</div>
							<div className="text-left md:text-right">
								<div className="inline-block bg-primary/10 px-4 py-2 rounded-lg mb-3">
									<span className="text-sm text-muted-foreground">
										Invoice #
									</span>
									<p className="text-xl font-mono font-bold text-primary">
										{workOrderId}
									</p>
								</div>
								<div className="text-sm text-muted-foreground space-y-1">
									<p className="flex items-center gap-2 md:justify-end">
										<Calendar className="h-4 w-4" />
										{formatDate(
											new Date().toLocaleDateString(),
										)}
									</p>
									<p>Due upon receipt</p>
								</div>
							</div>
						</div>

						<Separator className="my-6" />

						{/* Customer Info */}
						<div className="bg-secondary/30 rounded-lg p-5 mb-8">
							<h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
								Bill To
							</h2>
							<div className="grid md:grid-cols-2 gap-4">
								<div>
									<p className="text-lg font-semibold text-foreground">
										{customer.name}
									</p>
									<div className="mt-2 space-y-1.5 text-sm text-muted-foreground">
										<p className="flex items-start gap-2">
											<MapPin className="h-4 w-4 mt-0.5 shrink-0" />
											{customer.address}
										</p>
										<p className="flex items-center gap-2">
											<Phone className="h-4 w-4" />
											{customer.phone}
										</p>
									</div>
								</div>
								<div className="text-sm">
									<div className="flex items-center gap-2 mb-2">
										<Building2 className="h-4 w-4 text-muted-foreground" />
										<Badge
											variant="secondary"
											className="capitalize"
										>
											{customer.propertyType}
										</Badge>
										<span className="text-muted-foreground">
											{customer?.squareFootage?.toLocaleString()}{" "}
											sq ft
										</span>
									</div>
									<p className="text-muted-foreground">
										<span className="font-medium">
											System:
										</span>{" "}
										{customer.systemType}
									</p>
									<p className="text-muted-foreground">
										<span className="font-medium">
											System Age:
										</span>{" "}
										{customer.systemAge} years
									</p>
								</div>
							</div>
						</div>

						{/* Equipment Table */}
						{equipment.length > 0 && (
							<div className="mb-8">
								<div className="flex items-center gap-2 mb-4">
									<Package className="h-5 w-5 text-primary" />
									<h2 className="text-lg font-semibold">
										Equipment & Parts
									</h2>
								</div>
								<div className="border rounded-lg overflow-hidden">
									<table className="w-full">
										<thead>
											<tr className="bg-muted/50">
												<th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
													Item
												</th>
												<th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground w-20">
													Qty
												</th>
												<th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground w-28">
													Unit Price
												</th>
												<th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground w-28">
													Total
												</th>
											</tr>
										</thead>
										<tbody className="divide-y">
											{equipment.map((item, index) => (
												<tr
													key={index}
													className="hover:bg-muted/20"
												>
													<td className="py-3 px-4">
														<p className="font-medium text-foreground">
															{
																item.equipment
																	.name
															}
														</p>
														<p className="text-xs text-muted-foreground">
															{
																item.equipment
																	.brand
															}{" "}
															| Model:{" "}
															{
																item.equipment
																	.modelNumber
															}
														</p>
													</td>
													<td className="text-center py-3 px-4 text-foreground">
														{item.quantity}
													</td>
													<td className="text-right py-3 px-4 text-foreground">
														{formatCurrency(
															item.equipment
																.baseCost,
														)}
													</td>
													<td className="text-right py-3 px-4 font-medium text-foreground">
														{formatCurrency(
															item.equipment
																.baseCost *
																item.quantity,
														)}
													</td>
												</tr>
											))}
										</tbody>
										<tfoot>
											<tr className="bg-muted/30">
												<td
													colSpan={3}
													className="text-right py-3 px-4 font-semibold text-foreground"
												>
													Equipment Subtotal
												</td>
												<td className="text-right py-3 px-4 font-semibold text-foreground">
													{formatCurrency(
														equipmentTotal,
													)}
												</td>
											</tr>
										</tfoot>
									</table>
								</div>
							</div>
						)}

						{/* Labor Table */}
						{labor.length > 0 && (
							<div className="mb-8">
								<div className="flex items-center gap-2 mb-4">
									<Wrench className="h-5 w-5 text-primary" />
									<h2 className="text-lg font-semibold">
										Labor Services
									</h2>
								</div>
								<div className="border rounded-lg overflow-hidden">
									<table className="w-full">
										<thead>
											<tr className="bg-muted/50">
												<th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
													Service
												</th>
												<th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground w-20">
													Hours
												</th>
												<th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground w-28">
													Rate
												</th>
												<th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground w-28">
													Total
												</th>
											</tr>
										</thead>
										<tbody className="divide-y">
											{labor.map((item, index) => (
												<tr
													key={index}
													className="hover:bg-muted/20"
												>
													<td className="py-3 px-4">
														<p className="font-medium text-foreground capitalize">
															{item.labor.jobType}
														</p>
														<p className="text-xs text-muted-foreground capitalize">
															{item.labor.level}{" "}
															level service
														</p>
													</td>
													<td className="text-center py-3 px-4 text-foreground">
														<div className="flex items-center justify-center gap-1">
															{item.hours}h
														</div>
													</td>
													<td className="text-right py-3 px-4 text-foreground">
														{formatCurrency(
															item.labor
																.hourlyRate,
														)}
														/hr
													</td>
													<td className="text-right py-3 px-4 font-medium text-foreground">
														{formatCurrency(
															item.labor
																.hourlyRate *
																item.hours,
														)}
													</td>
												</tr>
											))}
										</tbody>
										<tfoot>
											<tr className="bg-muted/30">
												<td className="py-3 px-4 text-sm text-muted-foreground">
													Total Hours: {totalHours}h
												</td>
												<td
													colSpan={2}
													className="text-right py-3 px-4 font-semibold text-foreground"
												>
													Labor Subtotal
												</td>
												<td className="text-right py-3 px-4 font-semibold text-foreground">
													{formatCurrency(laborTotal)}
												</td>
											</tr>
										</tfoot>
									</table>
								</div>
							</div>
						)}

						{/* Notes */}
						{notes && (
							<div className="mb-8 p-4 bg-accent/10 border border-accent/20 rounded-lg">
								<h3 className="font-semibold text-foreground mb-2">
									Service Notes
								</h3>
								<p className="text-sm text-muted-foreground whitespace-pre-wrap">
									{notes}
								</p>
							</div>
						)}

						{/* Totals */}
						<div className="flex justify-end">
							<div className="w-full md:w-80 space-y-2">
								<div className="flex justify-between text-sm">
									<span className="text-muted-foreground">
										Subtotal
									</span>
									<span className="text-foreground">
										{formatCurrency(subtotal)}
									</span>
								</div>
								<div className="flex justify-between text-sm">
									<span className="text-muted-foreground">
										Sales Tax (8.25%)
									</span>
									<span className="text-foreground">
										{formatCurrency(tax)}
									</span>
								</div>
								<Separator className="my-3" />
								<div className="flex justify-between items-center">
									<span className="text-lg font-semibold text-foreground">
										Total Due
									</span>
									<span className="text-2xl font-bold text-primary">
										{formatCurrency(total)}
									</span>
								</div>
							</div>
						</div>

						{/* Footer */}
						<Separator className="my-8" />
						<div className="text-center text-sm text-muted-foreground space-y-1">
							<p className="font-medium">
								Thank you for choosing HVAC Pro Services!
							</p>
							<p>
								Payment is due upon receipt. We accept all major
								credit cards.
							</p>
							<p>
								Questions? Contact us at (217) 555-1234 or
								service@hvacpro.com
							</p>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
