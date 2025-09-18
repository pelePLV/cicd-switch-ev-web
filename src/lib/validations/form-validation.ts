import { z } from "zod";

export const loginFormSchema = z.object({
  username: z.string()
    .min(1, 'Please enter your username')
    .min(3, 'Username must be at least 3 characters'),
  password: z.string()
    .min(1, 'Please enter your password')
    .min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean(),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;

export const dateRangeSchema = z.object({
  startDate: z.date({
    message: "Start date is required",
  }),
  endDate: z.date({
    message: "End date is required", 
  }),
}).refine((data) => data.startDate <= data.endDate, {
  message: "Start date must be before or equal to end date",
  path: ["endDate"],
});

export type DateRangeFormValues = z.infer<typeof dateRangeSchema>;