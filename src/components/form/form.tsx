import { useState } from 'react';

interface FormProps {
  title: string;
  handleClick: (email: string, password: string) => void;
}

function Form({ title, handleClick }: FormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      <input
        type='email'
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder='email'
      />
      <input
        type='password'
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder='password'
      />
      <button onClick={() => handleClick(email, password)}>{title}</button>
    </div>
  );
}

export default Form;