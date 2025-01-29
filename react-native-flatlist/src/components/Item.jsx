import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
    background-color: #f9c2ff;
    padding: 20px;
    margin: 8px 16px;
`;

const StyledText = styled.Text`
  font-size: 32px;
`;

const Item = ({ title }) => {
    return (
        <Container>
            <StyledText>{title}</StyledText>
        </Container>
    )
}

export default Item