from Databases.models import session
from Databases.objects import User
from flask_restful import Resource
from flask_jwt_extended import create_access_token
import bcrypt
from flask import jsonify, request
import sqlalchemy

# users_api = Blueprint("users_api", __name__)
# Setup the Flask-JWT-Extended extension
# users_api.config["JWT_SECRET_KEY"] = "super-secret"  # Change this!
# jwt = JWTManager(users_api)

# endpoints to create user, and verify user
# need bcrypt
# return json string objects to front end
class Signup(Resource):
    def post(self):
        try:
            request_data = request.get_json()
            print(request_data)
            user = request_data['user']
            password = request_data['password']

            hashed_password = bcrypt.hashpw(password.encode('utf8'), bcrypt.gensalt())
            session.add(User(user=user, password=hashed_password))
            session.commit()

            # refactor return user details to store on frontend for verification after checking up frontend
            userId = session.query(User).filter_by(_user=user).first()
            return {'username': f'{userId._id}'}
        except sqlalchemy.exc.IntegrityError:
            session.rollback()
            print(hashed_password)

            return {'message': f'User /"{user}/" has been taken.'}
        # should be validating username on frontend tbh
        except sqlalchemy.exc.DataError:
            session.rollback()

            return {'message': f'Username /"{user}/" is too long.'}

# @users_api.route("/signup", methods = ["POST"])
# def signup():
#     try:
#         request_data = request.get_json()
#         user = request_data['user']
#         password = request_data['password']

#         hashed_password = bcrypt.hashpw(password.encode('utf8'), bcrypt.gensalt())
#         session.add(User(user=user, password=hashed_password))
#         session.commit()

#         # refactor return user details to store on frontend for verification after checking up frontend
#         return jsonify({'username': f'{user}'})
#     except sqlalchemy.exc.IntegrityError:
#         session.rollback()
#         print(hashed_password)

#         return jsonify({'message': f'User /"{user}/" has been taken.'})
#     # should be validating username on frontend tbh
#     except sqlalchemy.exc.DataError:
#         session.rollback()

#         return jsonify({'message': f'Username /"{user}/" is too long.'})

class Login(Resource):
    def post(self):
        try:
            request_data = request.get_json()
            user = request_data['user']
            password = request_data['password']

            check_user = session.query(User).filter_by(_user=user).first()
            input_password = password.encode('utf8')

            # i won't commit as i don't have a last logged in
            return ({'username': f'{check_user._id}'} 
            if bcrypt.checkpw(input_password, check_user._password.tobytes()) 
            else {'message': 'Username or password is wrong'})

            # remember to return password or user wrong if false
        except AttributeError:
            session.rollback()
            return {'message': f'User {user} does not exist.'}

# @users_api.route("/login", methods = ["POST"])
# def login():
#     try:
#         request_data = request.get_json()
#         user = request_data['user']
#         password = request_data['password']

#         # hashed_password = bcrypt.hashpw(form.password, bcrypt.gensalt())
#         check_user = session.query(User).filter_by(_user=user).first()
#         # print(check_user)
#         input_password = password.encode('utf8')

#         # i won't commit as i don't have a last logged in
#         return jsonify({'username': f'{user}'}) if bcrypt.checkpw(input_password, check_user._password.tobytes()) else jsonify({'message': 'Username or password is wrong'})

#         # remember to return password or user wrong if false
#     except AttributeError:
#         session.rollback()
#         return jsonify({'message': f'User {form.user} does not exist.'})

# @users_api("/logout", methods = ["POST"])
# def logout():
#     # create some code, not too sure

# endpoints to generate token
class GenJWT(Resource):
    def post(self):
        request_data = request.get_json()
        user = request_data['user']

        access_token = create_access_token(identity=user)
        print(access_token)
        return jsonify(token=access_token)

# @users_api.route("/genJWT", methods = ["POST"])
# def genJWT():
#     request_data = request.get_json()
#     user = request_data['user']

#     access_token = create_access_token(identity=user)
#     return jsonify(token=access_token)