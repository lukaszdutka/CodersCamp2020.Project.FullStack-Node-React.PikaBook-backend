# CodersCamp 2020 - Projekt końcowy REST API
## **PikaBook** - Gotta read them all!
___


**Mangos Team** presents a system for books exchange. 

    Where users can   finally make their reader's dreams come true. All of us, the readers, are struggling with the same problem - after some time our bookshelves are full of volumes, series of books we've already read. As there are books we want to keep for the life, there are some that were ment to be read only once (We feel sorry for them too). PikaBook can give them second life! Our API allows you to find other people that are willing to adopt your unneeded books in exchange for readings they offers. 

## Used technologies
- Node.js / Express
- REST API
- JWT validation
- NoSQL MongoDB and mongoose
- authorization and authentication with Json Web Token
- jest

## Our team 
* [Aleksandra Cypko](https://github.com/AleksandraCyp)
* [Agata Ludwiczyńska](https://github.com/AgataLudwiczynska)
* [Daria Dziubałtowska](https://github.com/daria305) (Tech Lead)
* [Małgorzata Dziewit](https://github.com/memeraki) (Develepment Manager)
* [Mariusz Smarż](https://github.com/mariusz-sm)

Mentor: [Łukasz Dutka](https://github.com/lukaszdutka)
___
## How to run it
**Local set up**
1. Clone the repo
2. `npm install`
4. update `src/pre-start/env/developement.env` file with your Mongo database creadentials`DB_PASSWORD, DB_USER
5. update `src/pre-start/env/developement.env` file with your Mongo database url and placeholders for credentials, e.g. `mongodb+srv://<USER>:<PASSWORD>@mycluster.example.net`
6. `npm start:dev`

You can also use the production version available **[HERE](???)**

### Registration
To use most of API functionalities, you need to make an account and authorize yourself.

1. Register with `POST /api/users` and provide
```    
    {
        "password":
        "email":
        "name":
        "location":
    }
```
2. Log in using  `POST /api/auth` with
```
    {
        "password":
        "email":
    }
```



