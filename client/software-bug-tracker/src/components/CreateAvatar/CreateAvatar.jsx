import './create-avatar.css';
import { createAvatar } from '@dicebear/core';
import { icons } from '@dicebear/collection';
import { useMemo } from 'react';


function CreateAvatar({ size }) {
    const avatar = useMemo(() => {
        const randomNumber = Math.floor(Math.random() * (100 - 1 + 1) + 1);
        return createAvatar(icons, {
            size: size,
            seed: randomNumber,
            radius: 50,
            backgroundColor: ['b6e3f4', 'c0aede', 'd1d4f9', 'ffd5dc', 'ffdfbf'],
            backgroundType: ['gradientLinear'],
            icon: ['bug', 'display', 'envelope', 'globe', 'globe2', 'inbox', 'inboxes', 'keyboard', 'laptop', 'mouse', 'mouse2', 'printer', 'router', 'search', 'webcam']
        }).toDataUri();
    }, [size]);

    return <img src={avatar} alt="Avatar" />;
}

export default CreateAvatar;
