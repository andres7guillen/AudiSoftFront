export interface Grade {
  id: string;
  studentId: string;
  name: string;
  studentName: string;
  professorId: string;
  professorName: string;
  value: number;
}

export interface CreateGrade {
  name: string;
  professorId: string;
  studentId: string;
  value: number;
}

export interface UpdateGrade {
  id: string;
  name: string;
  value: number;
}
