// TOOD - accept color as prop
import {
  AlertCircle,
  AlertTriangle,
  BarChart,
  ChevronDown,
  ChevronUp,
  Download,
  type IconProps as FeatherIconProps,
  Grid,
  Home,
  List,
  Menu,
  Plus,
  Power,
  Search,
  Settings,
  Upload,
  User,
  X,
} from "react-feather"

const icons = {
  home: Home,
  menu: Menu,
  alertTriangle: AlertTriangle,
  alert: AlertCircle,
  search: Search,
  list: List,
  close: X,
  arrowDown: ChevronDown,
  arrowUp: ChevronUp,
  power: Power,
  barchart: BarChart,
  grid: Grid,
  settings: Settings,
  user: User,
  plus: Plus,
  upload: Upload,
  download: Download,
}

export type IconType = keyof typeof icons

interface IconProps extends FeatherIconProps {
  name: IconType
}

export default function Icon({ name, ...props }: IconProps) {
  const Icon = icons[name]
  return <Icon {...props} />
}
