#To Do
-tests

PUT /users/:user
— Updates or changes the information for a particular user in your database
— Optional: If applicable to the PUT, rename a previously defined key in your s3 bucket, and handle any objects that were previously saved under the old key name

GET users/:user/files/:file
— Gets a specific file from a particular user from your database

PUT users/:user/files/:file
— Updates or changes a particular file (object) in your s3 and update your  database if the s3 url has changed
