import FormValidator  from "./formValidator";


function filterAlpha(value) {
    return value.replace(/[^a-zA-ZÑñ _]/g, "");
  }
  
  function filterNumber(value) {
    return value.replace(/[^0-9]/g, "");
  }
  
  const onBlurEmail = (email) => {
    const validatorEmail = new FormValidator([
      {
        field: "email",
        method: 'isEmpty',
        validWhen: false,
        message: "Ingrese email",
      },
      {
        field: "email",
        method: "isEmail",
        validWhen: true,
        message: "Email invalido",
      },
    ]);
    let validation = validatorEmail.validate({ email });
    return validation.email.message;
}

export{
    filterAlpha,
    filterNumber,
    onBlurEmail
}