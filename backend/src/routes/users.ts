import { Router, Request, Response } from "express";

import { getUsers, getUsersCount, addUserAdder, getUserWithPostCount } from "../db/users/users";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const pageNumber = Number(req.query.pageNumber) || 0;
  const pageSize = Number(req.query.pageSize) || 4;
  if (pageNumber < 0 || pageSize < 1) {
    res.status(400).send({ message: "Invalid page number or page size" });
    return;
  }

  const users = await getUsers(pageNumber, pageSize);
  res.send(users);
});

router.get("/count", async (req: Request, res: Response) => {
  const count = await getUsersCount();
  res.send({ count });
});

router.get("/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    if(!userId) {
      res.status(400).send({ error: "userId is required" });
      return;
    }
    const user = await getUserWithPostCount(userId);
    res.json(user);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
});

router.post('/adders', async (req: Request, res: Response) => {
  const { userId, key, value } = req.body;
  if (!userId || !key || !value) {
    res.status(400).send({ message: 'userId, key and value are required' });
    return;
  }
  await addUserAdder(userId, { key, value });
  res.status(201).send({ message: 'Adder added successfully' })
})

export default router;
