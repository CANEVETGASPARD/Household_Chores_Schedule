from Groupe import Groupe
import pandas as pd
import numpy as np

class Tableau():

    def __init__(self, nbrJour, nbrRepasParJour, nbrTacheParRepas, nbrPersonnes):
        self.nbrJour = nbrJour
        self.nbrRepasParJour = nbrRepasParJour
        self.nbrTacheParRepas = nbrTacheParRepas
        self.groupe = Groupe(nbrPersonnes, nbrTacheParRepas)
        self.tableau = pd.DataFrame()

    def getNbrJour(self):
        return self.nbrJour

    def getNbrRepasParJour(self):
        return self.getNbrRepasParJour

    def getNbrTacheParRepas(self):
        return self.nbrTacheParRepas

    def getGroupe(self):
        return self.groupe

    def getTableau(self):
        return self.tableau

    def setTableau(self, newTableau):
        self.tableau = newTableau

    def setValeurTableau(self, i, j, newValeur):
        self.tableau.iloc[i, j] = newValeur

    def initTableau(self):
        init = True
        dic = {}
        rowName = []  # variable pour les lignes
        nbrRow = self.nbrRepasParJour * self.nbrTacheParRepas
        repas = 0
        for i in range(nbrRow):
            if (i < (nbrRow / 2)):
                repas = 1  # pour savoir à quel repas on est
            else:
                repas = 2

            if (i % 2 == 0):  # pour remplir la liste index qui représente les instance de repas
                rowName.append("Cuisiner le repas")
            else:
                rowName.append("Faire la vaisselle")
            for jour in ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"]:
                if (init):
                    dic[jour] = [self.findProperName(jour, repas)]
                else:
                    dic[jour].append(self.findProperName(jour, repas))
            init = False
        self.setTableau(pd.DataFrame(dic, index=rowName))

    def findProperName(self, jour, repas):
        personneName = None
        for i in range(self.groupe.getNbrPersonne()):
            personne = self.groupe.getPersonnes()[i]
            for j in range(len(personne.getRepasSemaine())):
                if (jour == personne.getRepasSemaine()[j][0].lower() and (
                        (repas == personne.getRepasSemaine()[j][1]) or (personne.getRepasSemaine()[j][1] == 3))):
                    personneName = personne.getPrenom()
        return personneName

    def findNewName(self, jour, repas, currentPersonneName):
        personneName = currentPersonneName
        newName = []
        for i in range(self.groupe.getNbrPersonne()):
            personne = self.groupe.getPersonnes()[i]
            if (currentPersonneName != personne.getPrenom()):
                for j in range(len(personne.getRepasSemaine())):
                    if (jour == personne.getRepasSemaine()[j][0].lower() and (
                            (repas == personne.getRepasSemaine()[j][1]) or (personne.getRepasSemaine()[j][1] == 3))):
                        newName.append(personne.getPrenom())
        if (len(newName) > 0):
            personneName = newName[np.random.randint(0, len(newName))]

        return personneName

    def calculNbrTachePersonne(self):
        dicNbrTache = {}
        for i in range(len(self.tableau.columns)):
            for j in range(len(self.tableau.index)):
                prenom = self.tableau.iloc[j, i]
                present = False
                for key in dicNbrTache:
                    if (key == prenom):
                        present = True
                if (present):
                    dicNbrTache[prenom] += 1
                else:
                    if (prenom != None):
                        dicNbrTache[prenom] = 1
        return dicNbrTache

    def calculCout(self):
        count = 0
        dicNbrTachePersonnes = self.calculNbrTachePersonne()
        for i in range(self.groupe.getNbrPersonne()):
            prenom = self.groupe.getPersonnes()[i].getPrenom()
            nbrTacheMin = self.groupe.getPersonnes()[i].getNbrTacheMin()
            nbrTache = 0
            for key in dicNbrTachePersonnes:
                if (prenom == key):
                    nbrTache = dicNbrTachePersonnes[key]
            count += (nbrTache - nbrTacheMin) ** (2)
        return count

    def heuristic(self, n):
        minCout = self.calculCout()
        minTableau = self.tableau.copy(deep=True)
        for k in range(n):
            i = np.random.randint(0, self.nbrRepasParJour * self.nbrTacheParRepas)
            j = np.random.randint(0, self.nbrJour)

            repas = 2  # on part du principe qu'on est l'aprem
            if (i < self.nbrTacheParRepas):  # on regarde si on traite le repasa du matin
                repas = 1
            jour = list(self.getTableau().columns)[j]
            newName = self.findNewName(jour, repas, self.tableau.iloc[i, j])
            self.setValeurTableau(i, j, newName)
            cout = self.calculCout()
            if (cout < minCout):
                minTableau = self.tableau.copy(deep=True)
        self.setTableau(minTableau)

if __name__ == "__main__" :
    Table = Tableau(7, 2, 2, 5)
    Table.initTableau()
    for i in range(3): #permet d'effectuer plusieurs fois l'heuristic
        Table.heuristic(500)
    print(Table.getTableau())
    print("Tache : ",Table.calculNbrTachePersonne())
    print("Cout : ",Table.calculCout())