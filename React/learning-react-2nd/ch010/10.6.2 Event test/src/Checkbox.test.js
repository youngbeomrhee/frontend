import React from 'react';
import {render, fireEvent, getByTestId} from '@testing-library/react';
import {Checkbox} from "./Checkbox";
import '@testing-library/jest-dom';

test('Selecting the checkbox should change the value of checked to true', () => {
    const {getByLabelText} = render(<Checkbox/>);
    const checkbox = getByLabelText(/not checked/i);
    expect(checkbox.checked).toEqual(false);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toEqual(true);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toEqual(false);
})

test('Selecting the checkbox should change the value of checked to true', () => {
    const {getByTestId} = render(<Checkbox/>);  // selecting 하기가 모호한 경우 사용
    const checkbox = getByTestId('checkbox');
    expect(checkbox.checked).toEqual(false);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toEqual(true);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toEqual(false);
})