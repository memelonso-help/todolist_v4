from sys import settrace
from Databases.models import Base
from sqlalchemy import Column, String, Integer, ForeignKey, Date, Boolean, inspect

# different objects first
class User(Base):
    __tablename__ = "userlist"
    # __table_args__ = {'extend_existing': True}

    _id = Column("id", Integer, primary_key = True)
    _user = Column("user", String(20), unique = True)
    _password = Column("password", String(256))

    def __init__(self, user, password):
        self._user = user
        self._password = password

    def __repr__(self):
        return f"Userid: {self._id}, Username: {self._user}, Password: {self._password}"

class Todotask(Base):
    __tablename__ = "todotasks"
    # __table_args__ = {'extend_existing': True}

    _id = Column("id", Integer, primary_key = True)
    _userid = Column("user_id", Integer, ForeignKey("userlist.id"))
    task = Column("task", String(200))
    due_date = Column("due_date", Date)
    priority = Column("priority", Integer)
    details = Column("details", String(250))
    completion_date = Column("completion_date", Date)
    completion = Column("completion", Boolean)

    def __init__(self, userid, task, priority, details, due_date = None, completion_date = None, completion = False):
        self._userid = userid
        self.task = task
        self.due_date = due_date
        self.priority = priority
        self.details = details
        self.completion_date = completion_date
        self.completion = completion

    def __repr__(self):
        return f"""
        Taskid: {self._id},
        Userid: {self._userid},
        Task: {self.task},
        Due_date: {self.due_date},
        Priority: {self.priority},
        Details: {self.details},
        Completion Date: {self.completion_date},
        Completion: {self.completion}
        """

    @staticmethod
    def to_dict(queryresults):
        return_result = []
        for queryresult in queryresults:
            insert_dis = queryresult.__dict__
            insert_dis.pop('_sa_instance_state')
            return_result.append(insert_dis)

        return return_result