export interface ValidationResult {
  text: string;
  color?: string;
  pass?: boolean;
}

export function isValidUsername(username: string | null | undefined): ValidationResult {

  if (!username) {
    return {
      text: 'Username'
    };
  }

  if ((username.trim()).length < 4) {
    return {
      text: 'Username too short',
      color: 'orange'
    };
  }

  return {
    text: 'Username',
    color: 'green',
    pass: true
  };


}

export const isValidPassword = (password: string | null | undefined): ValidationResult => {

  if (!password) {
    return {
      text: 'Password',
    }
  }

  if (password.length < 4) {
    return {
      text: 'At least 4 characters',
      color: 'orange'
    };
  }

  return {
    text: 'Password',
    color: 'green',
    pass: true
  };

};

export const isValidEmail = (email: string | null | undefined): ValidationResult => {

  if (!email) {
    return {
      text: 'E-mail'
    }
  }

  const at = email.indexOf('@');

  if (at === -1) {
    return {
      text: '@ symbol is missing',
      color: 'orange'
    };
  }

  if (at === 0) {
    return {
      text: 'E-mail prefix is missing',
      color: 'orange'
    };
  }

  const domain = email.substring(at + 1);

  if (domain.indexOf('@') !== -1) {
    return {
      text: 'Too many @ symbols',
      color: 'orange'
    };
  }

  if (domain === '') {
    return {
      text: 'Domain name is missing',
      color: 'orange'
    };
  }

  const dot = domain.indexOf('.');

  if (dot === -1) {
    return {
      text: 'Domain postfix is missing',
      color: 'orange'
    };
  }

  if (domain.substring(dot + 1).length < 2) {
    return {
      text: 'Domain postfix too short',
      color: 'orange'
    };
  }

  return {
    text: 'E-mail',
    color: 'green',
    pass: true
  };

};
