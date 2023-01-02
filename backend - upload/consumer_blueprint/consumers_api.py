<<<<<<< HEAD
from Databases.models import session
from Databases.objects import Todotask
from flask_restful import Resource
from flask_jwt_extended import create_access_token
from flask import jsonify, request
from sqlalchemy import desc, inspect
import json

class TodoTasks(Resource):
    # always with reference to the todolist table
    def get(self):
        try:
            user = request.args.get("userid")
            # print(user)

            allTasks = session.query(Todotask).filter_by(_userid = user).all()
            allTasks_dict = Todotask.to_dict(allTasks)
            # print(allTasks_dict)
            
            return jsonify({'message': allTasks_dict})
        except Exception as e:
            session.rollback()
            print(e)
            return jsonify({'message': e})

    def post(self):
        try:
            request_data = request.get_json()
            print(request_data)

            new_Task = Todotask(
                userid = request_data['user'],
                task = request_data['task'],
                priority = request_data['priority'],
                details = request_data['details'],
                due_date = request_data['due_date'],
                completion_date = request_data['completion_date'],
                completion = json.loads(request_data['completion'].lower())
            )

            session.add(new_Task)
            session.commit()

            # need to get id to add onto state, refactor this bit
            Todotasks_dict = Todotask.to_dict([session.query(Todotask).filter_by(_userid = new_Task._userid).order_by(desc(Todotask._id)).first()])
            return jsonify({'message': Todotasks_dict})

            # return {'message': 'Task successfully submitted!'}
        except Exception as e:
            session.rollback()
            return jsonify({'message': e})

    def delete(self):
        try:
            # incoming object may be a json array of user_ids and task_id
            user_id = request.args.get("userid")
            id = request.args.get("taskid")

            session.query(Todotask).filter_by(
                _userid = user_id,
                _id = id
            ).delete()

            session.commit()
            # return {'message': f'Task {request_data["task"]} has been deleted'}
            return {'message': f'Task has been deleted'}
        except Exception as e:
            session.rollback()
            return jsonify({'message': e})

    # PUT and PATCH same functions, taking in diff payloads, will test both out
    def put(self):
        try:
            # this might be an array
            request_data = request.get_json()
            modified_tasks_list = " "

            # i will attempt to update everything on frontend side using state, only retrieving id when necessary
            for single_request in request_data:
                session.query(Todotask).filter_by(
                    _userid = single_request['_userid'],
                    _id = single_request['_id']
                ).update({
                    'completion_date': single_request["completion_date"],
                    'completion': bool(single_request["completion"])
                }, synchronize_session = False)

                modified_tasks_list = modified_tasks_list + ", " + single_request["task"]

            session.commit()
            return {'message': f'Tasks{modified_tasks_list} have been completed!'}

        except Exception as e:
            session.rollback()
=======
from Databases.models import session
from Databases.objects import Todotask
from flask_restful import Resource
from flask_jwt_extended import create_access_token
from flask import jsonify, request
from sqlalchemy import desc, inspect
import json

class TodoTasks(Resource):
    # always with reference to the todolist table
    def get(self):
        try:
            user = request.args.get("userid")
            # print(user)

            allTasks = session.query(Todotask).filter_by(_userid = user).all()
            allTasks_dict = Todotask.to_dict(allTasks)
            # print(allTasks_dict)
            
            return jsonify({'message': allTasks_dict})
        except Exception as e:
            session.rollback()
            print(e)
            return jsonify({'message': e})

    def post(self):
        try:
            request_data = request.get_json()
            print(request_data)

            new_Task = Todotask(
                userid = request_data['user'],
                task = request_data['task'],
                priority = request_data['priority'],
                details = request_data['details'],
                due_date = request_data['due_date'],
                completion_date = request_data['completion_date'],
                completion = json.loads(request_data['completion'].lower())
            )

            session.add(new_Task)
            session.commit()

            # need to get id to add onto state, refactor this bit
            Todotasks_dict = Todotask.to_dict([session.query(Todotask).filter_by(_userid = new_Task._userid).order_by(desc(Todotask._id)).first()])
            return jsonify({'message': Todotasks_dict})

            # return {'message': 'Task successfully submitted!'}
        except Exception as e:
            session.rollback()
            return jsonify({'message': e})

    def delete(self):
        try:
            # incoming object may be a json array of user_ids and task_id
            user_id = request.args.get("userid")
            id = request.args.get("taskid")

            session.query(Todotask).filter_by(
                _userid = user_id,
                _id = id
            ).delete()

            session.commit()
            # return {'message': f'Task {request_data["task"]} has been deleted'}
            return {'message': f'Task has been deleted'}
        except Exception as e:
            session.rollback()
            return jsonify({'message': e})

    # PUT and PATCH same functions, taking in diff payloads, will test both out
    def put(self):
        try:
            # this might be an array
            request_data = request.get_json()
            modified_tasks_list = " "

            # i will attempt to update everything on frontend side using state, only retrieving id when necessary
            for single_request in request_data:
                session.query(Todotask).filter_by(
                    _userid = single_request['_userid'],
                    _id = single_request['_id']
                ).update({
                    'completion_date': single_request["completion_date"],
                    'completion': bool(single_request["completion"])
                }, synchronize_session = False)

                modified_tasks_list = modified_tasks_list + ", " + single_request["task"]

            session.commit()
            return {'message': f'Tasks{modified_tasks_list} have been completed!'}

        except Exception as e:
            session.rollback()
>>>>>>> a84d5e0 (COMMIT HINA)
            return jsonify({'message': e})