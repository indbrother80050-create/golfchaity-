import prisma from "../lib/prisma.ts";

export class CharityService {
  private static instance: CharityService;

  private constructor() {}

  public static getInstance(): CharityService {
    if (!CharityService.instance) {
      CharityService.instance = new CharityService();
    }
    return CharityService.instance;
  }

  public async getCharities(search?: string) {
    return prisma.charity.findMany({
      where: search ? {
        OR: [
          { name: { contains: search } },
          { description: { contains: search } },
        ],
      } : {},
    });
  }

  public async createCharity(data: any) {
    return prisma.charity.create({
      data: {
        name: data.name,
        description: data.description,
        logoUrl: data.logoUrl,
        website: data.website,
      },
    });
  }
}

export default CharityService.getInstance();
