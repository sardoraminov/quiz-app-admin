import * as xlsx from "xlsx";
import path from "path-browserify";

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

  xlsx.utils.book_append_sheet(workBook, workSheet, workSheetName);

  function fitToColumn(arrayOfArray) {
    return arrayOfArray[0].map((a, i) => ({
      wch: Math.max(
        ...arrayOfArray.map((a2) => (a2[i] ? a2[i].toString().length : 0))
      ),
    }));
  }

  workSheet["!cols"] = fitToColumn(data)

  xlsx.writeFile(workBook, filePath);
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

export const exportAllResults = async (
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

export const exportExamResults = async (
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
