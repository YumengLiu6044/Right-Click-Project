import importedCustomers from "@/data/customers.json";
import importedEquipments from "@/data/equipment.json";
import importedLaborRates from "@/data/labor_rates.json";

export interface Customer {
  id?: string
  name?: string
  address?: string
  phone?: string
  propertyType?: "residential" | "commercial"
  squareFootage?: number
  systemType?: string
  systemAge?: number
  lastServiceDate?: string
}

export interface Equipment {
  id: string
  name: string
  category: string
  brand: string
  modelNumber: string
  baseCost: number
}

export interface LaborRate {
  id: string
  jobType: string
  level: string
  hourlyRate: number
  estimatedHours: { min: number; max: number }
}

export interface WorkOrderEquipment {
  equipment: Equipment
  quantity: number
}

export interface WorkOrderLabor {
  labor: LaborRate
  hours: number
}

export interface WorkOrder {
  id: string
  customer: Customer | null
  equipment: WorkOrderEquipment[]
  labor: WorkOrderLabor[]
  notes: string
  createdAt: Date
}

export const customers: Customer[] = importedCustomers.map(item => item as Customer);

export const equipment: Equipment[] = importedEquipments.map(item => item as Equipment);

export const laborRates: LaborRate[] = importedLaborRates.map(item => item as LaborRate);

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

export function generateWorkOrderId(): string {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `WO-${timestamp}-${random}`
}
