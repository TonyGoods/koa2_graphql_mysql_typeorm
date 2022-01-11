import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
} from "graphql";

import { StudentController } from "../Controllers/Student";

const StudentSchema = new GraphQLObjectType({
  name: "student",
  fields: {
    id: {
      type: GraphQLInt,
    },
    name: {
      type: GraphQLString,
    },
    age: {
      type: GraphQLInt,
    },
    gender: {
      type: GraphQLString,
    },
  },
});

const RootSchema = new GraphQLObjectType({
  name: "root",
  fields: {
    // 获取导航列表
    studentList: {
      type: new GraphQLList(StudentSchema),
      // 如果没有参数，可以不写args
      async resolve(parent, args) {
        const studentList = await StudentController.fetchAllStudents();
        return studentList;
      },
    },
    // 获了一个导航类型下的数据
    // oneNavList: {
    //   type: NavSchema,
    //   args: {
    //     _id: {
    //       type: GraphQLString,
    //     },
    //     status: {
    //       type: GraphQLString,
    //     },
    //   },
    //   async resolve(parent, args) {
    //     var oneNavList = await DB.find("nav", {
    //       _id: DB.getObjectId(args._id),
    //       status: args.status,
    //     });
    //     return oneNavList[0];
    //   },
    // },

    student: {
      type: StudentSchema,
      args: {
        id: {
          type: GraphQLInt,
        },
      },
      async resolve(parent, args) {
        console.log(args);
        const student = await StudentController.fetchStudentById(args.id);
        return student;
      },
    },
  },
});

const MutationSchema = new GraphQLObjectType({
  name: "mutation",
  fields: {
    addStudent: {
      type: StudentSchema,
      args: {
        name: {
          type: GraphQLString,
        },
        gender: {
          type: GraphQLString,
        },
        age: {
          type: GraphQLInt,
        },
      },
      async resolve(parent, args) {
        const student = await StudentController.addStudent({
          name: args.name,
          age: args.age,
          gender: args.gender,
        });
        return student;
      },
    },
    deleteStudent: {
      type: StudentSchema,
      args: {
        id: {
          type: GraphQLInt,
        },
      },
      async resolve(parent, args) {
        const deleteStudent = await StudentController.deleteStudentById(
          args.id
        );
        return deleteStudent;
      },
    },
    updateStudent: {
      type: StudentSchema,
      args: {
        id: {
          type: GraphQLInt,
        },
        name: {
          type: GraphQLString,
        },
      },
      async resolve(parent, args) {
        const student = await StudentController.updateStudentById(
          args.id,
          args.name
        );
        return student;
      },
    },
  },
});

export default new GraphQLSchema({
  query: RootSchema,
  mutation: MutationSchema,
});
