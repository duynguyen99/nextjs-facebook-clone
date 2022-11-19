import React from 'react';
import Logo from './Logo';
import Spin from './Spin';

const Loading = () => {
    return (
        <div className='w-screen h-screen flex bg-slate-200 '>
            <div className='m-auto items-center flex-col flex'>
            <Logo className='w-fit'/>
            <Spin className='mt-4 w-8 h-8'/>
            </div>
        </div>
    );
};

export default Loading;