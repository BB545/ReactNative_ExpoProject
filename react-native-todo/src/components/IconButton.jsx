import PropTypes from 'prop-types';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { images } from '../Images';

const Icon = styled.Image.attrs(({ theme, completed }) => ({
    style: { tintColor: completed ? theme.done : theme.text },
}))`
    width: 30px;
    height: 30px;
    margin: 10px;
`;

const IconButton = ({ type, onPressOut, id, completed }) => {
    const _onPressOut = () => {
        onPressOut(id);
    };

    return (
        <TouchableOpacity onPressOut={_onPressOut}>
            <Icon source={type} completed={completed} />
        </TouchableOpacity>
    )
};

IconButton.defaultProps = {
    onPressOut: () => {},
}

IconButton.propTypes = {
    type: PropTypes.oneOf(Object.values(images)).isRequired,
    onPressOut: PropTypes.func,
    id: PropTypes.string,
    completed: PropTypes.bool,
};

export default IconButton