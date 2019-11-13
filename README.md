# Code Challenge

Um meinen Entwicklungsvorgang nachvollziehen zu können, muss der json-server installiert sein.
Run ``npm i json-server``

In der package.json Datei habe ich ein paar Scripte hinzugefügt, um die json-server zu starten.
Wenn ein Server nicht gestartet wurde, so loggt die Konsole einen Error und der jeweilige Container zeigt nur die Überschrift an.
Wenn alle Server gestartet wurden, so zeigen die Container die gewünschten Elemente an.

Die StackOverflow Objekte habe ich in den Containern nur verlinkt. Hier wird nur der Titel angezeigt als Link zur Frage. Die Wetter Daten zeigen das Datum, die Uhrzeit und die Temperatur zu in Grad Celsius an.

FontAwesome wurde eingebunden, sodass die Icons in der Navigationsleiste nun auch angezeigt werden.

Die Searchbar hat eine kleine CSS Anpassung erhalten (css Datei wurde zu scss Datei konvertiert).
Darüber hinaus wurde die "topbar__inner" (Welche das Searchfield beinhaltet)  responsive dargestellt.

Die "weatherdata.json" Datei wurde in den assets Ordner verschoben.

