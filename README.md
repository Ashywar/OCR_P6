<h1 align="center">JUST STREAM IT -  OpenClassRooms Project 06 </h1>
<br>

## OVERVIEW
Beta version of a web application allowing to view in real time a classification of films(IMBs) with a REST API application
<br>
<br>
This locally-executable API can be installed and executed from  http://localhost:8000/api/v1/titles/ using the following steps.
## INSTALLATION
Start by closing the repository :
```
git clone https://github.com/Ashywar/OCR_P6.git
```
Start by cloning The OCMovies-API project
```
git clone https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR.git
```
Start access the project folder

## for Windows
Create a virtual environment
```
python -m venv env
```
Enable the virtual environment
```
cd env/scripts
source activate
```

## for Linux or macOS
Create a virtual environment 
```
python3 -m venv env
```
Activate the virtual environment with 
```
source env/bin/activate 
```
## . . . 
Install the python dependencies to the virtual environment
```
pip install -r requirements.txt
```
Create and populate the project database with  
```
python manage.py create_db
```

## LAUNCH 
Run the server
```
python manage.py runserver 
```
Launch index.html

