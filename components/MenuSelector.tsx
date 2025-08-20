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
    <div className={`mb-6 sm:mb-8 ${className}`}>
      <label className="block text-xs sm:text-sm opacity-70 ps-3 text-foreground mb-2 sm:mb-3 font-medium  ">
        Select Menu Type
      </label>
      <Select value={selectedMenu} onValueChange={onMenuChange}>
        <SelectTrigger className="w-full px-3 sm:px-4 py-4 sm:py-6 border border-border rounded-lg sm:rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 bg-white text-foreground h-auto text-sm sm:text-base  ">
          <SelectValue placeholder="Choose a menu type..." />
        </SelectTrigger>
        <SelectContent className="bg-white border border-border rounded-lg shadow-lg">
          {MENU_OPTIONS.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="px-3 sm:px-4 py-1.5 sm:py-2 hover:!bg-primary focus:bg-accent cursor-pointer text-sm sm:text-base  "
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
