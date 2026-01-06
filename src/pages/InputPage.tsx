import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { DEPARTMENTS } from '../types';
import type { StudentInfo, Course, Department } from '../types';

const Container = styled.div`
  min-height: 100vh;
  background: #f4f5f7;
  padding: 40px 20px;
`;

const Wrapper = styled.div`
  max-width: 580px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 32px;
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

const FormGroup = styled.div`
  margin-bottom: 20px;
  &:last-child { margin-bottom: 0; }
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #4e5968;
  margin-bottom: 8px;
`;

const Select = styled.select`
  width: 100%;
  padding: 14px 16px;
  border: 1px solid #e5e8eb;
  border-radius: 12px;
  font-size: 15px;
  color: #191f28;
  background: #fff;
  transition: border-color 0.2s, box-shadow 0.2s;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%234e5968' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 16px center;
  &:focus {
    outline: none;
    border-color: #3182f6;
    box-shadow: 0 0 0 3px rgba(49, 130, 246, 0.1);
  }
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  @media (max-width: 500px) { grid-template-columns: 1fr; }
`;

const CheckboxGroup = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const CheckboxLabel = styled.label<{ $checked?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border: 1px solid ${props => props.$checked ? '#3182f6' : '#e5e8eb'};
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  background: ${props => props.$checked ? '#f2f7ff' : '#fff'};
  font-size: 14px;
  color: ${props => props.$checked ? '#3182f6' : '#4e5968'};
  font-weight: ${props => props.$checked ? '600' : '400'};
  &:hover { border-color: #3182f6; }
  input { display: none; }
  &::before {
    content: '';
    width: 20px;
    height: 20px;
    border: 2px solid ${props => props.$checked ? '#3182f6' : '#d1d6db'};
    border-radius: 6px;
    background: ${props => props.$checked ? '#3182f6' : '#fff'};
    background-image: ${props => props.$checked ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'%3E%3C/polyline%3E%3C/svg%3E")` : 'none'};
    background-repeat: no-repeat;
    background-position: center;
    transition: all 0.2s;
  }
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
`;

const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: #f2f7ff;
  color: #3182f6;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  button {
    background: none;
    border: none;
    color: #3182f6;
    cursor: pointer;
    padding: 0;
    font-size: 16px;
    line-height: 1;
    opacity: 0.7;
    &:hover { opacity: 1; }
  }
`;

const SelectRow = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const SmallSelect = styled(Select)`
  flex: 1;
`;

const AddButton = styled.button`
  padding: 14px 20px;
  background: #f2f4f6;
  color: #4e5968;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.2s;
  white-space: nowrap;
  &:hover { background: #e5e8eb; }
  &:disabled { opacity: 0.4; cursor: not-allowed; }
`;

const FileInput = styled.div<{ $active?: boolean }>`
  border: 2px dashed ${props => props.$active ? '#3182f6' : '#e5e8eb'};
  border-radius: 16px;
  padding: 40px 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  background: ${props => props.$active ? '#f2f7ff' : '#fafbfc'};
  &:hover {
    border-color: #3182f6;
    background: #f2f7ff;
  }
`;

const FileInputLabel = styled.label`
  cursor: pointer;
  display: block;
`;

const HiddenInput = styled.input`
  display: none;
`;

const FileIcon = styled.div`
  font-size: 48px;
  margin-bottom: 12px;
`;

const FileName = styled.p`
  color: #3182f6;
  font-weight: 600;
  font-size: 15px;
`;

const FileHint = styled.p`
  color: #8b95a1;
  font-size: 14px;
  margin-top: 8px;
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
  &:hover { background: #1b64da; }
  &:disabled { background: #d1d6db; cursor: not-allowed; }
`;

const WarningBox = styled.div`
  background: #fff8e6;
  border-radius: 12px;
  padding: 16px;
  font-size: 14px;
  color: #946800;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-top: 16px;
  &::before { content: '⚠️'; }
`;

const InfoText = styled.p`
  font-size: 13px;
  color: #8b95a1;
  margin-top: 8px;
`;

const CardTitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
`;

const HelpIconWrapper = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const HelpIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  background: #e5e8eb;
  color: #6b7684;
  border-radius: 50%;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background: #3182f6;
    color: white;
  }
`;

const HelpOverlay = styled.div<{ $visible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.9);
  z-index: 9999;
  opacity: ${props => props.$visible ? 1 : 0};
  visibility: ${props => props.$visible ? 'visible' : 'hidden'};
  transition: opacity 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  img {
    max-width: 95vw;
    max-height: 95vh;
    object-fit: contain;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  color: white;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const InputPage: React.FC = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  
  // 입학년도 옵션 생성 (2010 ~ 현재년도)
  const admissionYears = Array.from(
    { length: currentYear - 2009 },
    (_, i) => currentYear - i
  );

  const [studentInfo, setStudentInfo] = useState<StudentInfo>({
    admissionYear: 2023,
    mainDepartment: '전산학부',
    advancedMajor: false,
    freeFusionMajor: false,
    doubleMajors: [],
    minors: [],
  });
  const [showHelpImage, setShowHelpImage] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [fileName, setFileName] = useState<string>('');
  const [selectedDoubleMajor, setSelectedDoubleMajor] = useState<string>('');
  const [selectedMinor, setSelectedMinor] = useState<string>('');

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target?.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const jsonData = XLSX.utils.sheet_to_json(worksheet) as any[];
      const parsedCourses: Course[] = jsonData.map((row) => ({
        semester: row['학년도-학기'] || '',
        department: row['학과'] || '',
        courseCode: row['교과목'] || '',
        courseNumber: row['과목번호'] || '',
        division: row['분반'] || '',
        category: row['구분'] || '',
        courseName: row['교과목명'] || '',
        englishName: row['영문교과목명'] || '',
        credits: parseInt(row['학점']) || 0,
        au: parseInt(row['AU']) || 0,
        retake: row['재수강'] || 'N',
        gradeOriginal: row['성적(P/NR표기전)'] || '',
        grade: row['성적'] || '',
      }));
      const completedCourses = parsedCourses.filter(
        (course) => !['F', 'NR', 'W'].includes(course.grade)
      );
      setCourses(completedCourses);
    };
    reader.readAsBinaryString(file);
  }, []);

  const handleSubmit = () => {
    if (courses.length === 0) {
      alert('성적 파일을 업로드해주세요.');
      return;
    }
    const hasAnyMajorType = 
      studentInfo.advancedMajor || 
      studentInfo.freeFusionMajor || 
      studentInfo.doubleMajors.length > 0 || 
      studentInfo.minors.length > 0;
    if (!hasAnyMajorType) {
      alert('심화전공, 복수전공, 부전공, 자유융합전공 중 하나 이상을 선택해주세요.');
      return;
    }
    navigate('/result', { state: { studentInfo, courses } });
  };

  const availableDepartments = DEPARTMENTS.filter(
    (d) => d !== studentInfo.mainDepartment && 
           !studentInfo.doubleMajors.includes(d) && 
           !studentInfo.minors.includes(d)
  );

  const addDoubleMajor = () => {
    if (selectedDoubleMajor && !studentInfo.doubleMajors.includes(selectedDoubleMajor as Department)) {
      setStudentInfo({
        ...studentInfo,
        doubleMajors: [...studentInfo.doubleMajors, selectedDoubleMajor as Department],
      });
      setSelectedDoubleMajor('');
    }
  };

  const removeDoubleMajor = (dept: Department) => {
    setStudentInfo({
      ...studentInfo,
      doubleMajors: studentInfo.doubleMajors.filter((d) => d !== dept),
    });
  };

  const addMinor = () => {
    if (selectedMinor && !studentInfo.minors.includes(selectedMinor as Department)) {
      setStudentInfo({
        ...studentInfo,
        minors: [...studentInfo.minors, selectedMinor as Department],
      });
      setSelectedMinor('');
    }
  };

  const removeMinor = (dept: Department) => {
    setStudentInfo({
      ...studentInfo,
      minors: studentInfo.minors.filter((d) => d !== dept),
    });
  };

  const isSemiConductor = studentInfo.mainDepartment === '반도체시스템공학과';

  return (
    <Container>
      <Wrapper>
        <Header>
          <Title>KAIST 졸업요건 확인</Title>
          <Subtitle>학번과 전공 정보를 입력해주세요</Subtitle>
        </Header>

        <Card>
          <CardTitle>기본 정보</CardTitle>
          <Row>
            <FormGroup>
              <Label>입학년도</Label>
              <Select
                value={studentInfo.admissionYear}
                onChange={(e) =>
                  setStudentInfo({ ...studentInfo, admissionYear: parseInt(e.target.value) })
                }
              >
                {admissionYears.map((year) => (
                  <option key={year} value={year}>{year}학번</option>
                ))}
              </Select>
            </FormGroup>
            <FormGroup>
              <Label>주전공</Label>
              <Select
                value={studentInfo.mainDepartment}
                onChange={(e) =>
                  setStudentInfo({ 
                    ...studentInfo, 
                    mainDepartment: e.target.value as Department,
                    doubleMajors: [],
                    minors: [],
                  })
                }
              >
                {DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </Select>
            </FormGroup>
          </Row>
        </Card>

        <Card>
          <CardTitle>전공 유형</CardTitle>
          <InfoText style={{ marginTop: 0, marginBottom: 16 }}>
            심화전공, 복수전공, 부전공, 자유융합전공 중 하나 이상 선택해주세요
          </InfoText>
          
          <CheckboxGroup>
            <CheckboxLabel $checked={studentInfo.advancedMajor}>
              <input
                type="checkbox"
                checked={studentInfo.advancedMajor}
                onChange={(e) => setStudentInfo({ ...studentInfo, advancedMajor: e.target.checked })}
              />
              심화전공
            </CheckboxLabel>
            <CheckboxLabel $checked={studentInfo.freeFusionMajor}>
              <input
                type="checkbox"
                checked={studentInfo.freeFusionMajor}
                onChange={(e) => setStudentInfo({ ...studentInfo, freeFusionMajor: e.target.checked })}
              />
              자유융합전공
            </CheckboxLabel>
          </CheckboxGroup>

          {!isSemiConductor && (
            <>
              <FormGroup style={{ marginTop: 24 }}>
                <Label>복수전공</Label>
                {studentInfo.doubleMajors.length > 0 && (
                  <TagContainer>
                    {studentInfo.doubleMajors.map((dept) => (
                      <Tag key={dept}>
                        {dept}
                        <button onClick={() => removeDoubleMajor(dept)}>×</button>
                      </Tag>
                    ))}
                  </TagContainer>
                )}
                <SelectRow>
                  <SmallSelect
                    value={selectedDoubleMajor}
                    onChange={(e) => setSelectedDoubleMajor(e.target.value)}
                  >
                    <option value="">학과 선택</option>
                    {availableDepartments
                      .filter(d => d !== '반도체시스템공학과')
                      .map((dept) => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))
                    }
                  </SmallSelect>
                  <AddButton onClick={addDoubleMajor} disabled={!selectedDoubleMajor}>추가</AddButton>
                </SelectRow>
              </FormGroup>

              <FormGroup>
                <Label>부전공</Label>
                {studentInfo.minors.length > 0 && (
                  <TagContainer>
                    {studentInfo.minors.map((dept) => (
                      <Tag key={dept}>
                        {dept}
                        <button onClick={() => removeMinor(dept)}>×</button>
                      </Tag>
                    ))}
                  </TagContainer>
                )}
                <SelectRow>
                  <SmallSelect
                    value={selectedMinor}
                    onChange={(e) => setSelectedMinor(e.target.value)}
                  >
                    <option value="">학과 선택</option>
                    {availableDepartments
                      .filter(d => d !== '반도체시스템공학과')
                      .map((dept) => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))
                    }
                  </SmallSelect>
                  <AddButton onClick={addMinor} disabled={!selectedMinor}>추가</AddButton>
                </SelectRow>
              </FormGroup>
            </>
          )}

          {isSemiConductor && (
            <WarningBox>반도체시스템공학과는 복수전공/부전공이 불가합니다</WarningBox>
          )}
        </Card>

        <Card>
          <CardTitleRow>
            <CardTitle style={{ marginBottom: 0 }}>성적 파일</CardTitle>
            <HelpIconWrapper>
              <HelpIcon onClick={() => setShowHelpImage(true)}>?</HelpIcon>
            </HelpIconWrapper>
          </CardTitleRow>
          <HelpOverlay $visible={showHelpImage} onClick={() => setShowHelpImage(false)}>
            <CloseButton onClick={() => setShowHelpImage(false)}>×</CloseButton>
            <img src="/where_excel.png" alt="엑셀 파일 위치 안내" onClick={(e) => e.stopPropagation()} />
          </HelpOverlay>
          <FileInput $active={!!fileName}>
            <FileInputLabel>
              <HiddenInput type="file" accept=".xlsx,.xls" onChange={handleFileUpload} />
              {fileName ? (
                <>
                  <FileIcon>✓</FileIcon>
                  <FileName>{fileName}</FileName>
                  <FileHint>{courses.length}개 과목 로드 완료</FileHint>
                </>
              ) : (
                <>
                  <FileIcon>📄</FileIcon>
                  <FileName>파일을 선택해주세요</FileName>
                  <FileHint>포털에서 다운로드한 성적 엑셀 파일 (.xlsx)</FileHint>
                </>
              )}
            </FileInputLabel>
          </FileInput>
          <InfoText>F, NR, W 성적은 자동으로 제외됩니다</InfoText>
        </Card>

        <Button onClick={handleSubmit} disabled={courses.length === 0}>
          졸업요건 확인하기
        </Button>
      </Wrapper>
    </Container>
  );
};

export default InputPage;
