import React from 'react';
import { toast } from 'react-hot-toast';
import { Icon } from '@iconify/react';

export default function Toast({ t, message, type }) {
    const variants = {
        success: {
            icon: 'gg:check-o',
            color: 'bg-success-toast-icon',
            textColor: 'text-success-toast-icon',
            background: 'bg-success-toast-icon-background',
            front: 'bg-success-toast-icon-front',
        },
        error: {
            icon: 'codicon:error',
            color: 'bg-error-toast-icon',
            textColor: 'text-error-toast-icon',
            background: 'bg-error-toast-icon-background',
            front: 'bg-error-toast-icon-front',
        },
        warning: {
            icon: 'jam:alert',
            color: 'bg-warning-toast-icon',
            textColor: 'text-warning-toast-icon',
            background: 'bg-warning-toast-icon-background',
            front: 'bg-warning-toast-icon-front',
        },
    };

    const { icon, color, textColor, background, front } = variants[type] || variants.success;

    return (
        <div className = {`fixed top-6 right-6 bg-white rounded-2xl justify-between items-center flex p-3 min-h-[100px] w-[375px] transition-all shadow-md ${t.visible ? 'animate-slide-in-right' : 'animate-slide-out-right'}`}>
            <div className = 'flex items-center font-bold text-black'>
                <div className = 'flex items-center justify-center'>
                    <div className = {`${background} p-2 rounded-full mr-2`}>
                        <div className = {`${front} p-2 rounded-full`}>
                            <Icon icon = {icon} className = {`text-xl ${textColor}`} />
                        </div>
                    </div>
                    {message}
                </div>
            </div>
            <div className = {`absolute bottom-1 left-1 h-[6px] w-[96%] mx-auto rounded-full ${color} animate-toast-bar z-5`} />
            <button onClick = {() => toast.dismiss(t.id)} className = 'absolute top-5 right-5 text-gray-600 hover:text-black cursor-pointer'>
                <Icon icon = 'mingcute:close-fill' className = 'text-base' />
            </button>
        </div>
    );
};
