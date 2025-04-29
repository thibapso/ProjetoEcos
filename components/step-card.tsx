import { Card, CardContent } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface StepCardProps {
  title: string
  description: string
  icon: LucideIcon
}

export default function StepCard({ title, description, icon: Icon }: StepCardProps) {
  return (
    <Card className="bg-black border border-white/10 hover:border-primary/30 transition-all duration-300 overflow-hidden relative">
      <CardContent className="p-6 flex flex-col gap-4">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-xl font-light">{title}</h3>
        <p className="text-white/60">{description}</p>
      </CardContent>
    </Card>
  )
}
