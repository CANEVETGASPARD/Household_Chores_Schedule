from flask import Blueprint, render_template, request, jsonify, flash, redirect, url_for, json
from flask_login import login_required, current_user
from.schema import Member
from . import db

views = Blueprint('views', __name__)

@views.route('/', methods=['GET', 'POST'])
def home():
    return render_template("views/home.html", user=current_user)

def setMemberDayIndexValue(memberDayIndexValue,dayFormOutputList):
    if(len(dayFormOutputList)>1):
        memberDayIndexValue = 3
    else:
        if dayFormOutputList[0] == "lunch":
            memberDayIndexValue = 1
        else:
            memberDayIndexValue = 2
    return memberDayIndexValue

@views.route('/create', methods=['GET', 'POST'])
@login_required
def create_schedule():
    if request.method == 'POST':
        requestDic = request.form.to_dict(flat=False)
        memberName = requestDic['Name'][0]
        memberMonday = 0
        memberTuesday = 0
        memberWednesday = 0 
        memberThursday = 0
        memberFriday = 0
        memberSaturday = 0
        memberSunday = 0
        if len(memberName)>3:
            flash("member name must be smaller than 4 characters",category="error")
        elif len(memberName)<2:
            flash("member name must be greater than 1 characters",category="error")
        else :
            member = Member.query.filter_by(family_id=current_user.id,member_name=memberName).first()
            if member:
                flash('Member already exists.', category='error')
            else:
                if request.form.get('monday'):
                    memberMonday = setMemberDayIndexValue(memberMonday,requestDic['monday'])
                if request.form.get('tuesday'):
                    memberTuesday = setMemberDayIndexValue(memberTuesday,requestDic['tuesday'])
                if request.form.get('wednesday'):
                    memberWednesday = setMemberDayIndexValue(memberWednesday,requestDic['wednesday'])
                if request.form.get('thursday'):
                    memberThursday = setMemberDayIndexValue(memberThursday,requestDic['thursday'])
                if request.form.get('friday'):
                    memberFriday = setMemberDayIndexValue(memberFriday,requestDic['friday'])
                if request.form.get('saturday'):
                    memberSaturday = setMemberDayIndexValue(memberSaturday,requestDic['saturday'])
                if request.form.get('sunday'):
                    memberSunday = setMemberDayIndexValue(memberSunday,requestDic['sunday'])

                newMember = Member(family_id = current_user.id, member_name = memberName, monday = memberMonday, tuesday = memberTuesday, wednesday = memberWednesday, thursday = memberThursday, friday = memberFriday, saturday = memberSaturday, sunday = memberSunday)
                db.session.add(newMember)
                db.session.commit()
                flash('Member created!', category='success')
                return redirect(url_for('views.create_schedule'))

    return render_template("views/create_schedule.html", user=current_user)

@views.route('/getFamilyMembersData',methods=['GET'])
@login_required
def getFamilyMembersData():
    members = Member.query.filter_by(family_id=current_user.id).all()
    familyMembersJson = {}
    for memberIndex in range(len(members)):
        member = members[memberIndex]
        familyMembersJson[member.id] = {
            "memberName" : member.member_name,
            "monday" : member.monday,
            "tuesday" : member.tuesday,
            "wednesday" : member.wednesday,
            "thursday" : member.thursday,
            "friday" : member.friday,
            "saturday" : member.saturday,
            "sunday" : member.sunday
        }
    return familyMembersJson