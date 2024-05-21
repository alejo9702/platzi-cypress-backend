FROM  cypress/base:latest
LABEL authors="alejandrorestrepomunoz"

RUN mkdir /app
WORKDIR /app

COPY . /app
RUN npm install --legacy-peer-deps
#esto se necesita porque no detecta estas peer dependencies
RUN npm install --save-dev @babel/core @babel/preset-env babel-loader webpack
#algunas veces porque de rpeente falla el build
RUN npx cypress install


RUN $(npm bin)/cypress verify

CMD ["npm", "run", "allure:report:docker"]