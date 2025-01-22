import React from 'react';
import UserContext, { UserConsumer } from '../contexts/User';
import styled from 'styled-components/native';

const StyledText = styled.Text`
  font-size: 24px;
  margin: 10px;  
`;

const User = () => {
    return (
        <UserConsumer>
            {({ user }) => <StyledText>Name: {user.name}</StyledText>}
        </UserConsumer>
    )
}

export default User