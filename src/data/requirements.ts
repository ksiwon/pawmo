// 졸업요건 데이터 - PDF 기반 정확한 데이터
// 2026-01-09 전면 재검토 및 수정 완료
// - 입학년도별 전공필수 과목 세분화
// - 과목 코드 오류 전면 수정

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
  auToCreditsRatio: number;
  notes: string[];
}

export const getPhysicalEducationAUInfo = (year: number): PhysicalEducationAUInfo => {
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
  
  return {
    required: true,
    requiredAU: 4,
    canSubstituteWithCredits: true,
    substituteCredits: 2,
    auToCreditsRatio: 1,
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

// =====================================
// 입학년도별 전공필수 과목 정보 (PDF 기반 검증)
// =====================================
export const majorRequiredCoursesByYear: Record<string, Record<string, Record<string, string>>> = {
  // ===== 전산학부 =====
  // 모든 학번 동일: 19학점
  '전산학부': {
    'default': {
      'CS.20004': '이산구조',
      'CS.20006': '데이터구조',
      'CS.30000': '알고리즘개론',
      'CS.30101': '전산기조직',
      'CS.30200': '프로그래밍언어',
      'CS.30300': '운영체제및실험',
    },
  },

  // ===== 전기및전자공학부 =====
  // 2015 이전, 2016-2017: 18학점 (6과목 모두 필수)
  // 2018 이후: 15학점 (EE.30005, EE.40005 필수 + 나머지 6개 중 3개 선택)
  '전기및전자공학부': {
    '2015이전': {
      'EE.20001': '회로이론',
      'EE.20002': '신호및시스템',
      'EE.20004': '전기자기학I',
      'EE.20009': '프로그래밍및컴퓨터시스템개론',
      'EE.30005': '전자설계및실험',
      'EE.40005': '전자디자인랩',
    },
    '2016-2017': {
      'EE.20001': '회로이론',
      'EE.20002': '신호및시스템',
      'EE.20004': '전기자기학I',
      'EE.20009': '프로그래밍및컴퓨터시스템개론',
      'EE.30005': '전자설계및실험',
      'EE.40005': '전자디자인랩',
    },
    '2018이후': {
      // 필수 2과목
      'EE.30005': '전자설계및실험',
      'EE.40005': '전자디자인랩',
      // 선택 6과목 중 3과목 (모두 나열하여 인식 가능하게 함)
      'EE.20001': '회로이론',
      'EE.20002': '신호및시스템',
      'EE.20004': '전기자기학I',
      'EE.20009': '프로그래밍및컴퓨터시스템개론',
      'EE.20010': '확률과기초확률과정',
      'EE.20011': '물리전자개론',
    },
  },

  // ===== 물리학과 =====
  // 전공필수 19학점: 역학, 전자기학I, 양자물리학I/현대물리학, 통계역학/열물리학, 양자역학I, 물리학실험III 등
  '물리학과': {
    'default': {
      'PH.20021': '고전역학I',
      'PH.20031': '전자기학I',
      'PH.20041': '현대물리학',
      'PH.20051': '물리학실험I',
      'PH.30001': '양자역학I',
      'PH.30011': '열물리학',
      'PH.30051': '물리학실험III',
    },
  },

  // ===== 화학과 =====
  // 전공필수 24학점
  '화학과': {
    'default': {
      'CH.20011': '물리화학I',
      'CH.20012': '물리화학II',
      'CH.20021': '유기화학I',
      'CH.20022': '유기화학II',
      'CH.20051': '분석화학개론',
      'CH.20071': '화학전공실험I',
      'CH.30031': '무기화학I',
      'CH.30071': '화학전공실험II',
      'CH.30072': '화학전공실험III',
    },
  },

  // ===== 생명과학과 =====
  '생명과학과': {
    'default': {
      'BS.20002': '세포생물학',
      'BS.20005': '생화학',
      'BS.20009': '분자생물학',
      'BS.30015': '유전학',
      'BS.30018': '발생생물학',
      'BS.30057': '신경생물학I',
    },
  },

  // ===== 기계공학과 =====
  '기계공학과': {
    'default': {
      'ME.20000': '기계기초실습',
      'ME.20011': '열역학',
      'ME.20021': '유체역학',
      'ME.20031': '고체역학',
      'ME.20051': '동역학',
      'ME.30040': '공학설계',
      'ME.40000': '창의적시스템구현I',
    },
  },

  // ===== 항공우주공학과 =====
  '항공우주공학과': {
    'default': {
      'AE.21000': '항공우주열역학',
      'AE.22000': '공기역학I',
      'AE.23000': '항공우주재료역학',
      'AE.25000': '항공우주동역학',
      'AE.31000': '추진기관',
      'AE.33000': '항공우주구조역학I',
      'AE.35000': '항공우주제어공학',
    },
  },

  // ===== 건설및환경공학과 =====
  '건설및환경공학과': {
    'default': {
      'CE.20001': '재료및구조역학',
      'CE.20012': '환경과지속가능성개론',
      'CE.20030': '지반공학개론',
      'CE.30073': '수리수문학',
    },
  },

  // ===== 산업디자인학과 ===== (PDF 검증 완료)
  // 2015이전: 전필 27학점 (9과목)
  // 2016이후: 전필 15학점 (5과목)
  '산업디자인학과': {
    '2015이전': {
      'ID.20011': '그래픽디자인',
      'ID.20012': '기초디자인',
      'ID.20013': '제품디자인',
      'ID.30001': '인터랙티브제품디자인',
      'ID.30004': '사용자경험디자인',
      'ID.40002': '디자인창업',
      'ID.40003': '시스템디자인',
      'ID.40009': '졸업연구디자인스튜디오I',
      'ID.40014': '졸업연구디자인스튜디오II',
    },
    '2016이후': {
      'ID.20012': '기초디자인',
      'ID.20013': '제품디자인',
      'ID.30001': '인터랙티브제품디자인',
      'ID.30004': '사용자경험디자인',
      'ID.40003': '시스템디자인',
    },
  },

  // ===== 생명화학공학과 =====
  // 입학년도별로 전공필수가 다름
  '생명화학공학과': {
    '2010이전': {
      'CBE.20001': '분자공학실험',
      'CBE.30001': '생명화학공학실험',
    },
    '2011-2013': {
      'CBE.20001': '분자공학실험',
      'CBE.20002': '생명화학공학개론',
      'CBE.20003': '공업유기화학',
      'CBE.20005': '생화공해석',
      'CBE.20021': '분자열역학과에너지시스템',
      'CBE.30001': '생명화학공학실험',
    },
    '2014-2015': {
      'CBE.20001': '분자공학실험',
      'CBE.20002': '생명화학공학개론',
      'CBE.20003': '공업유기화학',
      'CBE.20005': '생화공해석',
      'CBE.20021': '분자열역학과에너지시스템',
      'CBE.30001': '생명화학공학실험',
      'CBE.40042': '생명화학공학디자인프로젝트',
    },
    '2016-2019': {
      'CBE.20001': '분자공학실험',
      'CBE.20002': '생명화학공학개론',
      'CBE.20003': '공업유기화학',
      'CBE.20005': '생화공해석',
      'CBE.20021': '분자열역학과에너지시스템',
      'CBE.30001': '생명화학공학실험',
      'CBE.40042': '생명화학공학디자인프로젝트',
    },
    '2020-2024': {
      'CBE.20001': '분자공학실험',
      'CBE.20002': '생명화학공학개론',
      'CBE.20003': '공업유기화학',
      'CBE.20005': '생화공해석',
      'CBE.20021': '분자열역학과에너지시스템',
      'CBE.30001': '생명화학공학실험',
    },
    '2025이후': {
      'CBE.20001': '분자공학실험',
      'CBE.20003': '공업유기화학',
      'CBE.20005': '생화공해석',
      'CBE.30001': '생명화학공학실험',
      'CBE.30011': '반응공학',
      'CBE.30022': '생화공열역학',
    },
  },

  // ===== 신소재공학과 ===== (PDF 검증 완료)
  // 모든 학번 동일: 18학점 (6과목 × 3학점)
  '신소재공학과': {
    'default': {
      'MS.20012': '소재열역학의이해',
      'MS.20013': '결정구조및회절',
      'MS.30010': '소재양자화학',
      'MS.30011': '상변화와미세조직',
      'MS.30021': '신소재실험I',
      'MS.30022': '신소재실험II',
    },
  },

  // ===== 원자력및양자공학과 =====
  '원자력및양자공학과': {
    'default': {
      'NQE.20001': '원자핵및양자학개론',
      'NQE.20002': '핵공학개론',
      'NQE.20004': '방사선-물질상호작용',
      'NQE.30001': '원자로이론',
      'NQE.30003': '방사선계측실험',
      'NQE.30022': '원자력열수력학개론',
      'NQE.30041': '핵화학',
      'NQE.30051': '원자력및양자재료공학개론',
    },
  },

  // ===== 반도체시스템공학과 =====
  '반도체시스템공학과': {
    'default': {
      // 필수 2과목
      'SS.20001': '반도체시스템개론',
      'SS.30001': '반도체전기기초실험',
      // 선택 6과목 중 4과목
      'EE.20001': '회로이론',
      'EE.20002': '신호및시스템',
      'EE.20004': '전기자기학I',
      'EE.20009': '프로그래밍및컴퓨터시스템개론',
      'EE.20010': '확률과기초확률과정',
      'EE.20011': '물리전자개론',
    },
  },

  // ===== 기술경영학부 =====
  '기술경영학부': {
    'default': {
      'MSB.20001': '경영학개론',
      'MSB.20002': '기술경영개론',
      'MSB.30001': '기술창업론',
    },
  },

  // ===== 바이오및뇌공학과 =====
  '바이오및뇌공학과': {
    'default': {
      'BiS.20000': '바이오공학개론',
      'BiS.22002': '분자세포생물학',
      'BiS.30001': '바이오공학실험I',
      'BiS.35000': '바이오공학실험II',
    },
  },

  // ===== 뇌인지과학과 =====
  '뇌인지과학과': {
    'default': {
      'BCS.20000': '동물신경해부학및신경생리학실험',
      'BCS.30020': '인간신경해부학및신경생리학실험',
      'BCS.40010': '생체데이터분석및모델링실험',
    },
  },

  // ===== 산업및시스템공학과 =====
  '산업및시스템공학과': {
    'default': {
      'IE.20002': 'You&IE',
      'IE.20041': '공학통계1',
      'IE.20042': '공학통계II',
      'IE.30012': '인간공학',
      'IE.30031': 'OR:최적화',
      'IE.30042': '실험설계와분석',
    },
  },

  // ===== 융합인재학부 =====
  '융합인재학부': {
    'default': {
      // 지성과문명강독 9학점 + 사회적혁신실험 12학점
      // 구체적 과목 코드는 학부 자체에서 정의
    },
  },

  // ===== 수리과학과 =====
  // 전공필수 없음 (권장 선택과목만 있음)
  '수리과학과': {
    'default': {},
  },
};

// 학과와 입학년도에 맞는 전공필수 과목 가져오기
export const getMajorRequiredCourses = (department: string, year: number): Record<string, string> => {
  const deptCourses = majorRequiredCoursesByYear[department];
  if (!deptCourses) return {};
  
  // default가 있으면 먼저 사용
  if (deptCourses['default']) {
    return deptCourses['default'];
  }
  
  // 입학년도별 매칭
  const keys = Object.keys(deptCourses);
  for (const key of keys) {
    // "2015이전" 형태
    if (key.includes('이전')) {
      const endYear = parseInt(key);
      if (year <= endYear) return deptCourses[key];
    }
    // "2025이후" 형태
    if (key.includes('이후')) {
      const startYear = parseInt(key);
      if (year >= startYear) return deptCourses[key];
    }
    // "2016-2019" 형태
    const rangeMatch = key.match(/(\d{4})-(\d{4})/);
    if (rangeMatch) {
      const start = parseInt(rangeMatch[1]);
      const end = parseInt(rangeMatch[2]);
      if (year >= start && year <= end) return deptCourses[key];
    }
    // 단일 연도 "2023"
    if (/^\d{4}$/.test(key) && year === parseInt(key)) {
      return deptCourses[key];
    }
  }
  
  // 매칭 실패 시 가장 최근 키 반환
  return deptCourses[keys[keys.length - 1]] || {};
};

// 기존 호환성을 위한 전공필수 과목 정보 (가장 최신 기준)
export const majorRequiredCourseInfo: Record<string, Record<string, string>> = {
  '전산학부': majorRequiredCoursesByYear['전산학부']['default'],
  '전기및전자공학부': majorRequiredCoursesByYear['전기및전자공학부']['2018이후'],
  '물리학과': majorRequiredCoursesByYear['물리학과']['default'],
  '화학과': majorRequiredCoursesByYear['화학과']['default'],
  '생명과학과': majorRequiredCoursesByYear['생명과학과']['default'],
  '기계공학과': majorRequiredCoursesByYear['기계공학과']['default'],
  '항공우주공학과': majorRequiredCoursesByYear['항공우주공학과']['default'],
  '건설및환경공학과': majorRequiredCoursesByYear['건설및환경공학과']['default'],
  '산업디자인학과': majorRequiredCoursesByYear['산업디자인학과']['2016이후'],
  '생명화학공학과': majorRequiredCoursesByYear['생명화학공학과']['2020-2024'],
  '신소재공학과': majorRequiredCoursesByYear['신소재공학과']['default'],
  '원자력및양자공학과': majorRequiredCoursesByYear['원자력및양자공학과']['default'],
  '반도체시스템공학과': majorRequiredCoursesByYear['반도체시스템공학과']['default'],
  '기술경영학부': majorRequiredCoursesByYear['기술경영학부']['default'],
  '바이오및뇌공학과': majorRequiredCoursesByYear['바이오및뇌공학과']['default'],
  '뇌인지과학과': majorRequiredCoursesByYear['뇌인지과학과']['default'],
  '산업및시스템공학과': majorRequiredCoursesByYear['산업및시스템공학과']['default'],
  '융합인재학부': majorRequiredCoursesByYear['융합인재학부']['default'],
  '수리과학과': majorRequiredCoursesByYear['수리과학과']['default'],
};

// =====================================
// 학과별 전공 요건 인터페이스
// =====================================
export interface DepartmentMajorRequirements {
  majorRequired: number;
  majorElective: number;
  research: number;
  researchExemptForDoubleMajor?: boolean;
  
  // 전공필수 과목 코드 목록 (입학년도별 차이가 있는 학과용)
  majorRequiredCourses?: string[];
  majorRequiredSelectCount?: number; // 선택 필수 과목 수 (예: EE 2018 이후)
  majorRequiredNotes?: string[]; // 전공필수 관련 추가 설명
  
  // 전공선택 중 필수 이수 과목 (예: 산업디자인 ID409, ID414)
  majorElectiveRequiredCourses?: string[];
  
  minorRequired?: number;
  minorMajorRequired?: number;
  minorRequiredCourses?: string[];
  minorNotes?: string[];
  
  doubleMajorRequired?: number;
  doubleMajorMajorRequired?: number;
  doubleMajorRequiredCourses?: string[];
  doubleMajorNotes?: string[];
  
  advancedMajorRequired?: number;
  advancedMajorNotes?: string[]; // 심화전공 관련 추가 설명
  basicElectiveOverride?: number;
  basicElectiveDoubleMajor?: number;
  basicElectiveRequiredCourses?: string[];
  notes?: string[];
}

// =====================================
// 모든 학과의 졸업요건 데이터 (PDF 기반 - 2026-01-09 전면 재검토)
// =====================================
export const departmentRequirements: Record<string, Record<string, DepartmentMajorRequirements>> = {
  '전산학부': {
    '2015이전': {
      majorRequired: 19, majorElective: 24, research: 3,
      majorRequiredCourses: ['CS.20004', 'CS.20006', 'CS.30000', 'CS.30101', 'CS.30200', 'CS.30300'],
      researchExemptForDoubleMajor: true,
      minorRequired: 18, minorMajorRequired: 0,
      doubleMajorRequired: 40, doubleMajorMajorRequired: 19,
      basicElectiveOverride: 9, basicElectiveDoubleMajor: 3,
    },
    '2016-2022': {
      majorRequired: 19, majorElective: 30, research: 3,
      majorRequiredCourses: ['CS.20004', 'CS.20006', 'CS.30000', 'CS.30101', 'CS.30200', 'CS.30300'],
      researchExemptForDoubleMajor: true,
      minorRequired: 21, minorMajorRequired: 15,
      minorNotes: ['전공필수 15학점 포함'],
      doubleMajorRequired: 40, doubleMajorMajorRequired: 19,
      doubleMajorNotes: ['캡스톤 1과목 필수 (2020학번부터)'],
      advancedMajorRequired: 12,
      basicElectiveOverride: 9, basicElectiveDoubleMajor: 3,
    },
    '2023이후': {
      majorRequired: 19, majorElective: 30, research: 3,
      majorRequiredCourses: ['CS.20004', 'CS.20006', 'CS.30000', 'CS.30101', 'CS.30200', 'CS.30300'],
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
      majorRequired: 18, majorElective: 35, research: 3,
      majorRequiredCourses: ['EE.20001', 'EE.20002', 'EE.20004', 'EE.20009', 'EE.30005', 'EE.40005'],
      researchExemptForDoubleMajor: true,
      minorRequired: 21, minorMajorRequired: 12,
      minorRequiredCourses: ['EE.30005'],
      minorNotes: ['EE.30005 포함 전필 12학점'],
      doubleMajorRequired: 40, doubleMajorMajorRequired: 18,
      basicElectiveOverride: 9, basicElectiveDoubleMajor: 3,
    },
    '2016-2017': {
      majorRequired: 18, majorElective: 32, research: 3,
      majorRequiredCourses: ['EE.20001', 'EE.20002', 'EE.20004', 'EE.20009', 'EE.30005', 'EE.40005'],
      researchExemptForDoubleMajor: true,
      minorRequired: 21, minorMajorRequired: 12,
      minorRequiredCourses: ['EE.30005'],
      minorNotes: ['EE.30005 포함 전필 12학점'],
      doubleMajorRequired: 40, doubleMajorMajorRequired: 18,
      advancedMajorRequired: 12,
      basicElectiveOverride: 9, basicElectiveDoubleMajor: 3,
    },
    '2018-2022': {
      majorRequired: 15, majorElective: 35, research: 3,
      // 필수 2과목 (6학점) + 선택 6과목 중 3과목 (9학점) = 15학점
      majorRequiredCourses: ['EE.30005', 'EE.40005'], // 필수
      majorRequiredSelectCount: 3, // EE.20001~EE.20011 중 3과목 선택
      researchExemptForDoubleMajor: true,
      minorRequired: 21, minorMajorRequired: 12,
      minorRequiredCourses: ['EE.30005'],
      minorNotes: ['EE.30005 포함 전필 12학점'],
      doubleMajorRequired: 40, doubleMajorMajorRequired: 15,
      advancedMajorRequired: 12,
      basicElectiveOverride: 9, basicElectiveDoubleMajor: 3,
      notes: ['전필 15학점: EE.30005+EE.40005 필수 + 나머지 6과목 중 3과목 선택'],
    },
    '2023이후': {
      majorRequired: 15, majorElective: 35, research: 3,
      majorRequiredCourses: ['EE.30005', 'EE.40005'],
      majorRequiredSelectCount: 3,
      researchExemptForDoubleMajor: true,
      minorRequired: 21, minorMajorRequired: 12,
      minorRequiredCourses: ['EE.30005'],
      minorNotes: ['EE.30005 포함 전필 12학점'],
      doubleMajorRequired: 40, doubleMajorMajorRequired: 15,
      advancedMajorRequired: 12,
      basicElectiveOverride: 9, basicElectiveDoubleMajor: 3,
      notes: ['전필 15학점: EE.30005+EE.40005 필수 + 나머지 6과목 중 3과목 선택'],
    },
  },

  '물리학과': {
    '2015이전': {
      majorRequired: 19, majorElective: 21, research: 5,
      majorRequiredCourses: ['PH.20021', 'PH.20031', 'PH.20041', 'PH.20051', 'PH.30001', 'PH.30011', 'PH.30051'],
      researchExemptForDoubleMajor: true,
      minorRequired: 19, minorMajorRequired: 6,
      minorRequiredCourses: ['PH.30001', 'PH.30051'],
      minorNotes: ['PH.30001 양자역학I, PH.30051 물리학실험III 필수'],
      doubleMajorRequired: 40, doubleMajorMajorRequired: 19,
      basicElectiveOverride: 9, basicElectiveDoubleMajor: 3,
    },
    '2016-2022': {
      majorRequired: 19, majorElective: 24, research: 5,
      majorRequiredCourses: ['PH.20021', 'PH.20031', 'PH.20041', 'PH.20051', 'PH.30001', 'PH.30011', 'PH.30051'],
      researchExemptForDoubleMajor: true,
      minorRequired: 18, minorMajorRequired: 6,
      minorRequiredCourses: ['PH.30001', 'PH.30051'],
      minorNotes: ['PH.30001 양자역학I, PH.30051 물리학실험III 필수'],
      doubleMajorRequired: 40, doubleMajorMajorRequired: 19,
      advancedMajorRequired: 12,
      basicElectiveOverride: 9, basicElectiveDoubleMajor: 3,
    },
    '2023이후': {
      majorRequired: 19, majorElective: 24, research: 5,
      majorRequiredCourses: ['PH.20021', 'PH.20031', 'PH.20041', 'PH.20051', 'PH.30001', 'PH.30011', 'PH.30051'],
      researchExemptForDoubleMajor: true,
      minorRequired: 18, minorMajorRequired: 6,
      minorRequiredCourses: ['PH.30001', 'PH.30051'],
      minorNotes: ['PH.30001 양자역학I, PH.30051 물리학실험III 필수'],
      doubleMajorRequired: 40, doubleMajorMajorRequired: 19,
      advancedMajorRequired: 12,
      basicElectiveOverride: 9, basicElectiveDoubleMajor: 3,
    },
  },

  '화학과': {
    '2015이전': {
      majorRequired: 24, majorElective: 18, research: 3,
      majorRequiredCourses: ['CH.20011', 'CH.20012', 'CH.20021', 'CH.20022', 'CH.20051', 'CH.20071', 'CH.30031', 'CH.30071', 'CH.30072'],
      researchExemptForDoubleMajor: true,
      minorRequired: 21, minorMajorRequired: 12,
      doubleMajorRequired: 40, doubleMajorMajorRequired: 24,
      basicElectiveOverride: 9, basicElectiveDoubleMajor: 6,
    },
    '2016-2022': {
      majorRequired: 24, majorElective: 18, research: 3,
      majorRequiredCourses: ['CH.20011', 'CH.20012', 'CH.20021', 'CH.20022', 'CH.20051', 'CH.20071', 'CH.30031', 'CH.30071', 'CH.30072'],
      researchExemptForDoubleMajor: true,
      minorRequired: 21, minorMajorRequired: 12,
      doubleMajorRequired: 40, doubleMajorMajorRequired: 24,
      advancedMajorRequired: 12,
      basicElectiveOverride: 9, basicElectiveDoubleMajor: 6,
    },
    '2023이후': {
      majorRequired: 24, majorElective: 18, research: 3,
      majorRequiredCourses: ['CH.20011', 'CH.20012', 'CH.20021', 'CH.20022', 'CH.20051', 'CH.20071', 'CH.30031', 'CH.30071', 'CH.30072'],
      researchExemptForDoubleMajor: true,
      minorRequired: 21, minorMajorRequired: 12,
      doubleMajorRequired: 40, doubleMajorMajorRequired: 24,
      advancedMajorRequired: 12,
      basicElectiveOverride: 9, basicElectiveDoubleMajor: 6,
    },
  },

  '생명과학과': {
    '2015이전': {
      majorRequired: 18, majorElective: 24, research: 3,
      majorRequiredCourses: ['BS.20002', 'BS.20005', 'BS.20009', 'BS.30015', 'BS.30018', 'BS.30057'],
      researchExemptForDoubleMajor: true,
      minorRequired: 18, minorMajorRequired: 9,
      doubleMajorRequired: 40, doubleMajorMajorRequired: 18,
      basicElectiveDoubleMajor: 6,
    },
    '2016-2022': {
      majorRequired: 18, majorElective: 24, research: 3,
      majorRequiredCourses: ['BS.20002', 'BS.20005', 'BS.20009', 'BS.30015', 'BS.30018', 'BS.30057'],
      researchExemptForDoubleMajor: true,
      minorRequired: 18, minorMajorRequired: 9,
      doubleMajorRequired: 40, doubleMajorMajorRequired: 18,
      advancedMajorRequired: 12,
      basicElectiveDoubleMajor: 6,
    },
    '2023이후': {
      majorRequired: 18, majorElective: 24, research: 3,
      majorRequiredCourses: ['BS.20002', 'BS.20005', 'BS.20009', 'BS.30015', 'BS.30018', 'BS.30057'],
      researchExemptForDoubleMajor: true,
      minorRequired: 18, minorMajorRequired: 9,
      doubleMajorRequired: 40, doubleMajorMajorRequired: 18,
      advancedMajorRequired: 12,
      basicElectiveDoubleMajor: 6,
    },
  },

  '기계공학과': {
    // PDF 검증 완료: 2015이전 전필 12, 전선 47, 2016이후 전필 12, 전선 36
    '2015이전': {
      majorRequired: 12, majorElective: 47, research: 3,
      majorRequiredCourses: ['ME.20000', 'ME.20005', 'ME.40000', 'ME.30040'],
      researchExemptForDoubleMajor: true,
      minorRequired: 18, minorMajorRequired: 6,
      minorNotes: ['전필 2과목 이상 포함'],
      doubleMajorRequired: 40, doubleMajorMajorRequired: 12,
      basicElectiveOverride: 9, basicElectiveDoubleMajor: 3,
      notes: ['기반과목 9개 중 7과목 이상 이수'],
    },
    '2016-2021': {
      majorRequired: 12, majorElective: 36, research: 3,
      majorRequiredCourses: ['ME.20000', 'ME.20005', 'ME.40000', 'ME.30040'],
      researchExemptForDoubleMajor: true,
      minorRequired: 21, minorMajorRequired: 6,
      minorNotes: ['전필 2과목 이상 포함'],
      doubleMajorRequired: 40, doubleMajorMajorRequired: 12,
      advancedMajorRequired: 15,
      advancedMajorNotes: ['기반과목 9개 모두 이수 필요'],
      basicElectiveOverride: 9, basicElectiveDoubleMajor: 3,
      notes: ['기반과목 9개 중 5과목 이상 이수'],
    },
    '2022': {
      majorRequired: 9, majorElective: 36, research: 3,
      majorRequiredCourses: ['ME.20000', 'ME.20005', 'ME.40000', 'ME.30040'],
      majorRequiredNotes: ['전필 9학점 초과 시 전선으로 인정'],
      researchExemptForDoubleMajor: true,
      minorRequired: 21, minorMajorRequired: 6,
      minorNotes: ['전필 2과목 이상 포함'],
      doubleMajorRequired: 40, doubleMajorMajorRequired: 9,
      advancedMajorRequired: 15,
      advancedMajorNotes: ['기반과목 9개 모두 이수 필요'],
      basicElectiveOverride: 9, basicElectiveDoubleMajor: 3,
      notes: ['기반과목 9개 중 5과목 이상 이수'],
    },
    '2023이후': {
      majorRequired: 9, majorElective: 36, research: 3,
      majorRequiredCourses: ['ME.20000', 'ME.20005', 'ME.40000', 'ME.30040'],
      majorRequiredNotes: ['전필 9학점 초과 시 전선으로 인정'],
      researchExemptForDoubleMajor: true,
      minorRequired: 21, minorMajorRequired: 6,
      minorNotes: ['전필 2과목 이상 포함'],
      doubleMajorRequired: 40, doubleMajorMajorRequired: 9,
      advancedMajorRequired: 15,
      advancedMajorNotes: ['기반과목 9개 모두 이수 필요'],
      basicElectiveOverride: 9, basicElectiveDoubleMajor: 3,
      notes: ['기반과목 9개 중 5과목 이상 이수'],
    },
  },

  '항공우주공학과': {
    '2015이전': {
      majorRequired: 21, majorElective: 21, research: 3,
      majorRequiredCourses: ['AE.21000', 'AE.22000', 'AE.23000', 'AE.25000', 'AE.31000', 'AE.33000', 'AE.35000'],
      researchExemptForDoubleMajor: true,
      minorRequired: 21, minorMajorRequired: 12,
      doubleMajorRequired: 40, doubleMajorMajorRequired: 21,
      basicElectiveDoubleMajor: 6,
    },
    '2016-2022': {
      majorRequired: 21, majorElective: 24, research: 3,
      majorRequiredCourses: ['AE.21000', 'AE.22000', 'AE.23000', 'AE.25000', 'AE.31000', 'AE.33000', 'AE.35000'],
      researchExemptForDoubleMajor: true,
      minorRequired: 21, minorMajorRequired: 12,
      doubleMajorRequired: 40, doubleMajorMajorRequired: 21,
      advancedMajorRequired: 12,
      basicElectiveDoubleMajor: 6,
    },
    '2023이후': {
      majorRequired: 21, majorElective: 24, research: 3,
      majorRequiredCourses: ['AE.21000', 'AE.22000', 'AE.23000', 'AE.25000', 'AE.31000', 'AE.33000', 'AE.35000'],
      researchExemptForDoubleMajor: true,
      minorRequired: 21, minorMajorRequired: 12,
      doubleMajorRequired: 40, doubleMajorMajorRequired: 21,
      advancedMajorRequired: 12,
      basicElectiveDoubleMajor: 6,
    },
  },

  '건설및환경공학과': {
    '2015이전': {
      majorRequired: 12, majorElective: 30, research: 3,
      majorRequiredCourses: ['CE.20001', 'CE.20012', 'CE.20030', 'CE.30073'],
      researchExemptForDoubleMajor: true,
      minorRequired: 18, minorMajorRequired: 6,
      doubleMajorRequired: 40, doubleMajorMajorRequired: 12,
      basicElectiveDoubleMajor: 6,
    },
    '2016-2022': {
      majorRequired: 12, majorElective: 30, research: 3,
      majorRequiredCourses: ['CE.20001', 'CE.20012', 'CE.20030', 'CE.30073'],
      researchExemptForDoubleMajor: true,
      minorRequired: 18, minorMajorRequired: 6,
      doubleMajorRequired: 40, doubleMajorMajorRequired: 12,
      advancedMajorRequired: 12,
      basicElectiveDoubleMajor: 6,
    },
    '2023이후': {
      majorRequired: 12, majorElective: 30, research: 3,
      majorRequiredCourses: ['CE.20001', 'CE.20012', 'CE.20030', 'CE.30073'],
      researchExemptForDoubleMajor: true,
      minorRequired: 18, minorMajorRequired: 6,
      doubleMajorRequired: 40, doubleMajorMajorRequired: 12,
      advancedMajorRequired: 12,
      basicElectiveDoubleMajor: 6,
    },
  },

  '바이오및뇌공학과': {
    '2015이전': {
      majorRequired: 12, majorElective: 30, research: 3,
      majorRequiredCourses: ['BiS.20000', 'BiS.22002', 'BiS.30001', 'BiS.35000'],
      researchExemptForDoubleMajor: true,
      minorRequired: 18, minorMajorRequired: 6,
      doubleMajorRequired: 40, doubleMajorMajorRequired: 12,
      basicElectiveDoubleMajor: 6,
    },
    '2016-2022': {
      majorRequired: 12, majorElective: 30, research: 3,
      majorRequiredCourses: ['BiS.20000', 'BiS.22002', 'BiS.30001', 'BiS.35000'],
      researchExemptForDoubleMajor: true,
      minorRequired: 18, minorMajorRequired: 6,
      doubleMajorRequired: 40, doubleMajorMajorRequired: 12,
      advancedMajorRequired: 12,
      basicElectiveDoubleMajor: 6,
    },
    '2023이후': {
      majorRequired: 12, majorElective: 30, research: 3,
      majorRequiredCourses: ['BiS.20000', 'BiS.22002', 'BiS.30001', 'BiS.35000'],
      researchExemptForDoubleMajor: true,
      minorRequired: 18, minorMajorRequired: 6,
      doubleMajorRequired: 40, doubleMajorMajorRequired: 12,
      advancedMajorRequired: 12,
      basicElectiveDoubleMajor: 6,
    },
  },

  '산업디자인학과': {
    // PDF 검증 완료: 2015이전은 전필 27학점(9과목), 전선 27학점
    '2015이전': {
      majorRequired: 27, majorElective: 27, research: 3,
      majorRequiredCourses: [
        'ID.20011', 'ID.20012', 'ID.20013', 'ID.30001', 'ID.30004',
        'ID.40002', 'ID.40003', 'ID.40009', 'ID.40014'
      ],
      researchExemptForDoubleMajor: true,
      minorRequired: 18, minorMajorRequired: 6,
      minorRequiredCourses: ['ID.20013', 'ID.30001'],
      minorNotes: ['ID213 제품디자인, ID301 인터랙티브제품디자인 6학점 포함'],
      doubleMajorRequired: 40, doubleMajorMajorRequired: 27,
      basicElectiveOverride: 9, basicElectiveDoubleMajor: 6,
      notes: [
        '전필 9과목: ID211 그래픽디자인, ID212 기초디자인, ID213 제품디자인, ID301 인터랙티브제품디자인, ID304 사용자경험디자인, ID402 디자인창업, ID403 시스템디자인, ID409 졸업연구디자인스튜디오I, ID414 졸업연구디자인스튜디오II',
      ],
    },
    // PDF 검증 완료: 2016이후 전필 15학점(5과목), 전선 30학점
    '2016-2020': {
      majorRequired: 15, majorElective: 30, research: 3,
      majorRequiredCourses: ['ID.20012', 'ID.20013', 'ID.30001', 'ID.30004', 'ID.40003'],
      researchExemptForDoubleMajor: true,
      minorRequired: 18, minorMajorRequired: 6,
      minorRequiredCourses: ['ID.20013', 'ID.30001'],
      minorNotes: ['ID213 제품디자인, ID301 인터랙티브제품디자인 6학점 포함'],
      doubleMajorRequired: 40, doubleMajorMajorRequired: 15,
      advancedMajorRequired: 12,
      advancedMajorNotes: ['ID409, ID414 졸업연구 디자인스튜디오 I,II 6학점 포함'],
      basicElectiveOverride: 9, basicElectiveDoubleMajor: 6,
      notes: [
        '전필 5과목: ID212 기초디자인, ID213 제품디자인, ID301 인터랙티브제품디자인, ID304 사용자경험디자인, ID403 시스템디자인',
      ],
    },
    // 2021이후: 전선에 ID409, ID414 포함 필수
    '2021-2022': {
      majorRequired: 15, majorElective: 30, research: 3,
      majorRequiredCourses: ['ID.20012', 'ID.20013', 'ID.30001', 'ID.30004', 'ID.40003'],
      majorElectiveRequiredCourses: ['ID.40009', 'ID.40014'], // 전선 중 필수
      researchExemptForDoubleMajor: true,
      minorRequired: 18, minorMajorRequired: 6,
      minorRequiredCourses: ['ID.20013', 'ID.30001'],
      minorNotes: ['ID213 제품디자인, ID301 인터랙티브제품디자인 6학점 포함'],
      doubleMajorRequired: 40, doubleMajorMajorRequired: 15,
      doubleMajorNotes: ['ID409, ID414 졸업연구 디자인스튜디오 I,II 6학점 포함'],
      advancedMajorRequired: 12,
      advancedMajorNotes: ['ID409, ID414 졸업연구 디자인스튜디오 I,II 6학점 포함'],
      basicElectiveOverride: 9, basicElectiveDoubleMajor: 6,
      notes: [
        '전선 30학점 중 ID409, ID414 6학점 필수 포함',
      ],
    },
    '2023이후': {
      majorRequired: 15, majorElective: 30, research: 3,
      majorRequiredCourses: ['ID.20012', 'ID.20013', 'ID.30001', 'ID.30004', 'ID.40003'],
      majorElectiveRequiredCourses: ['ID.40009', 'ID.40014'],
      researchExemptForDoubleMajor: true,
      minorRequired: 18, minorMajorRequired: 6,
      minorRequiredCourses: ['ID.20013', 'ID.30001'],
      minorNotes: ['ID213 제품디자인, ID301 인터랙티브제품디자인 6학점 포함'],
      doubleMajorRequired: 40, doubleMajorMajorRequired: 15,
      doubleMajorNotes: ['ID409, ID414 졸업연구 디자인스튜디오 I,II 6학점 포함'],
      advancedMajorRequired: 12,
      advancedMajorNotes: ['ID409, ID414 졸업연구 디자인스튜디오 I,II 6학점 포함'],
      basicElectiveOverride: 9, basicElectiveDoubleMajor: 6,
      notes: [
        '전선 30학점 중 ID409, ID414 6학점 필수 포함',
      ],
    },
  },

  '산업및시스템공학과': {
    // PDF 검증 완료: 전필 24학점, 전선은 학번별 다름
    '2015이전': {
      majorRequired: 24, majorElective: 27, research: 4,
      researchExemptForDoubleMajor: true,
      minorRequired: 18, minorMajorRequired: 0,
      minorNotes: ['전필/전선 구분없이 18학점'],
      doubleMajorRequired: 40, doubleMajorMajorRequired: 24,
      basicElectiveOverride: 3, basicElectiveDoubleMajor: 3,
      notes: ['연구: 졸업연구 3 + 세미나 1'],
    },
    '2016-2022': {
      majorRequired: 24, majorElective: 21, research: 4,
      researchExemptForDoubleMajor: true,
      minorRequired: 18, minorMajorRequired: 0,
      minorNotes: ['전필/전선 구분없이 18학점'],
      doubleMajorRequired: 40, doubleMajorMajorRequired: 24,
      advancedMajorRequired: 12,
      basicElectiveOverride: 3, basicElectiveDoubleMajor: 3,
      notes: ['연구: 졸업연구 3 + 세미나 1'],
    },
    '2023이후': {
      majorRequired: 24, majorElective: 21, research: 4,
      researchExemptForDoubleMajor: true,
      minorRequired: 18, minorMajorRequired: 0,
      minorNotes: ['전필/전선 구분없이 18학점'],
      doubleMajorRequired: 40, doubleMajorMajorRequired: 24,
      advancedMajorRequired: 12,
      basicElectiveOverride: 3, basicElectiveDoubleMajor: 3,
      notes: ['연구: 졸업연구 3 + 세미나 1'],
    },
  },

  '생명화학공학과': {
    '2010이전': {
      majorRequired: 6, majorElective: 35, research: 3,
      majorRequiredCourses: ['CBE.20001', 'CBE.30001'],
      researchExemptForDoubleMajor: true,
      minorRequired: 18, minorMajorRequired: 6,
      doubleMajorRequired: 40, doubleMajorMajorRequired: 6,
      basicElectiveOverride: 9, basicElectiveDoubleMajor: 6,
    },
    '2011-2013': {
      majorRequired: 18, majorElective: 23, research: 3,
      majorRequiredCourses: ['CBE.20001', 'CBE.20002', 'CBE.20003', 'CBE.20005', 'CBE.20021', 'CBE.30001'],
      researchExemptForDoubleMajor: true,
      minorRequired: 18, minorMajorRequired: 9,
      doubleMajorRequired: 40, doubleMajorMajorRequired: 18,
      basicElectiveOverride: 9, basicElectiveDoubleMajor: 6,
    },
    '2014-2015': {
      majorRequired: 21, majorElective: 20, research: 3,
      majorRequiredCourses: ['CBE.20001', 'CBE.20002', 'CBE.20003', 'CBE.20005', 'CBE.20021', 'CBE.30001', 'CBE.40042'],
      researchExemptForDoubleMajor: true,
      minorRequired: 18, minorMajorRequired: 9,
      doubleMajorRequired: 40, doubleMajorMajorRequired: 21,
      basicElectiveOverride: 9, basicElectiveDoubleMajor: 6,
    },
    '2016-2019': {
      majorRequired: 21, majorElective: 21, research: 3,
      majorRequiredCourses: ['CBE.20001', 'CBE.20002', 'CBE.20003', 'CBE.20005', 'CBE.20021', 'CBE.30001', 'CBE.40042'],
      researchExemptForDoubleMajor: true,
      minorRequired: 18, minorMajorRequired: 9,
      minorNotes: ['CBE.20001/30001 중 1 + CBE.20002 포함 전필 9학점'],
      doubleMajorRequired: 42, doubleMajorMajorRequired: 21,
      advancedMajorRequired: 12,
      basicElectiveOverride: 9, basicElectiveDoubleMajor: 6,
    },
    '2020-2022': {
      majorRequired: 18, majorElective: 24, research: 3,
      majorRequiredCourses: ['CBE.20001', 'CBE.20002', 'CBE.20003', 'CBE.20005', 'CBE.20021', 'CBE.30001'],
      researchExemptForDoubleMajor: true,
      minorRequired: 18, minorMajorRequired: 9,
      minorNotes: ['CBE.20001/30001 중 1 + CBE.20002 포함 전필 9학점'],
      doubleMajorRequired: 42, doubleMajorMajorRequired: 18,
      advancedMajorRequired: 12,
      basicElectiveOverride: 9, basicElectiveDoubleMajor: 6,
    },
    '2023-2024': {
      majorRequired: 18, majorElective: 24, research: 4,
      majorRequiredCourses: ['CBE.20001', 'CBE.20002', 'CBE.20003', 'CBE.20005', 'CBE.20021', 'CBE.30001'],
      researchExemptForDoubleMajor: true,
      minorRequired: 18, minorMajorRequired: 9,
      minorNotes: ['CBE.20001/30001 중 1 + CBE.20002 포함 전필 9학점'],
      doubleMajorRequired: 42, doubleMajorMajorRequired: 18,
      advancedMajorRequired: 12,
      basicElectiveOverride: 9, basicElectiveDoubleMajor: 6,
    },
    '2025이후': {
      majorRequired: 18, majorElective: 24, research: 4,
      majorRequiredCourses: ['CBE.20001', 'CBE.20003', 'CBE.20005', 'CBE.30001', 'CBE.30011', 'CBE.30022'],
      researchExemptForDoubleMajor: true,
      minorRequired: 18, minorMajorRequired: 9,
      doubleMajorRequired: 42, doubleMajorMajorRequired: 18,
      advancedMajorRequired: 12,
      basicElectiveOverride: 9, basicElectiveDoubleMajor: 6,
      notes: ['2025학년도부터 전공필수 과목 변경'],
    },
  },

  '신소재공학과': {
    '2015이전': {
      majorRequired: 18, majorElective: 24, research: 3,
      majorRequiredCourses: ['MS.20012', 'MS.20013', 'MS.30010', 'MS.30011', 'MS.30021', 'MS.30022'],
      researchExemptForDoubleMajor: true,
      minorRequired: 18, minorMajorRequired: 9,
      minorNotes: ['전필 9학점 이상, 전선 9학점 이상'],
      doubleMajorRequired: 40, doubleMajorMajorRequired: 18,
      basicElectiveDoubleMajor: 6,
    },
    '2016-2022': {
      majorRequired: 18, majorElective: 24, research: 3,
      majorRequiredCourses: ['MS.20012', 'MS.20013', 'MS.30010', 'MS.30011', 'MS.30021', 'MS.30022'],
      researchExemptForDoubleMajor: true,
      minorRequired: 18, minorMajorRequired: 9,
      minorNotes: ['전필 9학점 이상, 전선 9학점 이상'],
      doubleMajorRequired: 40, doubleMajorMajorRequired: 18,
      advancedMajorRequired: 15,
      basicElectiveDoubleMajor: 6,
    },
    '2023': {
      majorRequired: 18, majorElective: 24, research: 3,
      majorRequiredCourses: ['MS.20012', 'MS.20013', 'MS.30010', 'MS.30011', 'MS.30021', 'MS.30022'],
      researchExemptForDoubleMajor: true,
      minorRequired: 18, minorMajorRequired: 9,
      minorNotes: ['전필 9학점 이상, 전선 9학점 이상'],
      doubleMajorRequired: 40, doubleMajorMajorRequired: 18,
      advancedMajorRequired: 12,
      basicElectiveDoubleMajor: 6,
      notes: ['2023학년도 입학생부터 심화전공 15→12학점 변경'],
    },
    '2024이후': {
      majorRequired: 18, majorElective: 24, research: 3,
      majorRequiredCourses: ['MS.20012', 'MS.20013', 'MS.30010', 'MS.30011', 'MS.30021', 'MS.30022'],
      researchExemptForDoubleMajor: true,
      minorRequired: 18, minorMajorRequired: 9,
      minorNotes: ['전필 9학점 이상, 전선 9학점 이상'],
      doubleMajorRequired: 42, doubleMajorMajorRequired: 18,
      advancedMajorRequired: 12,
      basicElectiveDoubleMajor: 6,
      notes: ['2024학년도 입학생부터 복수전공 40→42학점 변경'],
    },
  },

  '원자력및양자공학과': {
    '2015이전': {
      majorRequired: 25, majorElective: 18, research: 3,
      majorRequiredCourses: ['NQE.20001', 'NQE.20002', 'NQE.20004', 'NQE.30001', 'NQE.30003', 'NQE.30022', 'NQE.30041', 'NQE.30051'],
      researchExemptForDoubleMajor: true,
      minorRequired: 21, minorMajorRequired: 15,
      doubleMajorRequired: 40, doubleMajorMajorRequired: 25,
      basicElectiveDoubleMajor: 6,
    },
    '2016이후': {
      majorRequired: 25, majorElective: 18, research: 3,
      majorRequiredCourses: ['NQE.20001', 'NQE.20002', 'NQE.20004', 'NQE.30001', 'NQE.30003', 'NQE.30022', 'NQE.30041', 'NQE.30051'],
      researchExemptForDoubleMajor: true,
      minorRequired: 21, minorMajorRequired: 15,
      doubleMajorRequired: 40, doubleMajorMajorRequired: 25,
      advancedMajorRequired: 12,
      basicElectiveDoubleMajor: 6,
    },
  },

  '반도체시스템공학과': {
    '2016이후': {
      majorRequired: 18, majorElective: 35, research: 6,
      majorRequiredCourses: ['SS.20001', 'SS.30001'],
      majorRequiredSelectCount: 4, // EE.20001~EE.20011 중 4과목 선택
      researchExemptForDoubleMajor: false,
      minorRequired: 0, minorMajorRequired: 0,
      doubleMajorRequired: 0, doubleMajorMajorRequired: 0,
      advancedMajorRequired: 12,
      notes: ['부전공/복수전공 불가', '콜로키움 1학점 포함', '전필 18학점: SS 2과목 필수 + EE 6과목 중 4과목 선택'],
    },
  },

  '융합인재학부': {
    '2021이후': {
      majorRequired: 21, majorElective: 21, research: 3,
      researchExemptForDoubleMajor: true,
      minorRequired: 18, minorMajorRequired: 0,
      minorNotes: ['지성과문명강독/사회적혁신실험 중 18학점'],
      doubleMajorRequired: 42, doubleMajorMajorRequired: 18,
      advancedMajorRequired: 12,
      basicElectiveDoubleMajor: 3,
      notes: ['지성과문명강독 9학점 + 사회적혁신실험 12학점 필수'],
    },
  },

  '기술경영학부': {
    '2015이전': {
      majorRequired: 9, majorElective: 39, research: 4,
      majorRequiredCourses: ['MSB.20001', 'MSB.20002', 'MSB.30001'],
      researchExemptForDoubleMajor: true,
      minorRequired: 18, minorMajorRequired: 6,
      minorNotes: ['전필 3과목 중 택2 (6학점)'],
      doubleMajorRequired: 40, doubleMajorMajorRequired: 6,
      basicElectiveDoubleMajor: 6,
      notes: ['이공계 타학과 복수전공 필수'],
    },
    '2016-2023': {
      majorRequired: 9, majorElective: 39, research: 4,
      majorRequiredCourses: ['MSB.20001', 'MSB.20002', 'MSB.30001'],
      researchExemptForDoubleMajor: true,
      minorRequired: 18, minorMajorRequired: 6,
      minorNotes: ['전필 3과목 중 택2 (6학점)'],
      doubleMajorRequired: 40, doubleMajorMajorRequired: 6,
      advancedMajorRequired: 12,
      basicElectiveDoubleMajor: 6,
      notes: ['이공계 타학과 복수전공 필수'],
    },
    '2024이후': {
      majorRequired: 9, majorElective: 39, research: 4,
      majorRequiredCourses: ['MSB.20001', 'MSB.20002', 'MSB.30001'],
      researchExemptForDoubleMajor: true,
      minorRequired: 18, minorMajorRequired: 6,
      minorNotes: ['전필 3과목 중 택2 (6학점)'],
      doubleMajorRequired: 40, doubleMajorMajorRequired: 6,
      advancedMajorRequired: 12,
      basicElectiveDoubleMajor: 6,
      notes: ['이공계 타학과 복수전공 필수', '복수학위과정은 별도 요건 적용'],
    },
  },

  '뇌인지과학과': {
    '2016-2022': {
      majorRequired: 9, majorElective: 33, research: 9,
      majorRequiredCourses: ['BCS.20000', 'BCS.30020', 'BCS.40010'],
      researchExemptForDoubleMajor: true,
      minorRequired: 18, minorMajorRequired: 3,
      minorNotes: ['전필 1과목(3학점) 이상 포함'],
      doubleMajorRequired: 42, doubleMajorMajorRequired: 9,
      advancedMajorRequired: 12,
      basicElectiveDoubleMajor: 6,
      notes: [
        '전필: 3개 실험과목 각 3학점 (총 9학점)',
        '연구: 졸업연구 3 + 개별연구 2 + 세미나 4학점 (총 9학점)',
      ],
    },
    '2023이후': {
      majorRequired: 9, majorElective: 33, research: 9,
      majorRequiredCourses: ['BCS.20000', 'BCS.30020', 'BCS.40010'],
      researchExemptForDoubleMajor: true,
      minorRequired: 18, minorMajorRequired: 3,
      minorNotes: ['전필 1과목(3학점) 이상 포함'],
      doubleMajorRequired: 42, doubleMajorMajorRequired: 9,
      advancedMajorRequired: 12,
      basicElectiveDoubleMajor: 6,
      notes: [
        '전필: 3개 실험과목 각 3학점 (총 9학점)',
        '연구: 졸업연구 3 + 개별연구 2 + 세미나 4학점 (총 9학점)',
      ],
    },
  },

  '수리과학과': {
    '2015이전': {
      majorRequired: 0, majorElective: 42, research: 3,
      researchExemptForDoubleMajor: true,
      minorRequired: 18, minorMajorRequired: 0,
      minorNotes: ['MAS코드 전공과목 18학점 이상, 별도 필수과목 없음'],
      doubleMajorRequired: 40, doubleMajorMajorRequired: 0,
      doubleMajorNotes: ['권장 선택과목 4과목 이상 포함'],
      basicElectiveOverride: 9, basicElectiveDoubleMajor: 3,
      basicElectiveRequiredCourses: ['MAS201', 'MAS202'],
      notes: ['전공필수 없음, 권장 선택과목 4과목 이상 이수 권장'],
    },
    '2016-2022': {
      majorRequired: 0, majorElective: 42, research: 3,
      researchExemptForDoubleMajor: true,
      minorRequired: 18, minorMajorRequired: 0,
      minorNotes: ['MAS코드 전공과목 18학점 이상, 별도 필수과목 없음'],
      doubleMajorRequired: 40, doubleMajorMajorRequired: 0,
      doubleMajorNotes: ['권장 선택과목 4과목 이상 포함'],
      advancedMajorRequired: 13,
      basicElectiveOverride: 9, basicElectiveDoubleMajor: 3,
      basicElectiveRequiredCourses: ['MAS109', 'MAS201', 'MAS202', 'MAS250'],
      notes: [
        '전공필수 없음, 권장 선택과목 4과목 이상 이수',
        '심화전공: MAS242, MAS312, MAS430, MAS440 포함 13학점',
      ],
    },
    '2023이후': {
      majorRequired: 0, majorElective: 42, research: 3,
      researchExemptForDoubleMajor: true,
      minorRequired: 18, minorMajorRequired: 0,
      minorNotes: ['MAS코드 전공과목 18학점 이상, 별도 필수과목 없음'],
      doubleMajorRequired: 40, doubleMajorMajorRequired: 0,
      doubleMajorNotes: ['필수 선택과목 4과목 이상 포함'],
      advancedMajorRequired: 13,
      basicElectiveOverride: 9, basicElectiveDoubleMajor: 3,
      basicElectiveRequiredCourses: ['MAS109', 'MAS201', 'MAS202', 'MAS250'],
      notes: [
        '전공필수 없음, 필수 선택과목 4과목 이상 이수',
        '심화전공: MAS242, MAS312, MAS430, MAS440 포함 13학점',
      ],
    },
  },
};

// =====================================
// 학번에 맞는 요건 키 가져오기
// =====================================
export const getRequirementKey = (department: string, year: number): string => {
  const deptReqs = departmentRequirements[department];
  if (!deptReqs) return '2023이후';
  
  const keys = Object.keys(deptReqs);
  
  // 정확한 연도 범위 매칭
  for (const key of keys) {
    // "2015이전" 형태
    if (key.includes('이전') && year <= parseInt(key)) {
      return key;
    }
    // 단일 연도 키 (예: "2023")
    if (/^\d{4}$/.test(key) && year === parseInt(key)) {
      return key;
    }
    // "2023이후" 또는 "2024이후" 형태
    if (key.includes('이후')) {
      const startYear = parseInt(key);
      if (year >= startYear) {
        // 더 높은 "이후" 키가 있는지 확인
        const higherKey = keys.find(k => {
          if (k.includes('이후')) {
            const otherYear = parseInt(k);
            return otherYear > startYear && year >= otherYear;
          }
          return false;
        });
        if (!higherKey) return key;
      }
    }
    // "2016-2022" 형태
    const match = key.match(/(\d{4})-(\d{4})/);
    if (match) {
      const start = parseInt(match[1]);
      const end = parseInt(match[2]);
      if (year >= start && year <= end) return key;
    }
  }
  
  // 기본 매칭
  if (year <= 2015 && keys.includes('2015이전')) return '2015이전';
  if (year <= 2010 && keys.includes('2010이전')) return '2010이전';
  
  // 가장 적합한 "이후" 키 찾기
  const afterKeys = keys.filter(k => k.includes('이후')).sort((a, b) => parseInt(b) - parseInt(a));
  for (const key of afterKeys) {
    const startYear = parseInt(key);
    if (year >= startYear) return key;
  }
  
  // 범위 키 중 가장 적합한 것 찾기
  for (const key of keys) {
    const match = key.match(/(\d{4})-(\d{4})/);
    if (match) {
      const end = parseInt(match[2]);
      if (year <= end) return key;
    }
  }
  
  return keys[keys.length - 1];
};