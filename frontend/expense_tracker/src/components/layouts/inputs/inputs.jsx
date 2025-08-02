import React, {useState} from 'react'

const inputs = ({value,onChange,placeholder,label,type}) => {
    const [showPassword,setShowPassword] = useState(false);

    const toggleShowPassword = () =>
{
    setShowPassword(!showPassword);
}  
return (
    <div>
      <label className="">{label}</label>
      login
    </div>
  )
}

export default inputs
