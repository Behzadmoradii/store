const namePattern = /[a-z-0-9_]{4,}/;
const emailPattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
const passPattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

export const handleLoginForm = (email, pass) => {
  if (emailPattern.test(email) && passPattern.test(pass)) {
    return true;
  } else {
    return false;
  }
};

export const handleSignUpForm = (
  name,
  email,
  pass,
  configPass,
  setErrors,
  setShowModal
) => {
  if (pass !== configPass) {
    setErrors("Not match the password with config password.");
    setShowModal(true);
    return false;
  }

  if (
    namePattern.test(name) &&
    emailPattern.test(email) &&
    passPattern.test(pass)
  ) {
    return true;
  } else {
    return false;
  }
};

export const handleEditUser = (
  name,
  pass,
  configPass,
  setErrors,
  setShowModal,
  setConfigPass
) => {
  if (pass !== configPass) {
    setErrors("Not match the password with config password.");
    setConfigPass("");
    setShowModal(true);
    return false;
  }
  if (namePattern.test(name) && passPattern.test(pass)) {
    return true;
  } else {
    return false;
  }
};

export const resetInput = (
  setName,
  setEmail,
  setPass,
  setConfigPass,
  setLastPass
) => {
  setName("");
  setEmail("");
  setPass && setPass("");
  setConfigPass && setConfigPass("");
  setLastPass && setLastPass("");
};
