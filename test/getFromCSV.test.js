import * as getFromCSV from '../src/scripts/scriptUTils/getFromCSV'

const data = [{
    surveyname: 'LFS Instructor/Course Evaluation 2016W2',
    datestart: '03/24/2017',
    dateclose: '04/09/2017',
    crsnum: 'LFS 200 001',
    crsname: 'Introduction to LFS',
    crsyear: 2,
    xlist: '',
    deptname: 'LFS',
    crs_dir: 'Justin Lee',
    resp_fac: 'Justin Lee',
    eval_id: 12345677,
    eval_uname: 'ABCDEFGHIKL',
    eval_email: 'justin@justin.com',
    tsubmit: '04/09/2017 01:01:47 PM',
    mobile: 0,
    gradyear: 2014,
    gender: 'Female',
    research1: '',
    research2: '',
    research3: '',
    'The instructor made it clear what students were expected to learn.': 4,
    'The instructor communicated the subject matter effectively.': 5,
    'The instructor helped inspire interest in learning the subject matter.': 5,
    'Overall  evaluation of student learning (through exams  essays  presentations  etc.) was fair.': 3,
    'The instructor showed concern for student learning.': 5,
    'Overall  the instructor was an effective teacher.': 5
},
{
    surveyname: 'LFS Instructor/Course Evaluation 2016W2',
    datestart: '03/24/2017',
    dateclose: '04/09/2017',
    crsnum: 'LFS 200 001',
    crsname: 'Introduction to LFS',
    crsyear: 2,
    xlist: '',
    deptname: 'LFS',
    crs_dir: 'Justin Lee',
    resp_fac: 'Justin Lee',
    eval_id: 12345677,
    eval_uname: 'ABCDEFGHIKL',
    eval_email: 'justin@justin.com',
    tsubmit: '04/09/2017 01:01:47 PM',
    mobile: 0,
    gradyear: 2014,
    gender: 'Female',
    research1: '',
    research2: '',
    research3: '',
    'The instructor made it clear what students were expected to learn.': 3,
    'The instructor communicated the subject matter effectively.': 2,
    'The instructor helped inspire interest in learning the subject matter.': 1,
    'Overall  evaluation of student learning (through exams  essays  presentations  etc.) was fair.': 3,
    'The instructor showed concern for student learning.': 4,
    'Overall  the instructor was an effective teacher.': 5
},
{
    surveyname: 'LFS Instructor/Course Evaluation 2016W2',
    datestart: '03/24/2017',
    dateclose: '04/09/2017',
    crsnum: 'LFS 200 001',
    crsname: 'Introduction to LFS',
    crsyear: 2,
    xlist: '',
    deptname: 'LFS',
    crs_dir: 'Justin Lee',
    resp_fac: 'Justin Lee',
    eval_id: 12345677,
    eval_uname: 'ABCDEFGHIKL',
    eval_email: 'justin@justin.com',
    tsubmit: '04/09/2017 01:01:47 PM',
    mobile: 0,
    gradyear: 2014,
    gender: 'Female',
    research1: '',
    research2: '',
    research3: '',
    'The instructor made it clear what students were expected to learn.': 4,
    'The instructor communicated the subject matter effectively.': 5,
    'The instructor helped inspire interest in learning the subject matter.': 4,
    'Overall  evaluation of student learning (through exams  essays  presentations  etc.) was fair.': 3,
    'The instructor showed concern for student learning.': 2,
    'Overall  the instructor was an effective teacher.': 1
},
{
    surveyname: 'LFS Instructor/Course Evaluation 2016W2',
    datestart: '03/24/2017',
    dateclose: '04/09/2017',
    crsnum: 'LFS 200 001',
    crsname: 'Introduction to LFS',
    crsyear: 2,
    xlist: '',
    deptname: 'LFS',
    crs_dir: 'Justin Lee',
    resp_fac: 'Justin Lee',
    eval_id: 12345677,
    eval_uname: 'ABCDEFGHIKL',
    eval_email: 'justin@justin.com',
    tsubmit: '04/09/2017 01:01:47 PM',
    mobile: 0,
    gradyear: 2014,
    gender: 'Female',
    research1: '',
    research2: '',
    research3: '',
    'The instructor made it clear what students were expected to learn.': 1,
    'The instructor communicated the subject matter effectively.': 4,
    'The instructor helped inspire interest in learning the subject matter.': 1,
    'Overall  evaluation of student learning (through exams  essays  presentations  etc.) was fair.': 2,
    'The instructor showed concern for student learning.': 3,
    'Overall  the instructor was an effective teacher.': 4
},
{
    surveyname: 'LFS Instructor/Course Evaluation 2016W2',
    datestart: '03/24/2017',
    dateclose: '04/09/2017',
    crsnum: 'LFS 200 001',
    crsname: 'Introduction to LFS',
    crsyear: 2,
    xlist: '',
    deptname: 'LFS',
    crs_dir: 'Justin Lee',
    resp_fac: 'Justin Lee',
    eval_id: 12345677,
    eval_uname: 'ABCDEFGHIKL',
    eval_email: 'justin@justin.com',
    tsubmit: '04/09/2017 01:01:47 PM',
    mobile: 0,
    gradyear: 2014,
    gender: 'Female',
    research1: '',
    research2: '',
    research3: '',
    'The instructor made it clear what students were expected to learn.': 4,
    'The instructor communicated the subject matter effectively.': 1,
    'The instructor helped inspire interest in learning the subject matter.': 5,
    'Overall  evaluation of student learning (through exams  essays  presentations  etc.) was fair.': 4,
    'The instructor showed concern for student learning.': 2,
    'Overall  the instructor was an effective teacher.': 1
},
{
    surveyname: 'LFS Instructor/Course Evaluation 2016W2',
    datestart: '03/24/2017',
    dateclose: '04/09/2017',
    crsnum: 'LFS 200 001',
    crsname: 'Introduction to LFS',
    crsyear: 2,
    xlist: '',
    deptname: 'LFS',
    crs_dir: 'Justin Lee',
    resp_fac: 'Justin Lee',
    eval_id: 12345677,
    eval_uname: 'ABCDEFGHIKL',
    eval_email: 'justin@justin.com',
    tsubmit: '04/09/2017 01:01:47 PM',
    mobile: 0,
    gradyear: 2014,
    gender: 'Female',
    research1: '',
    research2: '',
    research3: '',
    'The instructor made it clear what students were expected to learn.': 2,
    'The instructor communicated the subject matter effectively.': 4,
    'The instructor helped inspire interest in learning the subject matter.': 4,
    'Overall  evaluation of student learning (through exams  essays  presentations  etc.) was fair.': 3,
    'The instructor showed concern for student learning.': 3,
    'Overall  the instructor was an effective teacher.': 4
},
{
    surveyname: 'LFS Instructor/Course Evaluation 2016W2',
    datestart: '03/24/2017',
    dateclose: '04/09/2017',
    crsnum: 'LFS 200 001',
    crsname: 'Introduction to LFS',
    crsyear: 2,
    xlist: '',
    deptname: 'LFS',
    crs_dir: 'Justin Lee',
    resp_fac: 'Justin Lee',
    eval_id: 12345677,
    eval_uname: 'ABCDEFGHIKL',
    eval_email: 'justin@justin.com',
    tsubmit: '04/09/2017 01:01:47 PM',
    mobile: 0,
    gradyear: 2014,
    gender: 'Female',
    research1: '',
    research2: '',
    research3: '',
    'The instructor made it clear what students were expected to learn.': 4,
    'The instructor communicated the subject matter effectively.': 3,
    'The instructor helped inspire interest in learning the subject matter.': 4,
    'Overall  evaluation of student learning (through exams  essays  presentations  etc.) was fair.': 4,
    'The instructor showed concern for student learning.': 5,
    'Overall  the instructor was an effective teacher.': 5
}]