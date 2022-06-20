from enum import unique
from unicodedata import name
from . import db
from flask_login import UserMixin
from sqlalchemy.sql import func


class Family(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True, unique=True)
    family_name = db.Column(db.String(150),unique=True)
    password = db.Column(db.String(150))
    members = db.relationship("Member", backref="family_member", lazy=True)
    calendars = db.relationship("Calendar", backref="family_calendar", lazy=True)


class Member(db.Model):
    id = db.Column(db.Integer, primary_key=True,unique=True)
    family_id = db.Column(db.Integer, db.ForeignKey("family.id"), nullable=False)
    member_name = db.Column(db.String(150), nullable=False)
    monday = db.Column(db.Integer)
    tuesday = db.Column(db.Integer)
    wednesday = db.Column(db.Integer)
    thursday = db.Column(db.Integer)
    friday = db.Column(db.Integer)
    saturday = db.Column(db.Integer)
    sunday = db.Column(db.Integer)
    __table_args__ = (db.UniqueConstraint("family_id","member_name",name="family_member_uc"),)


class Calendar(db.Model):
    id = db.Column(db.Integer, primary_key=True,unique=True)
    family_id = db.Column(db.Integer, db.ForeignKey("family.id"), nullable=False,unique=True)
    created_date = db.Column(db.DateTime(timezone=True), default=func.now())
    title = db.Column(db.String(150), nullable=False)
    monday = db.Column(db.String(150))
    tuesday = db.Column(db.String(150))
    wednesday = db.Column(db.String(150))
    thursday = db.Column(db.String(150))
    friday = db.Column(db.String(150))
    saturday = db.Column(db.String(150))
    sunday = db.Column(db.String(150))
