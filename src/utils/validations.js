export const validations = (fields, name, value, errors) => {
  let errorsField = Object.assign({}, errors);
  const { pattern, errordesc, required } = fields[name];
  // console.log(
  //   'name, value, pattern, errordesc, required',
  //   name,
  //   value,
  //   pattern,
  //   errordesc,
  //   required
  // );

  if (required && !value.trim()) {
    errorsField = { ...errorsField, [name]: 'Requerido' };
  } else {
    errorsField = { ...errorsField, [name]: null };
  }

  if (errorsField[name] === null && pattern) {
    let regex = new RegExp(pattern);
    // console.log('exec', !regex.exec(value.trim()));
    if (!regex.exec(value.trim())) {
      errorsField = { ...errorsField, [name]: errordesc };
    } else {
      errorsField = { ...errorsField, [name]: null };
    }
  }
  return errorsField;
};
