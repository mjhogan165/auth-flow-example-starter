import { Router } from "express";
import { prisma } from "../../prisma/db.setup";
import "express-async-errors";
import { validateRequest } from "zod-express-middleware";
import { z } from "zod";
import { intParseableString as intParseableString } from "../zod/parseableString.schema";

const dogController = Router();
// TODO
// Needs ______?
dogController.get("/dogs", async (req, res) => {
  const dogs = await prisma.dog.findMany();
  return res.json(dogs);
});

// TODO
// Needs ______?
dogController.post(
  "/dogs",
  validateRequest({
    body: z.object({
      name: z.string(),
      userEmail: z.string().email(),
    }),
  }),
  async (req, res) => {
    const { name, userEmail } = req.body;
    const dog = await prisma.dog.create({
      data: {
        name,
        userEmail,
      },
    });
    return res.json(dog);
  }
);

// TODO
// Needs ______?
dogController.patch(
  "/dogs/:dogId",
  validateRequest({
    body: z
      .object({
        name: z.string(),
        userEmail: z.string().email(),
      })
      .partial(),
    query: z.object({
      dogId: intParseableString,
    }),
  }),
  async (req, res, next) => {
    const dogId = parseInt(req.query.dogId);

    return await prisma.dog
      .update({
        where: {
          id: dogId,
        },
        data: {
          ...req.body,
        },
      })
      .then(() => res.status(201).json({ message: "Dog updated" }))
      .catch(() =>
        res.status(500).json({ message: "Dog not updated" })
      )
      .finally(next);
  }
);

// TODO
// Needs _____?
dogController.delete(
  "/dogs/:dogId",
  validateRequest({
    query: z.object({
      dogId: intParseableString,
    }),
  }),
  async (req, res, next) => {
    await prisma.dog
      .delete({
        where: {
          id: parseInt(req.query.dogId),
        },
      })
      .then(() => res.status(201).json({ message: "Dog deleted" }))
      .catch(() =>
        res.status(500).json({ message: "Dog not deleted" })
      );
  }
);

export { dogController };
