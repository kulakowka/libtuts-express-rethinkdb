https://github.com/rethinkdb/rethinkdb-example-nodejs-chat/blob/master/app.js

https://www.rethinkdb.com/docs/cookbook/javascript/

а еще можно так сделать:
чуваку отправляем письмо - он там нажимает и авторизуется.
пасвордлесс типа.

чтобы войти - надо ввести email. 

форма отправляет email к нам на POST /api/v1/invite     
мы генерим из этого токен (где зашифровано мыло и куда редиректить) 
и отправляем его в ссылке в письме
чувак нажимает ссылку в письме - попадает к нам на сервер
где мы расшифровываем токен и либо создаем либо вытаскиваем существующего юзера 
затем авторизуем чувака и 


-----
а что если сделать авторизацию как у слака?

чувак вводит мыло - и отправляет его нам
мы генерим токен в который шифруем емейл который ввел пользователь
отправляем на это мыло письмао - со ссылкой на регистрацию с токеном в параметрах
когда чувак заходит по ссылке
мы показываем форму регистрации и точно знаем что мыло подтвердили
дальше чувак сабмитит форму с выбранным логином и паролем (а мы в хиденфилде и токен отправляем)
на сервере разбираем токен и берем от туда емейл и регаем чувака

1. отправляем запрос содеражщий емейл:

```
POST /api/v1/invite     
{
  email: 'kulakowka@gmail.com'
}
```

2. На сервере генерим jwt токен содержащий в себе полезную нагрузку:

```
jwt({
  email: 'kulakowka@gmail.com'
})
```

3. Отправляем email содержащий ссылку для регистрации:

```
/signup?token=ojn4j234jkn2k3n4jk2nk4n2k34nk2n34kj23n4jk23n4
```

4. возвращаем сообщение об успехе

```
{
  message: 'Invite has been sent to you email'
}
```

Когда чувак в письме кликает на ссылк то попадает на 
страницу приложения где есть форма - там он вводит имя пользователя и пароль
нажимает сабмит и приложение отправляет запрос:

```
{
  username: 'kulakowka',
  password: 'pass123',
  token: 'ojn4j234jkn2k3n4jk2nk4n2k34nk2n34kj23n4jk23n4'
}
```

На сервере мы расшифровываем токен и создаем пользователя и точно знаем что мыло настоящее.

```
{
  username: 'kulakowka',
  password: 'pass123',
  email: 'kulakowka@gmail.com'
}
```

## Процесс авторизации
https://github.com/scottksmith95/beerlocker/blob/master/beerlocker-6.2/server.js

1. Для всяческих валидаций можно использовать вот это:
https://github.com/ctavan/express-validator
https://github.com/chriso/validator.js

2. Для авторизации пользователей всеми возможнымми способами:
https://github.com/jaredhanson/passport-http-bearer
https://github.com/jaredhanson/passport-anonymous
https://github.com/jaredhanson/passport-oauth2-client-password
https://github.com/xtuple/oauth2orize-jwt-bearer
https://github.com/jaredhanson/oauth2orize
https://github.com/mjhea0/passport-examples
https://github.com/mjhea0/passport-local-express4
http://mherman.org/blog/2015/01/31/local-authentication-with-passport-and-express-4/#.VuGCtZOdBSM

3. Для контроля доступа пользователей есть вот такие интересные штуки:
https://github.com/tschaub/authorized   !!!!
https://github.com/ForbesLindesay/connect-roles

4. Для обработки ошибок:
https://www.npmjs.com/package/http-errors
https://github.com/expressjs/api-error-handler
https://github.com/expressjs/errorhandler

5. Для безопсности:
https://www.npmjs.com/package/helmet

6. Для компрессии запросов в gzip:
https://www.npmjs.com/package/compression

7. Вот тут исчерпывающая информацию по запуску в продакшене:
http://expressjs.com/en/advanced/best-practice-performance.html

8. Чтобы начать использовать async/await:
https://github.com/mciparelli/co-express
https://github.com/tj/co
