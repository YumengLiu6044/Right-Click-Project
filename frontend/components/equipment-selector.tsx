"use client"

import { useState } from "react"
import { Plus, Minus, Package, Trash2, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Equipment, equipment, formatCurrency, WorkOrderEquipment } from "@/lib/data"

interface EquipmentSelectorProps {
  selectedEquipment: WorkOrderEquipment[]
  onUpdateEquipment: (equipment: WorkOrderEquipment[]) => void
}

export function EquipmentSelector({ selectedEquipment, onUpdateEquipment }: EquipmentSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")

  const categories = [...new Set(equipment.map(e => e.category))]

  const filteredEquipment = equipment.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.modelNumber.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const addEquipment = (item: Equipment) => {
    const existing = selectedEquipment.find(e => e.equipment.id === item.id)
    if (existing) {
      onUpdateEquipment(
        selectedEquipment.map(e =>
          e.equipment.id === item.id ? { ...e, quantity: e.quantity + 1 } : e
        )
      )
    } else {
      onUpdateEquipment([...selectedEquipment, { equipment: item, quantity: 1 }])
    }
  }

  const updateQuantity = (itemId: string, delta: number) => {
    const updated = selectedEquipment.map(e => {
      if (e.equipment.id === itemId) {
        const newQuantity = Math.max(0, e.quantity + delta)
        return { ...e, quantity: newQuantity }
      }
      return e
    }).filter(e => e.quantity > 0)
    onUpdateEquipment(updated)
  }

  const removeEquipment = (itemId: string) => {
    onUpdateEquipment(selectedEquipment.filter(e => e.equipment.id !== itemId))
  }

  const equipmentTotal = selectedEquipment.reduce(
    (sum, item) => sum + item.equipment.baseCost * item.quantity,
    0
  )

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            Equipment & Parts
          </CardTitle>
          {selectedEquipment.length > 0 && (
            <Badge variant="secondary" className="font-mono">
              {formatCurrency(equipmentTotal)}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search equipment..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-45">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(cat => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Equipment Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-75 overflow-y-auto">
          {filteredEquipment.map((item) => {
            const inCart = selectedEquipment.find(e => e.equipment.id === item.id)
            return (
              <div
                key={item.id}
                className={`p-3 rounded-lg border transition-colors cursor-pointer ${
                  inCart ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                }`}
                onClick={() => addEquipment(item)}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.brand} • {item.modelNumber}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">{item.category}</Badge>
                      <span className="text-sm font-semibold text-primary">{formatCurrency(item.baseCost)}</span>
                    </div>
                  </div>
                  {inCart && (
                    <Badge className="bg-primary text-primary-foreground">{inCart.quantity}</Badge>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Selected Equipment List */}
        {selectedEquipment.length > 0 && (
          <div className="border-t pt-4 space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Added to Work Order</p>
            {selectedEquipment.map((item) => (
              <div
                key={item.equipment.id}
                className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{item.equipment.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatCurrency(item.equipment.baseCost)} × {item.quantity} = {formatCurrency(item.equipment.baseCost * item.quantity)}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={(e) => {
                      e.stopPropagation()
                      updateQuantity(item.equipment.id, -1)
                    }}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center font-medium">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={(e) => {
                      e.stopPropagation()
                      updateQuantity(item.equipment.id, 1)
                    }}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeEquipment(item.equipment.id)
                    }}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
