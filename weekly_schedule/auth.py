from flask import Blueprint, render_template, redirect, request, url_for, flash
from flask_login import login_required, logout_user, login_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from .schema import Family
from . import db

auth = Blueprint('auth', __name__)


@auth.route("/login", methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        family_name = request.form.get('familyName')
        password = request.form.get('password')

        user = Family.query.filter_by(family_name=family_name).first()
        if user:
            if check_password_hash(user.password, password):
                flash('Logged in successfully!', category='success')
                login_user(user, remember=True)
                return redirect(url_for('views.create_schedule'))
            else:
                flash('Incorrect password, try again.', category='error')
        else:
            flash('Family does not exist.', category='error')
    return render_template("auth/login.html", user=current_user)


@auth.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('views.home'))


@auth.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        family_name = request.form.get('familyName')
        password = request.form.get('password')
        confirm_password = request.form.get('confirmPassword')

        user = Family.query.filter_by(family_name=family_name).first()
        if user:
            flash('Family already exists.', category='error')
        elif len(family_name) < 3:
            flash('Family name must be greater than 2 characters.', category='error')
        elif password != confirm_password:
            flash('Passwords don\'t match.', category='error')
        elif len(password) < 7:
            flash('Password must be at least 7 characters.', category='error')
        else:
            new_user = Family(family_name=family_name, password=generate_password_hash(password, method='sha256'))
            db.session.add(new_user)
            db.session.commit()
            login_user(new_user, remember=True)
            flash('Account created!', category='success')
            return redirect(url_for('views.create_schedule'))

    return render_template("auth/register.html",user=current_user)
