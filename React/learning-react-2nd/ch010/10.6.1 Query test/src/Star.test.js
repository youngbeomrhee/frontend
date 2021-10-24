import React from 'react';
import ReactDOM from 'react-dom';
import Star from './Star';
import {render} from '@testing-library/react';
import '@testing-library/jest-dom';

test('renders an h1', () => {
    const {getByText} = render(<Star/>);
    const h1 = getByText(/Great Star/);
    expect(h1).toHaveTextContent('Great Star');
});