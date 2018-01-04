define({ "api": [
  {
    "type": "get",
    "url": "/api/user/logout",
    "title": "Logout",
    "name": "apiName",
    "group": "User",
    "version": "1.0.0",
    "filename": "api/src/endpoint/user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/api/user/login",
    "title": "Login",
    "name": "login",
    "group": "User",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Body Request Example:",
          "content": "{\n    email : 'youremail@example.com',\n    password: 'yourblankpassword'\n}",
          "type": "Object"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>An user data payload</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "access_token",
            "description": "<p>Access token</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "expires_in",
            "description": "<p>Token expire time</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Body Success Response:",
          "content": "{\n     data: {\n         id: '8b6284b0-f11b-11e7-9417-ed874abe0164',\n         email: 'youremail@example.com',\n         user_name: 'Bobby',\n         avatar: 'https://image.flaticon.com/icons/svg/149/149071.svg'\n     },\n     access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgyMTU0MmUwLWYxM2QtMTFlN',\n     expires_in: '8h'\n}",
          "type": "Object"
        }
      ]
    },
    "filename": "api/src/endpoint/user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/api/user/register",
    "title": "Register",
    "name": "register",
    "group": "User",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Registration email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Registration password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Body Request Example:",
          "content": "{\n    email : 'youremail@example.com',\n    password: 'yourblankpassword'\n}",
          "type": "type"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "type",
            "optional": false,
            "field": "message",
            "description": "<p>A success message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Body Success Response:",
          "content": "{\n    message: 'Register success!'\n}",
          "type": "type"
        }
      ]
    },
    "filename": "api/src/endpoint/user.js",
    "groupTitle": "User"
  }
] });
