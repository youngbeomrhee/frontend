import React from 'react';
import ReactDOM from 'react-dom';
import Star from './Star';

test('renders a star', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Star/>, div);
    // expect(div.querySelector('notrealthing')).toBeTruthy();
    expect(div.querySelector('svg')).toBeTruthy();
    // expect(div.querySelector('svg')).toHaveAttribute('id', 'hotdog');
    expect(div.querySelector('svg')).toHaveAttribute('id', 'star');
});