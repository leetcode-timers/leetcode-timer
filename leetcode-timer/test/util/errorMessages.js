let malformed_email_body = {
  'message': 'Event object failed validation',
  'details': [
    {
      'keyword': 'pattern',
      'dataPath': '.body.email',
      'message': 'should match pattern "(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[-\b\u000b\f-!#-[]-]|\\\\[-\t\u000b\f-])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[-\b\u000b\f-!-ZS-]|\\\\[-\t\u000b\f-])+)\\])"'
    }
  ]
}
let malformed_password_body = {
  'message': 'Event object failed validation',
  'details': [
    {
      'dataPath': '.body.password',
      'keyword': 'minLength',
      'message': 'should not be shorter than 6 characters',
    }
  ]
}
let malformed_name_body = {
  'message': 'Event object failed validation',
  'details': [
    {
      'dataPath': '.body.name',
      'keyword': 'maxLength',
      'message': 'should not be longer than 48 characters',
    }
  ]
}
let missing_email_body = {
  'message': 'Event object failed validation',

  'details': [
    {
      'dataPath': '.body',
      'keyword': 'required',
      'message': 'should have required property email',
    }
  ]
}
let missing_password_body = {
  'message': 'Event object failed validation',

  'details': [
    {
      'dataPath': '.body',
      'keyword': 'required',
      'message': 'should have required property password',
    }
  ]
}
let forbidden_body = {
  'message': 'User is not authorized to access this resource with an explicit deny'
}

module.exports = {
  forbidden_body,
  malformed_email_body,
  malformed_password_body,
  malformed_name_body,
  missing_email_body,
  missing_password_body
}
