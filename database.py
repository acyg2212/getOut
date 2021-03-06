from backend.models import User, Activity
from backend import app, db
from dotenv import load_dotenv
load_dotenv()


with app.app_context():
    db.drop_all()
    db.create_all()

    ian = User(firstName="Ian",
               lastName="Tester",
               username='Ian',
               email='ian@aa.io',
               password='password')
    # javier = User(username='Javier', email='javier@aa.io', password='password')
    # dean = User(username='Dean', email='dean@aa.io', password='password')
    # angela = User(username='Angela', email='angela@aa.io', password='password')
    # soonmi = User(username='Soon-Mi', email='soonmi@aa.io',
    #               password='password')
    # alissa = User(username='Alissa', email='alissa@aa.io', password='password')
    biking = Activity(activity="Biking")
    boating = Activity(activity="Boating")
    camping = Activity(activity="Camping")
    hiking = Activity(activity="Hiking")
    db.session.add(ian)
    db.session.add(biking)
    db.session.add(boating)
    db.session.add(camping)
    db.session.add(hiking)
    # db.session.add(javier)
    # db.session.add(dean)
    # db.session.add(angela)
    # db.session.add(soonmi)
    # db.session.add(alissa)

    db.session.commit()
