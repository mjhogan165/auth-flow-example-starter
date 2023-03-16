import { Router } from "express";
import { validateRequest } from "zod-express-middleware";
import "express-async-errors";
import { z } from "zod";
import { prisma } from "../../prisma/db.setup";

const userController = Router();

// todo
// Needs _____?
userController.patch(
  "/users/:userId",
  validateRequest({ body: z.object({ email: z.string().email() }) }),
  async ({ body: { email } }, res) => {
    try {
      const updated = await prisma.user.update({
        where: {
          email,
        },
        data: {
          email,
        },
      });
      return res.status(201).json({ updated: true });
    } catch (e) {
      return res
        .status(400)
        .json({ message: "Sorry but that username is taken" });
    }
  }
);

// todo:
// Needs _____?
userController.get("/users/:userEmail/dogs", async (req, res) => {
  const { userEmail } = req.params;
  const dogs = await prisma.dog.findMany({
    where: {
      userEmail,
    },
  });
  res.json(dogs);
});

export { userController };
