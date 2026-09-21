// permet de verifier l'integrité المصداقية

const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  // "bearer 45454aazeda54545.4545dqsdqs454545dqs.78qaaa7878787"= => ['bearer','sdsdsd.sdsd.sd']
  let token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "aucun jeton fournis ! " });
  jwt.verify(
    token,
    "ter-155-art-1994-unbeaumoment-557",
    async (err, decoded) => {
      if (err) return res.json({ error: "jeton invalide" });
      req.user = decoded;
      next();
    }
  );
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
