import crypto from 'node:crypto';

export function passwordSHA1(password) {
    const hash = crypto.createHmac('sha1', process.env.SECRETKEY).update(password).digest('hex');
    return `${hash}`;
}
export function validatePassword1(enteredPassword, storedHash) {
    const hash = passwordSHA1(enteredPassword);
    return hash === storedHash;
}

export function passwordSHA256(password) {
    const hash = crypto.createHmac('sha256', process.env.SECRETKEY).update(password).digest('hex');
    return `${hash}`;
}

export function validatePassword2(enteredPassword, storedHash) {
    const hash = passwordSHA256(enteredPassword);
    return hash === storedHash;
}

export function passwordSHA512(password) {
    const hash = crypto.createHmac('sha512', process.env.SECRETKEY).update(password).digest('hex');
    return `${hash}`;
}

export function validatePassword3(enteredPassword, storedHash) {
    const hash = passwordSHA512(enteredPassword);
    return hash === storedHash;
}


