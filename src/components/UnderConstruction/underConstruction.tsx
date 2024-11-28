import { HardHat, Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export default function UnderConstruction() {
  return (
    <div className="min-h-screen w-full dark bg-zinc-950 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto space-y-8">
        {/* Construction Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute -top-2 left-1/2 -translate-x-1/2">
              <Loader2 className="w-6 h-6 animate-spin text-yellow-500" />
            </div>
            <div className="bg-yellow-500/20 p-4 rounded-full">
              <HardHat className="w-12 h-12 text-yellow-500" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-4 text-center">
          <h1 className="text-2xl md:text-4xl font-bold text-white">
            Under Construction
          </h1>
          <p className="text-zinc-400">
            We&lsquo;re working hard to bring you something amazing. Stay tuned!
          </p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <Progress value={33} className="h-2" />
          <p className="text-sm text-zinc-500 text-center">33% Completed</p>
        </div>

        

        {/* Social Links */}
        <div className="flex justify-center gap-4">
          {["Twitter", "GitHub", "LinkedIn"].map((platform) => (
            <Button
              key={platform}
              variant="ghost"
              className="text-zinc-400 hover:text-white hover:bg-zinc-900"
            >
              {platform}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}

