<<<<<<< HEAD
from flask import Flask, session, jsonify, request
from flask_restful import Api
from flask_cors import CORS

from datetime import timedelta
from flask_jwt_extended import JWTManager

from flask import Flask
from Databases.models import Database
from auth_blueprint.users_api import Login, Signup, GenJWT
from consumer_blueprint.consumers_api import TodoTasks
# from auth_blueprint.users_api import users_api

app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = "super-secret"  # Change this!
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(minutes=60)
app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(minutes=60)

db = Database()

jwt = JWTManager(app)
api = Api(app)
CORS(app)

api.add_resource(Login, "/login")
api.add_resource(Signup, "/signup")
api.add_resource(GenJWT, "/genJWT")
api.add_resource(TodoTasks, "/todotasks")
# app.register_blueprint(users_api, url_prefix="/user")

if __name__ == "__main__":
=======
from flask import Flask, session, jsonify, request
from flask_restful import Api
from flask_cors import CORS

from datetime import timedelta
from flask_jwt_extended import JWTManager

from flask import Flask
from Databases.models import Database
from auth_blueprint.users_api import Login, Signup, GenJWT
from consumer_blueprint.consumers_api import TodoTasks
# from auth_blueprint.users_api import users_api

app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = "super-secret"  # Change this!
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(minutes=60)
app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(minutes=60)

db = Database()

jwt = JWTManager(app)
api = Api(app)
CORS(app)

api.add_resource(Login, "/login")
api.add_resource(Signup, "/signup")
api.add_resource(GenJWT, "/genJWT")
api.add_resource(TodoTasks, "/todotasks")
# app.register_blueprint(users_api, url_prefix="/user")

if __name__ == "__main__":
>>>>>>> a84d5e0 (COMMIT HINA)
    app.run(debug=True)