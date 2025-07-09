#!/bin/bash

# 1. GitHub 저장소 클론
git clone https://github.com/AnSungHyun/react-next-snippets.git
cd react-next-snippets

# 2. Dockerfile이 있는 디렉토리로 이동
# (필요한 경우)

# 3. Docker 이미지 빌드
docker build -t my-nextjs-app .

# 4. Docker 컨테이너 실행
docker run -p 3010:3010 my-nextjs-app