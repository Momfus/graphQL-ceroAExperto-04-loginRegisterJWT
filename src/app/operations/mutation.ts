import gql from 'graphql-tag';

// Añadir un nuevo usuario
export const registerData = gql`

  mutation addUser($user: UserInput! ) {

    register( user: $user ) {

      status
      message
      user {

        id
        name
        lastname
        email
        registerDate

      }

    }

  }

`;
