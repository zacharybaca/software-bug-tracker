import './create-avatar.css';
import { createAvatar } from '@dicebear/core';
import { openPeeps } from '@dicebear/collection';
import { useMemo } from 'react';


function CreateAvatar() {
  const avatar = useMemo(() => {
    return createAvatar(lorelei, {
      size: 128,
      // ... other options
    }).toDataUri();
  }, []);

  return <img src={avatar} alt="Avatar" />;
}

export default CreateAvatar;
