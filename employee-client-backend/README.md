# Description
This is the backend code for the employee monitor client

**This code is incomplete and has a bug in routing that i couldn't fix due to the time restraint which subsequently affected the whole app**


# Files

These are the files and their **intended** purpose.

## manage.py

This is the file that runs the application. It resides in the root directory with the app folder.

Imports the database and create_app() from app directory.
Creates the database using create_all().
Runs the app.


## app/

This is the directory that has the elements of the app

## init.py

Initializes the database using SQLAlchemy.
initializes the function create_app() which creates app, imports the database configs from the config file, enables CORS for the app and turns it into a restful api using Api(), adds the necessary routes to that api, and finally, imports the model.

## config.py

Configures for mySQL database using SQLAlchemy

## employees/

This directory contains our model and controller


## Employee.py

This is the model for an employee and also the schema for our table.
It defines an employee as having a unique id, a name, a unique email, a hashed password and the properties isAdmin and isOn.
It also has various basic functions:
Setting the password which hashes it and check password which unhashes it and compares to input.
Saving which adds the employee to the database.
to_dict which retrieves the employee


## EmployeeController.py
This is the controller for employee and has all the endpoints(This is where the mistake/ incompleteness is)
