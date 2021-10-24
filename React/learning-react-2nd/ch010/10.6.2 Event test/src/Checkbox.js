import React, {useReducer} from 'react';

function notTestedFunction() {
    while(true) {
        console.log('It will break your system');
    }
}

export function Checkbox() {
    const [checked, setChecked] = useReducer(checked => !checked, false);

    return (
        <>
            <label>
                {checked ? 'checked' : 'not checked'}
                <input
                    type='checkbox'
                    value={checked}
                    onChange={setChecked}
                    data-testid='checkbox'  // data 애트리뷰트를 추가
                />
            </label>
        </>
    );
}