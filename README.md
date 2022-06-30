# Brobath_API_v0
Prototyping of an API for BroBath e-commerce (to be used afterwords for a prototype site and a prototype app)

Referências
Super curso de express: https://www.youtube.com/watch?v=K5QaTfE5ylk (foi crucial pra eu conseguir iniciar, sugiro com muita força dar uma olhadinha! :D)

//To Do: Aprender a deixar isso aqui bonitinho :D


#Como rodar:

  1) Clonar esse projeto pro seu diretório preferido
  
  2) Vá pelo terminal na pasta do projeto e execute a linha "npm install"
  
  3) Tenha uma conta no MongoDB. Sugiro o Atlas. É gratuíto e é uma mão na roda!
    link: https://www.mongodb.com/atlas/database
    Pode ser no MongoDB da sua máquina também.
    
  4) Configura o altere o _env pra .env, apague a primeira linha e altere as congfigs de acesso ao MongoDB (veja o link que eu recomendei na linha 5, lá o Matheus Battisti mostra como pegar essas credenciais do MongpDB Atlas. Se tiver usando o da sua máquina, vai ser o seu usuário, senha e no host provavelmente é só colocar "localhost" (sem as aspas) seguido da porta de onde o MongoDB tá disponibilizado (ficaria algo assim localhost:XYZ sendo XYZ a porta disponibilizada pelo MongoDB na sua máquina) - não testei mas creio que funcione XD
  
     Pra porta pode ser a que você quiser, desde que esteja disponível, claro (vai na tentativa e erro... eu fui de 3001 e deu bão!).

  5) Execute no terminal, novamente na pasta raiz de seu projeto, o comando "npm start". Feito isso, dada a porta de você colocou na etapa anterior é a que será usada pra acessar a API. Por exemplo, se você estiver rodando na sua máquina (localhost) pela porta 3001, pra acessar a API é só usar as rotas de localhost:3001, como
      - localhost:3001/person
      - localhost:3001/product

    Eu ainda tenho que fazer um comando pra popular um pouco o BD, então essas rotas vão retornar arrays vazios inicialmente :(

