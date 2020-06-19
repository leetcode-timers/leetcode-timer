import * as middy from 'middy';

import {cors, IValidatorOptions, validator} from 'middy/middlewares';
import {httpErrorHandler} from 'middy/middlewares'
import {jsonBodyParser} from 'middy/middlewares'

export const middify = (handler, expectedSchema: IValidatorOptions) => {
    return middy(handler)
        .onError((errorHandler, next) => {
            if (errorHandler.response != null) {
                errorHandler.callback(null, {
                    statusCode: 500,
                    body: JSON.stringify({
                        message: "Whoops. Something went wrong. Try again."
                    })
                })
            }
            next();
        })
        .use(jsonBodyParser())
        .onError((errorHandler, next) => {
            if (errorHandler.response != null)
                errorHandler.callback(null, {
                    statusCode: 500,
                    body: JSON.stringify({
                        message: "Unable to parse the response. Try again."
                    })
                })
            return next();
        })
        .use(httpErrorHandler())
        .use(validator(expectedSchema))
        .onError((errorHandler, next) => {
            let details = []
            for (let detail of errorHandler.error.details) {
                details.push({
                    keyword: detail.keyword,
                    dataPath: detail.dataPath,
                    message: detail.message
                })
            }
            errorHandler.callback(null, {
                statusCode: errorHandler.response["statusCode"],
                body: JSON.stringify({
                    message: errorHandler.error.message,
                    details: details
                })
            })
            return next();
        })
        .use(cors());

}
