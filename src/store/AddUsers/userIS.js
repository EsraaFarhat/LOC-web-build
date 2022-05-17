export const userIS = {
  userForm: {
    firstName: {
      value: "",
      valid: false,
      validation: {
        required: true,
      },
      validationError: "Required",
      touched: false,
    },
    lastName: {
      value: "",
      valid: false,
      validation: {
        required: true,
      },
      validationError: "Required",
      touched: false,
    },
    email: {
      value: "",
      valid: false,
      validation: {
        required: true,
        isEmail: true,
      },
      validationError: "Required. Must be a valid e-mail address",
      touched: false,
    },
    password: {
      value: "",
      valid: false,
      validation: {
        required: true,
        minLength: 5,
      },
      validationError: "Required. Password must be at least 5 characters",
      touched: false,
    },
    confirmPassword: {
      value: "",
      valid: false,
      validation: {
        required: true,
        minLength: 5,
      },
      validationError: "Required. Password must be at least 5 characters",
      touched: false,
    },
    role: {
      value: "",
      valid: false,
      validation: {
        required: true,
      },
      validationError: "Required",
      touched: false,
    },
  },
  loading: false,

  users: [],
  loadFetching: true,

  loadingDeleteUser: false,
  loadEditing: false,

  searchForm: {
    textVal: {
      value: "",
      valid: false,
      validation: {
        // required: true,
        isEmail: true,
      },
      validationError: "Required",
      touched: false,
    },

    searchType: {
      value: "",
      valid: false,
      validation: {
        // required: true,
        isEmail: true,
      },
      validationError: "Required",
      touched: false,
    },
  },

  searchResult: [],
  loadSearch: false,

  renderedItem: "users",
};
