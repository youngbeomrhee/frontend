#!/usr/bin/env bash


# container 실행
docker container run ubuntu:latest /bin/echo 'Hello world'


docker version


docker system info


# disk 이용현황
docker system df


# image 당겨오기
docker pull nginx


#image 확인
docker image ls


# container 구동
docker container run --name webserver -d -p 80:80 nginx


# 접속확인
curl http://localhost


# container 상태확인
docker container ps


# container 상세 확인
docker container stats webserver


# container 정지
docker stop webserver


# container 시작
docker start webserver

# image 당겨오기 - 이름[:버젼]
docker image pull centos:7

# image 당겨오기 - 이름에 해당하는 전부
docker image pull -a centos


# image 당겨오기 - url 지정
docker image pull gcr.io.tensorflow/tensorflow


# image 목록 조회 [요약정보]
docker image ls [--digests]

# DCT(Docker Content Trust) 활성화
export DOCKER_CONTENT_TRUST=1

# DCT(Docker Content Trust) 비활성화
export DOCKER_CONTENT_TRUST=0


# image 상세정보 표시
docker image inspect centos:7


# JSON format에서 원하는 정보 추출
docker image inspect --format="{{ .ContainerConfig.Image}}" centos:7


# image에 tag 붙이기
docker image tag centos whybe/centos:1.0


# image 검색 [options]
docker search [--filter=stars=1000] nginx
docker search --filter "is-official=true" --filter "stars=10000" nginxb


# image 삭제 [repository[version]] [image id]
docker image rm centos:7
docker image rm 1e1148e4cc2c


# 사용하지 않는 모든 image 삭제
docker image prune


# hub 로그인
docker login


# hub에 push
docker image push whybe/webserver:1.0


# hub 로그아웃 [서버명]
docker logout


# container 실행
docker container run -it --name "test1" centos /bin/cal
docker container run -it --name "test2" centos /bin/bash


# container 백그라운드 실행 -d(detach)
docker container run -d centos /bin/ping localhost


# container logs 확인 [timestamp]
# docker container ls 를 통해 container id 확인 후
docker container logs -t 7216d4726a33


# container 시작시에 재시작 옵션 설정
docker container run -it --restart=always centos /bin/bash


# run network 설정
# port mapping
docker container run -d -p 8080:80 nginx


# dns 지정
docker container run -d --dns 192.168.1.1 nginx


# mac address 지정
docker container run -d --mac-address="92:d0:c6:0a:29:33" centos


# container에 지정된 mac address 확인
docker container inspect --format="{{ .Config.MacAddress}}" 20d1d


# host name과 ip 지정
docker container run -it --add-host test.com:192.168.1.1 centos

# hostname 지정
docker container run -it --hostname www.test.com --add-host node1.test.com:192.168.1.1 centos


# container에서 확인
cat /etc/hosts


# user-defined network 생성
docker network create -d bridge webap-net


# user-defined network 사용하여 container run
docker container run --net=webap-net -it centos


# 자원을 지정하여 container run
docker container run --cpu-shares=512 --memory=1g centos


# volume 공유
docker container run -v /Users/asa/webap:/usr/share/nginx/html nginx


# 환경변수 지정
docker container run -it -e foo=bar centos /bin/bash
## container에서 환경변수 확인
set | grep foo


# 특정 파일에서 일괄 등록
vi env_list -> 파일 생성
docker container run -it --env-file=env_list centos /bin/bash


# 작업 디렉토리 설정
docker container run -it -w=/tensorflow centos /bin/bash
## container에서 확인
pwd


# container 목록 확인
## 이름이 일치하는 목록만 filter
docker container ls -a -f name=test1
## 이름이 일치하는 가동여부 filter
docker container ls -a -f exited=0
## 출력형식 지정
docker container ls -a --format "{{.Names}}: {{.Status}}"
## 표(table) 형식으로 출력
docker container ls -a --format "table {{.Names}}\t{{.Status}}\t{{.Mounts}}"


# container 상태(stats) 확인
docker container stats webserver


# process 확인
docker container top webserver


# container 시작
docker container start $container_id$


# container 중지 [일정 시간(초) 이후]
docker container stop -t 2 $container_id$


# container 재시작 [일정 시간(초) 이후]
docker container restart -t 2 $container_id$


# container 삭제
docker container rm e91f53a268db


# 사용하지 않는 container 일괄 삭제
docker container prune


# 일시정지
docker container pause webserver


# 일시정지 재개
ocker container unpause webserver


# network 목록조회 [id만 조회][filter]
docker network ls [-q] [--filter driver=bridge]


# network 설정하지 않고 container 시작시에는 default로 bridge 네트워크로 시작
docker container run -itd --name=sample ubuntu:latest
## network ID 확인
docker container inspect sample --format "{{.NetworkSettings.Networks.bridge.NetworkID}}"


# bridge network 생성
docker network create --driver=bridge web-network


# bridge network 조회
docker network ls --filter driver=bridge


# network에 container 연결
docker network connect web-network webserver


# container 시작시에 network 지정
docker container run -itd --name=webap --net=web-network nginx


# network 연결 해제
docker network disconnect web-network webserver
## 연결 해제 확인
docker container inspect webserver --format "{{.NetworkSettings.Networks}}"


# network 상세정보 확인
docker network inspect web-network


# network 삭제
docker network rm web-network


# container 접속
docker container attach sample


# 실행중인 container에서 다른 명령 실행
docker container exec -it webserver /bin/bash
docker container exec -it webserver /bin/echo "Hello world"


# 실행중인 container process 확인
docker container top webserver


# 실행중인 container port forwarding 확인
 docker container port webserver


# container 이름 변경
docker container rename confident_galileo shame_galileo


# container의 파일 복사(container to host)
docker container cp webserver:/etc/nginx/nginx.conf /tmp/nginx.conf
## 확인
ll /tmp/

# container의 파일 복사(host to container)
docker container cp /tmp/nginx.conf webserver:/tmp/nginx_old.conf
## 확인
docker container exec -it webserver ls /tmp


# 변경사항 발생
docker container exec -it webserver /bin/bash
root@3d48f0d99625:/# useradd newuser
root@3d48f0d99625:/# exit


# 변경사항 확인
docker container diff webserver


# container로부터 image 생성
docker container commit -a "ASA SHIHO" websesrver asashiho/webfront:1.0 sha256:$container id$
## 생성된 image 확인
docker image inspect asashiho/webfront:1.0


# 이미지 tar 파일로 저장
docker image save -o webfront_latest.tar asashiho/webfront


# tar 파일로부터 이미지 생성
cat webfront_latest.tar | docker image import - asashiho/webfront:1.1
## 이미지 확인
docker image ls


# tar파일로부터 image load
docker image load -i webfront_latest.tar


# container export tar
docker container export webserver >export_webserver.tar
## 압축해제
tar xvf export_webserver.tar -C $directory$


# image
docker image save -o save.tar nginx
# image 압축해제
tar xvf save.tar -C $directory$


# 불필요한 image/container 일괄 삭제
docker system prune


# Dockerfile 생성
mkdir sample && cd $_
touch Dockerfile
vi Dockerfile


# 아래 내용 추가
## 베이스 이미지 설정
FROM centos:centos7


# Dockerfile로부터 image build
docker build -t sample:1.0 ./
## image 생성 확인
docker image ls


# 새로운 image로 build
docker build -t sample:2.0 /home/yb/sample


# 새로운 image로 build시 빌드파일 지정
docker build -t sample:3.0 -f /home/yb/sample/Dockerfile ./


# 표준입력을 사용한 build
docker build - < ./sample/Dockerfile
docker build - < ./sample/docker.tar.gz




#
docker build -t sample ./sample/


docker build -t greet .


docker container run -it --rm greet asa
docker container run -it --rm greet --lang=es asa















