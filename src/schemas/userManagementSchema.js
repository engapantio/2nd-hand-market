import { z } from 'zod';

export const userManagementSchema = z.object({
  client: z
    .string()
    .min(1, 'Client is required')
    .regex(/^[\d-_\s]+$/, 'Client format is invalid'),

  archived: z.enum(['yes', 'no']),
  active: z.enum(['yes', 'no']),

  bringClientNumber: z
    .string()
    .min(1, 'Bring client number is required')
    .regex(/^\d{4}$/, 'Bring client number must be 4 digits'),

  salutation: z.string().optional(),
  name: z.string().min(1, 'Name is required'),
  firstName: z.string().optional(),

  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  phone: z.string().optional(),
  mobile: z.string().optional(),

  street: z.string().min(1, 'Street is required'),
  number: z.string().min(1, 'Number is required'),
  zipCode: z
    .string()
    .min(1, 'ZIP code is required')
    .regex(/^\d{4,5}$/, 'ZIP code must be 4-5 digits'),

  city: z.string().min(1, 'City is required'),
  country: z.string().min(1, 'Country is required'),
  paypalAccount: z.string().optional(),
  contractSigned: z.string().optional(),

  notes: z.string().optional(),
  shipping: z.enum(['yes', 'no']),

  salesQuote: z
    .string()
    .optional()
    .refine((v) => !v || /^%?\s?\d{1,3}$/.test(v), 'Invalid sales quote'),
  yearOfBirth: z
    .string()
    .optional()
    .refine((v) => !v || /^\d{4}$/.test(v), 'Year of birth must be 4 digits'),
});
