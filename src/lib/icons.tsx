import { createElement } from "react";
import {
  BadgeCheck,
  BriefcaseBusiness,
  CalendarDays,
  Cpu,
  Download,
  Mail,
  MapPinned,
  MessageCircle,
  MonitorSmartphone,
  Network,
  PhoneCall,
  Printer,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";

export const iconMap = {
  badge: BadgeCheck,
  briefcase: BriefcaseBusiness,
  calendar: CalendarDays,
  cpu: Cpu,
  download: Download,
  mail: Mail,
  map: MapPinned,
  message: MessageCircle,
  monitor: MonitorSmartphone,
  network: Network,
  phone: PhoneCall,
  printer: Printer,
  shield: ShieldCheck,
  sparkles: Sparkles,
  wrench: Wrench,
} as const;

export type IconName = keyof typeof iconMap;

export function AppIcon({
  name,
  className,
}: {
  name: IconName;
  className?: string;
}) {
  return createElement(iconMap[name], {
    className,
    "aria-hidden": true,
  });
}
