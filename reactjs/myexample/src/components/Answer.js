import React, { useState, useEffect } from 'react';

function Answer(props) {
    const [number, setNumber] = useState(0);

    const onIncrease = () => {
        setNumber(number + 1);
    }
    const onDecrease = () => {
        setNumber(number - 1);
    }

    useEffect(() => {
        document.title = `you clicked ${ number } count`;
    });

    const style = {
        margin : '10px',
        padding : '10px',
        border : '4px ridge black'
    }
    return (
        <>
            <div>안녕하세요 인터뷰어 {props.interviewer}</div>
            { props.isSpecial ? <b>* 아나운서 {props.announcer}</b> : null }
            { props.isSpecial && <div>안녕하세요 </div> }

            if (props.isSpecial) {
                <div>start interview!</div>
            }
            <div style={style}>
                <h1 className="number-content">{number}</h1>
                <button onClick={onIncrease}>+1</button>
                <button onClick={onDecrease}>-1</button>
            </div>
        </>
    )
}

Answer.defaultProps = {
    announcer: '자동 응답기'
}

export default Answer;
