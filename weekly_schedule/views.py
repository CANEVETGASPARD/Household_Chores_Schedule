from flask import Blueprint, render_template
from flask_login import login_required, current_user

views = Blueprint('views', __name__)


@views.route('/', methods=['GET', 'POST'])
def home():
    return render_template("views/home.html", user=current_user)


@views.route('/create', methods=['GET', 'POST'])
# @login_required
def create_schedule():
    return render_template("views/create_schedule.html", user=current_user)
