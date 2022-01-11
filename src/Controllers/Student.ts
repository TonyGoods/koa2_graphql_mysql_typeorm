import { Student } from "../entity/student";
import { getManager } from "typeorm";

export class StudentController {
  static async fetchAllStudents() {
    const studentRepository = getManager().getRepository(Student);
    const students = await studentRepository.find();
    return students;
  }

  static async fetchStudentById(id: number) {
    const studentRepository = getManager().getRepository(Student);
    const student = await studentRepository.findOne({
      id,
    });
    return student;
  }

  static async addStudent({ name, age, gender }: Omit<Student, "id">) {
    const studentRepository = getManager().getRepository(Student);
    const student = studentRepository.create({
      name,
      age,
      gender,
    });

    await studentRepository.save(student);
    return student;
  }

  static async deleteStudentById(id: number) {
    const studentRepository = getManager().getRepository(Student);
    const student = await StudentController.fetchStudentById(id);
    if (student) {
      await studentRepository.delete(student);
    }
    return student;
  }

  static async updateStudentById(id: number, name: string) {
    const studentRepository = getManager().getRepository(Student);
    await studentRepository.update({ id }, { name });
    const student = await StudentController.fetchStudentById(id);
    return student;
  }
}
