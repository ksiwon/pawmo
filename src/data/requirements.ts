// 졸업요건 데이터

// 학번별 졸업 이수 학점
export const getTotalCredits = (admissionYear: string): number => {
  if (admissionYear === '2015이전') return 130;
  if (admissionYear === '2016-2019' || admissionYear === '2020-2022') return 136;
  return 138; // 2023이후
};

// 공통 교양 요건 (학번별) - 복수전공 여부에 따라 인선 요건 다름
export const getCommonRequirements = (admissionYear: string, hasDoubleMajor: boolean = false) => {
  // 복수전공 이수자는 인문사회선택 12학점 (핵심 1과목 포함)
  // 일반: 21학점 (3개 계열 중 2계열에서 각 1과목 + 핵심 1과목 포함)
  const liberalElective = hasDoubleMajor ? 12 : 21;
  
  if (admissionYear === '2023이후') {
    return {
      liberalRequired: 7, // 교양필수
      liberalElective, // 인문사회선택
      au: 4, // 4AU
      basicRequired: 23, // 기초필수
      basicElective: 9, // 기초선택 (복수전공자: 3 또는 6)
    };
  } else if (admissionYear === '2020-2022' || admissionYear === '2016-2019') {
    return {
      liberalRequired: 7,
      liberalElective,
      au: 8,
      basicRequired: 23,
      basicElective: 9,
    };
  } else {
    return {
      liberalRequired: 7,
      liberalElective,
      au: 9,
      basicRequired: 23,
      basicElective: 9,
    };
  }
};

// 학과별 전공 요건
export interface DepartmentMajorRequirements {
  majorRequired: number;
  majorElective: number;
  research: number;
  majorRequiredCourses?: string[];
  minorRequired?: number;
  doubleMajorRequired?: number;
  advancedMajorRequired?: number;
  basicElectiveOverride?: number;
  basicElectiveDoubleMajor?: number; // 복수전공자 기초선택
  notes?: string[];
}

// 모든 학과의 졸업요건 데이터
export const departmentRequirements: Record<string, Record<string, DepartmentMajorRequirements>> = {
  '물리학과': {
    '2015이전': {
      majorRequired: 19,
      majorElective: 21,
      research: 5,
      majorRequiredCourses: ['PH490 졸업연구', 'PH496 세미나'],
      minorRequired: 19,
      doubleMajorRequired: 40,
      basicElectiveOverride: 9,
    },
    '2016-2019': {
      majorRequired: 19,
      majorElective: 24,
      research: 5,
      majorRequiredCourses: ['PH490 졸업연구', 'PH496 세미나'],
      minorRequired: 18,
      doubleMajorRequired: 40,
      advancedMajorRequired: 12,
      basicElectiveOverride: 9,
    },
    '2020-2022': {
      majorRequired: 19,
      majorElective: 24,
      research: 5,
      majorRequiredCourses: ['PH490 졸업연구', 'PH496 세미나'],
      minorRequired: 18,
      doubleMajorRequired: 40,
      advancedMajorRequired: 12,
      basicElectiveOverride: 9,
    },
    '2023이후': {
      majorRequired: 19,
      majorElective: 24,
      research: 5,
      majorRequiredCourses: ['PH490 졸업연구', 'PH496 세미나'],
      minorRequired: 18,
      doubleMajorRequired: 40,
      advancedMajorRequired: 12,
      basicElectiveOverride: 9,
    },
  },
  '수리과학과': {
    '2015이전': {
      majorRequired: 0,
      majorElective: 42,
      research: 3,
      notes: ['전공선택 중 필수선택 4과목 이상 포함'],
      minorRequired: 18,
      doubleMajorRequired: 40,
      basicElectiveOverride: 9,
    },
    '2016-2019': {
      majorRequired: 0,
      majorElective: 42,
      research: 3,
      notes: ['전공선택 중 권장선택 4과목 이상 포함'],
      minorRequired: 18,
      doubleMajorRequired: 40,
      advancedMajorRequired: 12,
      basicElectiveOverride: 9,
    },
    '2020-2022': {
      majorRequired: 0,
      majorElective: 42,
      research: 3,
      notes: ['전공선택 중 권장선택 4과목 이상 포함'],
      minorRequired: 18,
      doubleMajorRequired: 40,
      advancedMajorRequired: 12,
      basicElectiveOverride: 9,
    },
    '2023이후': {
      majorRequired: 0,
      majorElective: 42,
      research: 3,
      notes: ['전공선택 중 필수선택 4과목 이상 포함'],
      minorRequired: 18,
      doubleMajorRequired: 40,
      advancedMajorRequired: 12,
      basicElectiveOverride: 9,
    },
  },
  '화학과': {
    '2015이전': {
      majorRequired: 24,
      majorElective: 18,
      research: 3,
      majorRequiredCourses: ['CH.20011', 'CH.20012', 'CH.20021', 'CH.20022', 'CH.30031', 'CH.20071', 'CH.30071', 'CH.30072', 'CH.20051'],
      minorRequired: 21,
      doubleMajorRequired: 40,
      basicElectiveOverride: 9,
      basicElectiveDoubleMajor: 6,
    },
    '2016-2019': {
      majorRequired: 24,
      majorElective: 18,
      research: 3,
      minorRequired: 21,
      doubleMajorRequired: 40,
      advancedMajorRequired: 12,
      basicElectiveOverride: 9,
      basicElectiveDoubleMajor: 6,
    },
    '2020-2022': {
      majorRequired: 24,
      majorElective: 18,
      research: 3,
      minorRequired: 21,
      doubleMajorRequired: 40,
      advancedMajorRequired: 12,
      basicElectiveOverride: 9,
      basicElectiveDoubleMajor: 6,
    },
    '2023이후': {
      majorRequired: 24,
      majorElective: 18,
      research: 3,
      minorRequired: 21,
      doubleMajorRequired: 40,
      advancedMajorRequired: 12,
      basicElectiveOverride: 9,
      basicElectiveDoubleMajor: 6,
    },
  },
  '생명과학과': {
    '2015이전': {
      majorRequired: 18,
      majorElective: 30,
      research: 3,
      majorRequiredCourses: ['BS.20000', 'BS.20002', 'BS.20005', 'BS.20008', 'BS.20009', 'BS.30019'],
      minorRequired: 21,
      doubleMajorRequired: 40,
      basicElectiveOverride: 9,
    },
    '2016-2019': {
      majorRequired: 18,
      majorElective: 24,
      research: 3,
      minorRequired: 21,
      doubleMajorRequired: 40,
      advancedMajorRequired: 12,
      basicElectiveOverride: 9,
    },
    '2020-2022': {
      majorRequired: 18,
      majorElective: 24,
      research: 3,
      minorRequired: 21,
      doubleMajorRequired: 40,
      advancedMajorRequired: 12,
      basicElectiveOverride: 9,
    },
    '2023이후': {
      majorRequired: 18,
      majorElective: 24,
      research: 3,
      minorRequired: 21,
      doubleMajorRequired: 40,
      advancedMajorRequired: 12,
      basicElectiveOverride: 9,
    },
  },
  '뇌인지과학과': {
    '2023이후': {
      majorRequired: 0,
      majorElective: 42,
      research: 3,
      minorRequired: 18,
      doubleMajorRequired: 40,
      advancedMajorRequired: 12,
    },
  },
  '기계공학과': {
    '2015이전': {
      majorRequired: 12,
      majorElective: 47,
      research: 3,
      majorRequiredCourses: ['ME.20000', 'ME.20005', 'ME.40000', 'ME.30040'],
      notes: ['기반과목 9개 중 7과목 이상 이수'],
      minorRequired: 21,
      doubleMajorRequired: 40,
      basicElectiveOverride: 9,
    },
    '2016-2019': {
      majorRequired: 12,
      majorElective: 36,
      research: 3,
      notes: ['기반과목 9개 중 5과목 이상 이수'],
      minorRequired: 21,
      doubleMajorRequired: 40,
      advancedMajorRequired: 15,
      basicElectiveOverride: 9,
    },
    '2020-2022': {
      majorRequired: 12,
      majorElective: 36,
      research: 3,
      notes: ['기반과목 9개 중 5과목 이상 이수'],
      minorRequired: 21,
      doubleMajorRequired: 40,
      advancedMajorRequired: 15,
      basicElectiveOverride: 9,
    },
    '2023이후': {
      majorRequired: 9,
      majorElective: 36,
      research: 3,
      notes: ['기반과목 9개 중 5과목 이상 이수'],
      minorRequired: 21,
      doubleMajorRequired: 40,
      advancedMajorRequired: 15,
      basicElectiveOverride: 9,
    },
  },
  '항공우주공학과': {
    '2015이전': {
      majorRequired: 19,
      majorElective: 30,
      research: 3,
      minorRequired: 21,
      doubleMajorRequired: 40,
      basicElectiveOverride: 9,
    },
    '2016-2019': {
      majorRequired: 21,
      majorElective: 21,
      research: 3,
      minorRequired: 21,
      doubleMajorRequired: 40,
      advancedMajorRequired: 18,
      basicElectiveOverride: 9,
    },
    '2020-2022': {
      majorRequired: 21,
      majorElective: 21,
      research: 3,
      minorRequired: 21,
      doubleMajorRequired: 40,
      advancedMajorRequired: 18,
      basicElectiveOverride: 9,
    },
    '2023이후': {
      majorRequired: 21,
      majorElective: 21,
      research: 3,
      minorRequired: 21,
      doubleMajorRequired: 40,
      advancedMajorRequired: 18,
      basicElectiveOverride: 9,
    },
  },
  '전기및전자공학부': {
    '2015이전': {
      majorRequired: 18,
      majorElective: 32,
      research: 3,
      minorRequired: 21,
      doubleMajorRequired: 40,
      basicElectiveOverride: 9,
    },
    '2016-2017': {
      majorRequired: 18,
      majorElective: 32,
      research: 3,
      majorRequiredCourses: ['EE.20001', 'EE.20002', 'EE.20004', 'EE.20009', 'EE.30005', 'EE.40005'],
      minorRequired: 21,
      doubleMajorRequired: 40,
      advancedMajorRequired: 12,
      basicElectiveOverride: 9,
    },
    '2018-2022': {
      majorRequired: 19,
      majorElective: 30,
      research: 3,
      minorRequired: 21,
      doubleMajorRequired: 40,
      advancedMajorRequired: 12,
      basicElectiveOverride: 9,
    },
    '2023이후': {
      majorRequired: 19,
      majorElective: 30,
      research: 3,
      minorRequired: 21,
      doubleMajorRequired: 40,
      advancedMajorRequired: 12,
      basicElectiveOverride: 9,
    },
  },
  '전산학부': {
    '2015이전': {
      majorRequired: 19,
      majorElective: 30,
      research: 3,
      minorRequired: 18,
      doubleMajorRequired: 40,
      basicElectiveOverride: 9,
    },
    '2016-2019': {
      majorRequired: 19,
      majorElective: 30,
      research: 3,
      minorRequired: 18,
      doubleMajorRequired: 40,
      advancedMajorRequired: 12,
      basicElectiveOverride: 9,
    },
    '2020-2022': {
      majorRequired: 19,
      majorElective: 30,
      research: 3,
      minorRequired: 18,
      doubleMajorRequired: 40,
      advancedMajorRequired: 12,
      basicElectiveOverride: 9,
    },
    '2023이후': {
      majorRequired: 19,
      majorElective: 30,
      research: 3,
      minorRequired: 18,
      doubleMajorRequired: 40,
      advancedMajorRequired: 12,
      basicElectiveOverride: 9,
    },
  },
  '건설및환경공학과': {
    '2015이전': {
      majorRequired: 15,
      majorElective: 30,
      research: 3,
      minorRequired: 18,
      doubleMajorRequired: 40,
      basicElectiveOverride: 9,
    },
    '2016-2019': {
      majorRequired: 15,
      majorElective: 30,
      research: 3,
      minorRequired: 18,
      doubleMajorRequired: 40,
      advancedMajorRequired: 12,
      basicElectiveOverride: 9,
    },
    '2020-2022': {
      majorRequired: 15,
      majorElective: 30,
      research: 3,
      minorRequired: 18,
      doubleMajorRequired: 40,
      advancedMajorRequired: 12,
      basicElectiveOverride: 9,
    },
    '2023이후': {
      majorRequired: 15,
      majorElective: 30,
      research: 3,
      minorRequired: 18,
      doubleMajorRequired: 40,
      advancedMajorRequired: 12,
      basicElectiveOverride: 9,
    },
  },
  '바이오및뇌공학과': {
    '2015이전': {
      majorRequired: 14,
      majorElective: 30,
      research: 5,
      minorRequired: 18,
      doubleMajorRequired: 40,
      basicElectiveOverride: 9,
    },
    '2016-2019': {
      majorRequired: 14,
      majorElective: 30,
      research: 5,
      minorRequired: 18,
      doubleMajorRequired: 40,
      advancedMajorRequired: 12,
      basicElectiveOverride: 9,
    },
    '2020-2022': {
      majorRequired: 14,
      majorElective: 30,
      research: 5,
      minorRequired: 18,
      doubleMajorRequired: 40,
      advancedMajorRequired: 12,
      basicElectiveOverride: 9,
    },
    '2023이후': {
      majorRequired: 14,
      majorElective: 30,
      research: 5,
      minorRequired: 18,
      doubleMajorRequired: 40,
      advancedMajorRequired: 12,
      basicElectiveOverride: 9,
    },
  },
  '산업디자인학과': {
    '2015이전': {
      majorRequired: 27,
      majorElective: 27,
      research: 3,
      minorRequired: 18,
      doubleMajorRequired: 40,
      basicElectiveOverride: 9,
      notes: ['기초선택: 발상과 표현 필수'],
    },
    '2016-2019': {
      majorRequired: 15,
      majorElective: 30,
      research: 3,
      majorRequiredCourses: ['ID212', 'ID213', 'ID301', 'ID304', 'ID403'],
      minorRequired: 18,
      doubleMajorRequired: 40,
      advancedMajorRequired: 12,
      basicElectiveOverride: 9,
    },
    '2020-2022': {
      majorRequired: 15,
      majorElective: 30,
      research: 3,
      minorRequired: 18,
      doubleMajorRequired: 40,
      advancedMajorRequired: 12,
      basicElectiveOverride: 9,
    },
    '2023이후': {
      majorRequired: 15,
      majorElective: 30,
      research: 3,
      minorRequired: 18,
      doubleMajorRequired: 40,
      advancedMajorRequired: 12,
      basicElectiveOverride: 9,
    },
  },
  '산업및시스템공학과': {
    '2015이전': {
      majorRequired: 24,
      majorElective: 21,
      research: 4,
      minorRequired: 18,
      doubleMajorRequired: 40,
      basicElectiveOverride: 3,
      notes: ['MAS.10009 선형대수학개론 필수'],
    },
    '2016-2019': {
      majorRequired: 24,
      majorElective: 21,
      research: 4,
      minorRequired: 18,
      doubleMajorRequired: 40,
      advancedMajorRequired: 12,
      basicElectiveOverride: 3,
    },
    '2020-2022': {
      majorRequired: 24,
      majorElective: 21,
      research: 4,
      minorRequired: 18,
      doubleMajorRequired: 40,
      advancedMajorRequired: 12,
      basicElectiveOverride: 3,
    },
    '2023이후': {
      majorRequired: 24,
      majorElective: 21,
      research: 4,
      minorRequired: 18,
      doubleMajorRequired: 40,
      advancedMajorRequired: 12,
      basicElectiveOverride: 3,
    },
  },
  '생명화학공학과': {
    '2015이전': {
      majorRequired: 21,
      majorElective: 20,
      research: 3,
      minorRequired: 18,
      doubleMajorRequired: 42,
      basicElectiveOverride: 9,
    },
    '2016-2019': {
      majorRequired: 21,
      majorElective: 21,
      research: 3,
      majorRequiredCourses: ['CBE.20001', 'CBE.20002', 'CBE.20003', 'CBE.20005', 'CBE.20021', 'CBE.30001', 'CBE.40042'],
      minorRequired: 18,
      doubleMajorRequired: 42,
      advancedMajorRequired: 12,
      basicElectiveOverride: 9,
    },
    '2020-2022': {
      majorRequired: 18,
      majorElective: 24,
      research: 3,
      minorRequired: 18,
      doubleMajorRequired: 42,
      advancedMajorRequired: 12,
      basicElectiveOverride: 9,
    },
    '2023이후': {
      majorRequired: 18,
      majorElective: 24,
      research: 3,
      minorRequired: 18,
      doubleMajorRequired: 42,
      advancedMajorRequired: 12,
      basicElectiveOverride: 9,
    },
  },
  '신소재공학과': {
    '2015이전': {
      majorRequired: 18,
      majorElective: 24,
      research: 3,
      majorRequiredCourses: ['MS.20012', 'MS.20013', 'MS.30010', 'MS.30011', 'MS.30021', 'MS.30022'],
      minorRequired: 18,
      doubleMajorRequired: 40,
    },
    '2016-2019': {
      majorRequired: 18,
      majorElective: 24,
      research: 3,
      minorRequired: 18,
      doubleMajorRequired: 40,
      advancedMajorRequired: 15,
    },
    '2020-2022': {
      majorRequired: 18,
      majorElective: 24,
      research: 3,
      minorRequired: 18,
      doubleMajorRequired: 40,
      advancedMajorRequired: 15,
    },
    '2023이후': {
      majorRequired: 18,
      majorElective: 24,
      research: 3,
      minorRequired: 18,
      doubleMajorRequired: 40,
      advancedMajorRequired: 15,
    },
  },
  '원자력및양자공학과': {
    '2015이전': {
      majorRequired: 25,
      majorElective: 18,
      research: 3,
      minorRequired: 21,
      doubleMajorRequired: 40,
    },
    '2016-2019': {
      majorRequired: 25,
      majorElective: 18,
      research: 3,
      minorRequired: 21,
      doubleMajorRequired: 40,
      advancedMajorRequired: 12,
    },
    '2020-2022': {
      majorRequired: 25,
      majorElective: 18,
      research: 3,
      minorRequired: 21,
      doubleMajorRequired: 40,
      advancedMajorRequired: 12,
    },
    '2023이후': {
      majorRequired: 25,
      majorElective: 18,
      research: 3,
      minorRequired: 21,
      doubleMajorRequired: 40,
      advancedMajorRequired: 12,
    },
  },
  '반도체시스템공학과': {
    '2016-2019': {
      majorRequired: 18,
      majorElective: 35,
      research: 6,
      majorRequiredCourses: ['SS.20001', 'SS.30001'],
      notes: ['EE 과목 중 4과목 선택 이수', '반도체시스템공학과는 부전공/복수전공 불가'],
      minorRequired: 0,
      doubleMajorRequired: 0,
      advancedMajorRequired: 12,
      basicElectiveOverride: 9,
    },
    '2020-2022': {
      majorRequired: 18,
      majorElective: 35,
      research: 6,
      minorRequired: 0,
      doubleMajorRequired: 0,
      advancedMajorRequired: 12,
      basicElectiveOverride: 9,
    },
    '2023이후': {
      majorRequired: 18,
      majorElective: 35,
      research: 6,
      minorRequired: 0,
      doubleMajorRequired: 0,
      advancedMajorRequired: 12,
      basicElectiveOverride: 9,
    },
  },
  '융합인재학부': {
    '2021-2022': {
      majorRequired: 21,
      majorElective: 21,
      research: 3,
      notes: ['지성과 문명 강독 9학점, 기술을 통한 사회적 혁신 실험 12학점 필수'],
      minorRequired: 18,
      doubleMajorRequired: 40,
      advancedMajorRequired: 12,
      basicElectiveDoubleMajor: 3,
    },
    '2023이후': {
      majorRequired: 21,
      majorElective: 21,
      research: 3,
      notes: ['지성과 문명 강독 9학점, 기술을 통한 사회적 혁신 실험 12학점 필수'],
      minorRequired: 18,
      doubleMajorRequired: 40,
      advancedMajorRequired: 12,
      basicElectiveDoubleMajor: 3,
    },
  },
  '기술경영학부': {
    '2015이전': {
      majorRequired: 9,
      majorElective: 39,
      research: 4,
      majorRequiredCourses: ['MSB200', 'MSB204', 'MSB351'],
      notes: ['이공계 타학과 복수전공 필수'],
      minorRequired: 18,
      doubleMajorRequired: 40,
    },
    '2016-2019': {
      majorRequired: 9,
      majorElective: 39,
      research: 4,
      notes: ['이공계 타학과 복수전공 필수'],
      minorRequired: 18,
      doubleMajorRequired: 40,
      advancedMajorRequired: 12,
    },
    '2020-2022': {
      majorRequired: 9,
      majorElective: 39,
      research: 4,
      notes: ['이공계 타학과 복수전공 필수'],
      minorRequired: 18,
      doubleMajorRequired: 40,
      advancedMajorRequired: 12,
    },
    '2023이후': {
      majorRequired: 9,
      majorElective: 39,
      research: 4,
      majorRequiredCourses: ['BTM200', 'BTM204', 'BTM351'],
      notes: ['이공계 타학과 복수전공 필수'],
      minorRequired: 18,
      doubleMajorRequired: 40,
      advancedMajorRequired: 12,
    },
  },
};

// 학번 범위에 맞는 요건 키 가져오기
export const getRequirementKey = (department: string, admissionYear: string): string => {
  const deptReqs = departmentRequirements[department];
  if (!deptReqs) return '2023이후';
  
  // 정확한 키가 있으면 반환
  if (deptReqs[admissionYear]) return admissionYear;
  
  // 학번에 따라 적절한 키 찾기
  const keys = Object.keys(deptReqs);
  
  if (admissionYear === '2015이전') {
    return keys.find(k => k.includes('2015') || k === '2015이전') || keys[0];
  }
  if (admissionYear === '2016-2019') {
    return keys.find(k => k.includes('2016') || k === '2016-2019' || k === '2016-2017' || k === '2018-2022') || keys[keys.length - 1];
  }
  if (admissionYear === '2020-2022') {
    return keys.find(k => k.includes('2020') || k === '2020-2022' || k === '2018-2022' || k === '2021-2022') || keys[keys.length - 1];
  }
  
  return keys.find(k => k.includes('2023') || k === '2023이후') || keys[keys.length - 1];
};
