
# Aplikacja z Kursu MegaK

Demo aplikacji znajduje się pod [tym linkiem](https://heroku-mega-movies-7f0a83e16a34.herokuapp.com/).



## movies-downloader
- **Opis:** Mini projekt napisany w zwykłym JavaScript, który zasila bazę danych MongoDB informacjami o filmach z serwisu [The Movie DB](http://themoviedb.org).
- **Konfiguracja:** Aby poprawnie działał, należy ręcznie ustawić adres do bazy MongoDB oraz podać klucz API do serwisu z filmami.
- **Plik konfiguracyjny:** Spójrz do pliku `./movie-downloader/movie-service.js` dla więcej szczegółów.

## mega-movies (ta aplikacja jest wyhostowana w demo)
- **Opis:** web api napisane za pomocą NestJs które łączy się z bazą mongo i hostuje dane o filmach
- **Szczegóły:** adresy endpointów:

### /movies 
- hostuje podstawowe dane o filmach. przy pomocy parametrów query można filtrować dane po języku, kraju o radzaju filmy

- parametry query: genre, language, country

- dodatkowo zaimplementowana jest funkcjonalność pagingu podając dodatkowe parametry query: page (domyślnie 1) oraz limit (domyślnie 10)

### /meta-data/genres 
- zwraca wszystkie rodzaje filmów
### /meta-data/languages 
- zwraca wszystkie języki filmów
### /meta-data/countries 
- zwraca wszystkie kraje filmów

## mega-movies-frontend
- **Opis:** jest to aplikacja frontendow napisana w ReactJs, która po odpaleniu skryptu 
```bash
$ npm run build:prod 
``````
generuje statyczny content dla serwisu mega-movies. Reprezentuje dane o filmach w postaci tabeli z możliwym stronicowaniem i filtrowaniem oraz przejściem do strony domowej filmu.

## Jak uruchomić
### movies-downloader 
```bash
$ node app.js
``````
### mega-movies
```bash
$ npm run start:local
``````
### mega-movies-frontend
```bash
$ npm run build:prod
``````
-> apka powinna być uruchomiona jako strona głowna projektu mega-movies