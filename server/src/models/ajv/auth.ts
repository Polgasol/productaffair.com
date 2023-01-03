import ajvInstance from './instance';

const registerSchema = {
  type: 'object',
  properties: {
    firstname: {
      type: 'string',
      minLength: 1,
      maxLength: 100,
      pattern: '^(?=^.{1,100}$)[^s][a-zA-Zs]+[^s]$', // Js Regular expression for first name and last name
      // https://stackoverflow.com/questions/30059292/how-can-i-set-maximum-length-to-this-regular-expression
      // https://stackoverflow.com/questions/38934328/regex-match-a-string-without-leading-and-trailing-spaces

      // ^                      - a start of a string
      // (?=.{1,40}$)           - there must be 1 to 40 chars other than line break chars in the string
      // [a-zA-Z]+              - 1 or more ASCII letters
      // (?:                    - starto of a non-capturing group repeated 0 or more times matching sequences of
      //        [-'\s] - a -, ' or whitespace
      //        [a-zA-Z]+ - 1+ ASCII letters
      // )*                     - end of the grouping
      // $                      - end of string
    },
    // var regex = /^[A-Z]([A-Za-z]{2,10})+(\s[A-Za-z]{2,10}){0,2}$/;
    // var tests = ['User.name',];
    // for (var i = 0; i < tests.length; i++) {
    //     var p = document.createElement('p');
    //     p.appendChild(document.createTextNode(tests[i] + ' = ' + (regex.test(tests[i]) ? 'pass' : 'fail')));
    //     document.body.appendChild(p);
    // }
    lastname: {
      type: 'string',
      minLength: 1,
      maxLength: 100,
      pattern: '^(?=^.{1,100}$)[^s][a-zA-Zs]+[^s]$', // Js Regular expression for first name and last name
      // https://stackoverflow.com/questions/30059292/how-can-i-set-maximum-length-to-this-regular-expression
      // https://stackoverflow.com/questions/38934328/regex-match-a-string-without-leading-and-trailing-spaces
    },
    age: { type: 'number', minimum: 13, maximum: 150 }, // Anyone aged 13 and above can set up and manage their own Google accounts. The minimum age restriction is in place because of the Children's Online Privacy Protection Act (COPPA).
    email: {
      type: 'string',
      format: 'email',
      minLength: 3,
      maxLength: 500,
      pattern: `^([^@\\s]+)@((?:[-a-z0-9]+\\.)+[a-z]{2,500})$`,
    }, // https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript/50968324#50968324
    username: {
      type: 'string',
      minLength: 1,
      maxLength: 100,
      pattern: '^(?=.{1,100}$)(?:[0-9a-zA-Zd]+(?:[_][0-9a-zA-Zd])*)+$', // check
      // https://stackoverflow.com/questions/5887678/alphanumeric-dash-and-underscore-but-no-spaces-regular-expression-check-javascr
    },
    createPassword: {
      type: 'string',
      format: 'password',
      minLength: 8,
      maxLength: 64,
      pattern: "(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*#?&^>;:~)(}{|'`+=<_-]).{8,64}$",
      // https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
    },
    confirmPassword: {
      type: 'string',
      format: 'password',
      minLength: 8,
      maxLength: 64, // bcrypt limit is 72 bytes = 72 char
      pattern: "(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*#?&^>;:~)(}{|'`+=<_-]).{8,64}$",
      // https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
    },
  },
  required: ['firstname', 'lastname', 'age', 'email', 'username', 'createPassword', 'confirmPassword'],
  additionalProperties: false,
  errorMessage: {
    properties: {
      firstname: '404',
      lastname: '404',
      age: '404',
      email: '404',
      username: '404',
      createPassword: '404',
      confirmPassword: '404',
    },
  },
};

const verifyCodeSchema = {
  type: 'object',
  properties: {
    verificationCode: {
      type: 'string',
      minLength: 8,
      maxLength: 8,
      pattern: '^(?=.{1,8}$)(?:[0-9a-zA-Zd]+(?:[0-9a-zA-Zd])*)+$',
    },
  },
  required: ['verificationCode'],
  additionalProperties: false,
  errorMessage: {
    properties: {
      verificationCode: '404',
    },
  },
};

const loginSchema = {
  type: 'object',
  properties: {
    username: {
      type: 'string',
      minLength: 1,
      maxLength: 100,
      pattern: '^(?=.{1,100}$)(?:[a-zA-Zd]+(?:[_][a-zA-Zd])*)+$',
    },
    password: {
      type: 'string',
      format: 'password',
      minLength: 6,
      maxLength: 64,
      pattern: "(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^>;:~)(}{|'`+=<_-]).{8,64}$",
    },
  },
  required: ['username', 'password'],
  additionalProperties: false,
  errorMessage: {
    properties: {
      username: '404',
      password: '404',
    },
  },
};

const uploadSchema = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
      minLength: 1,
      maxLength: 100,
      pattern: '^[A-Za-z0-9+!?,.:;()@#s ]{1,100}$',
    },
    storeName: {
      type: 'string',
      minLength: 1,
      maxLength: 100,
      pattern: '^[A-Za-z0-9+!?,.:;()@#s ]{1,100}$',
    },
    ratings: {
      type: 'array',
      maxItems: 3,
      items: {
        type: 'object',
        properties: {
          id: {
            enum: [0, 1, 2],
          },
          label: {
            enum: ['Quality', 'Price', 'Customer Service'],
          },
          score: {
            enum: [1, 2, 3, 4, 5],
          },
        },
      },
    },
    category: {
      enum: [
        'Technology',
        'Health and Wellness',
        "Men's Clothing",
        "Women's Clothing",
        'Travel',
        'Food and Drinks',
        'Kitchen',
        'Unique Items',
        'Home Improvement',
        'Sports and Recreation',
        'Nature',
        'Skin Care',
        'Baby',
        'Toys and Gaming',
        'Art and Design',
        'Pets',
        'Vehicle and Motors',
      ],
    },
  },
  required: ['title', 'storeName', 'ratings', 'category'],
  additionalProperties: false,
  errorMessage: {
    properties: {
      title: '404',
      storeName: '404',
      ratings: '404',
      category: '404',
    },
  },
};

const validateGoogleUsername = {
  type: 'object',
  properties: {
    googleUsername: {
      type: 'string',
      minLength: 1,
      maxLength: 100,
      pattern: '^(?=.{1,100}$)(?:[0-9a-zA-Zd]+(?:[_][0-9a-zA-Zd])*)+$', // check
      // https://stackoverflow.com/questions/5887678/alphanumeric-dash-and-underscore-but-no-spaces-regular-expression-check-javascr
    },
  },
  required: ['googleUsername'],
  additionalProperties: false,
  errorMessage: {
    properties: {
      googleUsername: '404',
    },
  },
};

const sanitizeComments = {
  type: 'object',
  properties: {
    commentText: {
      type: 'string',
      minLength: 1,
      maxLength: 500,
    },
  },
  required: ['commentText'],
  additionalProperties: false,
  errorMessage: {
    properties: {
      commentText: '404',
    },
  },
};
const pagesSchema = {
  type: 'object',
  properties: {
    page: {
      type: 'string',
      minLength: 1,
      maxLength: 5,
      pattern: '^[0-9]{1,5}$',
    },
  },
  required: ['page'],
  additionalProperties: false,
  errorMessage: {
    properties: {
      page: '404',
    },
  },
};

const searchSchema = {
  type: 'object',
  properties: {
    query: {
      type: 'string',
      minLength: 1,
      maxLength: 1000,
      pattern: `^[A-Za-z0-9+!?,.:;()@#\s ]{1,1000}$`, // before ^[A-Za-z0-9+!?,.":;()@$&#-_=+%\s]{1,5}$
    },
    page: {
      type: 'string',
      minLength: 1,
      maxLength: 5,
      pattern: '^[0-9]{1,5}$', // 0-99999
    },
  },
  required: ['query', 'page'],
  additionalProperties: false,
  errorMessage: {
    properties: {
      query: '404',
      page: '404',
    },
  },
};

const postIdSchema = {
  type: 'object',
  properties: {
    postId: {
      type: 'string',
      minLength: 1,
      maxLength: 1000000000000000,
      pattern: '^[0-9]{1,1000000000000000}$',
    },
  },
  required: ['postId'],
  additionalProperties: false,
  errorMessage: {
    properties: {
      postId: '404',
    },
  },
};

const getCategoriesSchema = {
  type: 'object',
  properties: {
    category: {
      enum: [
        'Technology',
        'Health and Wellness',
        "Men's Clothing",
        "Women's Clothing",
        'Travel',
        'Unique Items',
        'Food and Drinks',
        'Kitchen',
        'Home Improvement',
        'Sports and Recreation',
        'Nature',
        'Skin Care',
        'Baby',
        'Toys and Gaming',
        'Art and Design',
        'Pets',
        'Vehicle and Motors',
      ],
    },
    page: {
      type: 'string',
      minLength: 1,
      maxLength: 5,
      pattern: '^[0-9]{1,5}$', // 0-99999 99999 page number limit
    },
  },
  required: ['category', 'page'],
  additionalProperties: false,
  errorMessage: {
    properties: {
      category: '404',
      page: '404',
    },
  },
};

const userIdSchema = {
  type: 'object',
  properties: {
    userId: {
      type: 'string',
      minLength: 1,
      maxLength: 1000000000000000,
      pattern: '^[0-9]{1,1000000000000000}$',
    },
  },
  required: ['userId'],
  additionalProperties: false,
  errorMessage: {
    properties: {
      userId: '404',
    },
  },
};

const aboutSchema = {
  type: 'object',
  properties: {
    about: {
      type: 'string',
      minLength: 1,
      maxLength: 160,
      pattern: '^(?=.{1,100}$)[^s].*[^s]$',
    },
  },
  required: ['about'],
  additionalProperties: false,
  errorMessage: {
    properties: {
      about: '404',
    },
  },
};

const ajvValidateReg = ajvInstance.compile(registerSchema);
const ajvVerifyCode = ajvInstance.compile(verifyCodeSchema);
const ajvValidateLogin = ajvInstance.compile(loginSchema);
const ajvValidateUpload = ajvInstance.compile(uploadSchema);
const ajvValidatePages = ajvInstance.compile(pagesSchema);
const ajvValidateGoogleUsername = ajvInstance.compile(validateGoogleUsername);
const ajvValidateComments = ajvInstance.compile(sanitizeComments);
const ajvValidateSearch = ajvInstance.compile(searchSchema);
const ajvValidatePostId = ajvInstance.compile(postIdSchema);
const ajvValidateGetCategories = ajvInstance.compile(getCategoriesSchema);
const ajvValidateFollow = ajvInstance.compile(userIdSchema);
const ajvValidateLike = ajvInstance.compile(postIdSchema);
const ajvValidateAbout = ajvInstance.compile(aboutSchema);

export {
  ajvValidateReg,
  ajvVerifyCode,
  ajvValidateLogin,
  ajvValidateUpload,
  ajvValidateGoogleUsername,
  ajvValidateComments,
  ajvValidatePages,
  ajvValidateSearch,
  ajvValidatePostId,
  ajvValidateGetCategories,
  ajvValidateFollow,
  ajvValidateLike,
  ajvValidateAbout,
};
