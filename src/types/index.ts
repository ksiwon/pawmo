// 구체적 입학년도 (2010~2025)
export type AdmissionYear = number;

// 학과 목록
export const DEPARTMENTS = [
  '물리학과',
  '수리과학과',
  '화학과',
  '생명과학과',
  '뇌인지과학과',
  '기계공학과',
  '항공우주공학과',
  '전기및전자공학부',
  '전산학부',
  '건설및환경공학과',
  '바이오및뇌공학과',
  '산업디자인학과',
  '산업및시스템공학과',
  '생명화학공학과',
  '신소재공학과',
  '원자력및양자공학과',
  '반도체시스템공학과',
  '융합인재학부',
  '기술경영학부',
] as const;

export type Department = typeof DEPARTMENTS[number];

// 학생 정보 인터페이스
export interface StudentInfo {
  admissionYear: AdmissionYear;
  mainDepartment: Department;
  advancedMajor: boolean;
  freeFusionMajor: boolean;
  doubleMajors: Department[];
  minors: Department[];
}

// 과목 정보 인터페이스
export interface Course {
  semester: string;
  department: string;
  courseCode: string;
  courseNumber: string;
  division: string;
  category: string;
  courseName: string;
  englishName: string;
  credits: number;
  au: number;
  retake: string;
  gradeOriginal: string;
  grade: string;
}

// 졸업요건 인터페이스
export interface GraduationRequirement {
  totalCredits: number;
  liberalRequired: number;
  liberalElective: number;
  basicRequired: number;
  basicElective: number;
  majorRequired: number;
  majorElective: number;
  research: number;
  au?: number;
  majorRequiredCourses?: string[];
  notes?: string[];
}

// 학과별 졸업요건 데이터
export interface DepartmentRequirements {
  [key: string]: {
    [year: string]: GraduationRequirement;
  };
}

// 이수 현황 인터페이스
export interface CompletionStatus {
  category: string;
  required: number;
  completed: number;
  remaining: number;
  passed: boolean;
  details?: string[];
  missingCourses?: string[];
}

// 졸업요건 검사 결과
export interface GraduationCheckResult {
  studentInfo: StudentInfo;
  completionStatuses: CompletionStatus[];
  overallPassed: boolean;
  totalCreditsCompleted: number;
  gpa: number;
}
