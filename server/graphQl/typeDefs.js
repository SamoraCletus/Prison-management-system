const { gql } = require("apollo-server");

module.exports = gql`
  type Inmate {
    id: ID
    name: String
    profilePic: ID
    age: String
    createdAt: String
    address: String
    nextOfKin: String
    duration: String
    crime: String
    nextOfKinPhone: String
    gender: String
    remarks: String
    releaseDate: String
    courtOfConviction: String
    stateOfOrigin: String
    LGA: String
  }
  type Exconvict {
    id: ID!
    name: String!
    profilePic: ID
    age: String!
    createdAt: String!
    address: String!
    nextOfKin: String!
    duration: String!
    crime: String!
    nextOfKinPhone: String!
    gender: String!
    remarks: String
    releaseDate: String!
    courtOfConviction: String!
    stateOfOrigin: String!
    LGA: String!
  }
  type Guest {
    id: ID!
    name: String!
    phone: String!
    inmateName: String!
    createdAt: String!
    signedOut: Boolean!
    purpose: String!
  }
  type Admin {
    name: String!
    token: String!
    inmates: [Inmate]!
    inmateCount: Int!
    guestCount: Int!
    users: [User]!
    guests: [Guest]!
  }
  type User {
    id: ID!
    email: String!
    inmateName: String!
    name: String!
    token: String!
    createdAt: String!
  }
  input RegisterInput {
    name: String!
    email: String!
    inmateName: String!
    password: String!
    confirmPassword: String!
  }
  input RegisterGuest {
    name: String!
    phone: String!
    inmateName: String!
    purpose: String!
  }

  input RegisterImate {
    name: String!
    gender: String!
    DOB: String!
    address: String!
    nextOfKin: String!
    nextOfKinPhone: String!
    crime: String!
    releaseDate: String!
    stateOfOrigin: String!
    LGA: String!
    courtOfConviction: String!
    picture: Upload
  }

  type Query {
    getInmates: [Inmate]!
    getInmate(name: String!): Inmate!
    getExconvict(name: String!): Exconvict!
    getExconvicts: [Exconvict]!
    getGuests: [Guest]!
    getSignedInGuest: [Guest]
    getUsers: [User]!
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(name: String!, password: String!): User!
    adminLogin(name: String!, password: String!): Admin!
    addAdmin(name: String!, password: String!): Admin!
    addInmate(registerImate: RegisterImate): Inmate!
    updateRemarks(name: String!, remarks: String!): Inmate!
    addExconvict: String
    addGuest(registerGuest: RegisterGuest): String!
    signOutGuest(name: String!): String!
  }
  type Subscription {
    newInmate: Inmate!
    newUser: User!
  }
`;
