

const asyncWrapper = function (asyncFun) {
    return (req, res, next) => {
        Promise.resolve(asyncFun(req, res, next)).catch((reason) => {
            next(reason)
        })
    }
}

export default asyncWrapper