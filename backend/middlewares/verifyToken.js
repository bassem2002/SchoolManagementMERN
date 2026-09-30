// permet de verifier l'integrité المصداقية

const jwt = require("jsonwebtoken");

const { getJwtSecret } = require("../config/jwt");
const Utilisateur = require("../models/Utilisateur");

async function verifyToken(req, res, next) {
  const match = /^Bearer ([^ ]+)$/i.exec(req.headers.authorization || "");
  if (!match) return res.status(401).json({ error: "aucun jeton fournis" });
  try {
    const decoded = jwt.verify(match[1], getJwtSecret(), { algorithms: ["HS256"] });
    if (!decoded._id || !Number.isFinite(decoded.exp)) throw new Error();
    const user = await Utilisateur.findById(decoded._id);
    if (!user || user.status !== "active") throw new Error();
    req.user = user;
  } catch {
    return res.status(401).json({ error: "jeton invalide" });
  }
  return next();
}
// ... en javascript diffusion let table1 =  ["sqhghsgdsd","hsgdhsgdhs","sgdhsgd"]

// table2 = [...table1,"sjdgsgdksgd","4545"]
// roles = ['admin','teacher']
function authorizeRoles(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(401)
        .json({ error: "vous n'avez pas acces a cette endpoint" });
    }
    next();
  };
}

module.exports = { authorizeRoles, verifyToken };

/*




*/
