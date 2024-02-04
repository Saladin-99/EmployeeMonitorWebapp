from flask import Blueprint, jsonify, request, current_app
from flask_login import login_user, logout_user, current_user, login_required
from werkzeug.wrappers import response
from app.Employee import Employee 
from app import login_manager
from flask_cors import cross_origin
from flask_socketio import join_room, leave_room
from app import socketio
employee_controller = Blueprint('employee_controller', __name__)

@login_manager.user_loader
def load_user(user_id):
    return Employee.query.get(int(user_id))

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
    if(current_user.is_authenticated):
        return jsonify({"message":"loggedin"}), 201
    data = request.get_json(force=True)
    if not data or not data['email']:
        return jsonify({"error": " "}), 401
    input_email = data['email']
    input_password = data['password']
    user = Employee.query.filter_by(email = input_email).first()
    if user and user.check_password(input_password):
        login_user(user)
        handle_connect()
        return jsonify({"message":"loggedin"}), 201
        
    else:
        return jsonify({"error": "X"}), 401



@employee_controller.route('/logout')
@login_required
def logout():
    handle_disconnect()
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

@login_required
def handle_status_change():
    employees = Employee.query.all()
    employee_data = [employee.to_dict() for employee in employees]
    print('employeedata:', employee_data)
    socketio.emit('employee_status_changed', employee_data, room = "admin_room")

@socketio.on('connect')
@login_required
def handle_connect():
    print('Connected! you are:', current_user.email)
    current_user.set_on()
    if(current_user.isAdmin==1):
        join_room("admin_room")
    handle_status_change()

@socketio.on('disconnect')
def handle_disconnect():
    print('Disconnected!')
    current_user.set_off()
    if current_user.isAdmin == 1:
        leave_room("admin_room")
    handle_status_change()