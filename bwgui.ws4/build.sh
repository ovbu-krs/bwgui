echo "\033[1;30;42m `date +%-D_%-T` удаление старых файлов \033[0m"
rm -f -v *.war
rm -f -r -v web/WEB-INF/classes/*
echo "\033[1;30;42m `date +%-D_%-T` ресурсы новой сборки \033[0m"
tree -s -D
echo "\033[1;30;42m `date +%-D_%-T` сборка классов java начата \033[0m"
javac -d web/WEB-INF/classes -cp /opt/tomcat/lib/servlet-api.jar src/java/org/bwgui/ws2/*.java
echo "\033[1;30;42m `date +%-D_%-T` сборка классов java закончена \033[0m"
echo "\033[1;30;42m `date +%-D_%-T` сборка пакета установки war начата \033[0m"
jar cvfM ./bwgui.ws2.war -C ./web .
echo "\033[1;30;42m `date +%-D_%-T` сборка пакета установки war закончена \033[0m"
echo "\033[1;30;42m `date +%-D_%-T` результат сборки \033[0m"
tree -P *.class'|'*.war -s -D

echo "\033[1;30;42m `date +%-D_%-T` публикуем пакет на сервер приложении \033[0m"
su -c "rm -f -r -v /opt/tomcat/work/Catalina/localhost/bwgui.ws2/"
su -c "rm -f -r -v /opt/tomcat/webapps/bwgui.ws2*"
su -c "cp -f -v *.war /opt/tomcat/webapps/"
echo "\033[1;30;42m `date +%-D_%-T` публикация закончена \033[0m"

