import React from 'react';
import styled from 'styled-components';

const Header = ({}) => {
  return (
    <Container>
      <Nav>
        <ListContainer>
          <List>INTRODUCE</List>
          <List>BLOG</List>
          <List>GITHUB</List>
          <List>YOUTUBE</List>
        </ListContainer>
      </Nav>
    </Container>
  );
};

const Container = styled.header`
  border: 1px solid black;
  display: flex;
  align-items: center;
`;

const Nav = styled.nav``;
const ListContainer = styled.ul`
  list-style: none;
  display: flex;
  justify-content: flex-start;
`;
const List = styled.li`
  padding: 10px;
`;
export default Header;
