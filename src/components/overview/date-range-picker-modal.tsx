'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { DatePicker } from '@/components/ui/date-picker';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { dateRangeSchema, type DateRangeFormValues } from '@/lib/validations/form-validation';

interface DateRangePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (startDate: Date | null, endDate: Date | null) => void;
  initialStartDate?: Date | null;
  initialEndDate?: Date | null;
}

export const DateRangePickerModal = ({
  isOpen,
  onClose,
  onSelect,
  initialStartDate,
  initialEndDate,
}: DateRangePickerModalProps) => {
  const form = useForm<DateRangeFormValues>({
    resolver: zodResolver(dateRangeSchema),
    defaultValues: {
      startDate: initialStartDate || undefined,
      endDate: initialEndDate || undefined,
    },
  });

  const handleCancel = () => {
    // Reset form to initial values
    form.reset({
      startDate: initialStartDate || undefined,
      endDate: initialEndDate || undefined,
    });
    onClose();
  };

  const handleSelect = (data: DateRangeFormValues) => {
    onSelect(data.startDate, data.endDate);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Pick Date Range</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSelect)} className="space-y-4">
            <div className="flex flex-col gap-4 py-4 sm:flex-row sm:gap-6">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="w-full flex-1">
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <DatePicker
                        className='w-full'
                        date={field.value}
                        onDateChange={field.onChange}
                        placeholder="Select start date"
                        id="start-date"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="w-full flex-1">
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <DatePicker
                        className='w-full'
                        date={field.value}
                        onDateChange={field.onChange}
                        placeholder="Select end date"
                        id="end-date"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="flex gap-2">
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button 
                type="submit"
                disabled={!form.formState.isValid}
                className="bg-switch-green-primary hover:bg-switch-green-primary-hover text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Select
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
