import gql from "graphql-tag";

const REGISTER_USER = gql`
  mutation register(
    $name: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
    $inmateName: String!
  ) {
    register(
      registerInput: {
        name: $name
        email: $email
        password: $password
        confirmPassword: $confirmPassword
        inmateName: $inmateName
      }
    ) {
      id
      email
      name
      inmateName
      createdAt
      token
    }
  }
`;
const ADMIN_LOGIN = gql`
  mutation adminLogin($name: String!, $password: String!) {
    adminLogin(name: $name, password: $password) {
      name
      token
    }
  }
`;
const LOGIN_USER = gql`
  mutation login($name: String!, $password: String!) {
    login(name: $name, password: $password) {
      id
      email
      name
      createdAt
      token
    }
  }
`;

const ADD_EXCONVICT_MUTATION = gql`
  mutation addExconvict {
    addExconvict
  }
`;
const EDIT_REMARKS_MUTATION = gql`
  mutation updateRemarks($name: String!, $remarks: String!) {
    updateRemarks(name: $name, remarks: $remarks) {
      name
      gender
      age
      address
      nextOfKin
      nextOfKinPhone
      crime
      releaseDate
      stateOfOrigin
      LGA
      courtOfConviction
      duration
      profilePic
    }
  }
`;
const ADD_INMATE_MUTATION = gql`
  mutation addInmate(
    $name: String!
    $gender: String!
    $DOB: String!
    $address: String!
    $nextOfKin: String!
    $nextOfKinPhone: String!
    $crime: String!
    $releaseDate: String!
    $stateOfOrigin: String!
    $LGA: String!
    $courtOfConviction: String!
    $picture: Upload
  ) {
    addInmate(
      registerImate: {
        name: $name
        gender: $gender
        DOB: $DOB
        address: $address
        nextOfKin: $nextOfKin
        nextOfKinPhone: $nextOfKinPhone
        crime: $crime
        releaseDate: $releaseDate
        stateOfOrigin: $stateOfOrigin
        LGA: $LGA
        courtOfConviction: $courtOfConviction
        picture: $picture
      }
    ) {
      name
      gender
      age
      address
      nextOfKin
      nextOfKinPhone
      crime
      releaseDate
      stateOfOrigin
      LGA
      courtOfConviction
      duration
      profilePic
    }
  }
`;
const FETCH_INMATES_QUERY = gql`
  query {
    getInmates {
      id
      name
      profilePic
      age
      createdAt
      address
      nextOfKin
      nextOfKinPhone
      duration
      crime
      gender
      remarks
      releaseDate
      courtOfConviction
      stateOfOrigin
      LGA
    }
  }
`;
const FETCH_EXCONVICTS_QUERY = gql`
  query {
    getExconvicts {
      id
      name
      profilePic
      age
      createdAt
      address
      nextOfKin
      nextOfKinPhone
      duration
      crime
      gender
      remarks
      releaseDate
      courtOfConviction
      stateOfOrigin
      LGA
    }
  }
`;
const FETCH_INMATE_QUERY = gql`
  query ($name: String!) {
    getInmate(name: $name) {
      id
      name
      profilePic
      age
      createdAt
      address
      nextOfKin
      nextOfKinPhone
      duration
      crime
      gender
      remarks
      releaseDate
      courtOfConviction
      stateOfOrigin
      LGA
    }
  }
`;
const FETCH_EXCONVICT_QUERY = gql`
  query ($name: String!) {
    getExconvict(name: $name) {
      id
      name
      profilePic
      age
      createdAt
      address
      nextOfKin
      nextOfKinPhone
      duration
      crime
      gender
      remarks
      releaseDate
      courtOfConviction
      stateOfOrigin
      LGA
    }
  }
`;
const REGISTER_GUEST = gql`
  mutation addGuest(
    $name: String!
    $phone: String!
    $purpose: String!
    $inmateName: String!
  ) {
    addGuest(
      registerGuest: {
        name: $name
        phone: $phone
        purpose: $purpose
        inmateName: $inmateName
      }
    )
  }
`;
const SIGN_OUT_GUEST = gql`
  mutation signOutGuest($name: String!) {
    signOutGuest(name: $name)
  }
`;
const FETCH_GUESTS_QUERY = gql`
  query {
    getGuests {
      id
      name
      phone
      inmateName
      createdAt
      signedOut
      purpose
    }
  }
`;

const FETCH_SIGNED_IN_GUEST_QUERY = gql`
  query {
    getSignedInGuest {
      id
      name
      phone
      inmateName
      createdAt
      signedOut
      purpose
    }
  }
`;
export {
  FETCH_INMATES_QUERY,
  FETCH_INMATE_QUERY,
  REGISTER_GUEST,
  FETCH_GUESTS_QUERY,
  ADD_INMATE_MUTATION,
  FETCH_SIGNED_IN_GUEST_QUERY,
  SIGN_OUT_GUEST,
  FETCH_EXCONVICT_QUERY,
  FETCH_EXCONVICTS_QUERY,
  REGISTER_USER,
  LOGIN_USER,
  ADMIN_LOGIN,
  ADD_EXCONVICT_MUTATION,
  EDIT_REMARKS_MUTATION,
};
