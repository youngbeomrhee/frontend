import PropTypes from "prop-types";
import React from "react";

export default function App({name, using, openOrClosed}) {
    return (
        <article>
            <h1>{name}</h1>
            <p>
                {using ? "used here" : "not used here"}
            </p>
            <p>
                {['Open', 'Closed'].includes(openOrClosed) ? 'This shop is ' + openOrClosed : '해당하는 정보가 없습니다'}
            </p>
        </article>
    );
}

App.propTypes = {
    name: PropTypes.string.isRequired,
    using: PropTypes.bool,
    openOrClosed: PropTypes.oneOf(['Open', 'Closed'])
};