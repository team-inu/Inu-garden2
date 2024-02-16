import * as z from 'zod';

export const CreateStudentSchema = z.object({
  studentId: z
    .string({ required_error: 'required' })
    .min(1, { message: 'required' }),
  firstName: z
    .string({ required_error: 'required' })
    .min(1, { message: 'required' }),
  lastName: z
    .string({ required_error: 'required' })
    .min(1, { message: 'required' }),
  email: z
    .string({ required_error: 'required' })
    .min(1, { message: 'required' }),
});

export type CreateStudentType = z.infer<typeof CreateStudentSchema>;

export const CreateStudentDefaultValues: CreateStudentType = {
  studentId: '',
  firstName: '',
  lastName: '',
  email: '',
};
