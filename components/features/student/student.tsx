'use client';

import Loading from '@/components/features/loading-screen';
import { columns } from '@/components/features/student/student-column';
import { StudentDataTable } from '@/components/features/student/student-table';
import { useGetStudentList } from '@/hooks/student-hook';
import { StudentColumn } from '@/types/schema/student-schema';

const Student = () => {
  const { data: students, isLoading } = useGetStudentList();

  return (
    <>
      <div>
        <h1 className="mb-5 text-4xl font-bold">Student</h1>
      </div>
      <div className="">
        {isLoading ? (
          <Loading />
        ) : (
          <StudentDataTable
            columns={columns}
            data={
              students?.map((student: StudentColumn) => ({
                ...student,
                grade: 'test',
              })) ?? []
            }
          />
        )}
      </div>
    </>
  );
};

export default Student;
