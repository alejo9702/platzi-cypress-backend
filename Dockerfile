FROM  cypress/base:latest
LABEL authors="alejandrorestrepomunoz"


RUN mkdir /app
WORKDIR /app

COPY . /app

RUN npm install

RUN npm install --save-dev @babel/core @babel/preset-env babel-loader webpack

RUN npx cypress install


CMD ["npm", "run", "allure:report"]