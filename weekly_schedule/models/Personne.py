class Personne():

    def __init__(self, nom, prenom, repasSemaine, nbrTacheParRepas):
        self.nom = nom
        self.prenom = prenom
        self.repasSemaine = repasSemaine  # [(jour,1->le midi ou 2->le soir ou 3-> les deux)]

        nbrRepasSemaine = 0  # boucle pour calculer le nombre de repas dans la semaine
        for i in range(len(repasSemaine)):
            if (repasSemaine[i][1] < 3):
                nbrRepasSemaine += 1
            else:
                nbrRepasSemaine += 2

        self.nbrTacheMin = nbrRepasSemaine / nbrTacheParRepas

    def __str__(self):
        output = 'nom : ' + self.nom + '\n' + 'prenom : ' + self.prenom + '\n' + 'repas : '
        for i in range(len(self.repasSemaine)):
            output += "repas le " + self.repasSemaine[i][0] + " : " + str(self.repasSemaine[i][1]) + ", "
        output += '\n' + 'nombre de tache minimum : ' + str(self.nbrTacheMin)
        return output

    def getNom(self):
        return self.nom

    def getPrenom(self):
        return self.prenom

    def getRepasSemaine(self):
        return self.repasSemaine

    def getNbrTacheMin(self):
        return self.nbrTacheMin

