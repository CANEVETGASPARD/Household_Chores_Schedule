from flask import Blueprint, render_template, request, jsonify
from flask_login import login_required, current_user

views = Blueprint('views', __name__)

@views.route('/', methods=['GET', 'POST'])
def home():
    return render_template("views/home.html", user=current_user)


@views.route('/create', methods=['GET', 'POST'])
@login_required
def create_schedule():
    if request.method == 'POST':
        membeDic = request.form.to_dict(flat=False)
        print(membeDic)

    return render_template("views/create_schedule.html", user=current_user)

@views.route('/getFamilyMembersData',methods=['GET'])
@login_required
def getFamilyMembersData():
    return jsonify(members = current_user.members)