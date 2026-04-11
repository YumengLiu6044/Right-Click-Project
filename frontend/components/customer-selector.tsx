"use client";
import { useState } from "react";
import {
	Check,
	ChevronsUpDown,
	User,
	MapPin,
	Phone,
	Building2,
	Home,
	AirVent,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Customer, customers, formatDate } from "@/lib/data";

interface CustomerSelectorProps {
	selectedCustomer: Customer | null;
	onSelectCustomer: (customer: Customer | null) => void;
}

export function CustomerSelector({
	selectedCustomer,
	onSelectCustomer,
}: CustomerSelectorProps) {
	const [open, setOpen] = useState(false);

	return (
		<Card>
			<CardHeader className="pb-3">
				<CardTitle className="text-lg flex items-center gap-2">
					<User className="h-5 w-5 text-primary" />
					Customer Information
				</CardTitle>
			</CardHeader>
			<CardContent>
				<Popover open={open} onOpenChange={setOpen}>
					<PopoverTrigger asChild>
						<Button
							variant="outline"
							role="combobox"
							aria-expanded={open}
							className="w-full justify-between h-auto py-3"
						>
							{selectedCustomer ? (
								<div className="flex flex-col items-start gap-1">
									<span className="font-medium">
										{selectedCustomer.name}
									</span>
									<span className="text-sm text-muted-foreground">
										{selectedCustomer.address}
									</span>
								</div>
							) : (
								<span className="text-muted-foreground">
									Select a customer...
								</span>
							)}
							<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
						</Button>
					</PopoverTrigger>
					<PopoverContent
						className="w-(--radix-popover-trigger-width) p-0"
						align="start"
					>
						<Command>
							<CommandInput placeholder="Search customers..." />
							<CommandList>
								<CommandEmpty>No customer found.</CommandEmpty>
								<CommandGroup>
									{customers.map((customer) => (
										<CommandItem
											key={customer.id}
											value={`${customer.name} ${customer.address}`}
											onSelect={() => {
												onSelectCustomer(customer);
												setOpen(false);
											}}
											className="flex flex-col items-start py-3"
										>
											<div className="flex items-center w-full">
												<Check
													className={cn(
														"mr-2 h-4 w-4",
														selectedCustomer?.id ===
															customer.id
															? "opacity-100"
															: "opacity-0",
													)}
												/>
												<div className="flex flex-col gap-1 flex-1">
													<span className="font-medium">
														{customer.name}
													</span>
													<span className="text-sm text-muted-foreground">
														{customer.address}
													</span>
												</div>
												<Badge
													variant={
														customer.propertyType ===
														"residential"
															? "secondary"
															: "outline"
													}
													className="ml-2"
												>
													{customer.propertyType}
												</Badge>
											</div>
										</CommandItem>
									))}
								</CommandGroup>
							</CommandList>
						</Command>
					</PopoverContent>
				</Popover>

				{selectedCustomer && (
					<div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-secondary/50 rounded-lg">
						<div className="flex items-start gap-3">
							<MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
							<div>
								<p className="text-sm font-medium">Address</p>
								<p className="text-sm text-muted-foreground">
									{selectedCustomer.address}
								</p>
							</div>
						</div>
						<div className="flex items-start gap-3">
							<Phone className="h-4 w-4 text-muted-foreground mt-0.5" />
							<div>
								<p className="text-sm font-medium">Phone</p>
								<p className="text-sm text-muted-foreground">
									{selectedCustomer.phone}
								</p>
							</div>
						</div>
						<div className="flex items-start gap-3">
							{selectedCustomer.propertyType === "residential" ? (
								<Home className="h-4 w-4 text-muted-foreground mt-0.5" />
							) : (
								<Building2 className="h-4 w-4 text-muted-foreground mt-0.5" />
							)}
							<div>
								<p className="text-sm font-medium">Property</p>
								<p className="text-sm text-muted-foreground capitalize">
									{selectedCustomer.propertyType} •{" "}
									{selectedCustomer.squareFootage?.toLocaleString()}{" "}
									sq ft
								</p>
							</div>
						</div>
						<div className="flex items-start gap-3">
							<AirVent className="h-4 w-4 text-muted-foreground mt-0.5" />

							<div>
								<p className="text-sm font-medium">System</p>
								<p className="text-sm text-muted-foreground">
									{selectedCustomer.systemType} •{" "}
									{selectedCustomer.systemAge} yrs old
								</p>
							</div>
						</div>
						<div className="sm:col-span-2 pt-2 border-t border-border">
							<p className="text-xs text-muted-foreground">
								Last Service:{" "}
								{formatDate(
									selectedCustomer.lastServiceDate ?? "",
								)}
							</p>
						</div>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
