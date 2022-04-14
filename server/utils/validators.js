module.exports.validatesRegisterImate = (
  name,
  gender,
  DOB,
  nextOfKin,
  nextOfKinPhone,
  address,
  crime,
  releaseDate,
  stateOfOrigin,
  LGA,
  courtOfConviction
  // duration
) => {
  const errors = {};
  if (name.trim() === "") {
    errors.name = "Name must not be empty";
  }
  if (gender.trim() === "") {
    errors.gender = "Gender must not be empty";
  }
  if (stateOfOrigin.trim() === "") {
    errors.stateOfOrigin = "Inmates must have a State of Origin";
  }
  if (courtOfConviction.trim() === "") {
    errors.courtOfConviction = "Inmates must have a court Of Conviction";
  }
  if (LGA.trim() === "") {
    errors.LGA = "Inmates must have a LGA of Origin";
  }
  if (nextOfKin.trim() === "") {
    errors.nextOfKin = "Inmates must have a next of kin";
  }
  if (nextOfKinPhone.trim() === "") {
    errors.nextOfKinPhone = "Next of kin must have a phone number";
  }
  if (address === "") {
    errors.address = "Address must not be empty";
  }
  if (releaseDate === "") {
    errors.releaseDate = "releaseDate must not be empty";
  }
  if (crime === "") {
    errors.crime = "Crime must not be empty";
  }
  if (DOB === "") {
    errors.DOB = "Date of Birth cannot not be empty";
  } else {
    if (new Date().getFullYear() - DOB.slice(0, 4) < 18) {
      errors.DOB = "Inmates must be atleast 18 years old to register";
    }
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validatesRegisterInput = (
  name,
  inmateName,
  email,
  password,
  confirmPassword
) => {
  const errors = {};
  if (name.trim() === "") {
    errors.name = "name must not be empty";
  }
  if (inmateName.trim() === "") {
    errors.inmateName = "innmate name must not be empty";
  }
  if (email.trim() === "") {
    errors.email = "Email must not be empty";
  } else {
    const regEx =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = "Email must be a valid address";
    }
  }
  if (password === "") {
    errors.password = "Password must not be empty";
  }
  if (password !== confirmPassword) {
    errors.confirmPassword = "Password must Match";
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validatesRegisterGuest = (name, phone, inmateName, purpose) => {
  const errors = {};
  if (name.trim() === "") {
    errors.name = "Name must not be empty";
  }
  if (phone === "") {
    errors.phone = "Phone number must not be empty";
  }
  if (purpose.trim() === "") {
    errors.purpose = "All Visitors must have a purpose of visit";
  }
  if (inmateName.trim() === "") {
    errors.inmateName = "InmateName must not be empty";
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateLoginInput = (name, password) => {
  const errors = {};
  if (name.trim() === "") {
    errors.name = "Username must not be empty";
  }
  if (password === "") {
    errors.password = "Password must not be empty";
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
module.exports.validateAdminLoginInput = (name, password) => {
  const errors = {};
  if (name.trim() === "") {
    errors.name = "Name must not be empty";
  }
  if (password === "") {
    errors.password = "Password must not be empty";
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
