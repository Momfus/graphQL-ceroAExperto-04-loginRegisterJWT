import gql from 'graphql-tag';


// obtener la data del usuario
export const meData = gql`

  query {
    me {
      status
      message
      user {
        id
        name
        lastname
        email
      }
    }
  }
`;

// Obtener el token del login del usuario
export const login = gql`
  query login( $email: String!, $password: String! ){
    login(email: $email, password: $password ) {
      status
      message
      token
    }
  }
`;

// Consulta para obtener los usuarios
export const getUsers = gql`

  query {
    users {
      id
      name
      lastname
      email
      registerDate
    }
  }
`;
