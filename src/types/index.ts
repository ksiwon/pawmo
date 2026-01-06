// 학번 범위 타입
export type AdmissionYear = '2015이전' | '2016-2019' | '2020-2022' | '2023이후';

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

// 학생 정보 인터페이스 - 복수전공/부전공 다중 선택 지원
export interface StudentInfo {
  admissionYear: AdmissionYear;
  mainDepartment: Department;
  // 심화전공/복수전공/부전공/자유융합전공 중 하나 이상 필수 선택
  advancedMajor: boolean; // 심화전공
  freeFusionMajor: boolean; // 자유융합전공
  doubleMajors: Department[]; // 복수전공 (여러 개 가능)
  minors: Department[]; // 부전공 (여러 개 가능)
}

// 과목 정보 인터페이스
export interface Course {
  semester: string;
  department: string;
  courseCode: string;
  courseNumber: string;
  division: string;
  category: string; // 구분 (기필, 전필, 전선, 교필, 인선 등)
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
}

// 졸업요건 검사 결과
export interface GraduationCheckResult {
  studentInfo: StudentInfo;
  completionStatuses: CompletionStatus[];
  overallPassed: boolean;
  totalCreditsCompleted: number;
  gpa: number;
}
