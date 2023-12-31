export const apiUrls = {
  BASEURL: 'http://localhost:8080',
  AUTH: '/api/v1/auth',
  SIGN_IN: '/signin',
  LOG_OUT: '/logout',
  VERIFY_EMAIL: '/verify-email',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password'
};

export const regularExpressions = {
  EMAIL_REGEX: /^[a-zA-Z0-9](.?)+@[a-zA-Z0-9]+.[A-Za-z]+$/,
  PHONE_REGEX:
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
  PASSWORD_REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/,
  DECIMAL_REGEX: '^[1-9]{1,3}(,[0-9]{3})*(.[0-9]{1,2})?$'
};

export const help = {
  PASSWORD_HELP:
    'Must Contain 8 or more characters, with a mix of uppercase, lowercase letters, numbers &symbols(!, @, #, $, %)',
  PASSWORD_MISMATCH: 'These passwords didn’t match',
  INVALID_CONTACT_NUMBER: 'Invalid contact number!',
  INVALID_EMAIL_ADDRESS: 'Invalid email address!',
  TOO_SHORT: 'Value is too short',
  VALUE_REQUIRED: 'cannot be blank',
  ENTER_EMAIL: 'Please enter the email address',
  CHECK_YOUR_EMAIL: 'Summary Sent to an email. Please check your email!',
  MCQ_ANSWER_NOT_CHECKED: 'One answer should be selected!',
  CHECKBOX_ANSWER_NOT_CHECKED: 'Select Atleast two correct answer!',
  QUESTION_TITLE_REQUIRED: 'Question title cannot be blank!',
  ANSWER_TITLE_REQUIRED: 'Answer title cannot be blank!',
  FOUR_ANSWERS_REQUIRED: 'Need at least 4 answers',
  FILE_FORMAT_UNSUPPORTED: 'Unsupported  Format!',
  FILE_SIZE_BIG: 'File Size is too large!',
  SUBJECT_SELECTION_REQUIRED: 'Subject must be selected!',
  ACTIVITY_SELECTION_REQUIRED: 'Activity must be selected!',
  EXAM_TYPE_SELECTION_REQUIRED: 'Exam type must be selected!'
};

export const colorCodes = {
  WHITE: '#FFFFFF',
  CRIMSION: '#ff3c60',
  TUFTS_BLUE: '#43A4EB',
  GAINSBORO: '#dddddd',
  ORANGE: '#ff5b00',
  BLACK: '#000000',
  ERROR: '#9E0000',
  MIDNIGHT: '#2c3e50'
};

export const userRoles = {
  ADMIN: 'ADMIN',
  CONSULTANT: 'CONSULTANT',
  JOB_SEEKER: 'JOB_SEEKER'
};
