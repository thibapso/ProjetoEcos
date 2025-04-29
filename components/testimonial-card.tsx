import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

interface TestimonialCardProps {
  quote: string
  name: string
  relation: string
  avatarSrc?: string
  initials: string
}

export default function TestimonialCard({ quote, name, relation, avatarSrc, initials }: TestimonialCardProps) {
  return (
    <Card className="bg-black border border-white/10 hover:border-primary/30 transition-all duration-300">
      <CardContent className="p-6 flex flex-col gap-4">
        <Quote className="h-8 w-8 text-primary/40" />
        <p className="text-white/80 italic">{quote}</p>
        <div className="flex items-center gap-3 mt-4">
          <Avatar className="h-10 w-10 border border-white/20">
            <AvatarImage src={avatarSrc || "/placeholder.svg"} alt={name} />
            <AvatarFallback className="bg-primary/20 text-primary">{initials}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-white font-medium">{name}</p>
            <p className="text-white/60 text-sm">{relation}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
