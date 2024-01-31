from flask import Blueprint, jsonify, request, current_app
from flask_login import login_user, logout_user, current_user, login_required
from werkzeug.wrappers import response
from app.Employee import Employee  # Import moved inside the function
from app import login_manager
from flask_cors import cross_origin
employee_controller = Blueprint('employee_controller', __name__)

@employee_controller.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json(force=True)
        input_email = data['email']

        existing_employee = Employee.query.filter_by(email=input_email).first()
        if existing_employee:
            return jsonify({"message": "Employee already exists"}), 409

        input_password = data['password']
        input_name = data['name']

        new_employee = Employee(email=input_email, name=input_name)
        new_employee.set_password(input_password)
        new_employee.save()

        return jsonify({"message": "Employee registered successfully"}), 201

    except Exception as e:
        current_app.logger.error(e)
        return jsonify({"error": "Bad Request"}), 400


@employee_controller.route('/login', methods=['POST'])
@cross_origin(supports_credentials=True)
def login():
    data = request.get_json(force=True)
    if not data or not data['email']:
        return jsonify({"error": " "}), 401
    input_email = data['email']
    input_password = data['password']
    user = Employee.query.filter_by(email = input_email).first()
    if user and user.check_password(input_password):
        login_user(user)
        user.set_on()
        if user.isAdmin==1:
            return jsonify({"message": "1"}), 201
        elif user.isAdmin==0:
            return jsonify({"message": "0"}), 201
    else:
        return jsonify({"error": "X"}), 401


@employee_controller.route('/on')
@login_required
def get_on():
    if current_user.isAdmin == 0:
        employees = Employee.query.filter_by(isOn=1).all()
        return jsonify({"employees": [employee.to_dict() for employee in employees]})
    else:
        return jsonify({"error": "Unauthorized"}), 403  # 403 for Forbidden

@employee_controller.route('/off')
@login_required
def get_off():
    if current_user.isAdmin == 0:
        employees = Employee.query.filter_by(isOn=0).all()
        return jsonify({"employees": [employee.to_dict() for employee in employees]})
    else:
        return jsonify({"error": "Unauthorized"}), 403  # 403 for Forbidden

@employee_controller.route('/logout')
@login_required
def logout():
    current_user.set_off()
    logout_user()
    return jsonify({"message": "Logout successful"})

@employee_controller.route('/current_user', methods=['GET'])
@login_required
@cross_origin(supports_credentials=True)
def get_current_user():
    return jsonify({
        'id': current_user.id,
        'name': current_user.name,
        'email': current_user.email,
        'isAdmin': current_user.isAdmin,
        'isOn': current_user.isOn
    })