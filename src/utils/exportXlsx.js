import xlsx from "xlsx";
import path from "path";

const date = (arg) => {
  let d = new Date(arg);
  let formattedDate = `${d.getDate()}/${
    d.getMonth() + 1
  }/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
  return formattedDate;
};

const exportExcel = async (
  data,
  workSheetColumnNames,
  workSheetName,
  filePath
) => {
  const workBook = xlsx.utils.book_new();

  const workSheetData = [workSheetColumnNames, ...data];

  const workSheet = xlsx.utils.aoa_to_sheet(workSheetData);
  let columnSizes = workSheet["!cols"];

  for (let i = 0; i < data.length; i++) {
    columnSizes.push({ width: "auto" });
  }

  xlsx.utils.book_append_sheet(workBook, workSheet, workSheetName);

  xlsx.writeFile(workBook, path.resolve(filePath));
};

export const exportStudents = (
  students,
  workSheetColumnNames,
  workSheetName,
  filePath
) => {
  const data = students.map((student) => {
    return [
      student.oneId,
      student.fullname,
      student.lastExam,
      student.status,
      date(student.createdAt),
    ];
  });

  exportExcel(data, workSheetColumnNames, workSheetName, filePath);
};

export const exportAllResults = (
  results,
  workSheetColumnNames,
  workSheetName,
  filePath
) => {
  const data = results.map((result) => {
    return [
      result.exam,
      result.examId,
      result.pupil,
      result.pupilId,
      result.rating,
      date(result.createdAt),
    ];
  });

  exportExcel(data, workSheetColumnNames, workSheetName, filePath);
};

export const exportExamResults = (
  results,
  workSheetColumnNames,
  workSheetName,
  filePath
) => {
  const data = results.map((result) => {
    return [
      result.examId,
      result.pupil,
      result.pupilId,
      result.rating,
      date(result.createdAt),
    ];
  });

  exportExcel(data, workSheetColumnNames, workSheetName, filePath);
};

