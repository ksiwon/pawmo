// 졸업요건 데이터 - PDF 기반 정확한 데이터

// 입학년도에 따른 졸업 이수 학점
export const getTotalCredits = (year: number): number => {
  if (year <= 2015) return 130;
  if (year <= 2022) return 136;
  return 138; // 2023 이후
};

// 입학년도에 따른 AU 요건
export const getAURequirement = (year: number): number => {
  if (year <= 2017) return 9;
  if (year <= 2022) return 8;
  return 4; // 2023 이후
};

// 체육 AU 관련 규정 (2023년 폐지)
export interface PhysicalEducationAUInfo {
  required: boolean;
  requiredAU: number;
  canSubstituteWithCredits: boolean;
  substituteCredits: number;
  auToCreditsRatio: number; // 이미 취득한 AU를 학점으로 환산 시 비율 (1AU = 1학점)
  notes: string[];
}

export const getPhysicalEducationAUInfo = (year: number): PhysicalEducationAUInfo => {
  // 2023학년도 이후 입학생: 체육 AU 해당사항 없음
  if (year >= 2023) {
    return {
      required: false,
      requiredAU: 0,
      canSubstituteWithCredits: false,
      substituteCredits: 0,
      auToCreditsRatio: 0,
      notes: ['2023학년도 입학생: 체육 AU 해당사항 없음'],
    };
  }
  
  // 2022학년도 이전 입학생: 체육 4AU 대신 2학점 대체 가능
  return {
    required: true,
    requiredAU: 4,
    canSubstituteWithCredits: true,
    substituteCredits: 2, // 체육 4AU 대신 교양, 기초, 전공, 연구과목 중 2학점으로 대체 가능
    auToCreditsRatio: 1, // 이미 취득한 AU는 1AU당 1학점으로 대체 인정
    notes: [
      '체육 4AU 대신 교양, 기초, 전공, 연구과목 중 자유롭게 2학점 이수로 대체 가능',
      '이미 취득한 체육 AU는 1AU당 1학점으로 대체 인정',
      '체육AU 폐지로 체육동아리 활동은 학점으로 인정하지 않음',
    ],
  };
};

// 공통 교양 요건
export const getCommonRequirements = (year: number, hasDoubleMajor: boolean = false) => {
  const liberalElective = hasDoubleMajor ? 12 : 21;
  
  return {
    liberalRequired: year <= 2010 ? 6 : 7,
    liberalElective,
    au: getAURequirement(year),
    basicRequired: 23,
    basicElective: 9,
  };
};

// 전공필수 과목 정보 (과목코드: 과목명)
export const majorRequiredCourseInfo: Record<string, Record<string, string>> = {
  '전산학부': {
    'CS.20004': '이산구조',
    'CS.20006': '데이터구조',
    'CS.30000': '알고리즘개론',
    'CS.30101': '전산기조직',
    'CS.30200': '프로그래밍언어',
    'CS.30300': '운영체제및실험',
  },
  '전기및전자공학부': {
    'EE.20001': '회로이론',
    'EE.20002': '신호및시스템',
    'EE.20004': '전기자기학I',
    'EE.20009': '프로그래밍및컴퓨터시스템개론',
    'EE.20010': '확률과기초확률과정',
    'EE.20011': '물리전자개론',
    'EE.30005': '전자설계및실험',
    'EE.40005': '전자디자인랩',
  },
  '물리학과': {
    'PH.20001': '역학',
    'PH.20002': '전자기학I',
    'PH.20003': '양자물리학I',
    'PH.30001': '통계역학',
    'PH.30101': '양자역학I',
    'PH.35100': '물리학실험III',
  },
  '화학과': {
    'CH.20011': '물리화학I',
    'CH.20012': '물리화학II',
    'CH.20021': '유기화학I',
    'CH.20022': '유기화학II',
    'CH.30031': '무기화학I',
    'CH.20071': '화학전공실험I',
    'CH.30071': '화학전공실험II',
    'CH.30072': '화학전공실험III',
    'CH.20051': '분석화학개론',
  },
  '생명과학과': {
    'BS.20000': '세포생물학',
    'BS.20002': '유전학',
    'BS.20005': '생화학I',
    'BS.20008': '분자생물학',
    'BS.20009': '세포및분자신경생물학',
    'BS.30019': '발생생물학',
  },
  '기계공학과': {
    'ME.20000': '기계기초실습',
    'ME.20005': '기계공학실험',
    'ME.40000': '창의적시스템구현1',
    'ME.30040': '공학설계',
  },
  '항공우주공학과': {
    'AE.20001': '항공우주공학개론',
    'AE.20003': '정역학',
    'AE.20004': '동역학',
    'AE.30001': '항공역학I',
    'AE.30002': '항공구조역학',
    'AE.30003': '비행역학',
    'AE.30004': '추진공학',
  },
  '건설및환경공학과': {
    'CE.20001': '재료역학',
    'CE.20030': '지반역학',
    'CE.30050': '수문학',
    'CE.30071': '구조역학',
  },
  '산업디자인학과': {
    'ID.20012': '기초디자인',
    'ID.20013': '제품디자인',
    'ID.30001': '인터랙티브제품디자인',
    'ID.30004': '사용자경험디자인',
    'ID.40003': '시스템디자인',
  },
  '생명화학공학과': {
    'CBE.20001': '분자공학실험',
    'CBE.20002': '생명화학공학개론',
    'CBE.30001': '생명화학공학실험',
  },
  '원자력및양자공학과': {
    'NQE.20001': '핵물리학개론',
    'NQE.20002': '원자로물리학',
    'NQE.30001': '원자로열수력학',
    'NQE.30002': '핵재료공학',
    'NQE.30003': '방사선공학',
  },
  '기술경영학부': {
    'BTM.20000': '경영학개론',
    'BTM.20004': '기술경영개론',
    'BTM.30051': '기술창업론',
  },
};

// 학과별 전공 요건 인터페이스
export interface DepartmentMajorRequirements {
  majorRequired: number;
  majorElective: number;
  research: number;
  researchExemptForDoubleMajor?: boolean;
  
  minorRequired?: number;
  minorMajorRequired?: number;
  minorRequiredCourses?: string[];
  minorNotes?: string[];
  
  doubleMajorRequired?: number;
  doubleMajorMajorRequired?: number;
  doubleMajorNotes?: string[];
  
  advancedMajorRequired?: number;
  basicElectiveOverride?: number;
  basicElectiveDoubleMajor?: number;
  basicElectiveRequiredCourses?: string[];
  notes?: string[];
}

// 모든 학과의 졸업요건 데이터 (PDF 기반)
export const departmentRequirements: Record<string, Record<string, DepartmentMajorRequirements>> = {
  '전산학부': {
    '2015이전': {
      majorRequired: 19, majorElective: 24, research: 3,
      researchExemptForDoubleMajor: true,
      minorRequired: 18, minorMajorRequired: 0,
      doubleMajorRequired: 40, doubleMajorMajorRequired: 19,
      basicElectiveOverride: 9, basicElectiveDoubleMajor: 3,
    },
    '2016-2022': {
      majorRequired: 19, majorElective: 30, research: 3,
      researchExemptForDoubleMajor: true,
      minorRequired: 21, minorMajorRequired: 15,
      minorNotes: ['전공필수 15학점 포함'],
      doubleMajorRequired: 40, doubleMajorMajorRequired: 19,
      doubleMajorNotes: ['캡스톤 1과목 필수 (2020+)'],
      advancedMajorRequired: 12,
      basicElectiveOverride: 9, basicElectiveDoubleMajor: 3,
    },
    '2023이후': {
      majorRequired: 19, majorElective: 30, research: 3,
      researchExemptForDoubleMajor: true,
      minorRequired: 21, minorMajorRequired: 15,
      minorNotes: ['전공필수 15학점 포함'],
      doubleMajorRequired: 40, doubleMajorMajorRequired: 19,
      doubleMajorNotes: ['캡스톤 1과목 필수'],
      advancedMajorRequired: 12,
      basicElectiveOverride: 9, basicElectiveDoubleMajor: 3,
    },
  },
  '전기및전자공학부': {
    '2015이전': {
      majorRequired: 18, majorElective: 32, research: 3,
      researchExemptForDoubleMajor: true,
      minorRequired: 21, minorMajorRequired: 12,
      minorRequiredCourses: ['EE.30005'],
      minorNotes: ['EE.30005 포함 전필 12학점'],
      doubleMajorRequired: 40, doubleMajorMajorRequired: 15,
      basicElectiveOverride: 9, basicElectiveDoubleMajor: 3,
    },
    '2016-2017': {
      majorRequired: 18, majorElective: 32, research: 3,
      researchExemptForDoubleMajor: true,
      minorRequired: 21, minorMajorRequired: 12,
      minorRequiredCourses: ['EE.30005'],
      minorNotes: ['EE.30005 포함 전필 12학점'],
      doubleMajorRequired: 40, doubleMajorMajorRequired: 15,
      advancedMajorRequired: 12,
      basicElectiveOverride: 9, basicElectiveDoubleMajor: 3,
    },
    '2018-2022': {
      majorRequired: 15, majorElective: 35, research: 3,
      researchExemptForDoubleMajor: true,
      minorRequired: 21, minorMajorRequired: 12,
      minorRequiredCourses: ['EE.30005'],
      minorNotes: ['EE.30005 포함 전필 12학점'],
      doubleMajorRequired: 40, doubleMajorMajorRequired: 15,
      advancedMajorRequired: 12,
      basicElectiveOverride: 9, basicElectiveDoubleMajor: 3,
    },
    '2023이후': {
      majorRequired: 15, majorElective: 35, research: 3,
      researchExemptForDoubleMajor: true,
      minorRequired: 21, minorMajorRequired: 12,
      minorRequiredCourses: ['EE.30005'],
      minorNotes: ['EE.30005 포함 전필 12학점'],
      doubleMajorRequired: 40, doubleMajorMajorRequired: 15,
      advancedMajorRequired: 12,
      basicElectiveOverride: 9, basicElectiveDoubleMajor: 3,
    },
  },
  '물리학과': {
    '2015이전': {
      majorRequired: 19, majorElective: 21, research: 5,
      researchExemptForDoubleMajor: true,
      minorRequired: 19, minorMajorRequired: 6,
      minorRequiredCourses: ['PH.30101', 'PH.35100'],
      minorNotes: ['PH301 양자역학I, PH351 물리학실험III 필수'],
      doubleMajorRequired: 40, doubleMajorMajorRequired: 19,
      basicElectiveOverride: 9, basicElectiveDoubleMajor: 3,
    },
    '2016-2022': {
      majorRequired: 19, majorElective: 24, research: 5,
      researchExemptForDoubleMajor: true,
      minorRequired: 18, minorMajorRequired: 6,
      minorRequiredCourses: ['PH.30101', 'PH.35100'],
      minorNotes: ['PH301 양자역학I, PH351 물리학실험III 필수'],
      doubleMajorRequired: 40, doubleMajorMajorRequired: 19,
      advancedMajorRequired: 12,
      basicElectiveOverride: 9, basicElectiveDoubleMajor: 3,
    },
    '2023이후': {
      majorRequired: 19, majorElective: 24, research: 5,
      researchExemptForDoubleMajor: true,
      minorRequired: 18, minorMajorRequired: 6,
      minorRequiredCourses: ['PH.30101', 'PH.35100'],
      minorNotes: ['PH301 양자역학I, PH351 물리학실험III 필수'],
      doubleMajorRequired: 40, doubleMajorMajorRequired: 19,
      advancedMajorRequired: 12,
      basicElectiveOverride: 9, basicElectiveDoubleMajor: 3,
    },
  },
  '수리과학과': {
    '2015이전': {
      majorRequired: 0, majorElective: 42, research: 3,
      researchExemptForDoubleMajor: true,
      minorRequired: 18, minorMajorRequired: 0,
      minorNotes: ['MAS코드 18학점 (필수 없음)'],
      doubleMajorRequired: 40, doubleMajorMajorRequired: 0,
      doubleMajorNotes: ['필수선택 4과목 이상'],
      basicElectiveOverride: 9, basicElectiveDoubleMajor: 6,
    },
    '2016-2022': {
      majorRequired: 0, majorElective: 42, research: 3,
      researchExemptForDoubleMajor: true,
      minorRequired: 18, minorMajorRequired: 0,
      minorNotes: ['MAS코드 18학점 (필수 없음)'],
      doubleMajorRequired: 40, doubleMajorMajorRequired: 0,
      doubleMajorNotes: ['권장선택 4과목 이상'],
      advancedMajorRequired: 13,
      basicElectiveOverride: 9, basicElectiveDoubleMajor: 6,
    },
    '2023이후': {
      majorRequired: 0, majorElective: 42, research: 3,
      researchExemptForDoubleMajor: true,
      minorRequired: 18, minorMajorRequired: 0,
      minorNotes: ['MAS코드 18학점 (필수 없음)'],
      doubleMajorRequired: 40, doubleMajorMajorRequired: 0,
      doubleMajorNotes: ['필수선택 4과목 이상'],
      advancedMajorRequired: 13,
      basicElectiveOverride: 9, basicElectiveDoubleMajor: 6,
    },
  },
  '화학과': {
    '2015이전': {
      majorRequired: 24, majorElective: 18, research: 3,
      researchExemptForDoubleMajor: true,
      minorRequired: 21, minorMajorRequired: 12,
      doubleMajorRequired: 40, doubleMajorMajorRequired: 24,
      basicElectiveOverride: 9, basicElectiveDoubleMajor: 6,
    },
    '2016-2022': {
      majorRequired: 24, majorElective: 18, research: 3,
      researchExemptForDoubleMajor: true,
      minorRequired: 21, minorMajorRequired: 12,
      doubleMajorRequired: 40, doubleMajorMajorRequired: 24,
      advancedMajorRequired: 12,
      basicElectiveOverride: 9, basicElectiveDoubleMajor: 6,
    },
    '2023이후': {
      majorRequired: 24, majorElective: 18, research: 3,
      researchExemptForDoubleMajor: true,
      minorRequired: 21, minorMajorRequired: 12,
      doubleMajorRequired: 40, doubleMajorMajorRequired: 24,
      advancedMajorRequired: 12,
      basicElectiveOverride: 9, basicElectiveDoubleMajor: 6,
    },
  },
  '생명과학과': {
    '2015이전': {
      majorRequired: 18, majorElective: 30, research: 3,
      researchExemptForDoubleMajor: true,
      minorRequired: 21, minorMajorRequired: 12,
      doubleMajorRequired: 40, doubleMajorMajorRequired: 18,
      basicElectiveOverride: 9, basicElectiveDoubleMajor: 6,
    },
    '2016-2022': {
      majorRequired: 18, majorElective: 24, research: 3,
      researchExemptForDoubleMajor: true,
      minorRequired: 21, minorMajorRequired: 12,
      doubleMajorRequired: 40, doubleMajorMajorRequired: 18,
      advancedMajorRequired: 12,
      basicElectiveOverride: 9, basicElectiveDoubleMajor: 6,
    },
    '2023이후': {
      majorRequired: 18, majorElective: 24, research: 3,
      researchExemptForDoubleMajor: true,
      minorRequired: 21, minorMajorRequired: 12,
      doubleMajorRequired: 40, doubleMajorMajorRequired: 18,
      advancedMajorRequired: 12,
      basicElectiveOverride: 9, basicElectiveDoubleMajor: 6,
    },
  },
  '기계공학과': {
    '2015이전': {
      majorRequired: 12, majorElective: 47, research: 3,
      researchExemptForDoubleMajor: true,
      minorRequired: 21, minorMajorRequired: 6,
      minorNotes: ['전필 2과목 이상 포함'],
      doubleMajorRequired: 40, doubleMajorMajorRequired: 12,
      basicElectiveOverride: 9, basicElectiveDoubleMajor: 3,
    },
    '2016-2022': {
      majorRequired: 12, majorElective: 36, research: 3,
      researchExemptForDoubleMajor: true,
      minorRequired: 21, minorMajorRequired: 6,
      minorNotes: ['전필 2과목 이상 포함'],
      doubleMajorRequired: 40, doubleMajorMajorRequired: 12,
      advancedMajorRequired: 15,
      basicElectiveOverride: 9, basicElectiveDoubleMajor: 3,
    },
    '2023이후': {
      majorRequired: 9, majorElective: 36, research: 3,
      researchExemptForDoubleMajor: true,
      minorRequired: 21, minorMajorRequired: 6,
      minorNotes: ['전필 2과목 이상 포함'],
      doubleMajorRequired: 40, doubleMajorMajorRequired: 9,
      advancedMajorRequired: 15,
      basicElectiveOverride: 9, basicElectiveDoubleMajor: 3,
    },
  },
  '항공우주공학과': {
    '2015이전': {
      majorRequired: 19, majorElective: 30, research: 3,
      researchExemptForDoubleMajor: true,
      minorRequired: 18, minorMajorRequired: 9,
      doubleMajorRequired: 42, doubleMajorMajorRequired: 21,
      basicElectiveOverride: 9, basicElectiveDoubleMajor: 6,
    },
    '2016-2022': {
      majorRequired: 21, majorElective: 21, research: 3,
      researchExemptForDoubleMajor: true,
      minorRequired: 18, minorMajorRequired: 9,
      doubleMajorRequired: 42, doubleMajorMajorRequired: 21,
      advancedMajorRequired: 18,
      basicElectiveOverride: 9, basicElectiveDoubleMajor: 6,
    },
    '2023이후': {
      majorRequired: 21, majorElective: 21, research: 3,
      researchExemptForDoubleMajor: true,
      minorRequired: 18, minorMajorRequired: 9,
      doubleMajorRequired: 42, doubleMajorMajorRequired: 21,
      advancedMajorRequired: 18,
      basicElectiveOverride: 9, basicElectiveDoubleMajor: 6,
    },
  },
  '건설및환경공학과': {
    '2015이전': {
      majorRequired: 12, majorElective: 33, research: 3,
      researchExemptForDoubleMajor: true,
      minorRequired: 21, minorMajorRequired: 12,
      doubleMajorRequired: 40, doubleMajorMajorRequired: 12,
      basicElectiveOverride: 9, basicElectiveDoubleMajor: 6,
    },
    '2016-2022': {
      majorRequired: 12, majorElective: 33, research: 3,
      researchExemptForDoubleMajor: true,
      minorRequired: 18, minorMajorRequired: 12,
      doubleMajorRequired: 40, doubleMajorMajorRequired: 12,
      advancedMajorRequired: 12,
      basicElectiveOverride: 9, basicElectiveDoubleMajor: 6,
    },
    '2023이후': {
      majorRequired: 12, majorElective: 33, research: 3,
      researchExemptForDoubleMajor: true,
      minorRequired: 18, minorMajorRequired: 12,
      doubleMajorRequired: 40, doubleMajorMajorRequired: 12,
      advancedMajorRequired: 12,
      basicElectiveOverride: 9, basicElectiveDoubleMajor: 6,
    },
  },
  '바이오및뇌공학과': {
    '2015이전': {
      majorRequired: 14, majorElective: 30, research: 5,
      researchExemptForDoubleMajor: true,
      minorRequired: 18, minorMajorRequired: 0,
      doubleMajorRequired: 40, doubleMajorMajorRequired: 14,
      basicElectiveOverride: 9, basicElectiveDoubleMajor: 6,
    },
    '2016-2022': {
      majorRequired: 14, majorElective: 30, research: 5,
      researchExemptForDoubleMajor: true,
      minorRequired: 18, minorMajorRequired: 0,
      doubleMajorRequired: 40, doubleMajorMajorRequired: 14,
      advancedMajorRequired: 12,
      basicElectiveOverride: 9, basicElectiveDoubleMajor: 6,
    },
    '2023이후': {
      majorRequired: 14, majorElective: 30, research: 5,
      researchExemptForDoubleMajor: true,
      minorRequired: 18, minorMajorRequired: 0,
      doubleMajorRequired: 40, doubleMajorMajorRequired: 14,
      advancedMajorRequired: 12,
      basicElectiveOverride: 9, basicElectiveDoubleMajor: 6,
    },
  },
  '산업디자인학과': {
    '2015이전': {
      majorRequired: 27, majorElective: 27, research: 3,
      researchExemptForDoubleMajor: true,
      minorRequired: 18, minorMajorRequired: 6,
      minorRequiredCourses: ['ID.20013', 'ID.30001'],
      minorNotes: ['ID213, ID301 포함 6학점'],
      doubleMajorRequired: 40, doubleMajorMajorRequired: 15,
      basicElectiveOverride: 9, basicElectiveDoubleMajor: 6,
    },
    '2016-2022': {
      majorRequired: 15, majorElective: 30, research: 3,
      researchExemptForDoubleMajor: true,
      minorRequired: 18, minorMajorRequired: 6,
      minorRequiredCourses: ['ID.20013', 'ID.30001'],
      minorNotes: ['ID213, ID301 포함 6학점'],
      doubleMajorRequired: 40, doubleMajorMajorRequired: 15,
      advancedMajorRequired: 12,
      basicElectiveOverride: 9, basicElectiveDoubleMajor: 6,
    },
    '2023이후': {
      majorRequired: 15, majorElective: 30, research: 3,
      researchExemptForDoubleMajor: true,
      minorRequired: 18, minorMajorRequired: 6,
      minorRequiredCourses: ['ID.20013', 'ID.30001'],
      minorNotes: ['ID213, ID301 포함 6학점'],
      doubleMajorRequired: 40, doubleMajorMajorRequired: 15,
      advancedMajorRequired: 12,
      basicElectiveOverride: 9, basicElectiveDoubleMajor: 6,
    },
  },
  '산업및시스템공학과': {
    '2015이전': {
      majorRequired: 24, majorElective: 27, research: 4,
      researchExemptForDoubleMajor: true,
      minorRequired: 18, minorMajorRequired: 0,
      minorNotes: ['전필/전선 구분없이 18학점'],
      doubleMajorRequired: 40, doubleMajorMajorRequired: 24,
      basicElectiveOverride: 3, basicElectiveDoubleMajor: 3,
    },
    '2016-2022': {
      majorRequired: 24, majorElective: 21, research: 4,
      researchExemptForDoubleMajor: true,
      minorRequired: 18, minorMajorRequired: 0,
      minorNotes: ['전필/전선 구분없이 18학점'],
      doubleMajorRequired: 40, doubleMajorMajorRequired: 24,
      advancedMajorRequired: 12,
      basicElectiveOverride: 3, basicElectiveDoubleMajor: 3,
    },
    '2023이후': {
      majorRequired: 24, majorElective: 21, research: 4,
      researchExemptForDoubleMajor: true,
      minorRequired: 18, minorMajorRequired: 0,
      minorNotes: ['전필/전선 구분없이 18학점'],
      doubleMajorRequired: 40, doubleMajorMajorRequired: 24,
      advancedMajorRequired: 12,
      basicElectiveOverride: 3, basicElectiveDoubleMajor: 3,
    },
  },
  '생명화학공학과': {
    '2015이전': {
      majorRequired: 21, majorElective: 20, research: 4,
      researchExemptForDoubleMajor: true,
      minorRequired: 18, minorMajorRequired: 9,
      minorNotes: ['CBE.20001/30001 중 1 + CBE.20002 포함 전필 9학점'],
      doubleMajorRequired: 41, doubleMajorMajorRequired: 21,
      basicElectiveOverride: 9, basicElectiveDoubleMajor: 6,
    },
    '2016-2019': {
      majorRequired: 21, majorElective: 21, research: 4,
      researchExemptForDoubleMajor: true,
      minorRequired: 18, minorMajorRequired: 9,
      minorNotes: ['CBE.20001/30001 중 1 + CBE.20002 포함 전필 9학점'],
      doubleMajorRequired: 42, doubleMajorMajorRequired: 21,
      advancedMajorRequired: 12,
      basicElectiveOverride: 9, basicElectiveDoubleMajor: 6,
    },
    '2020-2022': {
      majorRequired: 18, majorElective: 24, research: 4,
      researchExemptForDoubleMajor: true,
      minorRequired: 18, minorMajorRequired: 9,
      minorNotes: ['CBE.20001/30001 중 1 + CBE.20002 포함 전필 9학점'],
      doubleMajorRequired: 42, doubleMajorMajorRequired: 18,
      advancedMajorRequired: 12,
      basicElectiveOverride: 9, basicElectiveDoubleMajor: 6,
    },
    '2023이후': {
      majorRequired: 18, majorElective: 24, research: 4,
      researchExemptForDoubleMajor: true,
      minorRequired: 18, minorMajorRequired: 9,
      minorNotes: ['CBE.20001/30001 중 1 + CBE.20002 포함 전필 9학점'],
      doubleMajorRequired: 42, doubleMajorMajorRequired: 18,
      advancedMajorRequired: 12,
      basicElectiveOverride: 9, basicElectiveDoubleMajor: 6,
    },
  },
  '신소재공학과': {
    '2015이전': {
      majorRequired: 18, majorElective: 24, research: 3,
      researchExemptForDoubleMajor: true,
      minorRequired: 18, minorMajorRequired: 0,
      doubleMajorRequired: 40, doubleMajorMajorRequired: 18,
      basicElectiveDoubleMajor: 6,
    },
    '2016-2022': {
      majorRequired: 18, majorElective: 24, research: 3,
      researchExemptForDoubleMajor: true,
      minorRequired: 18, minorMajorRequired: 0,
      doubleMajorRequired: 40, doubleMajorMajorRequired: 18,
      advancedMajorRequired: 15,
      basicElectiveDoubleMajor: 6,
    },
    '2023이후': {
      majorRequired: 18, majorElective: 24, research: 3,
      researchExemptForDoubleMajor: true,
      minorRequired: 18, minorMajorRequired: 0,
      doubleMajorRequired: 40, doubleMajorMajorRequired: 18,
      advancedMajorRequired: 15,
      basicElectiveDoubleMajor: 6,
    },
  },
  '원자력및양자공학과': {
    '2015이전': {
      majorRequired: 25, majorElective: 18, research: 3,
      researchExemptForDoubleMajor: true,
      minorRequired: 21, minorMajorRequired: 15,
      doubleMajorRequired: 40, doubleMajorMajorRequired: 25,
      basicElectiveDoubleMajor: 6,
    },
    '2016-2022': {
      majorRequired: 25, majorElective: 18, research: 3,
      researchExemptForDoubleMajor: true,
      minorRequired: 21, minorMajorRequired: 15,
      doubleMajorRequired: 40, doubleMajorMajorRequired: 25,
      advancedMajorRequired: 12,
      basicElectiveDoubleMajor: 6,
    },
    '2023이후': {
      majorRequired: 25, majorElective: 18, research: 3,
      researchExemptForDoubleMajor: true,
      minorRequired: 21, minorMajorRequired: 15,
      doubleMajorRequired: 40, doubleMajorMajorRequired: 25,
      advancedMajorRequired: 12,
      basicElectiveDoubleMajor: 6,
    },
  },
  '반도체시스템공학과': {
    '2016-2022': {
      majorRequired: 18, majorElective: 35, research: 6,
      researchExemptForDoubleMajor: false,
      minorRequired: 0, minorMajorRequired: 0,
      doubleMajorRequired: 0, doubleMajorMajorRequired: 0,
      advancedMajorRequired: 12,
      notes: ['부전공/복수전공 불가'],
    },
    '2023이후': {
      majorRequired: 18, majorElective: 35, research: 6,
      researchExemptForDoubleMajor: false,
      minorRequired: 0, minorMajorRequired: 0,
      doubleMajorRequired: 0, doubleMajorMajorRequired: 0,
      advancedMajorRequired: 12,
      notes: ['부전공/복수전공 불가'],
    },
  },
  '융합인재학부': {
    '2021-2022': {
      majorRequired: 21, majorElective: 21, research: 3,
      researchExemptForDoubleMajor: true,
      minorRequired: 18, minorMajorRequired: 0,
      minorNotes: ['지성과문명강독/사회적혁신실험 중 18학점'],
      doubleMajorRequired: 42, doubleMajorMajorRequired: 18,
      advancedMajorRequired: 12,
      basicElectiveDoubleMajor: 3,
    },
    '2023이후': {
      majorRequired: 21, majorElective: 21, research: 3,
      researchExemptForDoubleMajor: true,
      minorRequired: 18, minorMajorRequired: 0,
      minorNotes: ['지성과문명강독/사회적혁신실험 중 18학점'],
      doubleMajorRequired: 42, doubleMajorMajorRequired: 18,
      advancedMajorRequired: 12,
      basicElectiveDoubleMajor: 3,
    },
  },
  '기술경영학부': {
    '2015이전': {
      majorRequired: 9, majorElective: 39, research: 4,
      researchExemptForDoubleMajor: true,
      minorRequired: 18, minorMajorRequired: 6,
      minorNotes: ['전필 3과목 중 택2 (6학점)'],
      doubleMajorRequired: 40, doubleMajorMajorRequired: 6,
      basicElectiveDoubleMajor: 6,
      notes: ['이공계 타학과 복수전공 필수'],
    },
    '2016-2022': {
      majorRequired: 9, majorElective: 39, research: 4,
      researchExemptForDoubleMajor: true,
      minorRequired: 18, minorMajorRequired: 6,
      minorNotes: ['전필 3과목 중 택2 (6학점)'],
      doubleMajorRequired: 40, doubleMajorMajorRequired: 6,
      advancedMajorRequired: 12,
      basicElectiveDoubleMajor: 6,
      notes: ['이공계 타학과 복수전공 필수'],
    },
    '2023이후': {
      majorRequired: 9, majorElective: 39, research: 4,
      researchExemptForDoubleMajor: true,
      minorRequired: 18, minorMajorRequired: 6,
      minorNotes: ['전필 3과목 중 택2 (6학점)'],
      doubleMajorRequired: 40, doubleMajorMajorRequired: 6,
      advancedMajorRequired: 12,
      basicElectiveDoubleMajor: 6,
      notes: ['이공계 타학과 복수전공 필수'],
    },
  },
  '뇌인지과학과': {
    '2023이후': {
      majorRequired: 0, majorElective: 42, research: 3,
      researchExemptForDoubleMajor: true,
      minorRequired: 18, minorMajorRequired: 0,
      doubleMajorRequired: 40, doubleMajorMajorRequired: 0,
      advancedMajorRequired: 12,
      basicElectiveDoubleMajor: 6,
    },
  },
};

// 학번에 맞는 요건 키 가져오기
export const getRequirementKey = (department: string, year: number): string => {
  const deptReqs = departmentRequirements[department];
  if (!deptReqs) return '2023이후';
  
  const keys = Object.keys(deptReqs);
  
  for (const key of keys) {
    if (key.includes('이전') && year <= 2015) return key;
    if (key.includes('이후') && year >= 2023) return key;
    
    const match = key.match(/(\d{4})-(\d{4})/);
    if (match) {
      const start = parseInt(match[1]);
      const end = parseInt(match[2]);
      if (year >= start && year <= end) return key;
    }
  }
  
  if (year <= 2015 && keys.includes('2015이전')) return '2015이전';
  if (year >= 2023 && keys.includes('2023이후')) return '2023이후';
  
  for (const key of keys) {
    const match = key.match(/(\d{4})-(\d{4})/);
    if (match) {
      const end = parseInt(match[2]);
      if (year <= end) return key;
    }
  }
  
  return keys[keys.length - 1];
};
