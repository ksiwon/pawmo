import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import type { StudentInfo, Course, CompletionStatus, Department } from '../types';
import {
  getTotalCredits,
  getCommonRequirements,
  departmentRequirements,
  getRequirementKey,
} from '../data/requirements';

const Container = styled.div`
  min-height: 100vh;
  background: #f4f5f7;
  padding: 40px 20px;
`;

const Wrapper = styled.div`
  max-width: 680px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 24px;
`;

const Title = styled.h1`
  font-size: 26px;
  font-weight: 700;
  color: #191f28;
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  font-size: 15px;
  color: #8b95a1;
`;

const StatusBanner = styled.div<{ $passed: boolean }>`
  background: ${props => props.$passed ? '#e8f5e9' : '#ffebee'};
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  margin-bottom: 16px;
`;

const StatusIcon = styled.div`
  font-size: 48px;
  margin-bottom: 12px;
`;

const StatusText = styled.div<{ $passed: boolean }>`
  font-size: 20px;
  font-weight: 700;
  color: ${props => props.$passed ? '#2e7d32' : '#c62828'};
`;

const StatusSubtext = styled.div`
  font-size: 14px;
  color: #8b95a1;
  margin-top: 8px;
`;

const Card = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
`;

const CardTitle = styled.h2`
  font-size: 17px;
  font-weight: 600;
  color: #191f28;
  margin-bottom: 20px;
`;

const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;

  @media (max-width: 500px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const SummaryItem = styled.div`
  text-align: center;
  padding: 16px 8px;
  background: #f4f5f7;
  border-radius: 12px;
`;

const SummaryValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #191f28;
  margin-bottom: 4px;
`;

const SummaryLabel = styled.div`
  font-size: 13px;
  color: #8b95a1;
`;

const InfoGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const InfoChip = styled.div`
  padding: 8px 14px;
  background: #f4f5f7;
  border-radius: 8px;
  font-size: 14px;
  color: #4e5968;
`;

const TagChip = styled.span`
  padding: 6px 12px;
  background: #f2f7ff;
  color: #3182f6;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
`;

const SectionTitle = styled.h3`
  font-size: 15px;
  font-weight: 600;
  color: #4e5968;
  margin: 24px 0 16px;
  padding-left: 12px;
  border-left: 3px solid #3182f6;
`;

const RequirementList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const RequirementItem = styled.div`
  background: #fafbfc;
  border-radius: 12px;
  padding: 16px;
`;

const RequirementHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const RequirementName = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #191f28;
`;

const RequirementStatus = styled.div<{ $passed: boolean }>`
  font-size: 13px;
  font-weight: 600;
  color: ${props => props.$passed ? '#2e7d32' : '#c62828'};
  display: flex;
  align-items: center;
  gap: 4px;
`;

const ProgressContainer = styled.div`
  margin-bottom: 8px;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background: #e5e8eb;
  border-radius: 3px;
  overflow: hidden;
`;

const ProgressFill = styled.div<{ $percentage: number; $passed: boolean }>`
  width: ${props => Math.min(props.$percentage, 100)}%;
  height: 100%;
  background: ${props => props.$passed ? '#4caf50' : props.$percentage >= 80 ? '#ff9800' : '#ef5350'};
  border-radius: 3px;
  transition: width 0.5s ease;
`;

const ProgressInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
`;

const ProgressText = styled.span`
  font-size: 13px;
  color: #8b95a1;
`;

const ProgressNumbers = styled.span`
  font-size: 14px;
  color: #4e5968;
  font-weight: 500;
`;

const DetailText = styled.div`
  font-size: 12px;
  color: #8b95a1;
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid #e5e8eb;
`;

const NoticeBox = styled.div`
  background: #fff8e6;
  border-radius: 12px;
  padding: 16px;
  font-size: 14px;
  color: #946800;
  line-height: 1.6;
`;

const Button = styled.button`
  width: 100%;
  padding: 16px;
  background: #3182f6;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  margin-top: 8px;

  &:hover {
    background: #1b64da;
  }
`;

const SecondaryButton = styled(Button)`
  background: #f4f5f7;
  color: #4e5968;

  &:hover {
    background: #e5e8eb;
  }
`;

// 카테고리 매핑
const getCategoryFromRaw = (rawCategory: string): string => {
  if (rawCategory.startsWith('인선')) {
    return '인문사회선택';
  }
  
  const categoryMapping: Record<string, string> = {
    '기필': '기초필수',
    '기선': '기초선택',
    '교필': '교양필수',
    '전필': '전공필수',
    '전선': '전공선택',
    '연구': '연구',
    '자선': '자유선택',
  };
  
  return categoryMapping[rawCategory] || rawCategory;
};

const getDepartmentFromCourse = (course: Course): string => {
  return course.department;
};

const ResultPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { studentInfo, courses } = location.state as {
    studentInfo: StudentInfo;
    courses: Course[];
  };

  const analysisResult = useMemo(() => {
    const hasDoubleMajor = studentInfo.doubleMajors.length > 0;
    
    const creditsByCategory: Record<string, number> = {};
    let totalAU = 0;
    let totalCredits = 0;
    let totalGradePoints = 0;
    let gradedCredits = 0;

    const mainMajorCredits = { 전필: 0, 전선: 0 };
    const doubleMajorCredits: Record<string, { 전필: number; 전선: number }> = {};
    const minorCredits: Record<string, { total: number }> = {};

    studentInfo.doubleMajors.forEach(dept => {
      doubleMajorCredits[dept] = { 전필: 0, 전선: 0 };
    });
    studentInfo.minors.forEach(dept => {
      minorCredits[dept] = { total: 0 };
    });

    courses.forEach((course) => {
      const category = getCategoryFromRaw(course.category);
      creditsByCategory[category] = (creditsByCategory[category] || 0) + course.credits;
      totalAU += course.au;
      totalCredits += course.credits;

      const courseDept = getDepartmentFromCourse(course);
      
      if (course.category === '전필' || course.category === '전선') {
        if (studentInfo.doubleMajors.includes(courseDept as Department)) {
          if (course.category === '전필') {
            doubleMajorCredits[courseDept].전필 += course.credits;
          } else {
            doubleMajorCredits[courseDept].전선 += course.credits;
          }
        }
        else if (studentInfo.minors.includes(courseDept as Department)) {
          minorCredits[courseDept].total += course.credits;
        }
        else if (courseDept === studentInfo.mainDepartment) {
          if (course.category === '전필') {
            mainMajorCredits.전필 += course.credits;
          } else {
            mainMajorCredits.전선 += course.credits;
          }
        }
      }

      const gradePoints: Record<string, number> = {
        'A+': 4.3, 'A0': 4.0, 'A-': 3.7,
        'B+': 3.3, 'B0': 3.0, 'B-': 2.7,
        'C+': 2.3, 'C0': 2.0, 'C-': 1.7,
        'D+': 1.3, 'D0': 1.0, 'D-': 0.7,
        'F': 0,
      };

      if (gradePoints[course.grade] !== undefined) {
        totalGradePoints += gradePoints[course.grade] * course.credits;
        gradedCredits += course.credits;
      }
    });

    const gpa = gradedCredits > 0 ? totalGradePoints / gradedCredits : 0;

    const totalRequired = getTotalCredits(studentInfo.admissionYear);
    const commonReqs = getCommonRequirements(studentInfo.admissionYear, hasDoubleMajor);
    const reqKey = getRequirementKey(studentInfo.mainDepartment, studentInfo.admissionYear);
    const deptReqs = departmentRequirements[studentInfo.mainDepartment]?.[reqKey] || {
      majorRequired: 18,
      majorElective: 24,
      research: 3,
    };

    const basicElectiveRequired = hasDoubleMajor 
      ? (deptReqs.basicElectiveDoubleMajor || 6) 
      : (deptReqs.basicElectiveOverride || commonReqs.basicElective);

    const statuses: CompletionStatus[] = [
      {
        category: '총 이수학점',
        required: totalRequired,
        completed: totalCredits,
        remaining: Math.max(0, totalRequired - totalCredits),
        passed: totalCredits >= totalRequired,
      },
      {
        category: '교양필수',
        required: commonReqs.liberalRequired,
        completed: creditsByCategory['교양필수'] || 0,
        remaining: Math.max(0, commonReqs.liberalRequired - (creditsByCategory['교양필수'] || 0)),
        passed: (creditsByCategory['교양필수'] || 0) >= commonReqs.liberalRequired,
      },
      {
        category: '인문사회선택',
        required: commonReqs.liberalElective,
        completed: creditsByCategory['인문사회선택'] || 0,
        remaining: Math.max(0, commonReqs.liberalElective - (creditsByCategory['인문사회선택'] || 0)),
        passed: (creditsByCategory['인문사회선택'] || 0) >= commonReqs.liberalElective,
        details: hasDoubleMajor ? ['복수전공자: 12학점 (핵심 1과목 포함)'] : undefined,
      },
      {
        category: '기초필수',
        required: commonReqs.basicRequired,
        completed: creditsByCategory['기초필수'] || 0,
        remaining: Math.max(0, commonReqs.basicRequired - (creditsByCategory['기초필수'] || 0)),
        passed: (creditsByCategory['기초필수'] || 0) >= commonReqs.basicRequired,
      },
      {
        category: '기초선택',
        required: basicElectiveRequired,
        completed: creditsByCategory['기초선택'] || 0,
        remaining: Math.max(0, basicElectiveRequired - (creditsByCategory['기초선택'] || 0)),
        passed: (creditsByCategory['기초선택'] || 0) >= basicElectiveRequired,
      },
    ];

    const mainMajorStatuses: CompletionStatus[] = [
      {
        category: '전공필수',
        required: deptReqs.majorRequired,
        completed: mainMajorCredits.전필,
        remaining: Math.max(0, deptReqs.majorRequired - mainMajorCredits.전필),
        passed: mainMajorCredits.전필 >= deptReqs.majorRequired,
      },
      {
        category: '전공선택',
        required: deptReqs.majorElective,
        completed: mainMajorCredits.전선,
        remaining: Math.max(0, deptReqs.majorElective - mainMajorCredits.전선),
        passed: mainMajorCredits.전선 >= deptReqs.majorElective,
      },
      {
        category: '연구',
        required: deptReqs.research,
        completed: creditsByCategory['연구'] || 0,
        remaining: Math.max(0, deptReqs.research - (creditsByCategory['연구'] || 0)),
        passed: (creditsByCategory['연구'] || 0) >= deptReqs.research,
      },
    ];

    const doubleMajorStatuses: CompletionStatus[] = [];
    studentInfo.doubleMajors.forEach(dept => {
      const dmReqKey = getRequirementKey(dept, studentInfo.admissionYear);
      const dmReqs = departmentRequirements[dept]?.[dmReqKey];
      const dmRequired = dmReqs?.doubleMajorRequired || 40;
      const dmCompleted = doubleMajorCredits[dept].전필 + doubleMajorCredits[dept].전선;
      
      doubleMajorStatuses.push({
        category: dept,
        required: dmRequired,
        completed: dmCompleted,
        remaining: Math.max(0, dmRequired - dmCompleted),
        passed: dmCompleted >= dmRequired,
        details: ['최대 6학점 중복인정 가능'],
      });
    });

    const minorStatuses: CompletionStatus[] = [];
    studentInfo.minors.forEach(dept => {
      const mnReqKey = getRequirementKey(dept, studentInfo.admissionYear);
      const mnReqs = departmentRequirements[dept]?.[mnReqKey];
      const mnRequired = mnReqs?.minorRequired || 18;
      const mnCompleted = minorCredits[dept].total;
      
      minorStatuses.push({
        category: dept,
        required: mnRequired,
        completed: mnCompleted,
        remaining: Math.max(0, mnRequired - mnCompleted),
        passed: mnCompleted >= mnRequired,
      });
    });

    const advancedMajorStatuses: CompletionStatus[] = [];
    if (studentInfo.advancedMajor && deptReqs.advancedMajorRequired) {
      const advancedCompleted = Math.max(0, mainMajorCredits.전선 - deptReqs.majorElective);
      advancedMajorStatuses.push({
        category: '심화전공',
        required: deptReqs.advancedMajorRequired,
        completed: advancedCompleted,
        remaining: Math.max(0, deptReqs.advancedMajorRequired - advancedCompleted),
        passed: mainMajorCredits.전선 >= deptReqs.majorElective + deptReqs.advancedMajorRequired,
        details: ['전공선택 초과 학점 반영'],
      });
    }

    const freeFusionStatuses: CompletionStatus[] = [];
    if (studentInfo.freeFusionMajor) {
      freeFusionStatuses.push({
        category: '자유융합전공',
        required: 12,
        completed: 0,
        remaining: 12,
        passed: false,
        details: ['2개 이상 타 학과 전공과목 12학점'],
      });
    }

    const auStatuses: CompletionStatus[] = [];
    if (commonReqs.au && commonReqs.au > 0) {
      auStatuses.push({
        category: 'AU',
        required: commonReqs.au,
        completed: totalAU,
        remaining: Math.max(0, commonReqs.au - totalAU),
        passed: totalAU >= commonReqs.au,
      });
    }

    const gpaStatus: CompletionStatus = {
      category: '평균 평점',
      required: 2.0,
      completed: parseFloat(gpa.toFixed(2)),
      remaining: gpa >= 2.0 ? 0 : parseFloat((2.0 - gpa).toFixed(2)),
      passed: gpa >= 2.0,
    };

    const allStatuses = [
      ...statuses, 
      ...mainMajorStatuses, 
      ...doubleMajorStatuses, 
      ...minorStatuses,
      ...advancedMajorStatuses,
      ...freeFusionStatuses,
      ...auStatuses,
    ];
    
    const overallPassed = allStatuses.every((s) => s.passed) && gpa >= 2.0;

    return {
      statuses,
      mainMajorStatuses,
      doubleMajorStatuses,
      minorStatuses,
      advancedMajorStatuses,
      freeFusionStatuses,
      auStatuses,
      gpaStatus,
      overallPassed,
      totalCredits,
      gpa,
      creditsByCategory,
      deptReqs,
      totalAU,
      hasDoubleMajor,
    };
  }, [studentInfo, courses]);

  const renderRequirementItem = (status: CompletionStatus) => {
    const percentage = status.required > 0 ? (status.completed / status.required) * 100 : 100;
    
    return (
      <RequirementItem key={status.category}>
        <RequirementHeader>
          <RequirementName>{status.category}</RequirementName>
          <RequirementStatus $passed={status.passed}>
            {status.passed ? '✓ 충족' : '미충족'}
          </RequirementStatus>
        </RequirementHeader>
        <ProgressContainer>
          <ProgressBar>
            <ProgressFill $percentage={percentage} $passed={status.passed} />
          </ProgressBar>
          <ProgressInfo>
            <ProgressText>{Math.min(100, Math.round(percentage))}%</ProgressText>
            <ProgressNumbers>
              {status.completed} / {status.required}
              {status.remaining > 0 && <span style={{ color: '#c62828' }}> (-{status.remaining})</span>}
            </ProgressNumbers>
          </ProgressInfo>
        </ProgressContainer>
        {status.details && status.details.length > 0 && (
          <DetailText>{status.details.join(' · ')}</DetailText>
        )}
      </RequirementItem>
    );
  };

  return (
    <Container>
      <Wrapper>
        <Header>
          <Title>졸업요건 분석 결과</Title>
          <Subtitle>{studentInfo.mainDepartment} · {studentInfo.admissionYear}</Subtitle>
        </Header>

        <StatusBanner $passed={analysisResult.overallPassed}>
          <StatusIcon>{analysisResult.overallPassed ? '🎉' : '📋'}</StatusIcon>
          <StatusText $passed={analysisResult.overallPassed}>
            {analysisResult.overallPassed ? '졸업요건을 충족했어요!' : '아직 충족하지 못한 요건이 있어요'}
          </StatusText>
          <StatusSubtext>
            {analysisResult.overallPassed 
              ? '축하합니다! 모든 요건을 충족했습니다' 
              : '아래에서 상세 내역을 확인해주세요'}
          </StatusSubtext>
        </StatusBanner>

        <Card>
          <SummaryGrid>
            <SummaryItem>
              <SummaryValue>{analysisResult.totalCredits}</SummaryValue>
              <SummaryLabel>이수학점</SummaryLabel>
            </SummaryItem>
            <SummaryItem>
              <SummaryValue>{analysisResult.gpa.toFixed(2)}</SummaryValue>
              <SummaryLabel>평점</SummaryLabel>
            </SummaryItem>
            <SummaryItem>
              <SummaryValue>{analysisResult.totalAU}</SummaryValue>
              <SummaryLabel>AU</SummaryLabel>
            </SummaryItem>
            <SummaryItem>
              <SummaryValue>{courses.length}</SummaryValue>
              <SummaryLabel>과목수</SummaryLabel>
            </SummaryItem>
          </SummaryGrid>
        </Card>

        <Card>
          <CardTitle>학생 정보</CardTitle>
          <InfoGrid>
            <InfoChip>{studentInfo.admissionYear} 입학</InfoChip>
            <InfoChip>{studentInfo.mainDepartment}</InfoChip>
            {studentInfo.advancedMajor && <TagChip>심화전공</TagChip>}
            {studentInfo.freeFusionMajor && <TagChip>자유융합전공</TagChip>}
            {studentInfo.doubleMajors.map(d => <TagChip key={d}>복수 · {d}</TagChip>)}
            {studentInfo.minors.map(d => <TagChip key={d}>부전공 · {d}</TagChip>)}
          </InfoGrid>
        </Card>

        <Card>
          <CardTitle>상세 요건</CardTitle>

          <SectionTitle>공통 요건</SectionTitle>
          <RequirementList>
            {analysisResult.statuses.map(renderRequirementItem)}
          </RequirementList>

          <SectionTitle>주전공 ({studentInfo.mainDepartment})</SectionTitle>
          <RequirementList>
            {analysisResult.mainMajorStatuses.map(renderRequirementItem)}
          </RequirementList>

          {analysisResult.doubleMajorStatuses.length > 0 && (
            <>
              <SectionTitle>복수전공</SectionTitle>
              <RequirementList>
                {analysisResult.doubleMajorStatuses.map(renderRequirementItem)}
              </RequirementList>
            </>
          )}

          {analysisResult.minorStatuses.length > 0 && (
            <>
              <SectionTitle>부전공</SectionTitle>
              <RequirementList>
                {analysisResult.minorStatuses.map(renderRequirementItem)}
              </RequirementList>
            </>
          )}

          {analysisResult.advancedMajorStatuses.length > 0 && (
            <>
              <SectionTitle>심화전공</SectionTitle>
              <RequirementList>
                {analysisResult.advancedMajorStatuses.map(renderRequirementItem)}
              </RequirementList>
            </>
          )}

          {analysisResult.freeFusionStatuses.length > 0 && (
            <>
              <SectionTitle>자유융합전공</SectionTitle>
              <RequirementList>
                {analysisResult.freeFusionStatuses.map(renderRequirementItem)}
              </RequirementList>
            </>
          )}

          {analysisResult.auStatuses.length > 0 && (
            <>
              <SectionTitle>기타</SectionTitle>
              <RequirementList>
                {analysisResult.auStatuses.map(renderRequirementItem)}
                {renderRequirementItem(analysisResult.gpaStatus)}
              </RequirementList>
            </>
          )}

          {analysisResult.auStatuses.length === 0 && (
            <>
              <SectionTitle>기타</SectionTitle>
              <RequirementList>
                {renderRequirementItem(analysisResult.gpaStatus)}
              </RequirementList>
            </>
          )}
        </Card>

        {analysisResult.deptReqs.notes && analysisResult.deptReqs.notes.length > 0 && (
          <Card>
            <CardTitle>학과 참고사항</CardTitle>
            <div style={{ color: '#4e5968', fontSize: '14px', lineHeight: '1.6' }}>
              {analysisResult.deptReqs.notes.map((note, index) => (
                <div key={index} style={{ marginBottom: '8px' }}>• {note}</div>
              ))}
            </div>
          </Card>
        )}

        <NoticeBox>
          ⚠️ 이 결과는 참고용입니다. 정확한 졸업요건은 학과 사무실 또는 학적팀에서 확인해주세요.
          영어 성적, 윤리 및 안전 이수 등은 별도 확인이 필요합니다.
        </NoticeBox>

        <SecondaryButton onClick={() => navigate('/')}>
          다시 확인하기
        </SecondaryButton>
      </Wrapper>
    </Container>
  );
};

export default ResultPage;
