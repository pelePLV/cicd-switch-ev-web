'use client';

import * as React from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/helpers/combine-class-name';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface DatePickerProps {
  date?: Date;
  onDateChange?: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
  label?: string;
  id?: string;
}

export function DatePicker({
  date,
  onDateChange,
  placeholder = 'Select date',
  className,
  label,
  id = 'date',
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex flex-col gap-3">
      {label && (
        <Label htmlFor={id} className="px-1">
          {label}
        </Label>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            id={id}
            className={cn(
              'border-input bg-background hover:bg-accent hover:text-accent-foreground flex w-48 items-center justify-between overflow-hidden rounded-md border px-3 py-2 text-sm font-normal text-ellipsis whitespace-nowrap',
              className
            )}
          >
            <span className="flex-1 truncate text-left">
              {date ? date.toLocaleDateString() : placeholder}
            </span>
            <CalendarIcon className="ml-2 h-4 w-4 flex-shrink-0" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={selectedDate => {
              onDateChange?.(selectedDate);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
