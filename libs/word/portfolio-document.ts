import {
  HeadingLevel,
  ImageRun,
  Paragraph,
  PatchDocumentOptions,
  PatchType,
  Table,
  TextRun,
  patchDocument,
} from 'docx';

import { GradeTable } from '@/libs/word/table/grade-table';
import { OutcomeTable } from '@/libs/word/table/outcome-table';
import { CreateCoursePortfolioForm } from '@/types/schema/course-portfolio-schema';

export async function generatePortfolioDocument({
  info,
  summary,
  result,
  development,
}: CreateCoursePortfolioForm) {
  const mockImage = await fetch('/images/nopermission.png');
  const mockImageBuffer = await mockImage.arrayBuffer();
  const template = await fetch('/template.docx');
  const templateBuffer = await template.arrayBuffer();

  const patchDocumentOptions: PatchDocumentOptions = {
    patches: {
      'info.course_code': {
        type: PatchType.PARAGRAPH,
        children: [new TextRun(info.courseCode)],
      },
      'info.course_name': {
        type: PatchType.PARAGRAPH,
        children: [new TextRun(info.courseName)],
      },
      'info.course_lecturer': {
        type: PatchType.PARAGRAPH,
        children: [new TextRun(info.lecturer.join(', '))],
      },
      'summary.teaching_methods': {
        type: PatchType.DOCUMENT,
        children: summary.teachingMethod.map(
          (e, i) =>
            new Paragraph({
              text: `${i + 1}. ${e.name}`,
              heading: HeadingLevel.TITLE,
              wordWrap: true,
              indent: { firstLine: 1125 },
            }),
        ),
      },
      'summary.online_tool': {
        type: PatchType.PARAGRAPH,
        children: [new TextRun(summary.onlineTool)],
      },
      'summary.objectives': {
        type: PatchType.DOCUMENT,
        children: summary.objective.map(
          (e, i) =>
            new Paragraph({
              text: `${i + 1}. ${e.name}`,
              heading: HeadingLevel.TITLE,
              wordWrap: true,
              indent: { firstLine: 1125 },
            }),
        ),
      },
      'outcome.grade_distribution_image': {
        type: PatchType.PARAGRAPH,
        children: [
          new ImageRun({
            data: mockImageBuffer,
            transformation: { width: 500, height: 200 },
          }),
        ],
      },
      'outcome.grade_distribution_table': {
        type: PatchType.DOCUMENT,
        children: [
          new Table({
            rows: new GradeTable().generate(result.gradeDistribution),
            alignment: 'center',
          }),
        ],
      },
      'outcome.program_outcomes': {
        type: PatchType.DOCUMENT,
        children: result.tabeeOutcomes.map(
          (e, i) =>
            new Paragraph({
              text: `${i + 1}. ${e.name}`,
              heading: HeadingLevel.TITLE,
              wordWrap: true,
              indent: { firstLine: 1125 },
            }),
        ),
      },
      'outcome.tabee_outcome': {
        type: PatchType.DOCUMENT,
        children: [
          new Table({
            rows: new OutcomeTable().generate(result.tabeeOutcomes),
            alignment: 'center',
          }),
        ],
      },
      development_plans: {
        type: PatchType.DOCUMENT,
        children: [
          ...development.plan.map((plan) => {
            return new Paragraph({
              text: `-     ${plan.name}`,
              indent: { firstLine: 700 },
              wordWrap: true,
            });
          }),
        ],
      },
      'development.do_and_checks': {
        type: PatchType.DOCUMENT,
        children: [
          ...development.doAndCheck.map((plan) => {
            return new Paragraph({
              text: `-     ${plan.name}`,
              indent: { firstLine: 700 },
              wordWrap: true,
            });
          }),
        ],
      },
      'development.acts': {
        type: PatchType.DOCUMENT,
        children: [
          ...development.act.map((plan) => {
            return new Paragraph({
              text: `-     ${plan.name}`,
              indent: { firstLine: 700 },
              wordWrap: true,
            });
          }),
        ],
      },
      'development.upstream': {
        type: PatchType.DOCUMENT,
        children: [
          ...development.subjectsComments.upstream
            .map((e) => {
              const courseName = new Paragraph({
                text: `-     ${e.courseName}`,
                indent: { firstLine: 2850 },
                wordWrap: true,
              });
              const courseComment = new Paragraph({
                text: `${e.comments}`,
                indent: { left: 3240 },
                wordWrap: true,
              });

              return [courseName, courseComment];
            })
            .flat(),
        ],
      },

      'development.downstream': {
        type: PatchType.DOCUMENT,
        children: [
          ...development.subjectsComments.downstream
            .map((e) => {
              const courseName = new Paragraph({
                text: `-     ${e.courseName}`,
                indent: { firstLine: 2850 },
                wordWrap: true,
              });
              const courseComment = new Paragraph({
                text: `${e.comments}`,
                indent: { left: 3240 },
                wordWrap: true,
              });

              return [courseName, courseComment];
            })
            .flat(),
        ],
      },
      'development.other': {
        type: PatchType.DOCUMENT,
        children: [
          new Paragraph({
            text: `${development.subjectsComments.other}`,
            indent: { left: 3240 },
            wordWrap: true,
          }),
        ],
      },
      'development.other_comments': {
        type: PatchType.DOCUMENT,
        children: [
          new Paragraph({
            text: development.otherComments,
            indent: { firstLine: 700 },
            wordWrap: true,
          }),
        ],
      },
    },
    keepOriginalStyles: true,
  };

  const doc = await patchDocument(templateBuffer, patchDocumentOptions);

  const blob = new Blob([doc], {
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  });
  const link = document.createElement('a');

  link.href = window.URL.createObjectURL(blob);
  link.download = 'my.docx';
  link.click();
}
