from Personne import Personne

class Groupe():

    def __init__(self, nbrPersonne, nbrTacheParRepas):
        self.nbrPersonne = nbrPersonne
        self.personnes = []
        for i in range(nbrPersonne):
            nom = input("nom de la personne " + str(i + 1) + " :")
            prenom = input("prenom de la personne " + str(i + 1) + " :")

            nbrJourValid = True
            while (nbrJourValid):  # boucle pour verrifier que le nombre rentrer est valide
                integer = False
                while (not integer):  # boucle pour verrifier que l'on a un entier
                    try:
                        NbrjourSemaine = int(
                            input("nombre de jour de présence de la personne " + str(i + 1) + " dans la semaine :"))
                        integer = True
                    except ValueError:
                        print("Vous devez rentrer un entier")

                if (NbrjourSemaine > 0 and NbrjourSemaine < 8):
                    nbrJourValid = False
                else:
                    print("Vous devez rentrer un nombre de jour de présence entre 1 et 7")

            RepasSemaine = []
            for j in range(NbrjourSemaine):
                jourValid = True
                while (jourValid):  # boucle pour verifier que l'ecriture du jour est valide
                    jour = input("Nom du jour " + str(j + 1) + " :").lower()
                    if (jour not in ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"]):
                        print("vous devez rentrer un jour valide")
                    else:
                        jourValid = False

                nbrRepasValid = True
                while (nbrRepasValid):  # boucle pour verifier que le nombre de repas dans le journée est valide
                    integer = False
                    while (not integer):
                        try:
                            nbrRepas = int(input(
                                "nombre de repas le " + jour + ". Vous devez rentrer un nombre repas dans la journée égal à 1 si vous êtes là que le midi, 2 si vous êtes là que le soir et 3 si vous êtes là pour les deux repas : "))
                            integer = True
                        except ValueError:
                            print("Vous devez rentrer un entier")

                    if (nbrRepas > 0 and nbrRepas < 4):
                        nbrRepasValid = False
                    else:
                        print(
                            "vous devez rentrer un nombre repas dans la journée égal à 1 si vous êtes là que le midi, 2 si vous êtes là que le soir et 3 si vous êtes là pour les deux repas ")

                RepasSemaine.append((jour, nbrRepas))
            self.personnes.append(Personne(nom, prenom, RepasSemaine, nbrTacheParRepas))

    def __str__(self):
        output = "Nombre de personne : " + str(self.nbrPersonne) + '\n' + "Personnes :"
        for i in range(len(self.personnes)):
            output += '\n' + self.personnes[i].__str__()
        return output

    def getNbrPersonne(self):
        return self.nbrPersonne

    def getPersonnes(self):
        return self.personnes


