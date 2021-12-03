console.log('=========emailverify comming')
const aws = require('aws-sdk');


const checkEmailVerifyOnSes = async function(email) {
    console.log(email)
    let status = false;
    const SES_CONFIG = {
        accessKeyId: 'AKIAUXXM7YQHCWJSBMMQ',
        secretAccessKey: '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',
        region: 'us-east-1',
    };
    const ses = new aws.SES(SES_CONFIG);
    var params = {
        Identities: [
            email
        ]
    };
    return new Promise((resolve, reject) => {

        ses.getIdentityVerificationAttributes(params, function(err, data) {
            if (err) {
                status = false;
            } // an error occurred
            else {
                console.log(data);
                if (Object.keys(data.VerificationAttributes).length === 0) {
                    status = false;
                } else if (data.VerificationAttributes && data.VerificationAttributes[email].VerificationStatus == 'Success') {
                    status = true;
                } else {
                    status = false;
                }
                resolve(status);
            } // successful response

        });
    })
}



console.log(checkEmailVerifyOnSes('aasifkhan78654@gmail.com'));