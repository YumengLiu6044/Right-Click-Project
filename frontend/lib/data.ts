export interface Customer {
  id: string
  name: string
  address: string
  phone: string
  propertyType: "residential" | "commercial"
  squareFootage: number
  systemType: string
  systemAge: number
  lastServiceDate: string
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

export const customers: Customer[] = [
  {
    id: "CUST001",
    name: "Margaret Thompson",
    address: "4821 Oakridge Dr, Springfield, IL 62704",
    phone: "(217) 555-0142",
    propertyType: "residential",
    squareFootage: 2200,
    systemType: "Central AC + Gas Furnace",
    systemAge: 12,
    lastServiceDate: "2025-08-14"
  },
  {
    id: "CUST002",
    name: "Dave & Linda Kowalski",
    address: "1130 W Maple Ave, Springfield, IL 62711",
    phone: "(217) 555-0287",
    propertyType: "residential",
    squareFootage: 1800,
    systemType: "Heat Pump",
    systemAge: 8,
    lastServiceDate: "2026-01-22"
  },
  {
    id: "CUST003",
    name: "Springfield Medical Center",
    address: "500 N First St, Springfield, IL 62701",
    phone: "(217) 555-0400",
    propertyType: "commercial",
    squareFootage: 45000,
    systemType: "Commercial RTU System",
    systemAge: 5,
    lastServiceDate: "2026-02-10"
  },
  {
    id: "CUST004",
    name: "Robert Chen",
    address: "892 Elm Street, Springfield, IL 62702",
    phone: "(217) 555-0523",
    propertyType: "residential",
    squareFootage: 3100,
    systemType: "Ductless Mini-Split",
    systemAge: 3,
    lastServiceDate: "2025-11-30"
  }
]

export const equipment: Equipment[] = [
  {
    id: "EQ001",
    name: "Carrier Comfort 16 Central AC",
    category: "Air Conditioner",
    brand: "Carrier",
    modelNumber: "24ACC636A003",
    baseCost: 3200
  },
  {
    id: "EQ002",
    name: "Trane XR15 Heat Pump",
    category: "Heat Pump",
    brand: "Trane",
    modelNumber: "4TWR5036N1000A",
    baseCost: 4100
  },
  {
    id: "EQ003",
    name: "Lennox SL280V Gas Furnace",
    category: "Furnace",
    brand: "Lennox",
    modelNumber: "SL280UH070V36A",
    baseCost: 2800
  },
  {
    id: "EQ004",
    name: "Honeywell T6 Pro Thermostat",
    category: "Thermostat",
    brand: "Honeywell",
    modelNumber: "TH6220U2000",
    baseCost: 185
  },
  {
    id: "EQ005",
    name: "Aprilaire 600 Humidifier",
    category: "Humidifier",
    brand: "Aprilaire",
    modelNumber: "600M",
    baseCost: 450
  },
  {
    id: "EQ006",
    name: "Mitsubishi MSZ-GL15NA Mini-Split",
    category: "Mini-Split",
    brand: "Mitsubishi",
    modelNumber: "MSZ-GL15NA",
    baseCost: 2100
  },
  {
    id: "EQ007",
    name: "Capacitor 45/5 MFD",
    category: "Parts",
    brand: "Generic",
    modelNumber: "CAP-45-5",
    baseCost: 35
  },
  {
    id: "EQ008",
    name: "Contactor 30A",
    category: "Parts",
    brand: "Generic",
    modelNumber: "CON-30A",
    baseCost: 45
  },
  {
    id: "EQ009",
    name: "Blower Motor 1/2 HP",
    category: "Parts",
    brand: "Generic",
    modelNumber: "BM-12HP",
    baseCost: 280
  },
  {
    id: "EQ010",
    name: "Refrigerant R-410A (per lb)",
    category: "Refrigerant",
    brand: "Generic",
    modelNumber: "R410A-LB",
    baseCost: 45
  }
]

export const laborRates: LaborRate[] = [
  {
    id: "LAB001",
    jobType: "diagnostic",
    level: "standard",
    hourlyRate: 95,
    estimatedHours: { min: 0.5, max: 1.5 }
  },
  {
    id: "LAB002",
    jobType: "diagnostic",
    level: "complex",
    hourlyRate: 125,
    estimatedHours: { min: 1, max: 3 }
  },
  {
    id: "LAB003",
    jobType: "repair",
    level: "minor",
    hourlyRate: 110,
    estimatedHours: { min: 0.5, max: 2 }
  },
  {
    id: "LAB004",
    jobType: "repair",
    level: "major",
    hourlyRate: 135,
    estimatedHours: { min: 2, max: 6 }
  },
  {
    id: "LAB005",
    jobType: "installation",
    level: "standard",
    hourlyRate: 125,
    estimatedHours: { min: 4, max: 8 }
  },
  {
    id: "LAB006",
    jobType: "installation",
    level: "complex",
    hourlyRate: 150,
    estimatedHours: { min: 6, max: 12 }
  },
  {
    id: "LAB007",
    jobType: "maintenance",
    level: "routine",
    hourlyRate: 85,
    estimatedHours: { min: 1, max: 2 }
  },
  {
    id: "LAB008",
    jobType: "maintenance",
    level: "comprehensive",
    hourlyRate: 110,
    estimatedHours: { min: 2, max: 4 }
  }
]

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
