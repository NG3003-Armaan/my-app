import clsx from "clsx"
import { clampToRange } from "utils"

interface ProgressBarProps {
  progress: number
}

export default function ProgressBar(props: ProgressBarProps) {
  const progress = clampToRange(props.progress)

  const sharedClasses = "min-w-[46px] px-2 py-1"

  return (
    <div className="flex items-center rounded-full bg-dark-gray text-white">
      <div
        className={clsx("rounded-full bg-primary", sharedClasses, {
          hidden: progress <= 0,
        })}
        style={{ width: `${progress}%` }}
      >
        <p className="text-center">{progress}%</p>
      </div>
      <div
        className={clsx(sharedClasses, {
          hidden: progress >= 100,
        })}
        style={{ width: `${100 - progress}%` }}
      >
        <p className="text-center">{100 - progress}%</p>
      </div>
    </div>
  )
}
