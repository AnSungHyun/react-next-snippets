"use client"

import { produce } from 'immer';
import { useState } from 'react';
import CodeBlock from "@/app/_component/CodeBlock";

interface Student {
  id: number;
  name: string;
  grades: {
    subject: string;
    score: number;
  }[];
}

const ImmerArrayExample = () => {
  const initialStudents: Student[] = [
    {
      id: 1,
      name: "김학생",
      grades: [
        { subject: "수학", score: 85 },
        { subject: "영어", score: 90 }
      ]
    },
    {
      id: 2,
      name: "이학생",
      grades: [
        { subject: "수학", score: 75 },
        { subject: "영어", score: 88 }
      ]
    }
  ];

  const [studentsWithImmer, setStudentsWithImmer] = useState<Student[]>(initialStudents);
  const [studentsWithoutImmer, setStudentsWithoutImmer] = useState<Student[]>(initialStudents);

  // Immer를 사용한 배열 업데이트 예시들
  const updateWithImmer = {
    // 1. 특정 학생의 점수 수정
    updateScore: () => {
      setStudentsWithImmer(
        produce(draft => {
          const student = draft.find(s => s.id === 1);
          if (student) {
            const mathGrade = student.grades.find(g => g.subject === "수학");
            if (mathGrade) {
              mathGrade.score = 95;
            }
          }
        })
      );
    },

    // 2. 새로운 과목 추가
    addSubject: () => {
      setStudentsWithImmer(
        produce(draft => {
          draft.forEach(student => {
            student.grades.push({ subject: "과학", score: 80 });
          });
        })
      );
    },

    // 3. 특정 과목 삭제
    removeSubject: () => {
      setStudentsWithImmer(
        produce(draft => {
          draft.forEach(student => {
            student.grades = student.grades.filter(g => g.subject !== "영어");
          });
        })
      );
    }
  };

  // Immer 없이 배열 업데이트 예시들
  const updateWithoutImmer = {
    // 1. 특정 학생의 점수 수정
    updateScore: () => {
      setStudentsWithoutImmer(students =>
        students.map(student =>
          student.id === 1
            ? {
              ...student,
              grades: student.grades.map(grade =>
                grade.subject === "수학"
                  ? { ...grade, score: 95 }
                  : grade
              )
            }
            : student
        )
      );
    },

    // 2. 새로운 과목 추가
    addSubject: () => {
      setStudentsWithoutImmer(students =>
        students.map(student => ({
          ...student,
          grades: [...student.grades, { subject: "과학", score: 80 }]
        }))
      );
    },

    // 3. 특정 과목 삭제
    removeSubject: () => {
      setStudentsWithoutImmer(students =>
        students.map(student => ({
          ...student,
          grades: student.grades.filter(g => g.subject !== "영어")
        }))
      );
    }
  };

  return (
    <div>
      <h2>배열 작업에서의 Immer 사용 비교</h2>

      <div style={{ marginBottom: '20px' }}>
        <h3>1. Immer를 사용한 배열 조작</h3>
        <CodeBlock
          language="typescript"
          value={`
// 1. 특정 학생의 점수 수정
produce(draft => {
  const student = draft.find(s => s.id === 1);
  if (student) {
    const mathGrade = student.grades.find(g => g.subject === "수학");
    if (mathGrade) {
      mathGrade.score = 95;
    }
  }
});

// 2. 새로운 과목 추가
produce(draft => {
  draft.forEach(student => {
    student.grades.push({ subject: "과학", score: 80 });
  });
});

// 3. 특정 과목 삭제
produce(draft => {
  draft.forEach(student => {
    student.grades = student.grades.filter(g => g.subject !== "영어");
  });
});`}
        />
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <button onClick={updateWithImmer.updateScore}>점수 수정</button>
          <button onClick={updateWithImmer.addSubject}>과목 추가</button>
          <button onClick={updateWithImmer.removeSubject}>과목 삭제</button>
        </div>
        <pre>{JSON.stringify(studentsWithImmer, null, 2)}</pre>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>2. Immer 없이 배열 조작</h3>
        <CodeBlock
          language="typescript"
          value={`
// 1. 특정 학생의 점수 수정
setStudentsWithoutImmer(students => 
  students.map(student => 
    student.id === 1
      ? {
          ...student,
          grades: student.grades.map(grade =>
            grade.subject === "수학"
              ? { ...grade, score: 95 }
              : grade
          )
        }
      : student
  )
);

// 2. 새로운 과목 추가
setStudentsWithoutImmer(students =>
  students.map(student => ({
    ...student,
    grades: [...student.grades, { subject: "과학", score: 80 }]
  }))
);

// 3. 특정 과목 삭제
setStudentsWithoutImmer(students =>
  students.map(student => ({
    ...student,
    grades: student.grades.filter(g => g.subject !== "영어")
  }))
);`}
        />
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <button onClick={updateWithoutImmer.updateScore}>점수 수정</button>
          <button onClick={updateWithoutImmer.addSubject}>과목 추가</button>
          <button onClick={updateWithoutImmer.removeSubject}>과목 삭제</button>
        </div>
        <pre>{JSON.stringify(studentsWithoutImmer, null, 2)}</pre>
      </div>

      <div>
        <h3>배열 작업에서의 주요 차이점:</h3>
        <ul>
          <li>Immer 사용 시: push, splice 등의 배열 변형 메서드를 직접 사용 가능</li>
          <li>Immer 없이: map, filter 등의 새로운 배열을 반환하는 메서드와 spread 연산자를 조합해야 함</li>
          <li>중첩된 배열과 객체가 많을수록 Immer의 이점이 더욱 두드러짐</li>
          <li>특히 배열 내부의 특정 객체를 찾아 수정하는 작업에서 코드가 훨씬 간결해짐</li>
        </ul>
      </div>
    </div>
  );
};

export default ImmerArrayExample;