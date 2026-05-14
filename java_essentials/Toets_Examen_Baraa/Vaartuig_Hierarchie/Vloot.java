package Toets_Examen_Baraa.Vaartuig_Hierarchie;


public class Vloot {



}
Tussentijds Deel 2: Implementatie t.e.m. Module 8 (Remotely Proctored)
Gestart: 21 apr op 9:45
Toetsinstructies
Algemene richtlijnen
Lees de opgave aandachtig. Indien er onduidelijkheden zijn, kan je je richten tot de docent.
Tijdens het examen is enkel je studentenkaart en schrijfgerief (zonder pennenzak) toegelaten op en in de buurt van je examenplaats. Boekentassen en jassen, mobiele telefoons, horloges (ook analoge) en andere middelen worden gedeponeerd vooraan in het lokaal, ver buiten je bereik.
Het gebruik van andere hulpmiddelen of bronnen buiten eigen kennis kan aanleiding geven tot een tuchtmaatregel zoals beschreven in de algemene examenregeling.
Dit is een gesloten boek examen en jullie mogen geen andere sites/documenten/eerder geschreven code/… gebruiken.
De enige uitzondering op bovenstaande regel is de officiële Javadoc (OPGEPAST: Laat de test open staan in dit tabblad):
Javadoc 25
https://docs.oracle.com/en/java/javase/25/docs/api/index.html
AI-coding tools en plugins (zoals GitHub Copilot) zijn niet toegelaten.
Als inzending hebben we je volledige project nodig als zip.
Neem bij storing of problemen direct contact op met de docent of bijzitter.


Let op: Dit is een getimede toets. Je kunt jouw resterende tijd tijdens het afleggen van de toets wanneer dan ook controleren door op de combinatie toetsen SHIFT, ALT, en T...te drukken. Nogmaals op: SHIFT, ALT, en T...

Vraag markeren: Vraag 1
Vraag 120 punten
Kader:
Je ontwikkelt een systeem voor een havenautoriteit die het brandstofverbruik en de lading van schepen in de Straat van Hormuz monitort. Je moet een applicatie bouwen die schepen kan groeperen en het totale verbruik kan berekenen.

        Deel 1: Vaartuig Hiërarchie
Maak een klasse Vaartuig. Een Vaartuig heeft een registratiecode (String) en een dagverbruik in liters (integer).

Het mag niet mogelijk zijn een rechtstreekse instantie aan te maken van Vaartuig, maar wel van zijn subklassen.

Bij het aanmaken van een Vaartuig moeten de registratiecode en het verbruik altijd worden meegegeven.

Voorzie de volgende overervende klassen:

Vrachtschip: Bevat een type dat enkel één van de volgende waarden mag aannemen: CONTAINER, TANKER, BULK. Gebruik hiervoor een enumeratie.

Passagiersschip: Bevat een aantal dekken (integer).

Yacht: Bevat een eigenaar (tekst).

Maak een interface Identifiable die de methode sendSignal() verplicht. Zorg dat Yacht deze interface implementeert (je mag de methode leeg laten).

Test je code door in de main één vrachtschip en twee passagiersschepen aan te maken.

        Deel 2: Collections & Sortering
Maak een klasse Vloot die ook Identifiable implementeert. Deze klasse bevat een Collection van Passagiersschepen. Zorg ervoor dat deze collectie automatisch gesorteerd wordt op basis van het aantal dekken, wat ook de standaard (natuurlijke) manier van ordenen moet zijn.

Voorzie een methode berekenVlootVerbruik() die het totale verbruik van alle schepen in de vloot samen teruggeeft.

Test je code door de twee passagiersschepen uit Deel 1 toe te voegen aan een vloot-object en print het totale verbruik.

Deel 3: Logistiek Beheer
Maak een klasse MonitoringsZone. Een zone heeft een zonecode, een naam (bijv. "Sector Noord") en een lijst van Vaartuigen.

Deze lijst mag duplicate elementen bevatten.

Zorg ervoor dat twee zones als gelijk (equals) worden beschouwd wanneer hun zonecode en naam identiek zijn.

Geef MonitoringsZone de volgende twee methoden:

geefVerbruikPerSchip: Deze methode krijgt een registratiecode mee en stuurt het verbruik van het bijbehorende vaartuig terug. Indien de code niet aanwezig is in de zone, gooit de methode een VaartuigNietGevondenException.

        archiveerZoneData: Deze methode schrijft het volledige MonitoringsZone-object weg naar de schijf (Serialisatie).

Test dit deel door een zone aan te maken met een vrachtschip en een passagiersschip. Gebruik daarna de archiveer-methode om de data op te slaan in een bestand.