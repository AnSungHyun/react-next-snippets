# 1. Node.js의 공식 이미지를 기반으로 합니다.
FROM node:22

# 2. 작업 디렉토리를 설정합니다.
WORKDIR /app

# 3. package.json과 package-lock.json 파일을 복사합니다.
COPY package*.json ./

# 4. 의존성을 설치합니다.
RUN npm install

# 5. 애플리케이션 소스 코드를 복사합니다.
COPY . .

# 6. Next.js 애플리케이션을 빌드합니다.
RUN npm run build

# 7. 컨테이너가 사용할 포트를 설정합니다.
EXPOSE 3000

# 8. 애플리케이션을 실행합니다.
CMD ["npm", "start"]