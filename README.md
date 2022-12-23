# Household Chores Schedule

<p>Small algorithm that generates household chores schedules for your family.
Currently, we are only able to create one schedule and to print it.
Next step will be to create a simple interface. It will simplify the usability of the algorithm and give the possibility to save your schedule</p>


## Dependencies

to run the project you need docker on your machine

## Run the project

command to build the docker image:

```console
docker build -t household-chores-schedule .
```

command to run docker container:

```console
docker run --name HCS_container -dp 3000:3000 \
    -v household-chores-schedule-db:/Household_Chores_Schedule/instance \
    -v "$(pwd)/weekly_schedule:/Household_Chores_Schedule/weekly_schedule" \
    household-chores-schedule
```

command to compile code within container:

```console
docker exec HCS_container npm run build
```

command to run test within docker container:

```console
docker exec HCS_container npm run test
```