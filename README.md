# Governement Inquiry Platform
A REST API base that is written in **NodeJS** using the **Clean Architecture** paradigm.

## Features
- Capability to run on either single threaded mode or cluster mode
- Container for dependency injection
- Router
- Controllers
- Error handler
- Logger
- Request mapper
- Response mapper and a Transformer
- Application Metrics

## Creating a New Project

Clone project (switch to develop branch)
```bash
    https://gitlab.axiatadigitallabs.com/et/digital-telco/dte-telco/template-creation/node.js/basic-templates <project_name>
```

Start by changing following files to suit your needs
- ./app/splash/index.js (Splash message)
- ./package.json (Project details)
- ./README.md

Create the `.env` file by copying `.env.example`

Initialize project
```bash
    npm install
```

## Request Response Cycle
```text
     + -------- +                + ------- +
     | RESPONSE |                | REQUEST |
     + -------- +                + ------- +
          /\                         ||
          ||                         \/
          ||                  + ------------ +  =>  + ---------- +
          ||                  |    Router    |      | Middleware |
          ||                  + ------------ +  <=  + ---------- +
          ||                             ||
          ||                             ||
     + --------------------------- +     ||
     | Transformer | Error Handler |     ||
     + --------------------------- +     ||
                                /\       ||
                                ||       \/
                            + -------------- +  =>  + -------------------- +
                            |   Controller   |      | Unpacker | Validator |
                            + -------------- +  <=  + -------------------- +
                                /\       ||
                                ||       \/
                            + -------------- +
                            |    Use Case    |
                            + -------------- +
                                /\       ||
                                ||       \/
              ______________________________________________
               + ------- +    + ---------- +    + ------- +
               | Adapter |    | Repository |    | Service |
               + ------- +    + ---------- +    + ------- +
                  /\  ||         /\    ||          /\  ||
                  ||  \/         ||    \/          ||  \/
               + ------- +    + ---------- +    + ------- +
               | Library |    |  Database  |    |   APIs  |
               + ------- +    + ---------- +    + ------- +
```

