export const validateFields = (form) => {
  const errors = {};

  if (!form.nombre || form.nombre.length < 3) {
    errors.nombre = 'Nombre mínimo 3 caracteres';
  }

  if (!form.correo || !/\S+@\S+\.\S+/.test(form.correo)) {
    errors.correo = 'Correo inválido';
  }

  if (!form.contraseña || form.contraseña.length < 6) {
    errors.contraseña = 'Contraseña mínimo 6 caracteres';
  }

  if (form.confirmar !== form.contraseña) {
    errors.confirmar = 'Las contraseñas no coinciden';
  }

  if (!form.telefono || !/^\d{9}$/.test(form.telefono)) {
    errors.telefono = 'Teléfono debe tener 9 dígitos';
  }

  return errors;
};

export const getPasswordStrength = (password) => {
  if (password.length < 6) return 'Débil';
  if (/[A-Z]/.test(password) && /\d/.test(password) && /[^A-Za-z0-9]/.test(password)) return 'Fuerte';
  return 'Media';
};