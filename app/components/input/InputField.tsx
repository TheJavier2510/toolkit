// app/electricity/components/InputField.tsx
import React from 'react';
import styles from './InputField.module.scss';

interface InputFieldProps {
    id: string;
    label: string;
    value: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

const InputField: React.FC<InputFieldProps> = ({ id, label, value, onChange, type = 'number' }) => (
    <div className={styles.field}>
        <label htmlFor={id}>{label}</label>
        <input
            type={type}
            id={id}
            name={id}
            value={value}
            onChange={onChange}
        />
    </div>
);

export default InputField;