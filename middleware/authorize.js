
export function authorizeModification(req, res, next) {
    const {role} = req.user;

    if (role === 'parent' || (req.user.id == req.params.userId) ) {
        next();
    }
    return res.status(403).json({error: "Access denied"});
} 