import { useState } from 'react';

export default function useForm(initial = {}) {
  const [inputs, updateInputs] = useState(initial);

  function handleChange(e) {
    updateInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  }
  function resetForm() {
    updateInputs(initial);
  }

  const toggleMember = () => {
    updateInputs(prevMember => {
      const isMember = !prevMember;
      console.log(isMember);
      return isMember;
    });
  };

  return [inputs, handleChange, resetForm, toggleMember];
}
