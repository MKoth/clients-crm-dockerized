# serftopia

##### 1. Start development project run
```bash
sudo docker-compose up --build
sudo docker-compose exec web python manage.py migrate --noinput
sudo docker-compose exec web python3 manage.py createsuperuser
sudo docker-compose exec web python3 manage.py test
```

##### 2. Launch development project by opening this in your browseer

backend at: http://localhost:8000/
website at: http://localhost:3001/
widget  at: http://localhost:9000/

##### 1. Start production project build
```bash
# to delete all volumes so build folder will be empty before build (CAUTION, it will remove your database!!!)
sudo docker-compose -f docker-compose.prod.yml down -v
# or to delete just website builded files to update just those volumes use
sudo docker volume rm serftopia-combined_front_volume
sudo docker volume rm serftopia-combined_widget_volume
# to see list of volumes use below command, since names of volumes can be different
sudo docker volume ls
# And finally build
sudo docker-compose -f docker-compose.prod.yml up -d --build
# Run database migration
sudo docker-compose -f docker-compose.prod.yml exec web-prod python manage.py migrate --noinput
# Collect static files
sudo docker-compose -f docker-compose.prod.yml exec web-prod python manage.py collectstatic --no-input --clear
# Create super user
sudo docker-compose -f docker-compose.prod.yml exec web-prod python manage.py createsuperuser
```

##### 2. Launch development project

backend at: http://localhost:1337/
website at: http://localhost/

##### To kill ports blocking processes on Linux
```bash
sudo netstat -lntup | grep :5432<-(port number)
sudo kill -9 1398<-(pid number)
```