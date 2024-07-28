const router = require("express").Router();
const auth  = require("../controllers/admin/auth.controller.js");
const uni = require("../controllers/admin/uni.controller.js")
const branch = require("../controllers/admin/branch.controller.js")
const course = require("../controllers/admin/course.controller.js")
const year = require("../controllers/admin/year.controller.js")
const admin = require("../controllers/admin/admin.controller.js")
const sem = require("../controllers/admin/sem.controller.js")
const subs = require("../controllers/admin/sub.controller.js");
const notes = require("../controllers/admin/note.controller.js");
const {uploadPdf} = require("../middlewares/upload.js")
const authVerify = require("../middlewares/verifyjwt.js")


/* Admin Login Route */
router.get("/login",auth.signInGet.controller)
router.post("/login",auth.signInPost.validator,auth.signInPost.controller)
router.post("/logout",auth.signInPost.validator,auth.signInPost.controller)
router.get("/dashboard",authVerify,admin.adminGet.controller)

/* University Routes */
router.get("/uni",authVerify,uni.createUniGet.controller);
router.post("/uni",authVerify,uploadPdf.single("pdf"),uni.createUniPost.validator,uni.createUniPost.controller);
router.delete("/uni/:id",authVerify,uni.deleteUni.controller);

/* Branch Routes */
router.get("/branch/:id",authVerify,branch.createBranchGet.controller);
router.post("/branch/:id",authVerify,branch.createBranchPost.validator,branch.createBranchPost.controller);
router.delete("/branch/:id",authVerify,branch.deleteBranch.controller);

/* Course Routes */
router.get("/course/:id",authVerify,course.CourseGet.controller);
router.post("/course/:id",authVerify,course.createCourse.validator,course.createCourse.controller);
router.delete("/course/:id",authVerify,course.deleteCourse.controller)

/* Year Routes */
router.get("/year/:course_name/:id",authVerify,year.createYearGet.controller);
router.post("/year/:course_name/:id",authVerify,year.createYearPost.validator,year.createYearPost.controller);
router.delete("/year/:id",authVerify,year.deleteYear.controller);

/* Semester Routes */
router.get("/sem/:year_name/:id",authVerify,sem.createSemGet.controller);
router.post("/sem/:year_name/:id",authVerify,sem.createSemPost.controller);

/* Subject Routes */
router.get("/sub/:sem_name/:id",authVerify,subs.createSubjectGet.controller);
router.post("/sub/:sem_name/:id",authVerify,subs.createSubjectPost.validator,subs.createSubjectPost.controller);
router.delete("/sub/:id",authVerify,subs.deleteSubject.controller);

/* Note Routes */
router.get("/note/:sub_name/:id",authVerify,notes.noteGet.controller);
router.post("/note/:sub_name/:id",authVerify,uploadPdf.single("pdf"),notes.notePost.controller)
router.post("/note/link/:sub_name/:id",authVerify,notes.notePost.controller);
router.delete("/note/:id",authVerify,notes.deleteNote.controller);

/* Description Routes */
router.get("/uni/desc/:id",authVerify,uni.getDesc.controller)
router.get("/branch/desc/:id",authVerify,branch.getDesc.controller)
router.get("/course/desc/:id",authVerify,course.getDesc.controller)
router.get("/subject/desc/:id",authVerify,subs.getDesc.controller)
router.get("/notes/desc/:id",authVerify,notes.getDesc.controller)

/* Tags Routes */
router.get("/uni/tags/:id",authVerify,uni.getTag.controller)
router.get("/branch/tags/:id",authVerify,branch.getTag.controller)
router.get("/course/tags/:id",authVerify,course.getTag.controller)
router.get("/subject/tags/:id",authVerify,subs.getTag.controller)
router.get("/notes/tags/:id",authVerify,notes.getTag.controller)



module.exports = router;
