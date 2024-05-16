// import Users from "@/lib/models/user.model";

// const checkRole = (allowedRole) => {
//   return async (req, res, next) => {
//     try {
//       const user = await Users.findById(req.userId); // Assuming req.userId is set after authentication

//       if (!user) {
//         return res.status(404).json({ message: "User not found" });
//       }

//       if (user.role !== allowedRole) {
//         return res.status(403).json({ message: "Access denied" });
//       }

//       next();
//     } catch (error) {
//       res.status(500).json({ message: "Server error" });
//     }
//   };
// };

// module.exports = checkRole;
