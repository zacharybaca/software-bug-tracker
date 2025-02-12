import './create-avatar.css';
import { createAvatar } from '@dicebear/core';
import { initials } from '@dicebear/collection';
import { useMemo } from 'react';


function CreateAvatar({ size, initial }) {
  const avatar = useMemo(() => {
    return createAvatar(initials, {
      size: size,
      seed: initial,
      radius: 50,
      backgroundColor: ['1e88e5', '5e35b1', '039be5', '43a047', '3949ab', 'fb8c00', 'ffb300'],
      backgroundType: gradientLinear
    }).toDataUri();
  }, []);

  return <img src={avatar} alt="Avatar" />;
}

export default CreateAvatar;
