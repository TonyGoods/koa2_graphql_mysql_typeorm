import { Student } from "../entity/student";
import { getManager } from "typeorm";
import { Context } from "koa";

export class StundetController {
  static async fetchAllStudents(ctx: Context) {
    const studentsRepository = getManager().getRepository(Student);
    const students = await studentsRepository.find();
    console.log(students)
    ctx.response.body = students;
    ctx.status = 200
  }
}
