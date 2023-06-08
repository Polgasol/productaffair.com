"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkCodeIfExist = (req, res, next) => {
    const regex = /[a-z-A-Z0-9]/i;
    if (req.user.vcode === '' || !req.user.vcode) {
        return next();
    }
    if (req.user.vcode.match(regex)) {
        return res.json(200).json({ message: '' });
    }
    res.json({ message: 'Please wait for 120s before requesting again' });
    return next();
};
exports.default = checkCodeIfExist;
//# sourceMappingURL=checkCodeExist.js.map