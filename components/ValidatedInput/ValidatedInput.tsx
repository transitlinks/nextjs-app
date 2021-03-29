import { ChangeEvent } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import styles from './ValidatedInput.module.css';
import { ValidationResult } from './validators';


export interface InputState {
  value: string;
  pass?: boolean;
}

interface ValidatedInputProps {
  id: string;
  name?: string;
  value: string;
  validate: (value: string) => ValidationResult;
  masked?: boolean;
  onChange: (input: InputState) => void;
}

const ValidatedInput = ({ id, name, value, validate, masked, onChange }: ValidatedInputProps) => {

  const textFieldCss = {
    width: '100%'
  };


  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const validation: ValidationResult = validate(event.target.value);
    onChange({ value: event.target.value, pass: validation.pass });
  };

  const toggleMasking = () => {

    const pwdContainer = document.getElementById(id);

    if (pwdContainer) {
      const pwdField = pwdContainer.getElementsByTagName('input')[0];
      const imageElem = pwdContainer.getElementsByTagName('i')[0];
      if (pwdField.type === 'password') {
        pwdField.type = 'text';
        imageElem.innerHTML = '&#xE8F4;';
      } else {
        pwdField.type = 'password';
        imageElem.innerHTML = '&#xE8F5;';
      }
    }

  };


  const validation: ValidationResult = validate(value);

  const useStyles = makeStyles(theme => ({
    textField: {
      '& label.Mui-focused': {
        color: validation.color,
      }
    },
  }));

  const classes = useStyles();

  return (
    <div className={styles.root} id={id}>

      <TextField id={`${id}-input`}
                 name={name}
                 className={classes.textField}
                 style={textFieldCss}
                 label={validation.text}
                 type={masked ? 'password' : 'text'}
                 value={value}
                 onChange={handleChange} />

      {
        masked &&
          <div className={styles.maskToggle} onClick={() => toggleMasking()}>
            <i className="material-icons">&#xE8F5;</i>
          </div>
      }

    </div>
  );

};

export default ValidatedInput;


