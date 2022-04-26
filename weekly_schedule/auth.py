from flask import Blueprint, render_template, redirect, url_for
from flask_login import login_required, logout_user

auth = Blueprint('auth', __name__)


@auth.route("/login", methods=['GET', 'POST'])
def login():
    return render_template("auth/login.html")


@auth.route('/logout')
# @login_required
def logout():
    return redirect(url_for('views.home'))


@auth.route('/register', methods=['GET', 'POST'])
def register():
    return render_template("auth/register.html")
