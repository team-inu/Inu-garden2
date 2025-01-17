import * as z from 'zod';

import { User } from '@/types/auth-type';

const CourseSchema = z.object({
  id: z.string(),
  name: z.string(),
  code: z.string(),
  curriculum: z.string(),
  description: z.string(),
  semesterId: z.string(),
  userId: z.string(),
  expectedPassingCloPercentage: z.number(),
  isPortfolioCompleted: z.boolean(),
  academicYear: z.number(),
  graduateYear: z.number(),
  programYear: z.number(),

  criteriaGradeA: z.number(),
  criteriaGradeBP: z.number(),
  criteriaGradeB: z.number(),
  criteriaGradeCP: z.number(),
  criteriaGradeC: z.number(),
  criteriaGradeDP: z.number(),
  criteriaGradeD: z.number(),
  criteriaGradeF: z.number(),
});

type Course = z.infer<typeof CourseSchema>;

export type GetCourseList = Course & {
  user: User;
  semester: {
    id: string;
    year: number;
    semesterSequence: string;
  };
};

export const CreateCourseSchema = z.object({
  name: z.string({ required_error: 'required' }).min(1, { message: 'required' }),
  description: z.string({ required_error: 'required' }).min(1, { message: 'required' }),
  code: z.string({ required_error: 'required' }).min(1, { message: 'required' }),
  userId: z.string({ required_error: 'required' }).min(1, { message: 'required' }),
  expectedPassingCloPercentage: z.coerce.number({
    required_error: 'require expectedPassingCloPercentage',
  }),
  curriculum: z.string({ required_error: 'required' }).min(1, { message: 'required' }),
  semesterId: z.string({ required_error: 'required' }).min(1, { message: 'required' }),
  academicYear: z.coerce.number({ required_error: 'required' }).min(2500, { message: 'Must be in Buddhist year' }),
  graduateYear: z.coerce.number({ required_error: 'required' }).min(2500, { message: 'Must be in Buddhist year' }),
  programYear: z.coerce.number({ required_error: 'required' }).min(2500, { message: 'Must be in Buddhist year' }),
  criteriaGradeA: z.coerce.number({ required_error: 'Please enter A grade' }),
  criteriaGradeBP: z.coerce.number({
    required_error: 'Please enter BP grade',
  }),
  criteriaGradeB: z.coerce.number({ required_error: 'Please enter B grade' }),
  criteriaGradeCP: z.coerce.number({
    required_error: 'Please enter CP grade',
  }),
  criteriaGradeC: z.coerce.number({ required_error: 'Please enter C grade' }),
  criteriaGradeDP: z.coerce.number({
    required_error: 'Please enter DP grade',
  }),
  criteriaGradeD: z.coerce.number({ required_error: 'Please enter D grade' }),
  criteriaGradeF: z.coerce.number({ required_error: 'Please enter F grade' }),
});

export type CreateCourseSchemaValues = z.infer<typeof CreateCourseSchema>;

export const CreateCourseSchemaDefaultValues: Partial<CreateCourseSchemaValues> = {
  academicYear: new Date().getFullYear() + 543,
  graduateYear: new Date().getFullYear() + 543,
  programYear: new Date().getFullYear() + 543,
  description: 'This description can be changed later by the lecturer',
  expectedPassingCloPercentage: 65,
  criteriaGradeA: 85,
  criteriaGradeBP: 80,
  criteriaGradeB: 75,
  criteriaGradeCP: 70,
  criteriaGradeC: 65,
  criteriaGradeDP: 60,
  criteriaGradeD: 55,
  criteriaGradeF: 54,
};

export const UpdateCourseSchema = CreateCourseSchema.pick({
  name: true,
  description: true,
  code: true,
  curriculum: true,
  expectedPassingCloPercentage: true,
  academicYear: true,
  graduateYear: true,
  programYear: true,
  criteriaGradeA: true,
  criteriaGradeBP: true,
  criteriaGradeB: true,
  criteriaGradeCP: true,
  criteriaGradeC: true,
  criteriaGradeDP: true,
  criteriaGradeD: true,
  criteriaGradeF: true,
}).merge(
  z.object({
    IsPortfolioCompleted: z.boolean().optional(),
  }),
);

export type UpdateCourseFormValues = z.infer<typeof UpdateCourseSchema>;

export const UpdateCourseDefaultValues: UpdateCourseFormValues = {
  name: '',
  description: '',
  code: '',
  curriculum: '',
  expectedPassingCloPercentage: 0,
  academicYear: 0,
  graduateYear: 0,
  programYear: 0,
  criteriaGradeA: 80,
  criteriaGradeBP: 75,
  criteriaGradeB: 70,
  criteriaGradeCP: 65,
  criteriaGradeC: 60,
  criteriaGradeDP: 55,
  criteriaGradeD: 50,
  criteriaGradeF: 45,
  IsPortfolioCompleted: false,
};
