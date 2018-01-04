define({ "api": [
  {
    "type": "post",
    "url": "/user/register",
    "title": "Register",
    "name": "register",
    "group": "user",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "paramName",
            "description": "<p>description</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    property : value\n}",
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
            "field": "name",
            "description": "<p>description</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    property : value\n}",
          "type": "type"
        }
      ]
    },
    "filename": "src/endpoint/user.js",
    "groupTitle": "user"
  }
] });
