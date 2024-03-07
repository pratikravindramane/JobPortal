export const validate = (values) => {
  const errors = {};
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  if (!values?.name) {
    errors.name = "name is required!";
  }
  if (!values?.email) {
    errors.email = "Email is required!";
  } else if (!regex.test(values?.email)) {
    errors.email = "This is not a valid email format!";
  }
  if (!values?.password) {
    errors.password = "Password is required";
  } else if (values?.password.length < 4) {
    errors.password = "Password must be more than 4 characters";
  } else if (values?.password.length > 10) {
    errors.password = "Password cannot exceed more than 10 characters";
  }
  if (!values?.phone) {
    errors.phone = "phone is required";
  } else if (values?.phone.length < 4) {
    errors.phone = "phone must be more than 4 characters";
  } else if (values?.phone.length > 10) {
    errors.phone = "phone cannot exceed more than 10 characters";
  }
  return errors;
};
export const loginValidate = (values) => {
  const errors = {};
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  if (!values?.email) {
    errors.email = "Email is required!";
  } else if (!regex.test(values?.email)) {
    errors.email = "This is not a valid email format!";
  }
  if (!values?.password) {
    errors.password = "Password is required";
  } else if (values?.password.length < 4) {
    errors.password = "Password must be more than 4 characters";
  } else if (values?.password.length > 10) {
    errors.password = "Password cannot exceed more than 10 characters";
  }
  return errors;
};

export const CatValidate = (values) => {
  const errors = {};
  if (!values?.categorie) {
    errors.categorie = "Categorie is required!";
  }

  return errors;
};

export const TypeValidate = (values) => {
  const errors = {};
  if (!values?.type) {
    errors.type = "Type is required!";
  }

  return errors;
};
export const passValidate = (values) => {
  const errors = {};
  if (!values?.password) {
    errors.password = "Password is required";
  } else if (values?.password.length < 4) {
    errors.password = "Password must be more than 4 characters";
  } else if (values?.password.length > 10) {
    errors.password = "Password cannot exceed more than 10 characters";
  }

  return errors;
};
export const ForgotValidate = (values) => {
  const errors = {};
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  if (!values?.email) {
    errors.email = "Email is required!";
  } else if (!regex.test(values?.email)) {
    errors.email = "This is not a valid email format!";
  }
  return errors;
};

export const jobValidation = (values) => {
  const errors = {};

  if (!values?.title) {
    errors.title = "title is required!";
  }
  if (!values?.companyDetails) {
    errors.companyDetails = "Company Details is required!";
  }
  // if (!values?.cat) {
  //   errors.cat = "Categorie Details is required!";
  // }
  // if (!values?.type) {
  //   errors.type = "Type is required!";
  // }
  if (!values?.skills) {
    errors.skills = "Skills are required!";
  }
  if (!values?.desc) {
    errors.desc = "Description are required!";
  }
  if (!values?.tags) {
    errors.tags = "Tags are required!";
  }
  if (!values?.salary) {
    errors.salary = "Salary are required!";
  }
  if (!values?.experience) {
    errors.experience = "experience is required";
  } else if (values?.experience.length < 0) {
    errors.experience = "you must be experience to apply";
  } else if (values?.experience.length > 10) {
    errors.experience = "you are over qualified for this Job";
  }
  return errors;
};
