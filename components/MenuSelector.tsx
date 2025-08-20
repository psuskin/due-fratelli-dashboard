import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const MENU_OPTIONS = [
  { value: 'desserkarte-due.pdf', label: 'Desserkarte' },
  { value: 'hauptspeisekarte-due.pdf', label: 'Hauptspeisekarte' },
  { value: 'mittagskarte-due.pdf', label: 'Mittagskarte' },
  { value: 'tagesempfehlung-due.pdf', label: 'Tagesempfehlung' },
];

interface MenuSelectorProps {
  selectedMenu: string;
  onMenuChange: (value: string) => void;
  className?: string;
}

export default function MenuSelector({
  selectedMenu,
  onMenuChange,
  className = '',
}: MenuSelectorProps) {
  return (
    <div className={`mb-6 ${className}`}>
      <label className="block text-xs opacity-70 ps-3 text-foreground mb-1.5 font-medium  ">
        Select Menu Type
      </label>
      <Select value={selectedMenu} onValueChange={onMenuChange}>
        <SelectTrigger className="w-full px-4 py-6 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 bg-white text-foreground h-auto  ">
          <SelectValue placeholder="Choose a menu type..." />
        </SelectTrigger>
        <SelectContent className="bg-white border border-border rounded-lg shadow-lg">
          {MENU_OPTIONS.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="px-4 py-2 hover:!bg-primary focus:bg-accent cursor-pointer  "
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
