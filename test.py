import requests

BASE = "http://127.0.0.1:5000/"

data = [{"nom": "Canevet","prenom": "Gaspard","lundi":3,"mardi":3,"mercredi":3,"jeudi":3,"vendredi":3,"samedi":0,"dimanche":0,"nbrTacheParRepas":2},
        {"nom": "Canevet","prenom": "Antoine","lundi":3,"mardi":3,"mercredi":3,"jeudi":3,"vendredi":3,"samedi":0,"dimanche":0,"nbrTacheParRepas":2},
        {"nom": "Canevet","prenom": "Ethan","lundi":3,"mardi":3,"mercredi":3,"jeudi":3,"vendredi":3,"samedi":0,"dimanche":0,"nbrTacheParRepas":2}]

for i in range(len(data)):
        reponse = requests.put(BASE + "personne/" + str(i), data[i])
        print(reponse.json())
input()
reponse = requests.get(BASE + "personne/0")
print(reponse.json())


