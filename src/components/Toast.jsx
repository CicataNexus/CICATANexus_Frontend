import React from 'react';
import { toast } from 'react-hot-toast';
import { Button } from "@/components/ui/Button";
import { Icon } from '@iconify/react';

export default function Toast({ t, message, type }) {
    const variants = {
        success: {
            icon: 'gg:check-o',
            color: 'text-success-toast-icon',
            background: 'bg-success-toast-icon-background',
            front: 'bg-success-toast-icon-front',
        },
        error: {
            icon: 'codicon:error',
            color: 'text-error-toast-icon',
            background: 'bg-error-toast-icon-background',
            front: 'bg-error-toast-icon-front',
        },
        warning: {
            icon: 'jam:alert',
            color: 'text-warning-toast-icon',
            background: 'bg-warning-toast-icon-background',
            front: 'bg-warning-toast-icon-front',
        },
    };

    const { icon, color, background, front } = variants[type] || variants.success;

    return (
        <div className = {`fixed top-6 right-6 bg-white rounded-2xl justify-between p-3 min-h-[100px] w-[350px] transition-all ${t.visible ? 'animate-slide-in-right' : 'animate-slide-out-right'}`}>
            <div className = 'flex items-center font-bold text-black'>
                <div className = {`${background} p-2 rounded-full mr-2`}>
                    <div className = {`${front} p-2 rounded-full`}>
                        <Icon icon = {icon} className = {`text-xl ${color}`} />
                    </div>
                </div>
                {message}
            </div>
            <Button onClick = {() => toast.dismiss(t.id)} className = 'absolute top-2 right-2'>
                <Icon icon = 'mingcute:close-fill' className = 'text-xl' />
            </Button>
            <button className = 'cursor-pointer bg-deep-blue hover:bg-dark-blue text-white transition-colors text-sm font-poppins font-semibold rounded-full p-1 px-7 absolute bottom-3 right-5 '>
                Deshacer
            </button>
        </div>
    );
};
