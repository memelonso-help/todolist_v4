from xmlrpc.client import Boolean
import sqlalchemy as db
# import psycopg2
from sqlalchemy import Column, String, Integer, ForeignKey, Date, Boolean
from sqlalchemy.orm import Session
from sqlalchemy.ext.declarative import declarative_base

engine = db.create_engine("postgresql://postgres:Schumacher@localhost/postgres")
session = Session(bind=engine)
Base = declarative_base()

class Database():
    def __init__(self):
        self.connection = engine.connect()
        print("DB instance created.")

        # creating tables for user, todotasks and completedtasks
        # handling table constraints: https://www.prisma.io/dataguide/postgresql/column-and-table-constraints
        usertable_statement = """
        CREATE TABLE IF NOT EXISTS userlist (
            id SERIAL UNIQUE PRIMARY KEY, 
            "user" VARCHAR(20) UNIQUE NOT NULL,
            password BYTEA NOT NULL
        );
        """
        self.connection.execute(usertable_statement)
        print("userlist table created!")

        todotaskstable_statement = """
        CREATE TABLE IF NOT EXISTS todotasks (
            id SERIAL UNIQUE PRIMARY KEY,
            user_id INTEGER REFERENCES userlist(id) ON DELETE CASCADE,
            task VARCHAR(200),
            due_date DATE,
            priority INTEGER,
            details VARCHAR(250), 
            completion_date DATE,
            completion BOOLEAN NOT NULL
        );
        """
        self.connection.execute(todotaskstable_statement)
        print("todotasks table created!")

    # a function to check for tables
    def fetchTableQyery(self, tablename):
        self.connection.execute(f"SELECT * FROM {tablename}")

    # gonna add the database interaction functions in backend