import { z } from "zod";
import { validateRequest } from "zod-express-middleware";
import { Router } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../../prisma/db.setup";

const authController = Router();

authController.post(
  "/auth/login",
  validateRequest({
    body: z.object({
      email: z.string().email(),
      password: z.string(),
    }),
  }),
  async (
    { body: { email: bodyEmail, password: bodyPassword } },
    res
  ) => {
    const user = await prisma.user.findFirst({
      where: { email: bodyEmail },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordCorrect = await bcrypt.compare(
      bodyPassword,
      user.passwordHash
    );
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "invalid credentials" });
    }
    return res.status(200).json({ message: " youre logged in " });
  }
);

export { authController };
