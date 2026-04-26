import { HTMLAttributes } from 'react';

type InputErrorProps = HTMLAttributes<HTMLParagraphElement> & {
    message?: string;
    className?: string;
};

export default function InputError({ message, className = '', ...props }: InputErrorProps) {
    return message ? (
        <p
            {...props}
            className={'text-sm text-red-600 ' + className}
        >
            {message}
        </p>
    ) : null;
}
