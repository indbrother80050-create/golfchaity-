import { Router } from "express";
import prisma from "../lib/prisma.ts";
import { authenticate, authorize } from "../middlewares/auth.ts";
import { charitySchema } from "../lib/validations.ts";

const router = Router();

router.get("/", async (req, res) => {
  const { search } = req.query;
  const charities = await prisma.charity.findMany({
    where: search ? {
      OR: [
        { name: { contains: String(search) } },
        { description: { contains: String(search) } },
      ],
    } : {},
  });
  res.json(charities);
});

router.post("/", authenticate, authorize(["ADMIN"]), async (req, res) => {
  try {
    const data = charitySchema.parse(req.body);
    const charity = await prisma.charity.create({ 
      data: {
        name: data.name,
        description: data.description,
        logoUrl: data.logoUrl,
        website: data.website,
      }
    });
    res.status(201).json(charity);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
