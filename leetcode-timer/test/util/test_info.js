const get_current_time_in_utc_seconds = () => {
  return Math.floor(new Date().getTime() / 1000)
}

let person1 = {
  'email': 'nachi@tr.com',
  'password': 'thisIsMyPassword',
  'name': 'Nachiket Dhamankar',
  'joinedAt': get_current_time_in_utc_seconds()
}
let person1_wrong_password = {
  'email': 'nachi@tr.com',
  'password': 'thisIsNotMyPassword',
  'name': 'Nachiket Dhamankar',
  'joinedAt': get_current_time_in_utc_seconds()
}

let person_without_email = {
  'password': 'thisIsAPassword',
  'name': 'John Doe',
  'joinedAt': get_current_time_in_utc_seconds()
}
let person_without_password = {
  'email': 'nachi@tr.com',
  'name': 'Jane Doe',
  'joinedAt': get_current_time_in_utc_seconds()
}
let person_with_long_name = {
  'email': 'nachi@tr.com',
  'password': 'thisIsAPassword',
  'name': 'Nachiket Dhamankar Is My Name and I Like it a lot. If you know my name, then theres no problem',
  'joinedAt': get_current_time_in_utc_seconds()
}
let person_with_small_password = {
  'email': 'nachi@tr.com',
  'password': 'th',
  'name': 'Nachiket Dhamankar',
  'joinedAt': get_current_time_in_utc_seconds()
}
let person_with_invalid_email = {
  'email': 'nachi@tr',
  'password': 'thisIsMyPassword',
  'name': 'Nachiket Dhamankar',
  'joinedAt': get_current_time_in_utc_seconds()
}
module.exports = {
  person1,
  person1_wrong_password,
  person_without_email,
  person_without_password,
  person_with_long_name,
  person_with_small_password,
  person_with_invalid_email
}
