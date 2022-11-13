# Household Chores Schedule

<p>Small algorithm that generates household chores schedules for your family.
Currently, we are only able to create one schedule and to print it.
Next step will be to create a simple interface. It will simplify the usability of the algorithm and give the possibility to save your schedule</p>


## Run

To start the project you need to run commands below:

start python virtual environment
```console
source venv/bin/activate
```

build the project first
```console
npm run build
```

Init FLASK_APP variable and run flask
```console
#on linux/mac
export FLASK_APP=weekly_schedule
flask run
```
```console
#on window
set FLASK_APP=weekly_schedule
flask run
```

## Dependencies

For current jest version we need node 14+
You can use commands below to update your node version:
```console
npm install -g n
n stable
```