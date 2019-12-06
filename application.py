#Author:Jordan Montenegro


import os
import requests
import json

from flask import Flask, session,render_template,request
from flask_session import Session
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker

app = Flask(__name__)

# Check for environment variable
if not os.getenv("DATABASE_URL"): #"postgresql://postgres:22121997@localhost/books"
    raise RuntimeError("DATABASE_URL is not set")

# Configure session to use filesystem
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Set up database
engine = create_engine(os.getenv("DATABASE_URL"))
db = scoped_session(sessionmaker(bind=engine))
#isben="038079527"# 

@app.route("/")
def index():
	#return "Project 1: TOD"
	#print( "hola")	
	
	#signin()
	mountains=db.execute("SELECT name,height,location,region FROM montains ").fetchall()
	return render_template("list.html",mountains=mountains)
	

	
@app.route("/list")
def list():
	
	mountains=db.execute("SELECT name,height,location,region FROM montains ").fetchall()
	return render_template("list.html",mountains=mountains)
	
@app.route("/images")
def images():
	return render_template("images.html")
	

