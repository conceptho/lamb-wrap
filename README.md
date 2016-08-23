# Lamb-Wrap λ🌯

## Description
Lamb-wrap is a node module designed for AWS Lambda that wraps the complexity of authentication, permission and model loading and returns a ready to use lambda handler to
be used both at plain [AWS Lambda](https://aws.amazon.com/lambda/details/) or with the [Serverless Framework](http://serverless.com/).

The way lamb-wrap works with the following cycle:
1. Authenticate.
2. Load the requested model.
3. Check permission for the requested operation.
4. Filter provided inputs based on permissions.
5. Execute a body function.
6. Filter response attributes based on permissions.
7. Returns the response as JSON.

The main goal of this module is to provide a starting point where the the developer only needs
to focus in model rules and override a few methods to have a representation of the desired resources.

## Example
A good example of lamb-wrap usage can be found at [this repository](https://github.com/conceptho/lamb-wrap-mongoose-example) that handles a creation of a new user
to the platform.
## Documentation
### Instalation
Due the methods that serverless framework creates an endpoint and it's tamplates we have two ways of initializing lamb-wrap in a project.
#### Plain AWS lambda
TODO: Descrever como fazer usando apenas aws lambda, ou seja, configurando os templates do endpoint manualmente no AWS Console.
#### Serverless framework 
TODO: Descrever como fazer serverless, ou seja, configurando os templates do endpoint na configuração s-function.

### Usage
TODO: Huge topic

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
