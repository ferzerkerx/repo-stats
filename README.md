## repo-stats
[![Build Status](https://travis-ci.org/ferzerkerx/repo-stats.svg?branch=master)](https://travis-ci.org/ferzerkerx/lego-work-stream-slack)
[![Quality Gate](https://sonarcloud.io/api/project_badges/measure?project=repo-stats&metric=alert_status)](https://sonarcloud.io/dashboard?id=repo-stats)

Gets additional statistics for github repository: contribution percentage + subject matter expert suggestions based on labels and git commit history

The aggregation and graphics are done using ELK stack

![alt tag](https://raw.githubusercontent.com/ferzerkerx/repo-stats/master/screenshots/repo-stats-1.png) 
![alt tag](https://raw.githubusercontent.com/ferzerkerx/repo-stats/master/screenshots/repo-stats-2.png) 

### Env configurations
````
GITHUB_TOKEN=

ES_HOST=
````


### To use a Dockerized ELK

Please refer to https://elk-docker.readthedocs.io/ , mainly the only thing needed is:
````
sysctl -w vm.max_map_count=262144
docker run -p 5601:5601 -p 9200:9200 -p 5044:5044 -it --name elk sebp/elk
 grep vm.max_map_count /etc/sysctl.conf
````
