Docs

/*Login*/

POST URL:3087/auth/login

usuario
senha

/*Consulta todos usuarios*/

GET URL:3087/usuarios

/*Consulta clientes*/

GET URL:3087/clientes

/*Consulta cliente por codigo*/

GET URL:3087/cliente/:codigo

/*Consulta visitas*/

GET URL:3087/visitas

/*Consulta visita por codigo*/

GET URL:3087/visita/:codigo

/*Consulta visita do cliente*/

GET URL:3087/visita_cliente/:codigo

/*Consulta clientes do usuario*/

GET URL:3087/cliente_usuario/:codigo

/*Cadastra clientes*/

POST URL:3087/clientes

usuario
nome
razao
cnpj
obs
status

/*Cadastra usuario*/

POST URL:3087/usuarios

usuario
senha
nome
sobrenome
adm

/*Cadastra visitas*/

POST URL:3087/visitas

cliente
data
descricao
obs

/*Edita usuario*/

PUT URL:3087/usuario/:codigo

usuario
senha
nome
sobrenome
adm

/*Edita cliente*/

PUT URL:3087/cliente/:codigo

usuario
nome
razao
cnpj
obs
status

/*Edita Visita*/

PUT URL:3087/visita/:codigo

cliente
data
descricao
obs

/*Exclui usuario*/

DELETE URL:3087/usuario/:codigo

/*Exclui cliente*/

DELETE URL:3087/cliente/:codigo

/*Exclui visita*/

DELETE URL:3087/visita/:codigo