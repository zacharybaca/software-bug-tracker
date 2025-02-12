import './create-avatar.css';
import { createAvatar } from '@dicebear/core';
import { funEmoji } from '@dicebear/collection';
import { useMemo } from 'react';


function CreateAvatar({ size }) {
    const randomNumber = Math.floor(Math.random() * (100 - 1 + 1) + 1);
    const avatar = useMemo(() => {
        return createAvatar(funEmoji, {
        size: size,
        seed: randomNumber,
        radius: 50,
        backgroundColor: ['b6e3f4', 'c0aede', 'd1d4f9', 'ffd5dc', 'ffdfbf'],
        backgroundType: ['gradientLinear'],
        eyes: ['closed', 'cute', 'glasses', 'pissed', 'plain', 'shades', 'stars', 'wink'],
        mouth: ['cute', 'faceMask', 'lilSmile', 'pissed', 'plain', 'smileLol', 'smileTeeth', 'tongueOut', 'wideSmile']
        }).toDataUri();
    }, []);

    return <img src={avatar} alt="Avatar" />;
}

export default CreateAvatar;
