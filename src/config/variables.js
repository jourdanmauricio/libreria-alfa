export const initialCheckoutForm = {
  name: '',
  email: '',
  phone: '',
  dni: '',
  delivery: false,
  state: '',
  city: '',
  address: '',
  observation: '',
};

export const initialCheckoutErrors = {
  name: null,
  email: null,
  phone: null,
  dni: null,
  state: null,
  city: null,
  address: null,
  observation: null,
};

export const checkoutFields = {
  name: {
    validate: true,
    required: true,
    pattern: '^[A-Za-z1-9ÑñÁáÉéÍíÓóÚú ]{0,255}$',
    errordesc: 'Solo letras y números',
  },
  dni: {
    validate: true,
    required: true,
    pattern: '[0-9]$',
    errordesc: 'Solo números',
  },
  email: {
    validate: true,
    required: true,
    pattern:
      "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$",
    errordesc: 'Email inválido',
  },
  phone: {
    validate: true,
    required: true,
    pattern: '^[0-9 ()]{7,15}$',
    errordesc: 'Teléfono inválido',
  },
  comment: {
    validate: false,
  },
  state: {
    validate: true,
    required: true,
    pattern: '^[A-Za-z1-9ÑñÁáÉéÍíÓóÚú ]{0,255}$',
    errordesc: 'Solo letras y números',
  },
  city: {
    validate: true,
    required: true,
    pattern: '^[A-Za-z1-9ÑñÁáÉéÍíÓóÚú ]{0,255}$',
    errordesc: 'Solo letras y números',
  },
  address: {
    validate: true,
    required: true,
    pattern: '^[A-Za-z1-9ÑñÁáÉéÍíÓóÚú ]{0,255}$',
    errordesc: 'Solo letras y números',
  },
};
