"use client"

import { Clock, Trash2, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LaborRate, laborRates, formatCurrency, WorkOrderLabor } from "@/lib/data"

interface LaborSelectorProps {
  selectedLabor: WorkOrderLabor[]
  onUpdateLabor: (labor: WorkOrderLabor[]) => void
}

const jobTypeColors: Record<string, string> = {
  diagnostic: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  repair: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  installation: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  maintenance: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
}

export function LaborSelector({ selectedLabor, onUpdateLabor }: LaborSelectorProps) {
  const addLabor = (item: LaborRate) => {
    const existing = selectedLabor.find(l => l.labor.id === item.id)
    if (existing) {
      onUpdateLabor(
        selectedLabor.map(l =>
          l.labor.id === item.id ? { ...l, hours: l.hours + item.estimatedHours.min } : l
        )
      )
    } else {
      onUpdateLabor([...selectedLabor, { labor: item, hours: item.estimatedHours.min }])
    }
  }

  const updateHours = (itemId: string, delta: number) => {
    const updated = selectedLabor.map(l => {
      if (l.labor.id === itemId) {
        const newHours = Math.max(0.5, Math.round((l.hours + delta) * 2) / 2)
        return { ...l, hours: newHours }
      }
      return l
    })
    onUpdateLabor(updated)
  }

  const removeLabor = (itemId: string) => {
    onUpdateLabor(selectedLabor.filter(l => l.labor.id !== itemId))
  }

  const laborTotal = selectedLabor.reduce(
    (sum, item) => sum + item.labor.hourlyRate * item.hours,
    0
  )

  const groupedLabor = laborRates.reduce((acc, item) => {
    if (!acc[item.jobType]) {
      acc[item.jobType] = []
    }
    acc[item.jobType].push(item)
    return acc
  }, {} as Record<string, LaborRate[]>)

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Labor
          </CardTitle>
          {selectedLabor.length > 0 && (
            <Badge variant="secondary" className="font-mono">
              {formatCurrency(laborTotal)}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Labor Types Grid */}
        <div className="space-y-4">
          {Object.entries(groupedLabor).map(([jobType, items]) => (
            <div key={jobType} className="space-y-2">
              <h4 className="text-sm font-medium capitalize flex items-center gap-2">
                <Badge className={jobTypeColors[jobType]}>{jobType}</Badge>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {items.map((item, idx) => {
                  const inOrder = selectedLabor.find(l => l.labor.id === item.id)
                  return (
                    <div
                      key={idx}
                      className={`p-3 rounded-lg border transition-colors cursor-pointer ${
                        inOrder ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => addLabor(item)}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <p className="font-medium text-sm capitalize">{item.level}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm font-semibold text-primary">
                              {formatCurrency(item.hourlyRate)}/hr
                            </span>
                            <span className="text-xs text-muted-foreground">
                              Est: {item.estimatedHours.min}-{item.estimatedHours.max} hrs
                            </span>
                          </div>
                        </div>
                        {inOrder && (
                          <Badge className="bg-primary text-primary-foreground">{inOrder.hours}h</Badge>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Selected Labor List */}
        {selectedLabor.length > 0 && (
          <div className="border-t pt-4 space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Added to Work Order</p>
            {selectedLabor.map((item) => (
              <div
                key={item.labor.id}
                className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm capitalize">
                    {item.labor.jobType} - {item.labor.level}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatCurrency(item.labor.hourlyRate)}/hr × {item.hours}h = {formatCurrency(item.labor.hourlyRate * item.hours)}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={(e) => {
                      e.stopPropagation()
                      updateHours(item.labor.id, -0.5)
                    }}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-12 text-center font-medium">{item.hours}h</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={(e) => {
                      e.stopPropagation()
                      updateHours(item.labor.id, 0.5)
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
                      removeLabor(item.labor.id)
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
