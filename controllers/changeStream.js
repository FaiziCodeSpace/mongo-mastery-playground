import Student from "../models/Student.js";

export const watchStudents = () => {
    
  Student.watch().on("change", (change) => {
    console.log(`Student collection change`);
    console.log(JSON.stringify(change, null, 2));

    switch (change.operationType) {
      case "insert":
        console.log(`Document created:`, change.fullDocument);
        break;

      case "update":
        console.log(`Document updated:`, change.updateDescription);
        break;

      case "delete":
        console.log(`Document deleted id:`, change.documentkey._id);
        break;

      case "replace":
        console.log(`Document replace:`, change.fullDocument);
        break;

      default:
        console.log(`Other Operations`, change);
        break;
    }
  });
};
