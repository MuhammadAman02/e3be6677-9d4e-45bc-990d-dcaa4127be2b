import { FastifyRequest, FastifyReply } from 'fastify';
import { getFruits, getFruitById } from '../services/fruit.service';

export async function getFruitsHandler(
  req: FastifyRequest,
  res: FastifyReply
) {
  try {
    const fruits = await getFruits();
    console.log(`Returning ${fruits.length} fruits`);
    res.status(200).send(fruits);
  } catch (error) {
    console.error('Error fetching fruits:', error);
    res.status(500).send({ error: 'Failed to fetch fruits' });
  }
}

export async function getFruitByIdHandler(
  req: FastifyRequest<{ Params: { id: string } }>,
  res: FastifyReply
) {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).send({ error: 'Invalid fruit ID' });
    }

    const fruit = await getFruitById(id);
    if (!fruit) {
      return res.status(404).send({ error: 'Fruit not found' });
    }

    console.log(`Returning fruit: ${fruit.name}`);
    res.status(200).send(fruit);
  } catch (error) {
    console.error('Error fetching fruit by ID:', error);
    res.status(500).send({ error: 'Failed to fetch fruit' });
  }
}