import React from 'react';

//함수형 컴포넌트  state와 life cycle이 빠져있다.
const MyIcon = ({ iconName }) => {
    return (
        <div>
            내 아이콘 : {iconName}
        </div>
    );
};

export default MyIcon;
