from flask import Flask
from flask_restful import Resource, api

from flask import Flask
from flask import jsonify
from flask import request

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

from flask_cors import CORS

app = Flask(__name__)

app.config["JWT_SECRET_KEY"] = "geh"
jwt = JWTManager(app)
CORS(app)