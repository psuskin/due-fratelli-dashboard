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
    <div className={`mb-8 ${className}`}>
      <label className="block text-sm font-semibold text-[var(--foreground)] mb-3  ">
        Select Menu Type
      </label>
      <Select value={selectedMenu} onValueChange={onMenuChange}>
        <SelectTrigger className="w-full px-4 py-3 border border-[var(--border)] rounded-xl focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all duration-200 bg-white text-[var(--foreground)] h-auto  ">
          <SelectValue placeholder="Choose a menu type..." />
        </SelectTrigger>
        <SelectContent className="bg-white border border-[var(--border)] rounded-xl shadow-lg">
          {MENU_OPTIONS.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="px-4 py-2 hover:bg-[var(--accent)] focus:bg-[var(--accent)] cursor-pointer  "
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
