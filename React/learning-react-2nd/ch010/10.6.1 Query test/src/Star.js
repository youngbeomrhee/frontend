import {FaStar} from "react-icons/fa";

export default function Star({selected = false, onSelect = f => f}) {
    return (
        <>
            <h1>Great Star</h1>
            <FaStar color={selected ? 'red' : 'grey'} id='star' onClick={onSelect}/>
        </>
    );
}
