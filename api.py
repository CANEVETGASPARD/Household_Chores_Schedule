from flask import Flask
from flask_restful import Api, Resource, reqparse, fields, marshal, abort, marshal_with
from flask_sqlalchemy import SQLAlchemy
from os import path

app = Flask(__name__)
api = Api(app)
app.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:///database.db'
db = SQLAlchemy(app)

personnePutArgs = reqparse.RequestParser()
personnePutArgs.add_argument("nom", type=str, help="nom de la personne", required=True)
personnePutArgs.add_argument("prenom", type=str, help="prenom de la personne", required=True)
personnePutArgs.add_argument("nbrTacheParRepas", type=int, help="nombre de tache à effectuer lors du repas",
                             required=True)
personnePutArgs.add_argument("lundi", type=int, help="repas de lundi", required=True)
personnePutArgs.add_argument("mardi", type=int, help="repas de mardi", required=True)
personnePutArgs.add_argument("mercredi", type=int, help="repas de mercredi", required=True)
personnePutArgs.add_argument("jeudi", type=int, help="repas de jeudi", required=True)
personnePutArgs.add_argument("vendredi", type=int, help="repas de vendredi", required=True)
personnePutArgs.add_argument("samedi", type=int, help="repas de samedi", required=True)
personnePutArgs.add_argument("dimanche", type=int, help="repas de dimanche", required=True)

ressourceFields = {
    "personneId": fields.Integer,
    "nom": fields.String,
    "prenom": fields.String,
    "repasSemaine": {"lundi": fields.Integer, "mardi": fields.Integer, "mercredi": fields.Integer,
                     "jeudi": fields.Integer,
                     "vendredi": fields.Integer, "samedi": fields.Integer, "dimanche": fields.Integer},
    "nbrTacheParRepas": fields.Integer
}



class PersonneDataBase(db.Model):
    personneId = db.Column(db.Integer, primary_key=True)
    nom = db.Column(db.String(100), nullable=False)
    prenom = db.Column(db.String(100), nullable=False)
    nbrTacheMin = db.Column(db.Float, nullable=False)
    lundi = db.Column(db.Integer)
    mardi = db.Column(db.Integer)
    mercredi = db.Column(db.Integer)
    jeudi = db.Column(db.Integer)
    vendredi = db.Column(db.Integer)
    samedi = db.Column(db.Integer)
    dimanche = db.Column(db.Integer)

    def __repr__(self):
        return f"PersonneDataBase(personneId={self.personneId}, nom={self.nom}, prenom={self.prenom}, nbrTacheMin={self.nbrTacheMin}," \
               f" lundi={self.lundi}" f"mardi={self.mardi}, mercredi={self.mercredi}, jeudi={self.jeudi}, " \
               f"vendredi={self.vendredi}, samedi={self.samedi}, dimanche={self.dimanche})"


def create_data_base(app):
    if not path.exists('database.db'):
        db.create_all(app=app)


def computeNbrTacheMin(repasSemaine, nbrTacheParRepas):
    nbrRepasSemaine = 0  # boucle pour calculer le nombre de repas dans la semaine
    for day in repasSemaine:
        if (repasSemaine[day] < 3 and repasSemaine[day] > 0):
            nbrRepasSemaine += 1
        elif (repasSemaine[day] == 3):
            nbrRepasSemaine += 2

    return nbrRepasSemaine / nbrTacheParRepas


class PersonneAPI(Resource):
    @marshal_with(ressourceFields)
    def get(self, personneId):
        result = PersonneDataBase.query.filter_by(personneId=personneId).first()
        return result

    @marshal_with(ressourceFields)
    def put(self, personneId):
        args = marshal(personnePutArgs.parse_args(), ressourceFields)
        result = PersonneDataBase.query.filter_by(personneId=personneId).first()
        if result:
            abort(409, message="personne id taken...")
        nbrTacheMin= computeNbrTacheMin(args['repasSemaine'], args['nbrTacheParRepas'])
        personne = PersonneDataBase(personneId=personneId, nom=args["nom"], prenom=args["prenom"],
                                    nbrTacheMin=nbrTacheMin,
                                    lundi=args['repasSemaine']["lundi"], mardi=args['repasSemaine']["mardi"],
                                    mercredi=args['repasSemaine']["mercredi"], jeudi=args['repasSemaine']["jeudi"],
                                    vendredi=args['repasSemaine']["vendredi"], samedi=args['repasSemaine']["samedi"],
                                    dimanche=args['repasSemaine']["dimanche"])
        db.session.add(personne)
        db.session.commit()
        return personne, 201


api.add_resource(PersonneAPI, "/personne/<int:personneId>")

create_data_base(app)

if __name__ == "__main__":
    app.run(debug=True)
