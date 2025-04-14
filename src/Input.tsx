import React from 'react';

interface InputProps {
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ handleChange, handleClick }, ref) => {
    return (
        <div className="input-container">
            <input type="text" placeholder="SEARCH LOCATION" ref={ref} onChange={handleChange} />
            <button onClick={handleClick}>Search</button>
        </div>
    );
});

export default Input;